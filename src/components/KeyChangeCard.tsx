import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import type { KeyChange } from "../types";
import { SourceMeta } from "./SourceMeta";

interface KeyChangeCardProps {
  change: KeyChange;
}

const DEFAULT_EVIDENCE = 3;
const DEFAULT_LINKED_TOPICS = 2;

export function KeyChangeCard({ change }: KeyChangeCardProps) {
  const [open, setOpen] = useState(false);

  const visibleEvidence = change.evidenceSources.slice(0, DEFAULT_EVIDENCE);
  const hiddenEvidenceCount =
    change.evidenceSources.length - visibleEvidence.length;
  const visibleTopics = change.linkedTopics.slice(0, DEFAULT_LINKED_TOPICS);
  const hiddenTopicsCount =
    change.linkedTopics.length - visibleTopics.length;

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-4 h-full flex flex-col">
      {/* 헤더: 번호 + 제목 */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-700 text-white text-[12px] font-bold">
          {change.order}
        </span>
        <h3 className="text-sm font-bold text-slate-900 leading-snug">
          {change.title}
        </h3>
      </div>

      {/* oneLine */}
      <p className="mt-2 text-xs text-slate-700 leading-relaxed">
        {change.oneLine}
      </p>

      {/* 왜 중요한가 — 기본 노출 */}
      <div className="mt-3 rounded-lg bg-cyan-50 ring-1 ring-cyan-100 p-2.5">
        <p className="text-[11px] font-semibold tracking-wide text-cyan-700 uppercase">
          왜 중요한가
        </p>
        <p className="mt-1 text-xs text-cyan-900 leading-relaxed">
          {change.whyItMatters}
        </p>
      </div>

      {/* 근거 badge — 2~3개 */}
      <div className="mt-3">
        <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
          근거
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          {visibleEvidence.map((s) => (
            <span key={s} className="chip-neutral">
              {s}
            </span>
          ))}
          {hiddenEvidenceCount > 0 && (
            <span className="text-[11px] text-slate-400">
              +{hiddenEvidenceCount}
            </span>
          )}
        </div>
      </div>

      {/* 연결 주제 — 1~2개 */}
      <div className="mt-2">
        <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
          연결 주제 후보
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          {visibleTopics.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
          {hiddenTopicsCount > 0 && (
            <span className="text-[11px] text-slate-400">
              +{hiddenTopicsCount}
            </span>
          )}
        </div>
      </div>

      {/* 키워드 — 2~4개 */}
      <div className="mt-2 flex flex-wrap gap-1">
        {change.keywords.map((k) => (
          <span key={k} className="chip-accent">
            {k}
          </span>
        ))}
      </div>

      {/* 확장 영역 */}
      {open && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
          {change.detail && (
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                상세 설명
              </p>
              <p className="mt-1 text-xs text-slate-700 leading-relaxed">
                {change.detail}
              </p>
            </div>
          )}

          <div>
            <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              관찰 포인트
            </p>
            <ul className="mt-1.5 space-y-1">
              {change.observationPoints.map((p) => (
                <li
                  key={p}
                  className="text-xs text-slate-700 leading-relaxed flex gap-2"
                >
                  <span className="mt-1.5 inline-block w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              근거자료 ({change.evidenceSources.length})
            </p>
            <ul className="mt-1.5 space-y-1">
              {change.evidenceSources.map((s) => (
                <li key={s} className="flex items-start gap-1.5">
                  <FileText
                    size={11}
                    className="mt-0.5 text-slate-400 shrink-0"
                  />
                  <SourceMeta title={s} unknownLabel="출처·시점 추가 예정" />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              연결 주제 후보 전체
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {change.linkedTopics.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 토글 버튼 */}
      <div className="mt-auto pt-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-1 text-xs text-brand-700 font-semibold"
        >
          {open ? "간단히" : "근거·상세 보기"}
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </article>
  );
}
