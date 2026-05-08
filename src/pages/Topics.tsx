import { Fragment } from "react";
import type { TopicCandidate, TopicCategory } from "../types";
import { topicCandidates } from "../data/topicCandidates";
import { topicCategoryIcon } from "../lib/categoryIcons";
import { SectionHeader } from "../components/SectionHeader";
import { TopicCandidateCard } from "../components/TopicCandidateCard";
import { CategoryDivider } from "../components/CategoryDivider";

// 같은 카테고리끼리 모여 한눈에 보이도록 그룹·정렬한다.
const categoryOrder: TopicCategory[] = [
  "데이터 인프라",
  "Vertical AI",
  "AI Factory",
  "로봇·Physical AI",
  "소재 AI",
  "신뢰성·검증",
  "중소·중견 제조 확산",
];

const grouped: Record<TopicCategory, TopicCandidate[]> = {
  "데이터 인프라": [],
  "Vertical AI": [],
  "AI Factory": [],
  "로봇·Physical AI": [],
  "소재 AI": [],
  "신뢰성·검증": [],
  "중소·중견 제조 확산": [],
};
for (const t of topicCandidates) {
  grouped[t.category].push(t);
}

export function Topics() {
  return (
    <section>
      <SectionHeader
        title="주제후보"
        description="신뢰자료에서 도출된 검토 가능한 M.AX·Vertical AI 주제 후보를 카테고리별로 묶어 정리합니다. 추천·우선순위·선정 표현은 사용하지 않습니다."
        action={
          <span className="count-stat">
            주제 후보 {topicCandidates.length}개
          </span>
        }
      />
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {categoryOrder.map((cat) => {
          const items = grouped[cat];
          if (items.length === 0) return null;
          return (
            <Fragment key={cat}>
              <CategoryDivider
                icon={topicCategoryIcon[cat]}
                label={cat}
                count={items.length}
                tone="accent"
              />
              {items.map((t) => (
                <TopicCandidateCard key={t.id} topic={t} />
              ))}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
