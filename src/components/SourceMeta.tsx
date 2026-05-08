import { Building2, Calendar } from "lucide-react";
import { findSourceByTitle, formatDate } from "../lib/sourceLookup";

interface SourceMetaProps {
  title: string;
  /** 카탈로그에 매칭이 없을 때 텍스트로 노출할 안내. */
  unknownLabel?: string;
}

/**
 * 자료 한 건을 "제목 + 출처 · 시점" 형식으로 표시한다.
 * 카탈로그(evidenceSources)에 매칭되는 자료면 publisher / date 를 함께 노출하고,
 * 매칭이 없으면 제목만 보여준다.
 */
export function SourceMeta({ title, unknownLabel }: SourceMetaProps) {
  const source = findSourceByTitle(title);
  return (
    <div className="text-xs leading-snug">
      <span className="font-medium text-slate-800">{title}</span>
      {source ? (
        <span className="ml-1 inline-flex items-center gap-1 text-slate-500 flex-wrap">
          <span aria-hidden>·</span>
          <Building2 size={11} className="opacity-70" />
          <span>{source.publisher}</span>
          <span aria-hidden>·</span>
          <Calendar size={11} className="opacity-70" />
          <span>{formatDate(source.date)}</span>
        </span>
      ) : unknownLabel ? (
        <span className="ml-1 text-slate-400">· {unknownLabel}</span>
      ) : null}
    </div>
  );
}
