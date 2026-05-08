import type { KeyChange } from "../types";

/**
 * 핵심 변화 5가지 — 근거 기반 인사이트 카드.
 *
 * 각 변화는 다음을 명확히 표시한다:
 *   1) 무엇이 변화하고 있는가 (oneLine)
 *   2) 왜 중요한가 (whyItMatters)
 *   3) 어떤 신뢰자료를 근거로 하는가 (evidenceSources, evidenceSourceIds)
 *   4) 실제로 어떤 정책·기술 흐름에서 확인되는가 (observationPoints)
 *   5) 어떤 주제 후보로 연결되는가 (linkedTopics)
 */
export const keyChanges: KeyChange[] = [
  {
    id: "kc-scope",
    order: 1,
    title: "제조 AX 범위 확대",
    oneLine:
      "제조 AX는 스마트공장 고도화를 넘어 AI 인프라, 제조데이터, 로봇, 공급망, 산업단지, 표준·검증 체계까지 포함하는 산업전략으로 확장되고 있습니다.",
    whyItMatters:
      "제조 AX가 단일 공장 내부 자동화 과제가 아니라 산업 생태계 전체의 생산성, 회복력, 데이터 활용, AI 확산 구조와 연결되기 때문입니다.",
    evidenceSources: [
      "America's AI Action Plan",
      "Manufacturing USA Strategic Plan",
      "국내 M.AX 얼라이언스 출범",
      "2026 AI 팩토리 선도사업",
      "산업단지 M.AX·GX 지원사업",
    ],
    evidenceSourceIds: [
      "src-ai-action",
      "src-mfg-usa",
      "motir-max-alliance-launch-2025",
      "motir-ai-factory-2026",
      "motir-industrial-complex-max-gx-2026",
    ],
    observationPoints: [
      "AI 팩토리, 산단 AX, 제조데이터, 엣지 AIDC, 5G 특화망 등 정책 범위가 확대되고 있습니다.",
      "제조 AX가 개별 공정 자동화보다 산업·공급망·지역 단위 확산으로 이동하고 있습니다.",
    ],
    linkedTopics: [
      "AI Factory 운영지능",
      "산단 AX 실증 허브",
      "제조 AX 인프라 전략",
    ],
    keywords: ["AI 인프라", "공급망", "AI 팩토리", "산단 AX"],
    detail:
      "제조 AX는 기존 스마트공장이나 공정 자동화를 넘어 AI 컴퓨팅 인프라, 제조데이터 활용, 산업단지 단위 확산, 로봇·엣지 인프라, 공급망 회복력까지 포함하는 방향으로 확장되고 있습니다. 이는 제조혁신을 개별 기업의 디지털화가 아니라 산업 생태계 차원의 효율성 제고 문제로 보게 만듭니다.",
  },
  {
    id: "kc-vertical",
    order: 2,
    title: "Vertical AI 접근 부상",
    oneLine:
      "제조업은 업종·공정·장비·데이터 특성이 달라 범용 AI보다 도메인 특화 Vertical AI 접근이 중요해지고 있습니다.",
    whyItMatters:
      "자동차, 조선, 반도체, 소재, 바이오, 로봇 등은 데이터 구조와 공정 문제가 다르기 때문에 동일한 AI 모델을 그대로 적용하기 어렵습니다.",
    evidenceSources: [
      "중국 AI+Manufacturing 정책자료",
      "Shanghai AI+Manufacturing Plan",
      "국내 M.AX 얼라이언스 10대 분야",
      "산업부, AI 팩토리 본격 추진",
      "KIAT 글로벌 제조업 AX 동향 및 국내 정책 대응 방향",
    ],
    evidenceSourceIds: [
      "src-ai-mfg",
      "motir-max-alliance-launch-2025",
      "motir-ai-factory-launch-2025",
      "kiat-global-manufacturing-ax-2025",
    ],
    observationPoints: [
      "국가 정책이 산업별·공정별 AI 적용 가이드와 분야별 얼라이언스 구조로 세분화되고 있습니다.",
      "제조 AI 파운데이션 모델, 부문별 AI 모델, 제조 특화 LLM·SLM 필요성이 제기되고 있습니다.",
    ],
    linkedTopics: [
      "제조 Vertical AI 공통기반",
      "제조 AI 파운데이션 모델",
      "업종별 AI 에이전트",
    ],
    keywords: ["도메인 특화", "제조 LLM", "AI 모델", "Vertical AI"],
    detail:
      "Vertical AI 접근은 제조업을 하나의 단일 산업으로 보지 않고 업종, 공정, 장비, 데이터 특성이 다른 여러 도메인으로 나누어 AI를 설계하는 접근입니다. 이는 M.AX 주제 발굴에서 공통 기반과 도메인 특화 기능을 함께 고려해야 함을 의미합니다.",
  },
  {
    id: "kc-physical",
    order: 3,
    title: "로봇·Physical AI 부상",
    oneLine:
      "AI가 실제 제조 현장의 작업, 검사, 물류, 안전, 설비 제어와 연결되면서 로봇·Physical AI가 제조 AX의 실행 계층으로 부상하고 있습니다.",
    whyItMatters:
      "제조 AX가 실제 생산성 개선으로 이어지려면 AI 분석 결과가 로봇, 설비, 센서, 카메라, 엣지 장치와 연결되어야 하기 때문입니다.",
    evidenceSources: [
      "METI Robot Industry Policy",
      "World Robot Summit 관련 자료",
      "산업부, AI 팩토리 본격 추진",
      "M.AX 얼라이언스 5대 핵심과제",
      "산업단지 M.AX·GX 지원사업",
    ],
    evidenceSourceIds: [
      "src-meti-robot",
      "motir-ai-factory-launch-2025",
      "motir-max-alliance-core-tasks-2026",
      "motir-industrial-complex-max-gx-2026",
    ],
    observationPoints: [
      "로봇, 휴머노이드, 온디바이스 AI, 엣지 AIDC, 스마트물류가 제조 AX 정책에 포함되고 있습니다.",
      "제조 AI가 정보 분석을 넘어 물리적 실행과 안전관리로 확장되고 있습니다.",
    ],
    linkedTopics: [
      "로봇·Physical AI 제조 적용",
      "온디바이스·엣지 제조 AI",
      "휴머노이드 제조 실증",
    ],
    keywords: ["로봇", "Physical AI", "엣지 AI", "휴머노이드"],
    detail:
      "로봇·Physical AI는 제조 AX의 실행 계층입니다. AI가 생산계획이나 품질분석에 머무르지 않고 실제 검사, 조립, 물류, 안전관리, 설비 운전과 연결될 때 제조 현장의 체감 효과가 커집니다.",
  },
  {
    id: "kc-dataspace",
    order: 4,
    title: "제조 데이터스페이스 중요성 증가",
    oneLine:
      "제조 AI 확산에는 개별기업 데이터만으로 한계가 있어 기업·공급망·산업 단위의 데이터 공유·표준화·재사용 기반이 중요해지고 있습니다.",
    whyItMatters:
      "AI 모델의 성능과 확산 가능성은 고품질 제조데이터에 좌우되며, 제조데이터가 기업 내부에만 머물면 업종별 AI 모델 개발과 검증이 어렵기 때문입니다.",
    evidenceSources: [
      "EU Manufacturing Data Spaces",
      "2026 AI 팩토리 선도사업",
      "M.AX 얼라이언스 5대 핵심과제",
      "산업단지 M.AX·GX 지원사업",
      "KIAT 글로벌 제조업 AX 동향",
    ],
    evidenceSourceIds: [
      "src-mds",
      "motir-ai-factory-2026",
      "motir-max-alliance-core-tasks-2026",
      "motir-industrial-complex-max-gx-2026",
      "kiat-global-manufacturing-ax-2025",
    ],
    observationPoints: [
      "제조데이터 제출 동의서, 데이터·AI 모델 위임형, 데이터 생성·공유·활용 정책이 등장하고 있습니다.",
      "데이터스페이스, 연합학습, 데이터 카탈로그, 권한관리 이슈가 제조 AX의 핵심 기반으로 부상하고 있습니다.",
    ],
    linkedTopics: [
      "업종별 제조데이터 스페이스",
      "데이터·AI 모델 위임형 제조 AX",
      "제조 AI 학습용 공통 데이터셋",
    ],
    keywords: ["데이터스페이스", "제조데이터", "데이터 공유", "연합학습"],
    detail:
      "제조 데이터스페이스는 제조 AX 확산의 기반입니다. 개별 기업의 데이터만으로는 모델 일반화와 업종 확산에 한계가 있기 때문에, 데이터 권한관리와 보안을 전제로 산업·공급망 단위의 데이터 활용 체계가 중요해지고 있습니다.",
  },
  {
    id: "kc-trust",
    order: 5,
    title: "AI 신뢰성·검증 필요",
    oneLine:
      "제조 AI는 제품 품질, 작업자 안전, 설비 제어, 책임성과 직접 연결되므로 신뢰성·검증·표준·거버넌스 체계가 필수입니다.",
    whyItMatters:
      "제조 AI의 오판정은 불량품 출하, 설비 오작동, 안전사고, 납기 차질로 이어질 수 있어 단순 성능 평가만으로는 부족하기 때문입니다.",
    evidenceSources: [
      "NIST AI RMF",
      "ISO/IEC 42001",
      "EU AI Act",
      "AI 산업융합 표준화 포럼",
      "제조 AI 신뢰성·검증 관련 국내 정책자료",
    ],
    evidenceSourceIds: [
      "src-nist-rmf",
      "src-iso-42001",
      "motir-ai-industrial-convergence-standard-2025",
    ],
    observationPoints: [
      "제조데이터, AI 시스템 상호운용성, 자율제조, 휴머노이드 관련 표준화 수요가 증가하고 있습니다.",
      "Human-in-the-loop, 설명가능성, 현장 PoC, 평가셋, 승인 절차의 중요성이 확대되고 있습니다.",
    ],
    linkedTopics: [
      "제조 AI 신뢰성·검증체계",
      "제조 AI 표준·상호운용성",
      "자율제조 안전 기준",
    ],
    keywords: ["신뢰성", "검증", "표준", "거버넌스"],
    detail:
      "제조 AI는 단순 정보 추천 시스템과 달리 품질, 안전, 설비 제어, 책임성과 직접 연결됩니다. 따라서 모델 정확도뿐 아니라 설명가능성, 현장 검증, 승인 절차, 표준·거버넌스 체계가 함께 설계되어야 합니다.",
  },
];

/** 주제 후보 카드 등에서 ID로 핵심 변화 정보를 빠르게 조회하기 위한 lookup. */
export const keyChangesById: Record<string, KeyChange> = Object.fromEntries(
  keyChanges.map((c) => [c.id, c])
);
