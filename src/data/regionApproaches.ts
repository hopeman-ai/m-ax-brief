import type { RegionApproach } from "../types";

export const regionApproaches: RegionApproach[] = [
  {
    id: "ra-us",
    region: "미국",
    approach: "AI 인프라·첨단제조·공급망",
    implication: "AI 인프라와 첨단제조 경쟁력을 함께 봐야 한다는 시사점",
    linkedSourceIds: ["src-ai-action", "src-mfg-usa"],
    detail:
      "미국은 AI Action Plan과 Manufacturing USA 전략을 통해 AI 인프라(데이터센터·반도체·컴퓨팅)와 첨단제조 역량을 결합하고, 공급망 회복력 강화와 리쇼어링을 함께 추진합니다. 민간 빅테크가 AI 인프라 투자를 주도하고 정부가 첨단제조 네트워크를 지원하는 구조이기 때문에, 제조 AX는 AI 인프라 투자·반도체 공급망·민간 R&D 협력의 교차점에서 형성되고 있습니다.",
    policyHighlights: [
      "AI 리더십 확보",
      "첨단제조 네트워크",
      "반도체 자립",
      "공급망 회복력",
    ],
    techHighlights: [
      "AI 인프라",
      "디지털 트윈",
      "자동화·로봇",
      "첨단소재",
    ],
  },
  {
    id: "ra-jp",
    region: "일본",
    approach: "로봇·정밀제조·현장 자동화",
    implication: "로봇·Physical AI를 제조 AX 실행 계층으로 보는 근거",
    linkedSourceIds: ["src-meti-robot"],
    detail:
      "일본은 METI 로봇산업 정책을 중심으로 산업로봇·협동로봇·서비스로봇 산업의 경쟁력을 유지하면서, 노동력 부족과 지역·중소제조 자동화 문제 해결에 AI를 결합합니다. 정밀제조 강점을 바탕으로 비전 검사·예지보전·작업자 안전 같은 현장 자동화 영역에서 제조 AI 적용이 두드러지며, World Robot Summit 등으로 로봇·Physical AI 실증을 지속적으로 축적해 왔습니다.",
    policyHighlights: [
      "로봇산업 경쟁력",
      "노동력 부족 대응",
      "정밀제조 유지",
      "현장 안전 표준",
    ],
    techHighlights: [
      "산업·협동로봇",
      "비전 AI 검사",
      "예지보전",
      "현장 자동화",
    ],
  },
  {
    id: "ra-cn",
    region: "중국",
    approach: "국가주도 AI+제조·스마트공장",
    implication: "산업별·공정별 AI 적용과 산업 대모델 접근 시사",
    linkedSourceIds: ["src-ai-mfg"],
    detail:
      "중국은 'AI+제조'와 신형공업화 정책을 결합해 산업별·공정별 AI 적용 가이드를 정비하고, 산업 대모델(industrial foundation models)과 스마트공장 확산을 국가 차원에서 추진합니다. 반도체·소재·로봇 등 핵심 부품 자립을 함께 추진하면서, 대규모 제조 기반과 빠른 정책 집행 속도를 활용해 업종별 AI 모델·다크팩토리·소재 AI 같은 영역에서 급속히 사례를 늘리고 있습니다.",
    policyHighlights: [
      "국가주도 AI+제조",
      "신형공업화",
      "산업 대모델",
      "기술 자립",
    ],
    techHighlights: [
      "산업 대모델",
      "스마트공장",
      "다크팩토리",
      "소재 AI",
    ],
  },
  {
    id: "ra-eu",
    region: "유럽",
    approach: "데이터스페이스·신뢰성·Industry 5.0",
    implication: "제조 AX 확산을 위한 데이터 인프라와 신뢰성 관점 제공",
    linkedSourceIds: ["src-mds", "src-iso-42001"],
    detail:
      "유럽은 Industry 5.0과 Manufacturing Data Spaces 흐름을 통해 인간중심 제조·지속가능성·회복력 가치를 제조 AI에 통합하고, ISO/IEC 42001과 EU AI Act로 AI 신뢰성·거버넌스의 제도적 기준을 마련합니다. 개별 기업이 아닌 산업·공급망 단위의 데이터 공유 기반(Catena-X 등)을 우선 구축하며, 신뢰성·표준·인증을 제조 AX 확산의 전제 조건으로 다루는 점이 특징입니다.",
    policyHighlights: [
      "Industry 5.0",
      "데이터스페이스",
      "AI 신뢰성·표준",
      "지속가능 제조",
    ],
    techHighlights: [
      "Manufacturing-X / Catena-X",
      "디지털 트윈",
      "AI 거버넌스",
      "시맨틱 데이터",
    ],
  },
];
