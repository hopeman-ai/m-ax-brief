import { Fragment } from "react";
import type { Issue, IssueCategory } from "../types";
import { issues } from "../data/issues";
import { issueCategoryIcon } from "../lib/categoryIcons";
import { SectionHeader } from "../components/SectionHeader";
import { IssueCard } from "../components/IssueCard";
import { CategoryDivider } from "../components/CategoryDivider";

// 같은 카테고리끼리 모여 한눈에 보이도록 그룹·정렬한다.
// 카테고리별 카드 수 밸런스를 고려해 항목이 많은 기술 이슈를 먼저 노출.
const categoryOrder: IssueCategory[] = [
  "기술 이슈",
  "정책 이슈",
  "데이터·거버넌스 이슈",
  "산업 생태계 이슈",
  "국가·권역별 이슈",
];

const grouped: Record<IssueCategory, Issue[]> = {
  "기술 이슈": [],
  "정책 이슈": [],
  "데이터·거버넌스 이슈": [],
  "산업 생태계 이슈": [],
  "국가·권역별 이슈": [],
};
for (const i of issues) {
  grouped[i.category].push(i);
}

export function Issues() {
  return (
    <section>
      <SectionHeader
        title="이슈맵"
        description="정책·기술·데이터·거버넌스·생태계 관점의 핵심 이슈를 카테고리별로 묶어 정리합니다."
        action={
          <span className="count-stat">핵심 이슈 {issues.length}개</span>
        }
      />
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {categoryOrder.map((cat) => {
          const items = grouped[cat];
          if (items.length === 0) return null;
          return (
            <Fragment key={cat}>
              <CategoryDivider
                icon={issueCategoryIcon[cat]}
                label={cat}
                count={items.length}
                tone="brand"
              />
              {items.map((i) => (
                <IssueCard key={i.id} issue={i} />
              ))}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
