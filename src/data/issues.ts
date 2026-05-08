import type { Issue } from "../types";

export const issues: Issue[] = [
  {
    id: "iss-infra",
    category: "정책 이슈",
    title: "AI 인프라와 제조 경쟁력",
    summary:
      "제조 AX 경쟁력은 공장 자동화 수준을 넘어 AI 컴퓨팅, 데이터, 반도체, 공급망 역량과 연결되고 있다.",
    relatedRegions: ["미국", "중국", "한국"],
    relatedTechnologies: ["AI 인프라", "반도체", "데이터센터"],
    linkedTopics: ["제조 AX 인프라 전략", "AI Factory 공통 기반"],
    evidenceSources: ["America's AI Action Plan", "Manufacturing USA"],
  },
  {
    id: "iss-dataspace",
    category: "데이터·거버넌스 이슈",
    title: "제조 데이터스페이스",
    summary:
      "개별기업 데이터만으로는 제조 AI 확산에 한계가 있어 산업·공급망 단위 데이터 활용 기반이 필요하다.",
    relatedRegions: ["유럽", "한국"],
    relatedTechnologies: ["데이터 표준", "권한관리", "연합학습"],
    linkedTopics: [
      "업종별 제조데이터 스페이스",
      "제조 AI 학습용 공통 데이터셋",
    ],
    evidenceSources: ["Manufacturing Data Spaces", "국내 제조데이터 정책자료"],
  },
  {
    id: "iss-vertical",
    category: "기술 이슈",
    title: "Vertical AI와 도메인 특화 모델",
    summary:
      "제조업은 업종·공정·장비별 특성이 달라 범용 AI보다 도메인 특화 AI 접근이 중요하다.",
    relatedRegions: ["미국", "중국", "한국", "유럽"],
    relatedTechnologies: ["제조 LLM/SLM", "Agentic AI", "도메인 지식베이스"],
    linkedTopics: ["제조 Vertical AI 공통기반", "업종별 AI 에이전트"],
    evidenceSources: ["AI+Manufacturing 정책자료", "글로벌 제조 AI 보고서"],
  },
  {
    id: "iss-physical",
    category: "기술 이슈",
    title: "로봇·Physical AI",
    summary:
      "AI가 제조현장의 실제 작업, 검사, 물류, 안전관리와 연결되면서 로봇과 Physical AI가 중요해지고 있다.",
    relatedRegions: ["일본", "미국", "중국", "한국"],
    relatedTechnologies: ["산업로봇", "협동로봇", "비전 AI", "엣지 AI"],
    linkedTopics: ["로봇 안전 AI", "제조 작업지원 AI", "자율물류"],
    evidenceSources: ["METI 로봇산업 정책자료", "World Robot Summit"],
  },
  {
    id: "iss-trust",
    category: "데이터·거버넌스 이슈",
    title: "AI 신뢰성·현장 검증",
    summary:
      "제조 AI는 품질, 안전, 설비 제어, 책임성과 연결되므로 현장검증과 설명가능성이 중요하다.",
    relatedRegions: ["유럽", "미국", "일본", "한국"],
    relatedTechnologies: ["AI 검증", "설명가능성", "Human-in-the-loop"],
    linkedTopics: ["제조 AI 평가셋", "AI 신뢰성 검증체계"],
    evidenceSources: ["NIST AI RMF", "ISO/IEC 42001", "EU AI Act"],
  },
  {
    id: "iss-spread",
    category: "산업 생태계 이슈",
    title: "중소·중견 제조 AX 확산",
    summary:
      "제조 AX 확산은 대기업뿐 아니라 중소·중견 제조기업과 산업단지 단위로 확산되어야 생태계 효율성이 높아진다.",
    relatedRegions: ["한국", "유럽", "일본"],
    relatedTechnologies: ["SaaS형 제조 AI", "데이터 수집 키트", "AI Factory"],
    linkedTopics: ["중소 제조 AX 패키지", "산단 AX 실증 허브"],
    evidenceSources: ["국내 M.AX 얼라이언스", "AI REGIO"],
  },

  // ---------- 국내 정책 기반 신규 이슈 ----------
  {
    id: "iss-data-share",
    category: "데이터·거버넌스 이슈",
    title: "제조데이터 제출·공유 체계",
    summary:
      "최근 AI 팩토리 선도사업은 R&D 과정에서 발생한 제조데이터를 수집·저장하고, 후속 AI 모델 개발과 유사 업종·공정 확산에 활용하려는 방향을 제시한다.",
    relatedRegions: ["한국"],
    relatedTechnologies: ["제조데이터", "데이터스페이스", "데이터 카탈로그", "연합학습"],
    linkedTopics: [
      "업종별 제조데이터 스페이스",
      "제조 AI 학습용 공통 데이터셋",
      "데이터·AI 모델 위임형 주제",
    ],
    evidenceSources: [
      "제조현장에 AI 입혀 산업기초체력 키운다",
      "M.AX 얼라이언스 5대 핵심과제",
    ],
  },
  {
    id: "iss-delegated-models",
    category: "데이터·거버넌스 이슈",
    title: "데이터·AI 모델 위임형 과제",
    summary:
      "정부가 R&D 과정에서 발생한 데이터와 AI 모델 사용권을 개방·위임받아 후속 AI 모델 개발과 확산에 활용하는 방식이 정책적으로 등장하고 있다.",
    relatedRegions: ["한국"],
    relatedTechnologies: ["데이터 권한관리", "AI 모델 공유", "공공 R&D 데이터 활용"],
    linkedTopics: [
      "데이터·AI 모델 위임형 주제",
      "제조 AI 모델 공유체계",
      "제조데이터 거버넌스",
    ],
    evidenceSources: ["2026 AI 팩토리 선도사업"],
  },
  {
    id: "iss-industrial-complex",
    category: "산업 생태계 이슈",
    title: "산단 M.AX·GX 통합 추진",
    summary:
      "산업단지 단위로 AX와 GX를 함께 추진하면서 엣지 AIDC, 5G 특화망, 스마트물류, 산학혁신파크 등을 결합한 지역 제조혁신 모델이 구체화되고 있다.",
    relatedRegions: ["한국"],
    relatedTechnologies: ["엣지 AI", "AIDC", "5G 특화망", "스마트물류", "산업단지 데이터"],
    linkedTopics: [
      "산단 AX 실증 허브",
      "엣지 AI·AIDC 기반 제조 AX",
      "지역 제조 AX 확산모델",
    ],
    evidenceSources: ["산업단지 M.AX·GX 지원사업 본격 추진"],
  },
  {
    id: "iss-standardization",
    category: "데이터·거버넌스 이슈",
    title: "제조 AI 표준화",
    summary:
      "자율제조, 휴머노이드, 제조데이터, AI 시스템 상호운용성 등 제조 AX 확산을 위한 표준화 수요가 커지고 있다.",
    relatedRegions: ["한국", "글로벌"],
    relatedTechnologies: ["AI 표준", "상호운용성", "자율제조", "휴머노이드", "AI 신뢰성"],
    linkedTopics: [
      "제조 AI 신뢰성·검증체계",
      "제조데이터 표준화",
      "자율제조 상호운용성",
    ],
    evidenceSources: ["AX 시대, AI 산업융합 표준으로 길을 찾다"],
  },
  {
    id: "iss-foundation-model",
    category: "기술 이슈",
    title: "제조 AI 파운데이션 모델",
    summary:
      "제조 현장에 범용적으로 적용 가능한 제조 특화 파운데이션 모델 또는 기반모델 개발 필요성이 정책적으로 제시되고 있다.",
    relatedRegions: ["한국", "미국", "중국"],
    relatedTechnologies: ["제조 LLM", "SLM", "파운데이션 모델", "도메인 지식베이스"],
    linkedTopics: [
      "제조 AI 파운데이션 모델",
      "제조 특화 LLM·SLM",
      "제조 Vertical AI 공통기반",
    ],
    evidenceSources: ["산업부, AI 팩토리 본격 추진"],
  },
  {
    id: "iss-dark-factory",
    category: "기술 이슈",
    title: "다크팩토리·풀스택 AI 팩토리",
    summary:
      "AI 팩토리가 단일 공정 AI를 넘어 공장 운영 전체의 지능화와 다크팩토리 수준의 자동화 방향으로 확장되고 있다.",
    relatedRegions: ["한국", "중국", "미국"],
    relatedTechnologies: ["AI Factory", "Agentic AI", "디지털 트윈", "로봇", "엣지 AI"],
    linkedTopics: [
      "다크팩토리 운영지능",
      "AI Factory 운영지능",
      "로봇·Physical AI 제조 적용",
    ],
    evidenceSources: [
      "M.AX 얼라이언스 5대 핵심과제",
      "AI 팩토리 본격 추진",
    ],
  },
];
