import type { TopicCandidate } from "../types";

export const topicCandidates: TopicCandidate[] = [
  {
    id: "tc-vertical",
    category: "Vertical AI",
    title: "제조 Vertical AI 공통기반",
    whyItMatters:
      "제조업은 업종별 데이터와 공정 특성이 달라 범용 AI 적용만으로는 확산이 어렵다.",
    relatedTrends: [
      "도메인 특화 AI",
      "제조 LLM/SLM",
      "Agentic AI",
      "AI Factory",
    ],
    evidenceSources: [
      "AI+Manufacturing 정책자료",
      "글로벌 제조 AI 보고서",
      "국내 M.AX 얼라이언스",
    ],
    reviewPoints: [
      "공통 플랫폼과 도메인 특화 기능의 경계",
      "데이터 표준",
      "업종별 지식베이스",
    ],
    relatedAxes: ["ta-knowledge", "ta-data"],
    relatedCoreChanges: ["kc-vertical", "kc-dataspace"],
  },
  {
    id: "tc-dataspace",
    category: "데이터 인프라",
    title: "업종별 제조데이터 스페이스",
    whyItMatters:
      "제조 AI 확산에는 기업·공급망·산업 단위 데이터 활용 기반이 필요하다.",
    relatedTrends: [
      "제조 데이터스페이스",
      "데이터 권한관리",
      "연합학습",
      "데이터 카탈로그",
    ],
    evidenceSources: [
      "EU Manufacturing Data Spaces",
      "국내 제조데이터 정책자료",
    ],
    reviewPoints: ["데이터 소유권", "협력사 데이터 활용", "표준화", "보안"],
    relatedAxes: ["ta-data"],
    relatedCoreChanges: ["kc-dataspace", "kc-scope"],
  },
  {
    id: "tc-aifactory",
    category: "AI Factory",
    title: "AI Factory 운영지능",
    whyItMatters:
      "생산계획, 품질, 설비, 에너지, 물류를 통합적으로 분석·지원하는 제조 운영 AI가 필요하다.",
    relatedTrends: [
      "Agentic AI",
      "디지털 트윈",
      "MES/ERP 연동",
      "AI Factory",
    ],
    evidenceSources: ["Manufacturing USA", "국내 AI 팩토리 정책자료"],
    reviewPoints: ["자동화 범위", "사람 승인 절차", "현장 검증", "시스템 연동"],
    relatedAxes: ["ta-operations"],
    relatedCoreChanges: ["kc-scope", "kc-trust"],
  },
  {
    id: "tc-physical",
    category: "로봇·Physical AI",
    title: "로봇·Physical AI 제조 적용",
    whyItMatters:
      "제조 AX가 실제 생산성 향상으로 이어지려면 로봇, 설비, 센서와 연결되어야 한다.",
    relatedTrends: [
      "산업로봇",
      "협동로봇",
      "비전 AI",
      "엣지 AI",
      "안전관리",
    ],
    evidenceSources: ["METI 로봇산업 정책자료", "World Robot Summit"],
    reviewPoints: ["작업자 안전", "제어권한", "긴급정지", "OT 보안"],
    relatedAxes: ["ta-physical", "ta-trust"],
    relatedCoreChanges: ["kc-physical", "kc-trust"],
  },
  {
    id: "tc-materials",
    category: "소재 AI",
    title: "소재 AI 기반 R&D 효율화",
    whyItMatters:
      "소재 AI는 반도체, 배터리, 바이오, 철강 등 전략 제조 분야의 R&D 효율성과 연결된다.",
    relatedTrends: [
      "물성 예측",
      "신소재 탐색",
      "실험계획 AI",
      "문헌·특허 분석",
    ],
    evidenceSources: ["AI+Manufacturing 정책자료", "소재 AI 기술보고서"],
    reviewPoints: ["IP 보호", "실험 재현성", "데이터 표준화", "안전성 검증"],
    relatedAxes: ["ta-knowledge", "ta-data"],
    relatedCoreChanges: ["kc-vertical", "kc-dataspace"],
  },
  {
    id: "tc-trust",
    category: "신뢰성·검증",
    title: "제조 AI 신뢰성·검증체계",
    whyItMatters:
      "제조 AI는 품질, 안전, 설비, 책임성과 연결되므로 도입 전 신뢰성 검증이 필요하다.",
    relatedTrends: ["AI RMF", "ISO/IEC 42001", "EU AI Act", "Human-in-the-loop"],
    evidenceSources: ["NIST AI RMF", "ISO/IEC 42001", "EU AI Act"],
    reviewPoints: ["평가셋", "설명가능성", "현장 PoC", "승인 절차"],
    relatedAxes: ["ta-trust"],
    relatedCoreChanges: ["kc-trust"],
  },
  {
    id: "tc-sme",
    category: "중소·중견 제조 확산",
    title: "중소·중견 제조 AX 확산모델",
    whyItMatters:
      "산업혁신 생태계 효율성 제고를 위해서는 대기업 중심이 아니라 중소·중견 제조기업까지 AX 확산이 필요하다.",
    relatedTrends: [
      "산단 AX",
      "SaaS형 제조 AI",
      "데이터 수집 키트",
      "AI 도입 패키지",
    ],
    evidenceSources: [
      "국내 M.AX 얼라이언스",
      "산업단지 AX 정책자료",
      "AI REGIO",
    ],
    reviewPoints: ["도입비용", "데이터 수집", "현장 인력", "지역 거점"],
    relatedAxes: ["ta-data", "ta-trust"],
    relatedCoreChanges: ["kc-scope", "kc-dataspace"],
  },

  // ---------- 국내 정책 기반 신규 주제 후보 ----------
  {
    id: "tc-delegated-models",
    category: "데이터 인프라",
    title: "데이터·AI 모델 위임형 제조 AX",
    whyItMatters:
      "R&D 과제에서 생성된 제조데이터와 AI 모델 사용권을 후속 모델 개발과 산업 확산에 활용하면 정부지원 사업의 재사용성과 파급효과를 높일 수 있다.",
    relatedTrends: [
      "제조데이터 제출 동의서",
      "공공 R&D 데이터 활용",
      "AI 모델 공유",
      "데이터 거버넌스",
    ],
    evidenceSources: ["2026 AI 팩토리 선도사업"],
    reviewPoints: [
      "데이터와 모델 사용권 범위",
      "기업 영업비밀 보호",
      "후속 AI 모델 개발 활용 조건",
      "유사 업종·공정 확산 방식",
      "공공성과 기업 인센티브 균형",
    ],
    relatedAxes: ["ta-data"],
    relatedCoreChanges: ["kc-dataspace"],
  },
  {
    id: "tc-industrial-hub",
    category: "중소·중견 제조 확산",
    title: "산단 AX 실증 허브",
    whyItMatters:
      "산업단지 단위로 AX 인프라와 실증사업을 결합하면 중소·중견 제조기업이 개별적으로 도입하기 어려운 AI 인프라와 데이터 활용 기반을 공동으로 활용할 수 있다.",
    relatedTrends: [
      "산단 M.AX·GX",
      "엣지 AIDC",
      "5G 특화망",
      "스마트물류",
      "산학혁신파크",
    ],
    evidenceSources: ["산업단지 M.AX·GX 지원사업 본격 추진"],
    reviewPoints: [
      "산단 단위 공동 인프라",
      "기업별 데이터 분리와 공유 범위",
      "5G 특화망·엣지 AIDC 활용 모델",
      "스마트물류와 생산공정 연계",
      "지역 대학·연구기관 역할",
    ],
    relatedAxes: ["ta-data", "ta-physical"],
    relatedCoreChanges: ["kc-scope", "kc-physical"],
  },
  {
    id: "tc-foundation-model",
    category: "Vertical AI",
    title: "제조 AI 파운데이션 모델",
    whyItMatters:
      "작업표준서, 설비 매뉴얼, 품질문서, 공정데이터를 이해하는 제조 특화 기반모델은 업종별 AI 서비스 확산의 공통 기반이 될 수 있다.",
    relatedTrends: [
      "제조 LLM·SLM",
      "도메인 지식베이스",
      "AI Factory",
      "부문별 AI 모델",
    ],
    evidenceSources: [
      "산업부, AI 팩토리 본격 추진",
      "M.AX 얼라이언스 5대 핵심과제",
    ],
    reviewPoints: [
      "범용 모델과 제조 특화 모델의 역할 구분",
      "업종별 데이터 확보",
      "보안 문서와 설비 데이터 접근권한",
      "모델 검증과 현장 적용성",
      "중소기업 활용 방식",
    ],
    relatedAxes: ["ta-knowledge"],
    relatedCoreChanges: ["kc-vertical"],
  },
  {
    id: "tc-edge-on-device",
    category: "로봇·Physical AI",
    title: "온디바이스·엣지 제조 AI",
    whyItMatters:
      "제조 현장은 지연시간, 보안, 네트워크 안정성 이슈가 있어 로봇, 카메라, 설비, 센서 가까이에서 AI를 실행하는 온디바이스·엣지 AI가 중요하다.",
    relatedTrends: [
      "온디바이스 AI 반도체",
      "엣지 AIDC",
      "로봇·Physical AI",
      "실시간 품질검사",
    ],
    evidenceSources: [
      "M.AX 얼라이언스 5대 핵심과제",
      "산업단지 M.AX·GX 지원사업",
    ],
    reviewPoints: [
      "현장 장비와 모델 호환성",
      "경량화 모델 성능",
      "보안과 데이터 반출 최소화",
      "엣지 인프라 운영비용",
      "로봇·검사 장비 연계",
    ],
    relatedAxes: ["ta-physical"],
    relatedCoreChanges: ["kc-physical"],
  },
  {
    id: "tc-standards",
    category: "신뢰성·검증",
    title: "제조 AI 표준·상호운용성",
    whyItMatters:
      "제조 AX가 확산되려면 제조데이터, AI 시스템, 설비·로봇·MES·ERP 간 연계와 상호운용성을 확보해야 한다.",
    relatedTrends: [
      "AI 산업융합 표준",
      "자율제조 표준",
      "휴머노이드 표준",
      "AI 신뢰성",
    ],
    evidenceSources: ["AX 시대, AI 산업융합 표준으로 길을 찾다"],
    reviewPoints: [
      "제조데이터 표준",
      "AI 시스템 간 연동",
      "설비·로봇 인터페이스",
      "자율제조 안전 기준",
      "신뢰성 검증 절차",
    ],
    relatedAxes: ["ta-trust"],
    relatedCoreChanges: ["kc-trust"],
  },
];
