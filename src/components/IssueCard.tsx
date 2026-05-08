import { useState } from "react";
import { FileText } from "lucide-react";
import type { Issue } from "../types";
import { AiEnrichButton } from "./AiEnrichButton";
import { EnrichedContentPanel } from "./EnrichedContentPanel";
import { SourceMeta } from "./SourceMeta";
import { issueCategoryIcon } from "../lib/categoryIcons";
import type { EnrichResponse } from "../lib/enrich";

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const [enriched, setEnriched] = useState<EnrichResponse | null>(null);
  const CategoryIcon = issueCategoryIcon[issue.category];

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-brand-50 text-brand-700">
          <CategoryIcon size={14} />
        </span>
        <span className="chip">{issue.category}</span>
      </div>
      <h3 className="mt-2 text-base font-bold text-slate-900 leading-snug">
        {issue.title}
      </h3>
      <p className="mt-2 text-sm text-slate-700 leading-relaxed">
        {issue.summary}
      </p>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            관련 지역
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {issue.relatedRegions.map((r) => (
              <span key={r} className="chip">
                {r}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            관련 기술
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {issue.relatedTechnologies.map((t) => (
              <span key={t} className="chip-accent">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          연결 주제
        </p>
        <div className="mt-1 flex flex-wrap gap-1">
          {issue.linkedTopics.map((t) => (
            <span key={t} className="chip-neutral">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-slate-50 ring-1 ring-slate-200 p-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
          근거자료
        </p>
        <ul className="mt-1.5 space-y-1">
          {issue.evidenceSources.map((s) => (
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

      <div className="mt-auto pt-3 flex items-center justify-end">
        <AiEnrichButton
          mode="issue_extract"
          topic={issue.title}
          baseContent={issue}
          onResult={setEnriched}
          label="AI로 이슈 정리"
        />
      </div>
    </article>
  );
}
