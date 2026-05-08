import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { techAxes } from "../data/techAxes";
import { SectionHeader } from "./SectionHeader";
import { TechAxisCard } from "./TechAxisCard";

/**
 * 기술 프레임워크 섹션 — 5개 프레임워크를 다음 흐름으로 보여준다.
 *   지식 이해 → 운영 판단 → 현장 실행 → 데이터·검증 기반 → 신뢰성 관리
 *
 * 구성:
 *   1) SectionHeader (목적 설명)
 *   2) FlowStepper (5개 프레임워크 한눈 흐름)
 *   3) 5장 카드 grid
 */
export function TechAxesSection() {
  return (
    <section>
      <SectionHeader
        title="기술 프레임워크"
        description="제조 AX 기술은 단순 개별 기술 목록이 아니라, 지식 이해 → 운영 지원 → 현장 실행 → 데이터 기반 → 신뢰성 관리의 흐름으로 볼 수 있습니다."
      />
      <FlowStepper />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {techAxes.map((a) => (
          <TechAxisCard key={a.id} axis={a} />
        ))}
      </div>
    </section>
  );
}

function FlowStepper() {
  return (
    <div className="mt-3 rounded-2xl bg-gradient-to-r from-brand-50 via-white to-cyan-50 ring-1 ring-brand-100 p-3 sm:p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">
        제조 AX 기술 흐름
      </p>
      <div className="mt-2 -mx-1 px-1 overflow-x-auto scrollbar-none">
        <ol className="flex items-center gap-1.5 min-w-max">
          {techAxes.map((a, i) => (
            <Fragment key={a.id}>
              {i > 0 && (
                <ChevronRight
                  size={14}
                  className="text-slate-400 shrink-0"
                  aria-hidden
                />
              )}
              <li className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white ring-1 ring-brand-100 shadow-sm shrink-0">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-700 text-white text-[12px] font-bold">
                  {a.order}
                </span>
                <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                  {a.shortTitle ?? a.title}
                </span>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </div>
  );
}
