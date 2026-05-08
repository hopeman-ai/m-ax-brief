import { useState } from "react";
import { Landmark, ChevronDown } from "lucide-react";
import type { EvidenceSource, RegionApproach } from "../types";
import { formatDate } from "../lib/sourceLookup";

interface RegionApproachCardProps {
  approach: RegionApproach;
  sourcesById: Record<string, EvidenceSource>;
}

export function RegionApproachCard({
  approach,
  sourcesById,
}: RegionApproachCardProps) {
  const [open, setOpen] = useState(false);

  const sources = approach.linkedSourceIds
    .map((id) => sourcesById[id])
    .filter((s): s is EvidenceSource => Boolean(s));

  const hasDetail = !!(
    approach.detail ||
    (approach.policyHighlights && approach.policyHighlights.length > 0) ||
    (approach.techHighlights && approach.techHighlights.length > 0)
  );

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-50 text-brand-700">
          <Landmark size={14} />
        </span>
        <h3 className="text-sm font-bold text-slate-900">{approach.region}</h3>
      </div>

      <p className="mt-2 text-sm text-slate-700 leading-relaxed">
        {approach.approach}
      </p>

      <div className="mt-2 rounded-lg bg-cyan-50 ring-1 ring-cyan-100 p-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-700">
          시사점
        </p>
        <p className="mt-1 text-xs text-cyan-900 leading-relaxed">
          {approach.implication}
        </p>
      </div>

      {/* 펼치기 영역 — 자세한 요약, 정책·기술 포인트 */}
      {open && hasDetail && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
          {approach.detail && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                자세한 요약
              </p>
              <p className="mt-1 text-xs text-slate-700 leading-relaxed">
                {approach.detail}
              </p>
            </div>
          )}
          {approach.policyHighlights && approach.policyHighlights.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                정책 포인트
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {approach.policyHighlights.map((p) => (
                  <span key={p} className="chip">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {approach.techHighlights && approach.techHighlights.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                기술 포인트
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {approach.techHighlights.map((t) => (
                  <span key={t} className="chip-accent">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 관련 자료 — 항상 노출, 카드 하단으로 push */}
      <div className="mt-3 mt-auto pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          관련 자료
        </p>
        <ul className="mt-1 space-y-0.5">
          {sources.map((s) => (
            <li key={s.id} className="text-xs leading-snug">
              <span className="font-medium text-slate-800">{s.title}</span>
              <span className="ml-1 text-slate-500">
                · {s.publisher} · {formatDate(s.date)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 자세한 요약 토글 — 데이터가 있을 때만 노출 */}
      {hasDetail && (
        <div className="pt-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1 text-xs text-brand-700 font-semibold"
          >
            {open ? "간단히" : "자세한 요약 보기"}
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </article>
  );
}
