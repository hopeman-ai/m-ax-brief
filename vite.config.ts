import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "http";

/**
 * /api/enrich — 신뢰자료 기반 요약 / 이슈 추출 / 주제 후보 초안 생성 API.
 *
 * 보안 정책 (강화):
 *  - OPENAI_API_KEY 는 process.env (셸/시스템 환경변수) 에서만 읽는다.
 *    의도적으로 .env / .env.local 같은 프로젝트 내 파일에서 로드하지 않는다.
 *    → 키가 프로젝트 디렉터리 안의 파일에 남아 있는 경로를 원천 차단.
 *  - 키 부재 시 fallback 응답을 반환하며 클라이언트는 정상 동작한다.
 *  - 에러·로그·응답에 키 패턴(`sk-...`)이 포함되지 않도록 redact 한다.
 *  - 같은 머신 내 다른 앱이 호출하는 것을 막기 위해 Origin/Referer 가
 *    localhost 가 아닐 경우 거부한다 (브라우저 외 직접 호출은 허용).
 *
 * 키 설정 방법:
 *   PowerShell (현재 세션):
 *     $env:OPENAI_API_KEY = "sk-..." ;  npm run dev
 *   PowerShell (영구):
 *     setx OPENAI_API_KEY "sk-..."     (재시작 후 적용)
 *   macOS/Linux:
 *     export OPENAI_API_KEY="sk-..." ;  npm run dev
 */

const DEFAULT_MODEL = "gpt-4.1-mini";

const SYSTEM_PROMPT = `너는 산업혁신 생태계 효율성 제고를 위한 M.AX 및 Vertical AI 전략 브리프 작성자다.
사용자가 제공한 baseContent를 신뢰자료 기반의 요약·이슈 추출·검토 가능한 주제 후보 초안으로 정리한다.

원칙:
- baseContent에 없는 새로운 사실을 임의로 만들어내지 않는다.
- 출처가 제공되지 않은 최신 사실은 단정하지 않는다.
- 자동 추천이나 우선순위 판단을 하지 않는다.
- "정리", "검토 포인트", "검토 가능한" 같은 표현을 사용한다.
- 모든 출력은 한국어다.
- 결과는 JSON 객체로만 반환한다.

JSON 스키마:
{
  "summary": "신뢰자료 기반 요약 (3~4문장)",
  "issues": ["관련 정책·기술·생태계 이슈 정리 2~4개"],
  "topicCandidates": ["검토 가능한 M.AX·Vertical AI 주제 후보 초안 2~4개"],
  "cautions": ["검토 시 주의해야 할 포인트 1~3개"]
}`;

const MODE_HINTS: Record<string, string> = {
  source_summary:
    "이 자료의 핵심을 요약하고 M.AX·Vertical AI 관점의 관련성을 정리해줘.",
  issue_extract:
    "이 baseContent에서 정책·기술·데이터·거버넌스·생태계 이슈를 정리하고 연결되는 주제 후보 방향을 도출해줘.",
  topic_draft:
    "이 baseContent에서 검토 가능한 M.AX·Vertical AI 주제 후보 초안을 도출해줘. 추천이나 우선순위 판단은 하지 않는다.",
};

interface EnrichBody {
  mode?: string;
  topic?: string;
  baseContent?: unknown;
}

function readApiKey(): string | undefined {
  const raw = process.env.OPENAI_API_KEY;
  return raw && raw.trim() !== "" ? raw.trim() : undefined;
}

function readModel(): string {
  const raw = process.env.OPENAI_MODEL;
  return raw && raw.trim() !== "" ? raw.trim() : DEFAULT_MODEL;
}

/**
 * 키 잔여물이 응답·로그에 섞여 클라이언트로 흘러가지 않도록 redact.
 *  1) 정확한 키 문자열을 [REDACTED_KEY] 로 치환
 *  2) 일반적인 sk-… 패턴도 함께 마스킹 (defense in depth)
 */
function redactSecrets(text: string, apiKey?: string): string {
  let out = text;
  if (apiKey && apiKey.length >= 8) {
    out = out.split(apiKey).join("[REDACTED_KEY]");
  }
  out = out.replace(/sk-[A-Za-z0-9_-]{20,}/g, "[REDACTED_KEY]");
  return out;
}

