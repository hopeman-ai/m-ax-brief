import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";
import type {
  DomesticPolicySignal,
  PolicySignalEvidence,
  SignalRelation,
} from "../types";
import {
  domesticPolicySignals,
  signalRelations,
  signalShortName,
} from "../data/domesticPolicySignals";
import { SectionHeader } from "./SectionHeader";

interface DomesticPolicySignalGraphProps {
  onSeeSources: () => void;
}

const CENTRAL_ID = "ai-factory-expansion";

/** roleLabel 별 톤 — 노드와 상세 카드 배지에 동일하게 사용한다. */
const roleLabelTone: Record<string, string> = {
  "데이터 기반": "bg-cyan-50 text-cyan-700 ring-cyan-100",
  "신뢰 기반": "bg-amber-50 text-amber-700 ring-amber-100",
  "현장 실증": "bg-blue-50 text-blue-700 ring-blue-100",
  "생태계 확산": "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "고도화 방향": "bg-purple-50 text-purple-700 ring-purple-100",
};

function getRoleTone(role: string): string {
  return roleLabelTone[role] ?? "bg-slate-100 text-slate-700 ring-slate-200";
}

/**
 * 국내 정책 시그널 — 정책 시그널 5개를 직접 노출하고 시그널 간 관계를 도식·관계 리스트로 시각화.
 *
 *   [제조데이터]            [파운데이션·다크팩토리]
 *         \                /
 *           [AI 팩토리]
 *         /                \
 *   [제조 AI 표준화]    [산단 M.AX·GX]
 *
 * 사용자는 노드를 선택해 하단의 상세 카드에서 근거자료·연결 주제·키워드를 확인한다.
 */
