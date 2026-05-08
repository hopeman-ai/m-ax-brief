import { evidenceSources } from "../data/evidenceSources";
import type { EvidenceSource } from "../types";

/**
 * 자료 표시 시 출처(publisher)와 시점(date)을 매칭하기 위한 alias 표.
 * Issue.evidenceSources / TopicCandidate.evidenceSources / DomesticSignal.evidenceTitles 는
 * 자유 텍스트 제목으로 들어올 수 있어 정확 일치가 어려운 경우가 있다.
 * 카탈로그(evidenceSources)에 등록된 자료와 매칭될 수 있도록 변형 표기를 매핑한다.
 */
const titleAliases: Record<string, string> = {
  // 글로벌 자료 별칭
  "Manufacturing USA": "Manufacturing USA Strategic Plan",
  "AI+Manufacturing 정책자료": "AI+Manufacturing Policy",
  "METI 로봇산업 정책자료": "METI Robot Industry Policy",
  "EU Manufacturing Data Spaces": "Manufacturing Data Spaces",

  // 국내 자료 별칭 (이슈/주제/시그널에서 다양한 줄임 표기로 참조됨)
  "국내 M.AX 얼라이언스": "제조 AX 최강국 위해 기업들 뭉쳤다",
  "2026 AI 팩토리 선도사업": "제조현장에 AI 입혀 산업기초체력 키운다",
  "M.AX 얼라이언스 5대 핵심과제":
    "M.AX 얼라이언스, AI 개발 위해 제조 데이터 함께 모은다",
  "산업단지 M.AX·GX 지원사업":
    "산업단지 M.AX·GX 지원사업 본격 추진",
  "AI 산업융합 표준화 포럼": "AX 시대, AI 산업융합 표준으로 길을 찾다",
  "AI 팩토리 본격 추진": "산업부, AI 팩토리 본격 추진",
};

const sourceByTitle = new Map<string, EvidenceSource>(
  evidenceSources.map((s) => [s.title, s])
);

export function findSourceByTitle(input: string): EvidenceSource | undefined {
  const normalized = titleAliases[input] ?? input;
  return sourceByTitle.get(normalized);
}

/**
 * 발행 시점 문자열을 표시용으로 정규화한다.
 *  - "2026-04-30" → "2026.04.30"
 *  - "2025-12"    → "2025.12"
 *  - "2024"       → "2024"
 */
export function formatDate(date: string): string {
  return date.replace(/-/g, ".");
}
