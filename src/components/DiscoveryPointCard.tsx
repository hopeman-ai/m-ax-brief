import { ChevronRight, Search } from "lucide-react";
import type { DiscoveryPoint, EvidenceSource, Issue } from "../types";
import { formatDate } from "../lib/sourceLookup";

interface DiscoveryPointCardProps {
  point: DiscoveryPoint;
  issuesById: Record<string, Issue>;
  sourcesById: Record<string, EvidenceSource>;
  onSeeTopic: () => void;
}

export function DiscoveryPointCard({
  point,
  issuesById,
  sourcesById,
  onSeeTopic,
}: DiscoveryPointCardProps) {
  const linkedIssues = point.linkedIssueIds
    .map((id) => issuesById[id])
    .filter((i): i is Issue => Boolean(i));
  const linkedSource = sourcesById[point.linkedSourceId];

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-50 text-brand-700">
          <Search size={14} />
        </span>
        <h3 className="text-sm font-bold text-slate-900 leading-snug">
          {point.title}
        </h3>
      </div>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
        {point.whyItMatters}
      </p>

      {linkedIssues.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            연결 이슈
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {linkedIssues.map((i) => (
              <span key={i.id} className="chip">
                {i.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {linkedSource && (
        <div className="mt-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            관련 자료
          </p>
          <p className="mt-1 text-xs leading-snug">
            <span className="font-medium text-slate-800">
              {linkedSource.title}
            </span>
            <span className="ml-1 text-slate-500">
              · {linkedSource.publisher} · {formatDate(linkedSource.date)}
            </span>
          </p>
        </div>
      )}

      <div className="mt-3 mt-auto pt-3">
        <button
          type="button"
          onClick={onSeeTopic}
          className="inline-flex items-center gap-1 text-xs text-brand-700 font-semibold hover:text-brand-900 transition-colors"
        >
          주제후보 보기
          <ChevronRight size={12} />
        </button>
      </div>
    </article>
  );
}
