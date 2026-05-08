import { Sparkles, Info, ChevronUp } from "lucide-react";
import type { EnrichResponse } from "../lib/enrich";

interface EnrichedContentPanelProps {
  result: EnrichResponse;
  /**
   * 패널을 접는 핸들러. 제공되면 헤더 우측에 "접기" 버튼이 노출된다.
   * 부모는 보통 enriched 상태를 null 로 되돌려 패널을 unmount 한다.
   */
  onClose?: () => void;
}

export function EnrichedContentPanel({
  result,
  onClose,
}: EnrichedContentPanelProps) {
  const { data, source, ok } = result;
  const isFallback = source === "fallback" || !ok;

  return (
    <div
      className={`rounded-xl ring-1 p-3.5 ${
        isFallback
          ? "bg-slate-50 ring-slate-200"
          : "bg-gradient-to-br from-brand-50 to-cyan-50/40 ring-brand-100"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div
          className={`flex items-center gap-1.5 ${
            isFallback ? "text-slate-500" : "text-brand-700"
          }`}
        >
          {isFallback ? <Info size={12} /> : <Sparkles size={12} />}
          <p className="text-[12px] font-semibold uppercase tracking-wide">
            {isFallback ? "기본 브리프" : "AI 보강"}
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="AI 보강 패널 접기"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11px] font-medium text-slate-500 hover:text-slate-800 hover:bg-white/60 transition-colors"
          >
            <ChevronUp size={12} />
            접기
          </button>
        )}
      </div>

      {data.summary && (
        <p
          className={`mt-2 text-sm leading-relaxed ${
            isFallback ? "text-slate-600" : "text-slate-800"
          }`}
        >
          {data.summary}
        </p>
      )}

      {data.issues.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">
            관련 이슈 정리
          </p>
          <ul className="mt-1 space-y-1">
            {data.issues.map((i) => (
              <li
                key={i}
                className="text-sm text-slate-700 leading-relaxed flex gap-2"
              >
                <span className="mt-2 inline-block w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.topicCandidates.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-700">
            검토 가능한 주제 후보 초안
          </p>
          <ul className="mt-1 space-y-1">
            {data.topicCandidates.map((t) => (
              <li
                key={t}
                className="text-sm text-cyan-900 leading-relaxed flex gap-2"
              >
                <span className="mt-2 inline-block w-1 h-1 rounded-full bg-cyan-500 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.cautions.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-warn-700">
            검토 시 주의사항
          </p>
          <ul className="mt-1 space-y-1">
            {data.cautions.map((c) => (
              <li
                key={c}
                className="text-sm text-warn-700 leading-relaxed flex gap-2"
              >
                <span className="mt-2 inline-block w-1 h-1 rounded-full bg-warn-500 shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
