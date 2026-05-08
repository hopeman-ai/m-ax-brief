import { useState } from "react";
import { ExternalLink, Building2, Calendar } from "lucide-react";
import type { EvidenceSource } from "../types";
import { AiEnrichButton } from "./AiEnrichButton";
import { EnrichedContentPanel } from "./EnrichedContentPanel";
import { formatDate } from "../lib/sourceLookup";
import type { EnrichResponse } from "../lib/enrich";

interface EvidenceSourceCardProps {
  source: EvidenceSource;
}

export function EvidenceSourceCard({ source }: EvidenceSourceCardProps) {
  const [enriched, setEnriched] = useState<EnrichResponse | null>(null);

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="chip">{source.type}</span>
        <span className="chip-neutral">{source.region}</span>
      </div>
      <h3 className="mt-2 text-base font-bold text-slate-900 leading-snug">
        {source.title}
      </h3>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1">
          <Building2 size={12} className="opacity-70" />
          {source.publisher}
        </span>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-1">
          <Calendar size={12} className="opacity-70" />
          {formatDate(source.date)}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-700 leading-relaxed">
        {source.summary}
      </p>

      <div className="mt-3 rounded-lg bg-cyan-50 ring-1 ring-cyan-100 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-700">
          M.AX 관련성
        </p>
        <p className="mt-1 text-sm text-cyan-900 leading-relaxed">
          {source.relevance}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            연결 이슈
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {source.linkedIssues.map((i) => (
              <span key={i} className="chip">
                {i}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            연결 주제
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {source.linkedTopics.map((t) => (
              <span key={t} className="chip-accent">
                {t}
              </span>
            ))}
          </div>
        </div>
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
        {source.url ? (
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900"
          >
            원문 보기
            <ExternalLink size={12} />
          </a>
        ) : (
          <span className="text-xs text-slate-400">출처 링크 준비중</span>
        )}
        <AiEnrichButton
          mode="source_summary"
          topic={source.title}
          baseContent={source}
          onResult={setEnriched}
          label="AI로 요약 보강"
        />
      </div>
    </article>
  );
}
