import type { DomesticPolicySignal, SignalRelation } from "../types";

/**
 * 국내 정책 시그널 5건.
 * 이전의 "기반 구축 / 현장 확산 / 고도화" stage 그룹은 사용하지 않는다.
 * 시그널 자체를 정면에 노출하고, signalRelations 로 시그널 간 관계를 별도 표현한다.
 */
export const domesticPolicySignals: DomesticPolicySignal[] = [
  {
    id: "ai-factory-expansion",
    title: "AI 팩토리 선도사업 확대",
    roleLabel: "현장 실증",
    summary:
      "2026년 신규과제와 제조데이터 수집·활용 체계가 구체화되고 있습니다.",
    whyItMatters:
      "AI 팩토리가 개별 공정 자동화가 아니라 업종·공정별 AI 적용과 제조데이터 활용을 함께 추진하는 실증 기반으로 확장되고 있기 때문입니다.",
    evidenceSources: [
      {
        title: "제조현장에 AI 입혀 산업기초체력 키운다",
        publisher: "산업통상부",
        date: "2026.04.30",
      },
    ],
    linkedTopics: [
      "AI Factory 운영지능",
      "업종별 제조데이터 스페이스",
      "제조 Vertical AI 공통기반",
    ],
    keywords: ["AI 팩토리", "신규과제", "제조데이터", "업종별 실증"],
  },
  {
    id: "manufacturing-data-asset",
    title: "제조데이터가 정책 핵심 자산으로 부상",
    roleLabel: "데이터 기반",
    summary:
      "R&D 과정에서 발생한 제조데이터를 후속 AI 모델 개발에 활용하는 방향이 제시되고 있습니다.",
    whyItMatters:
      "제조 AI의 성능과 확산성은 데이터 확보와 재사용 구조에 좌우되며, 제조데이터가 정책적으로 수집·활용되는 자산으로 다뤄지기 시작했기 때문입니다.",
    evidenceSources: [
      {
        title: "2026 AI 팩토리 선도사업",
        publisher: "산업통상부",
        date: "2026.04.30",
      },
      {
        title: "M.AX 얼라이언스 5대 핵심과제",
        publisher: "산업통상부",
        date: "2025.12",
      },
    ],
    linkedTopics: [
      "업종별 제조데이터 스페이스",
      "데이터·AI 모델 위임형 제조 AX",
      "제조 AI 학습용 공통 데이터셋",
    ],
    keywords: ["제조데이터", "데이터스페이스", "모델 공유", "데이터 거버넌스"],
  },
  {
    id: "industrial-complex-max-gx",
    title: "산단 단위 M.AX·GX 확산",
    roleLabel: "생태계 확산",
    summary:
      "엣지 AIDC, 5G 특화망, 스마트물류를 결합한 산업단지 단위 제조 AX 실증이 추진되고 있습니다.",
    whyItMatters:
      "중소·중견 제조기업이 개별적으로 구축하기 어려운 AI 인프라와 실증 환경을 산업단지 단위로 제공할 수 있기 때문입니다.",
    evidenceSources: [
      {
        title: "산업단지 M.AX·GX 지원사업 본격 추진",
        publisher: "산업통상부",
        date: "2026.04.28",
      },
    ],
    linkedTopics: [
      "산단 AX 실증 허브",
      "엣지 AI·AIDC 기반 제조 AX",
      "스마트물류 Vertical AI",
      "지역 제조 AX 확산모델",
    ],
    keywords: ["산단 AX", "엣지 AIDC", "5G 특화망", "스마트물류"],
  },
  {
    id: "manufacturing-ai-standardization",
    title: "제조 AI 표준화 필요성 확대",
    roleLabel: "신뢰 기반",
    summary:
      "제조데이터, AI 상호운용성, 자율제조, 휴머노이드 관련 표준화 이슈가 부상하고 있습니다.",
    whyItMatters:
      "제조 AX가 여러 기업, 설비, 로봇, AI 시스템으로 확산되려면 데이터와 시스템 간 상호운용성, 안전 기준, 신뢰성 검증 기준이 필요하기 때문입니다.",
    evidenceSources: [
      {
        title: "AI 산업융합 표준화 포럼",
        publisher: "산업통상부·국가기술표준원",
        date: "2025.12.18",
      },
    ],
    linkedTopics: [
      "제조 AI 신뢰성·검증체계",
      "제조데이터 표준화",
      "자율제조 상호운용성",
      "휴머노이드 제조 적용 표준",
    ],
    keywords: ["표준화", "상호운용성", "자율제조", "AI 신뢰성"],
  },
  {
    id: "foundation-model-dark-factory",
    title: "제조 AI 파운데이션 모델과 다크팩토리",
    roleLabel: "고도화 방향",
    summary:
      "제조 특화 기반모델, 온디바이스 AI, 다크팩토리 등 공장 운영 전반의 지능화 방향이 제시되고 있습니다.",
    whyItMatters:
      "제조 AX가 단일 AI 솔루션 도입을 넘어 공장 운영 전체를 지능화하는 방향으로 확장되고 있음을 보여주기 때문입니다.",
    evidenceSources: [
      {
        title: "AI 팩토리 본격 추진",
        publisher: "산업통상부",
        date: "2025.05.26",
      },
      {
        title: "M.AX 얼라이언스 5대 핵심과제",
        publisher: "산업통상부",
        date: "2025.12",
      },
    ],
    linkedTopics: [
      "제조 AI 파운데이션 모델",
      "다크팩토리 운영지능",
      "온디바이스·엣지 제조 AI",
      "AI Factory 운영지능",
    ],
    keywords: ["제조 AI 파운데이션 모델", "온디바이스 AI", "다크팩토리", "AI Factory"],
  },
];

/**
 * 시그널 간 방향성 있는 관계 6건.
 * 그래프 도식의 연결선과 하단 SignalRelationList 가 모두 이 데이터에 매핑된다.
 */
export const signalRelations: SignalRelation[] = [
  {
    from: "manufacturing-data-asset",
    to: "ai-factory-expansion",
    label: "제조데이터가 AI 팩토리 모델 개발·실증 기반",
  },
  {
    from: "manufacturing-ai-standardization",
    to: "ai-factory-expansion",
    label: "표준·상호운용성이 AI 팩토리 확산 조건",
  },
  {
    from: "ai-factory-expansion",
    to: "foundation-model-dark-factory",
    label: "현장 실증이 제조 AI 고도화로 연결",
  },
  {
    from: "ai-factory-expansion",
    to: "industrial-complex-max-gx",
    label: "AI 팩토리 성과가 산단 단위 확산으로 연결",
  },
  {
    from: "manufacturing-data-asset",
    to: "foundation-model-dark-factory",
    label: "데이터 축적이 제조 AI 기반모델 개발로 연결",
  },
  {
    from: "manufacturing-ai-standardization",
    to: "industrial-complex-max-gx",
    label: "산단 확산에는 표준·상호운용성 필요",
  },
];

/** 관계 리스트와 그래프에서 짧은 별칭으로 노출하기 위한 매핑. */
export const signalShortName: Record<string, string> = {
  "ai-factory-expansion": "AI 팩토리",
  "manufacturing-data-asset": "제조데이터",
  "industrial-complex-max-gx": "산단 M.AX·GX",
  "manufacturing-ai-standardization": "제조 AI 표준화",
  "foundation-model-dark-factory": "파운데이션·다크팩토리",
};
