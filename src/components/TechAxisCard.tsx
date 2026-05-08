import { useState } from "react";
import {
  BookOpen,
  Workflow,
  Bot,
  Database,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TechAxis } from "../types";

interface TechAxisCardProps {
  axis: TechAxis;
}

/** 프레임워크 의미별 아이콘. */
const axisIcon: Record<number, LucideIcon> = {
  1: BookOpen,
  2: Workflow,
  3: Bot,
  4: Database,
  5: ShieldCheck,
};

export function TechAxisCard({ axis }: TechAxisCardProps) {
  const [open, setOpen] = useState(false);
  const Icon = axisIcon[axis.order] ?? BookOpen;
  const visibleComponents = axis.components.slice(0, 3);
  const hiddenComponentCount = axis.components.length - visibleComponents.length;

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-4 h-full flex flex-col">
      {/* 헤더: 번호 + 아이콘 + 제목 */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-cyan-600 text-white text-[12px] font-bold">
          {axis.order}
        </span>
        <Icon size={16} className="text-cyan-700 shrink-0" />
        <h3 className="text-base font-bold text-slate-900">{axis.title}</h3>
      </div>

      {/* oneLine 요약 */}
      <p className="mt-2.5 text-sm text-slate-700 leading-relaxed">
        {axis.oneLine}
      </p>

      {/* 핵심 구성요소 chip 2~3개 */}
      <div className="mt-2.5 flex flex-wrap gap-1">
        {visibleComponents.map((c) => (
          <span key={c} className="chip-accent">
            {c}
          </span>
        ))}
        {hiddenComponentCount > 0 && (
          <span className="chip-neutral">+{hiddenComponentCount}</span>
        )}
      </div>

      {/* 역할 — 1문장 (기본 노출) */}
      <div className="mt-3 rounded-lg bg-slate-50 ring-1 ring-slate-100 p-2.5">
        <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
          제조 AX에서의 역할
        </p>
        <p className="mt-1 text-xs text-slate-700 leading-relaxed">
          {axis.role}
        </p>
      </div>

      {/* 확장 영역 */}
      {open && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              정의
            </p>
            <p className="mt-1 text-xs text-slate-700 leading-relaxed">
              {axis.definition}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              포함 기술 ({axis.components.length})
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {axis.components.map((c) => (
                <span key={c} className="chip-accent">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              활용 장면
            </p>
            <ul className="mt-1.5 space-y-1">
              {axis.useCases.map((u) => (
                <li
                  key={u}
                  className="text-xs text-slate-700 leading-relaxed flex gap-2"
                >
                  <span className="mt-1.5 inline-block w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              연결 주제 후보
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {axis.linkedTopics.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              근거 키워드
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {axis.evidenceKeywords.map((k) => (
                <span key={k} className="chip-neutral">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 더보기 토글 */}
      <div className="mt-auto pt-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-1 text-xs text-brand-700 font-semibold"
        >
          {open ? "간단히" : "자세히 보기"}
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </article>
  );
}
