import { ChevronRight, Info } from "lucide-react";
import type { TabId } from "../types";
import { keyChanges } from "../data/keyChanges";
import { SectionHeader } from "./SectionHeader";
import { KeyChangeCard } from "./KeyChangeCard";

interface KeyChangesSectionProps {
  onNavigate: (tab: TabId) => void;
}

const evidenceTypes = [
  "글로벌 정책자료",
  "국내 제조 AX 정책자료",
  "표준·거버넌스 자료",
  "산업·기술 보고서",
];

/**
 * 핵심 변화 섹션 — 5가지 변화를 근거 기반 인사이트 카드로 보여준다.
 * 구성:
 *   1) SectionHeader (목적 설명)
 *   2) EvidenceBaseNote (근거 자료 유형 안내 + 근거자료 탭 이동)
 *   3) 5장 카드 grid
 */
export function KeyChangesSection({ onNavigate }: KeyChangesSectionProps) {
  return (
    <section>
      <SectionHeader
        title="핵심 변화"
        description="제조 AX와 Vertical AI를 둘러싼 정책·기술 흐름을 5가지 변화로 정리했습니다. 각 변화는 신뢰자료와 연결되는 주제 후보를 함께 표시합니다."
      />

      {/* 근거 기반 정리 안내 */}
      <div className="mt-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 p-3 sm:p-4">
        <div className="flex items-start gap-2">
          <Info size={14} className="mt-0.5 text-slate-500 shrink-0" />
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            이 변화들은 다음 유형의 자료를 기반으로 정리되었습니다.
          </p>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {evidenceTypes.map((t) => (
            <span key={t} className="chip-neutral">
              {t}
            </span>
          ))}
          <button
            type="button"
            onClick={() => onNavigate("sources")}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-700 whitespace-nowrap hover:text-brand-900 transition-colors"
          >
            근거자료 보기
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* 카드 grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {keyChanges.map((c) => (
          <KeyChangeCard key={c.id} change={c} />
        ))}
      </div>
    </section>
  );
}
