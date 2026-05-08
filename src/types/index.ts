export type TabId = "brief" | "issues" | "topics" | "sources";

export type Region = "미국" | "일본" | "중국" | "유럽";

// ---------- 브리프 화면 ----------

export interface KeyChange {
  id: string;
  order: number;
  title: string;
  /** 카드 상단 1문장 요약 */
  oneLine: string;
  /** 산업혁신 생태계 효율성 제고 관점에서 왜 중요한가 */
  whyItMatters: string;
  /** 근거가 되는 정책·기술자료명 (자유 텍스트) */
  evidenceSources: string[];
  /** evidenceSources 와 매칭되는 근거자료 카탈로그 ID (선택) */
  evidenceSourceIds?: string[];
  /** 실제 정책·기술 흐름에서 확인되는 관찰 포인트 */
  observationPoints: string[];
  /** 연결되는 주제 후보 */
  linkedTopics: string[];
  /** 카드 하단 키워드 chip */
  keywords: string[];
  /** 확장 영역에 표시할 추가 설명 */
  detail?: string;
}

// ---------- 국내 정책 시그널 (Signal Graph) ----------

export interface PolicySignalEvidence {
  title: string;
  publisher: string;
  date?: string;
}

export interface DomesticPolicySignal {
  id: string;
  title: string;
  /** 시그널의 역할(분류) 라벨 — 큰 그룹 카드 대신 노드별 작은 배지로 표시 */
  roleLabel: string;
  summary: string;
  whyItMatters: string;
  evidenceSources: PolicySignalEvidence[];
  linkedTopics: string[];
  keywords: string[];
}

/** 시그널 간 방향성 있는 관계. from/to 는 DomesticPolicySignal.id. */
export interface SignalRelation {
  from: string;
  to: string;
  label: string;
}

export interface RegionApproach {
  id: string;
  region: Region;
  approach: string;
  implication: string;
  linkedSourceIds: string[];
  /** 펼치기 영역에 표시할 자세한 요약 (2~4 문장) */
  detail?: string;
  /** 정책 포인트 키워드 */
  policyHighlights?: string[];
  /** 기술 포인트 키워드 */
  techHighlights?: string[];
}

export interface TechAxis {
  id: string;
  order: number;
  title: string;
  shortTitle?: string;
  /** 카드 상단 1문장 요약 */
  oneLine: string;
  /** 이 프레임워크의 명확한 정의 */
  definition: string;
  /** 제조 AX에서 담당하는 역할 */
  role: string;
  /** 포함 기술 */
  components: string[];
  /** 활용 장면 */
  useCases: string[];
  /** 연결되는 주제 후보 */
  linkedTopics: string[];
  /** 근거자료·정책자료와 연결되는 키워드 */
  evidenceKeywords: string[];
}

export interface DiscoveryPoint {
  id: string;
  title: string;
  whyItMatters: string;
  linkedIssueIds: string[];
  linkedSourceId: string;
  linkedTopicId: string;
}

// ---------- 이슈맵 ----------

export type IssueCategory =
  | "정책 이슈"
  | "기술 이슈"
  | "데이터·거버넌스 이슈"
  | "산업 생태계 이슈"
  | "국가·권역별 이슈";

export interface Issue {
  id: string;
  category: IssueCategory;
  title: string;
  summary: string;
  relatedRegions: string[];
  relatedTechnologies: string[];
  linkedTopics: string[];
  evidenceSources: string[];
}

// ---------- 주제후보 ----------

export type TopicCategory =
  | "데이터 인프라"
  | "Vertical AI"
  | "AI Factory"
  | "로봇·Physical AI"
  | "소재 AI"
  | "신뢰성·검증"
  | "중소·중견 제조 확산";

export interface TopicCandidate {
  id: string;
  category: TopicCategory;
  title: string;
  whyItMatters: string;
  relatedTrends: string[];
  evidenceSources: string[];
  reviewPoints: string[];
  /** 연결되는 기술 프레임워크 ID 목록 (예: "ta-knowledge", "ta-data") */
  relatedAxes?: string[];
  /** 연결되는 핵심 변화 ID 목록 (예: "kc-scope", "kc-trust") */
  relatedCoreChanges?: string[];
}

// ---------- 근거자료 ----------

export type SourceType =
  | "정부 정책자료"
  | "국제기구·표준자료"
  | "산업·기술 보고서"
  | "국내 정책자료"
  | "연구·기술자료";

export interface EvidenceSource {
  id: string;
  type: SourceType;
  title: string;
  region: string;
  publisher: string; // 발행 출처 (예: NIST, METI, 산업통상부)
  date: string; // 발행 시점 (YYYY 또는 YYYY-MM 또는 YYYY-MM-DD)
  summary: string;
  relevance: string;
  linkedIssues: string[];
  linkedTopics: string[];
  url?: string;
}
