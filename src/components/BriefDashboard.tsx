import { ChevronRight } from "lucide-react";
import type { TabId } from "../types";
import { regionApproaches } from "../data/regionApproaches";
import { discoveryPoints } from "../data/discoveryPoints";
import { issues } from "../data/issues";
import { evidenceSources } from "../data/evidenceSources";
import { SectionHeader } from "./SectionHeader";
import { KeyChangesSection } from "./KeyChangesSection";
import { RegionApproachCard } from "./RegionApproachCard";
import { TechAxesSection } from "./TechAxesSection";
import { DiscoveryPointCard } from "./DiscoveryPointCard";
import { DomesticPolicySignalGraph } from "./DomesticPolicySignalGraph";
import { BriefStatRow } from "./BriefStatRow";

interface BriefDashboardProps {
  onNavigate: (tab: TabId) => void;
}

const sourceTypes = [
  "정부 정책자료",
  "국제기구·표준자료",
  "산업·기술 보고서",
  "국내 정책자료",
  "연구·기술자료",
];

export function BriefDashboard({ onNavigate }: BriefDashboardProps) {
  const issuesById = Object.fromEntries(issues.map((i) => [i.id, i]));
  const sourcesById = Object.fromEntries(
    evidenceSources.map((s) => [s.id, s])
  );

  return (
    <>
      {/* Intro */}
      <section className="rounded-2xl bg-gradient-to-br from-brand-50 via-white to-cyan-50 ring-1 ring-brand-100 p-5 sm:p-6">
        <h1 className="text-base sm:text-lg font-bold text-brand-900 leading-snug">
          산업혁신 생태계 효율성 제고를 위한 M.AX · Vertical AI 주제 발굴 브리프
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
          신뢰할 만한 글로벌 정책·기술자료를 기반으로 제조 AX와 Vertical AI의
          핵심 변화, 주요국 접근, 기술 프레임워크, 주제 발굴 포인트를 한눈에 정리합니다.
        </p>
      </section>

      {/* 브리프 범위 stat — 첫 화면 즉각 인지 */}
      <BriefStatRow onNavigate={onNavigate} />

      {/* 핵심 변화 5개 — 근거 기반 인사이트 카드 */}
      <KeyChangesSection onNavigate={onNavigate} />

      {/* 국가·권역별 접근 요약 */}
      <section>
        <SectionHeader
          title="국가·권역별 접근"
          description="미·일·중·유럽 4개 권역 핵심 접근과 시사점"
          action={
            <button
              type="button"
              onClick={() => onNavigate("sources")}
              className="text-xs sm:text-sm text-brand-700 font-semibold inline-flex items-center whitespace-nowrap"
            >
              근거자료 보기
              <ChevronRight size={14} />
            </button>
          }
        />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regionApproaches.map((r) => (
            <RegionApproachCard
              key={r.id}
              approach={r}
              sourcesById={sourcesById}
            />
          ))}
        </div>
      </section>

      {/* 기술 프레임워크 5 — FlowStepper + 카드 grid 통합 */}
      <TechAxesSection />

      {/* 국내 정책 시그널 — 5 노드 Policy Signal Graph */}
      <DomesticPolicySignalGraph
        onSeeSources={() => onNavigate("sources")}
      />

      {/* 주제 발굴 포인트 6 */}
      <section>
        <SectionHeader
          title="주제 발굴 포인트"
          description="이슈와 근거자료에 연결되는 6가지 검토 포인트"
          action={
            <button
              type="button"
              onClick={() => onNavigate("topics")}
              className="text-xs sm:text-sm text-brand-700 font-semibold inline-flex items-center whitespace-nowrap"
            >
              주제후보 전체 보기
              <ChevronRight size={14} />
            </button>
          }
        />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {discoveryPoints.map((p) => (
            <DiscoveryPointCard
              key={p.id}
              point={p}
              issuesById={issuesById}
              sourcesById={sourcesById}
              onSeeTopic={() => onNavigate("topics")}
            />
          ))}
        </div>
      </section>

      {/* 신뢰자료 기반 표시 */}
      <section className="rounded-xl bg-slate-100 p-4">
        <p className="text-xs font-semibold text-slate-700">
          이 브리프는 다음 유형의 자료를 기반으로 정리됩니다
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {sourceTypes.map((t) => (
            <span key={t} className="chip-neutral">
              {t}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onNavigate("sources")}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-700"
        >
          근거자료 자세히 보기
          <ChevronRight size={12} />
        </button>
      </section>
    </>
  );
}