/** 브라우저에서 온 요청은 Origin/Referer 가 localhost 인 경우만 허용. */
function isAllowedOrigin(req: IncomingMessage): boolean {
  const raw = (req.headers.origin || req.headers.referer || "") as string;
  if (!raw) return true; // curl/server-to-server 등 비브라우저 호출은 통과
  try {
    const u = new URL(raw);
    return u.hostname === "localhost" || u.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function readJson(req: IncomingMessage): Promise<EnrichBody> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function jsonResponse(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

function fallbackPayload(topic: string, reason: string) {
  return {
    ok: false,
    source: "fallback" as const,
    data: {
      summary: `정적 브리프를 표시합니다. (${reason}) 셸/시스템 환경변수로 OPENAI_API_KEY 를 설정하면 OpenAI 기반 보강 결과가 나타납니다. (주제: ${topic})`,
      issues: [] as string[],
      topicCandidates: [] as string[],
      cautions: [] as string[],
    },
  };
}

async function callOpenAI(
  apiKey: string,
  model: string,
  userPrompt: string
): Promise<unknown> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    }),
  });
  if (!res.ok) {
    // status code 만 노출 — 응답 본문은 키를 echo 할 위험이 있으므로 그대로 던지지 않는다.
    throw new Error(`OpenAI ${res.status}`);
  }
  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = json?.choices?.[0]?.message?.content ?? "{}";
  return JSON.parse(content);
}

async function handleEnrich(
  req: IncomingMessage,
  res: ServerResponse,
  apiKey: string | undefined,
  model: string
) {
  if (!isAllowedOrigin(req)) {
    jsonResponse(res, 403, {
      ok: false,
      source: "fallback",
      data: {
        summary:
          "비인가 출처에서 호출되어 차단되었습니다. (Origin/Referer 가 localhost 가 아닙니다)",
        issues: [],
        topicCandidates: [],
        cautions: [],
      },
    });
    return;
  }

  let body: EnrichBody;
  try {
    body = await readJson(req);
  } catch {
    jsonResponse(res, 200, fallbackPayload("주제 미상", "요청 파싱 실패"));
    return;
  }

  const topic = String(body.topic ?? "주제 미상");
  const mode = String(body.mode ?? "source_summary");
  const modeHint = MODE_HINTS[mode] ?? MODE_HINTS.source_summary;

  if (!apiKey) {
    jsonResponse(
      res,
      200,
      fallbackPayload(topic, "OPENAI_API_KEY 환경변수 미설정")
    );
    return;
  }

  const userPrompt = `${modeHint}

mode: ${mode}
topic: ${topic}
baseContent: ${JSON.stringify(body.baseContent ?? {}, null, 2)}

반드시 위 시스템 메시지의 JSON 스키마에 정확히 맞춰 응답해. 새로운 사실을 만들어내지 마.`;

  try {
    const parsed = (await callOpenAI(apiKey, model, userPrompt)) as Record<
      string,
      unknown
    >;
    jsonResponse(res, 200, {
      ok: true,
      source: "openai",
      data: {
        summary: typeof parsed.summary === "string" ? parsed.summary : "",
        issues: Array.isArray(parsed.issues)
          ? (parsed.issues as unknown[]).map(String)
          : [],
        topicCandidates: Array.isArray(parsed.topicCandidates)
          ? (parsed.topicCandidates as unknown[]).map(String)
          : [],
        cautions: Array.isArray(parsed.cautions)
          ? (parsed.cautions as unknown[]).map(String)
          : [],
      },
    });
  } catch (err) {
    const rawReason = err instanceof Error ? err.message : "OpenAI 호출 실패";
    const safeReason = redactSecrets(rawReason, apiKey);
    jsonResponse(res, 200, fallbackPayload(topic, safeReason));
  }
}

/**
 * GitHub Pages 배포 시 자산 경로 보정.
 *  - https://hopeman-ai.github.io/m-ax-brief/ 하위에 서빙되므로 prod 빌드는 base="/m-ax-brief/" 사용.
 *  - dev 서버는 root 에서 동작해야 편하므로 그대로 base="/".
 */
const PROD_BASE = "/m-ax-brief/";

export default defineConfig(({ command }) => {
  const apiKey = readApiKey();
  const model = readModel();
  const isProd = command === "build";

  // 키 자체는 로그에 출력하지 않는다. 길이만 노출해 사용자가 환경변수 전달 여부를 확인하도록.
  if (apiKey) {
    // eslint-disable-next-line no-console
    console.log(
      `[m-ax-brief] OPENAI_API_KEY detected (length: ${apiKey.length}). /api/enrich → OpenAI (model: ${model}).`
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(
      "[m-ax-brief] OPENAI_API_KEY not set in process.env. /api/enrich will return fallback responses."
    );
    // eslint-disable-next-line no-console
    console.log(
      '[m-ax-brief] Set in PowerShell:  $env:OPENAI_API_KEY = "sk-..." ;  npm run dev'
    );
  }

  return {
    base: isProd ? PROD_BASE : "/",
    plugins: [
      react(),
      {
        name: "max-brief-enrich-api",
        configureServer(server) {
          server.middlewares.use("/api/enrich", (req, res, next) => {
            if (req.method !== "POST") {
              next();
              return;
            }
            void handleEnrich(req, res, apiKey, model);
          });
        },
      },
    ],
  };
});
