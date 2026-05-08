import { useState } from "react";
import { ChevronDown, FileText, Cpu, Sparkles } from "lucide-react";
import type { TopicCandidate } from "../types";
import { AiEnrichButton } from "./AiEnrichButton";
import { EnrichedContentPanel } from "./EnrichedContentPanel";
import { SourceMeta } from "./SourceMeta";
import { topicCategoryIcon } from "../lib/categoryIcons";
import { techAxesById } from "../data/techAxes";
import { keyChangesById } from "../data/keyChanges";
import type { EnrichResponse } from "../lib/enrich";

interface TopicCandidateCardProps {
  topic: TopicCandidate;
}

export function TopicCandidateCard({ topic }: TopicCandidateCardProps) {
  const [open, setOpen] = useState(false);
  const [enriched, setEnriched] = useState<EnrichResponse | null>(null);
  const CategoryIcon = topicCategoryIcon[topic.category];

  const visibleReviewPoints = topic.reviewPoints.slice(0, 2);
  const hiddenReviewPoints = topic.reviewPoints.slice(2);

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700">
          <CategoryIcon size={14} />
        </span>
        <span className="chip-accent">{topic.category}</span>
      </div>

      {topic.relatedAxes && topic.relatedAxes.length > 0 && (
        <div className="mt-1.5 flex items-center gap-1 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            <Cpu size={11} className="opacity-70" />
            기술 프레임워크
          </span>
          {topic.relatedAxes.map((axisId) => {
            const axis = techAxesById[axisId];
            if (!axis) return null;
            return (
              <span
                key={axisId}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-xs font-medium ring-1 ring-cyan-100"
              >
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-cyan-600 text-white text-[10px] font-bold leading-none">
                  {axis.order}
                </span>
                {axis.shortTitle ?? axis.title}
              </span>
            );
          })}
        </div>
      )}

      {topic.relatedCoreChanges && topic.relatedCoreChanges.length > 0 && (
        <div className="mt-1.5 flex items-center gap-1 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            <Sparkles size={11} className="opacity-70" />
            핵심 변화
          </span>
          {topic.relatedCoreChanges.map((id) => {
            const change = keyChangesById[id];
            if (!change) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-medium ring-1 ring-brand-100"
              >
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-brand-700 text-white text-[10px] font-bold leading-none">
                  {change.order}
                </span>
                {change.title}
              </span>
            );
          })}
        </div>
      )}
      <h3 className="mt-2 text-base font-bold text-slate-900 leading-snug">
        {topic.title}
      </h3>

      <div className="mt-2 rounded-lg bg-cyan-50 ring-1 ring-cyan-100 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-700">
          왜 중요한가
        </p>
        <p className="mt-1 text-sm text-cyan-900 leading-relaxed">
          {topic.whyItMatters}
        </p>
      </div>

      <div className="mt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          관련 흐름
        </p>
        <div className="mt-1 flex flex-wrap gap-1">
          {topic.relatedTrends.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          검토 포인트
        </p>
        <ul className="mt-1.5 space-y-1">
          {visibleReviewPoints.map((p) => (
            <li
              key={p}
              className="text-sm text-slate-700 leading-relaxed flex gap-2"
            >
              <span className="mt-2 inline-block w-1 h-1 rounded-full bg-brand-500 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
          {open &&
            hiddenReviewPoints.map((p) => (
              <li
                key={p}
                className="text-sm text-slate-700 leading-relaxed flex gap-2"
              >
                <span className="mt-2 inline-block w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
        </ul>
        {hiddenReviewPoints.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-1.5 inline-flex items-center gap-1 text-xs text-brand-700 font-semibold"
          >
            {open ? "간단히" : `+${hiddenReviewPoints.length}개 더보기`}
            <ChevronDown
              size={12}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      <div className="mt-3 rounded-lg bg-slate-50 ring-1 ring-slate-200 p-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
          근거자료
        </p>
        <ul className="mt-1.5 space-y-1">
          {topic.evidenceSources.map((s) => (
            <li key={s} className="flex items-start gap-1.5">
              <FileText
                size={12}
                className="mt-0.5 text-slate-400 shrink-0"
              />
              <SourceMeta title={s} unknownLabel="출처·연도 추가 예정" />
            </li>
          ))}
        </ul>
      </div>

      {enriched && (
        <div className="mt-3">
          <EnrichedContentPanel
            result={enriched}
            onClose={() => setEnriched(null)}
          />
        </div>
      )}

      <div className="mt-auto pt-3 flex items-center justify-between gap-3 flex-wrap">
        <span className="text-[11px] text-slate-400">검토 가능한 주제 후보</span>
        <AiEnrichButton
          mode="topic_draft"
          topic={topic.title}
          baseContent={topic}
          onResult={setEnriched}
          label="AI로 초안 보강"
        />
      </div>
    </article>
  );
}
