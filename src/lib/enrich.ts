export type EnrichMode = "source_summary" | "issue_extract" | "topic_draft";

export interface EnrichRequest {
  mode: EnrichMode;
  topic: string;
  baseContent: unknown;
}

export interface EnrichData {
  summary: string;
  issues: string[];
  topicCandidates: string[];
  cautions: string[];
}

export interface EnrichResponse {
  ok: boolean;
  data: EnrichData;
  source: "openai" | "fallback";
}

function makeFallback(topic: string, reason?: string): EnrichResponse {
  return {
    ok: false,
    source: "fallback",
    data: {
      summary: `정적 브리프를 표시합니다.${
        reason ? ` (${reason})` : ""
      } 서버 환경변수 OPENAI_API_KEY가 설정되어야 OpenAI 기반 보강 결과가 나타납니다. (주제: ${topic})`,
      issues: [],
      topicCandidates: [],
      cautions: [],
    },
  };
}

export async function requestEnrichment(
  req: EnrichRequest
): Promise<EnrichResponse> {
  try {
    const res = await fetch("/api/enrich", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    if (!res.ok) return makeFallback(req.topic, `HTTP ${res.status}`);
    const json = (await res.json()) as EnrichResponse;
    if (!json || typeof json !== "object" || !json.data) {
      return makeFallback(req.topic, "응답 형식 오류");
    }
    return json;
  } catch (_err) {
    return makeFallback(req.topic, "API Route 미연결");
  }
}
