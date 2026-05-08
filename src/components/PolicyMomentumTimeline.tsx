import { Calendar, Building2 } from "lucide-react";
import { evidenceSources } from "../data/evidenceSources";
import { formatDate } from "../lib/sourceLookup";
import { SectionHeader } from "./SectionHeader";
import type { EvidenceSource } from "../types";

/**
 * 국내 정책자료 8건의 발표 시점을 월 단위 그룹으로 묶어 시간 흐름을 시각화한다.
 * 단순 카드 grid 와 달리 "최근 정책 모멘텀이 어디에 몰려 있는가" 를 한눈에 보여준다.
 */

function getYearMonth(date: string): string {
  if (date.length >= 7) return date.substring(0, 7); // "2026-04-30" -> "2026-04"
  return date.substring(0, 4); // "2024" -> "2024"
}

const koreanSources = evidenceSources
  .filter((s) => s.region === "한국")
  .sort((a, b) => a.date.localeCompare(b.date));

const groupKeys: string[] = [];
const grouped: Record<string, EvidenceSource[]> = {};
for (const s of koreanSources) {
  const key = getYearMonth(s.date);
  if (!grouped[key]) {
    grouped[key] = [];
    groupKeys.push(key);
  }
  grouped[key].push(s);
}

export function PolicyMomentumTimeline() {
  if (koreanSources.length === 0) return null;
  const first = koreanSources[0];
  const last = koreanSources[koreanSources.length - 1];

  return (
    <section>
      <SectionHeader
        title="국내 정책 모멘텀"
        description={`${formatDate(first.date)} ─ ${formatDate(last.date)} 사이의 정부·공공 정책자료 발표 흐름`}
        action={
          <span className="count-stat">
            {koreanSources.length}건 추적
          </span>
        }
      />

      <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
        <ol className="relative border-l-2 border-slate-200 ml-2 space-y-5 pl-6 sm:pl-7">
          {groupKeys.map((key) => {
            const items = grouped[key];
            return (
              <li key={key} className="relative">
                <span className="absolute -left-[33px] sm:-left-[37px] top-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 ring-4 ring-white">
                  <Calendar size={11} className="text-white" />
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <p className="text-sm font-bold text-brand-800">
                    {formatDate(key)}
                  </p>
                  <span className="text-xs text-slate-400">
                    {items.length}건
                  </span>
                </div>
                <ul className="mt-2 space-y-2">
                  {items.map((s) => (
                    <li
                      key={s.id}
                      className="rounded-lg bg-slate-50 ring-1 ring-slate-200 p-3"
                    >
                      <div className="flex items-center gap-1 flex-wrap text-[11px] text-slate-500">
                        <Building2 size={10} className="opacity-70" />
                        <span>{s.publisher}</span>
                        <span aria-hidden>·</span>
                        <span>{formatDate(s.date)}</span>
                        <span className="ml-auto inline-flex items-center px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[11px] font-medium">
                          {s.type}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm font-semibold text-slate-900 leading-snug">
                        {s.title}
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
