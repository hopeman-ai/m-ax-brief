import type { DiscoveryPoint } from "../types";

export const discoveryPoints: DiscoveryPoint[] = [
  {
    id: "dp-data-infra",
    title: "제조 데이터 인프라",
    whyItMatters:
      "제조 AI 확산에는 기업·공급망·산업 단위 데이터 활용 기반이 필요",
    linkedIssueIds: ["iss-dataspace", "iss-infra"],
    linkedSourceId: "src-mds",
    linkedTopicId: "tc-dataspace",
  },
  {
    id: "dp-vertical",
    title: "Vertical AI 공통기반",
    whyItMatters: "업종·공정·장비별 특성이 달라 도메인 특화 AI 접근 필요",
    linkedIssueIds: ["iss-vertical", "iss-infra"],
    linkedSourceId: "src-ai-mfg",
    linkedTopicId: "tc-vertical",
  },
  {
    id: "dp-aifactory",
    title: "AI Factory 운영지능",
    whyItMatters:
      "생산·품질·설비·에너지·물류를 통합 지원하는 제조 운영 AI 필요",
    linkedIssueIds: ["iss-vertical", "iss-spread"],
    linkedSourceId: "src-mfg-usa",
    linkedTopicId: "tc-aifactory",
  },
  {
    id: "dp-physical",
    title: "로봇·Physical AI",
    whyItMatters:
      "실제 생산성 향상을 위해 로봇·설비·센서와 AI의 연결 필요",
    linkedIssueIds: ["iss-physical"],
    linkedSourceId: "src-meti-robot",
    linkedTopicId: "tc-physical",
  },
  {
    id: "dp-materials",
    title: "소재 AI",
    whyItMatters:
      "반도체, 배터리, 바이오, 철강 등 전략 제조의 R&D 효율성과 연결",
    linkedIssueIds: ["iss-vertical"],
    linkedSourceId: "src-ai-mfg",
    linkedTopicId: "tc-materials",
  },
  {
    id: "dp-trust",
    title: "제조 AI 신뢰성·검증",
    whyItMatters: "품질·안전·책임성 리스크를 줄이기 위한 검증체계 필요",
    linkedIssueIds: ["iss-trust"],
    linkedSourceId: "src-nist-rmf",
    linkedTopicId: "tc-trust",
  },
];