export function DomesticPolicySignalGraph({
  onSeeSources,
}: DomesticPolicySignalGraphProps) {
  const [selectedId, setSelectedId] = useState<string>(CENTRAL_ID);

  const central = domesticPolicySignals.find((s) => s.id === CENTRAL_ID);
  const positioned = useMemo(
    () => ({
      topLeft: domesticPolicySignals.find(
        (s) => s.id === "manufacturing-data-asset"
      ),
      topRight: domesticPolicySignals.find(
        (s) => s.id === "foundation-model-dark-factory"
      ),
      bottomLeft: domesticPolicySignals.find(
        (s) => s.id === "manufacturing-ai-standardization"
      ),
      bottomRight: domesticPolicySignals.find(
        (s) => s.id === "industrial-complex-max-gx"
      ),
    }),
    []
  );
  const satellites = useMemo(
    () => domesticPolicySignals.filter((s) => s.id !== CENTRAL_ID),
    []
  );
  const selected = useMemo(
    () => domesticPolicySignals.find((s) => s.id === selectedId),
    [selectedId]
  );

  return (
    <section>
      <SectionHeader
        title="국내 정책 시그널"
        description="최근 정부 정책자료에서 확인되는 제조 AX 추진 신호를 정책 시그널 간 관계로 시각화했습니다. 각 노드를 선택하면 근거자료와 연결 주제를 확인할 수 있습니다."
      />

      {/* 모바일 — 중앙 시그널 강조 + 4 위성 2x2 grid */}
      <div className="lg:hidden mt-4 space-y-2">
        {central && (
          <SignalNodeButton
            signal={central}
            isSelected={central.id === selectedId}
            onSelect={() => setSelectedId(central.id)}
            isCentral
          />
        )}
        <div className="grid grid-cols-2 gap-2">
          {satellites.map((s) => (
            <SignalNodeButton
              key={s.id}
              signal={s}
              isSelected={s.id === selectedId}
              onSelect={() => setSelectedId(s.id)}
            />
          ))}
        </div>
      </div>

      {/* 데스크톱 — 5-노드 별 모양 배치 + SVG 연결선 */}
      <div className="hidden lg:block mt-4">
        <div className="relative bg-white border border-slate-200 rounded-2xl p-6 lg:min-h-[400px] overflow-hidden">
          {/* 연결선 — 6 relations */}
          <svg
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <g
              stroke="rgb(165 180 252)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              vectorEffect="non-scaling-stroke"
            >
              {/* center ↔ 4 corners */}
              <line x1="50" y1="50" x2="18" y2="20" />
              <line x1="50" y1="50" x2="82" y2="20" />
              <line x1="50" y1="50" x2="18" y2="80" />
              <line x1="50" y1="50" x2="82" y2="80" />
              {/* top horizontal: 제조데이터 → 파운데이션 */}
              <line x1="18" y1="20" x2="82" y2="20" />
              {/* bottom horizontal: 표준화 → 산단 */}
              <line x1="18" y1="80" x2="82" y2="80" />
            </g>
          </svg>

          {/* 노드 grid (z-index로 SVG 위) */}
          <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-stretch h-full lg:min-h-[360px]">
            <div className="flex flex-col justify-between gap-4">
              {positioned.topLeft && (
                <SignalNodeButton
                  signal={positioned.topLeft}
                  isSelected={positioned.topLeft.id === selectedId}
                  onSelect={() => setSelectedId(positioned.topLeft!.id)}
                />
              )}
              {positioned.bottomLeft && (
                <SignalNodeButton
                  signal={positioned.bottomLeft}
                  isSelected={positioned.bottomLeft.id === selectedId}
                  onSelect={() => setSelectedId(positioned.bottomLeft!.id)}
                />
              )}
            </div>
            <div className="flex items-center justify-center max-w-[260px]">
              {central && (
                <SignalNodeButton
                  signal={central}
                  isSelected={central.id === selectedId}
                  onSelect={() => setSelectedId(central.id)}
                  isCentral
                />
              )}
            </div>
            <div className="flex flex-col justify-between gap-4">
              {positioned.topRight && (
                <SignalNodeButton
                  signal={positioned.topRight}
                  isSelected={positioned.topRight.id === selectedId}
                  onSelect={() => setSelectedId(positioned.topRight!.id)}
                />
              )}
              {positioned.bottomRight && (
                <SignalNodeButton
                  signal={positioned.bottomRight}
                  isSelected={positioned.bottomRight.id === selectedId}
                  onSelect={() => setSelectedId(positioned.bottomRight!.id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 시그널 연결 — 관계 리스트 (모든 화면 공통, 모바일에서 특히 중요) */}
      <div className="mt-4">
        <SignalRelationList
          relations={signalRelations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* 선택 시그널 상세 */}
      {selected && (
        <div className="mt-4">
          <SelectedSignalDetail
            signal={selected}
            onSeeSources={onSeeSources}
          />
        </div>
      )}
    </section>
  );
}

/* ─────────────────── Signal Node ─────────────────── */

interface SignalNodeButtonProps {
  signal: DomesticPolicySignal;
  isSelected: boolean;
  onSelect: () => void;
  isCentral?: boolean;
}

function SignalNodeButton({
  signal,
  isSelected,
  onSelect,
  isCentral = false,
}: SignalNodeButtonProps) {
  const tone = getRoleTone(signal.roleLabel);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`w-full text-left rounded-xl p-3 border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
        isSelected
          ? "bg-brand-50 border-brand-400 shadow-sm"
          : isCentral
          ? "bg-white border-brand-200 ring-2 ring-brand-100/70 hover:border-brand-300"
          : "bg-white border-slate-200 hover:border-brand-200 hover:bg-brand-50/40"
      }`}
    >
      <div className="flex items-center gap-1.5 flex-wrap">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-semibold ring-1 ${tone}`}
        >
          {signal.roleLabel}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
          근거 {signal.evidenceSources.length}건
        </span>
      </div>
      <p
        className={`mt-1.5 text-sm leading-snug ${
          isSelected
            ? "font-bold text-brand-900"
            : "font-semibold text-slate-900"
        }`}
      >
        {signal.title}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {signal.keywords.slice(0, 2).map((k) => (
          <span
            key={k}
            className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] text-slate-500 bg-slate-50"
          >
            {k}
          </span>
        ))}
      </div>
    </button>
  );
}

/* ─────────────────── Relation List ─────────────────── */

interface SignalRelationListProps {
  relations: SignalRelation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function SignalRelationList({
  relations,
  selectedId,
  onSelect,
}: SignalRelationListProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <div className="flex items-baseline gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          시그널 연결
        </p>
        <span className="text-[11px] text-slate-400">
          {relations.length}개 관계
        </span>
      </div>
      <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        {relations.map((r, i) => {
          const fromName = signalShortName[r.from] ?? r.from;
          const toName = signalShortName[r.to] ?? r.to;
          const isFromSelected = r.from === selectedId;
          const isToSelected = r.to === selectedId;
          return (
            <li key={i} className="text-sm leading-relaxed">
              <div className="flex items-center gap-1 flex-wrap">
                <button
                  type="button"
                  onClick={() => onSelect(r.from)}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    isFromSelected
                      ? "bg-brand-100 text-brand-900 font-bold"
                      : "text-brand-700 hover:bg-brand-50 font-semibold"
                  }`}
                >
                  {fromName}
                </button>
                <ArrowRight size={12} className="text-slate-400 shrink-0" />
                <button
                  type="button"
                  onClick={() => onSelect(r.to)}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    isToSelected
                      ? "bg-brand-100 text-brand-900 font-bold"
                      : "text-brand-700 hover:bg-brand-50 font-semibold"
                  }`}
                >
                  {toName}
                </button>
              </div>
              <p className="text-xs text-slate-600 ml-1">{r.label}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ─────────────────── Selected Detail ─────────────────── */

interface SelectedSignalDetailProps {
  signal: DomesticPolicySignal;
  onSeeSources: () => void;
}

function SelectedSignalDetail({
  signal,
  onSeeSources,
}: SelectedSignalDetailProps) {
  const tone = getRoleTone(signal.roleLabel);
  return (
    <article className="bg-white border border-brand-200 rounded-2xl p-4 sm:p-5 ring-1 ring-brand-100/60">
      <header>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-semibold ring-1 ${tone}`}
        >
          {signal.roleLabel}
        </span>
        <h3 className="mt-2 text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {signal.title}
        </h3>
      </header>

      <p className="mt-2 text-sm text-slate-700 leading-relaxed">
        {signal.summary}
      </p>

      <div className="mt-3 rounded-lg bg-cyan-50 ring-1 ring-cyan-100 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-700">
          왜 중요한가
        </p>
        <p className="mt-1 text-sm text-cyan-900 leading-relaxed">
          {signal.whyItMatters}
        </p>
      </div>

      <div className="mt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          근거자료
        </p>
        <ul className="mt-1.5 space-y-1.5">
          {signal.evidenceSources.map((e, i) => (
            <EvidenceMiniItem key={`${e.title}-${i}`} evidence={e} />
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          연결 주제후보
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {signal.linkedTopics.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          키워드
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {signal.keywords.map((k) => (
            <span key={k} className="chip-neutral">
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onSeeSources}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors"
        >
          국내 정책자료 보기
          <ChevronRight size={12} />
        </button>
      </div>
    </article>
  );
}

/* ─────────────────── Evidence Mini Item ─────────────────── */

interface EvidenceMiniItemProps {
  evidence: PolicySignalEvidence;
}

function EvidenceMiniItem({ evidence }: EvidenceMiniItemProps) {
  return (
    <li className="flex items-start gap-1.5 text-xs leading-snug">
      <FileText size={12} className="mt-0.5 text-slate-400 shrink-0" />
      <div className="min-w-0">
        <span className="font-medium text-slate-800">{evidence.title}</span>
        <span className="ml-1 text-slate-500">
          · {evidence.publisher}
          {evidence.date ? ` · ${evidence.date}` : ""}
        </span>
      </div>
    </li>
  );
}
