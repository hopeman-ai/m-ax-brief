import {
  Globe2,
  AlertCircle,
  Lightbulb,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { regionApproaches } from "../data/regionApproaches";
import { issues } from "../data/issues";
import { topicCandidates } from "../data/topicCandidates";
import { evidenceSources } from "../data/evidenceSources";
import type { TabId } from "../types";

interface BriefStatRowProps {
  onNavigate: (tab: TabId) => void;
}

interface StatItem {
  id: string;
  label: string;
  value: number;
  icon: LucideIcon;
  tone: "brand" | "warn" | "accent" | "slate";
  target?: TabId;
}

const toneMap: Record<StatItem["tone"], string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  warn: "bg-warn-50 text-warn-700 ring-warn-100",
  accent: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function BriefStatRow({ onNavigate }: BriefStatRowProps) {
  const stats: StatItem[] = [
    {
      id: "regions",
      label: "국가·권역",
      value: regionApproaches.length,
      icon: Globe2,
      tone: "brand",
    },
    {
      id: "issues",
      label: "핵심 이슈",
      value: issues.length,
      icon: AlertCircle,
      tone: "warn",
      target: "issues",
    },
    {
      id: "topics",
      label: "주제 후보",
      value: topicCandidates.length,
      icon: Lightbulb,
      tone: "accent",
      target: "topics",
    },
    {
      id: "sources",
      label: "근거자료",
      value: evidenceSources.length,
      icon: FileText,
      tone: "slate",
      target: "sources",
    },
  ];

  return (
    <section aria-label="브리프 범위 요약">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          const interactive = !!s.target;
          const Comp = interactive ? "button" : "div";
          return (
            <Comp
              key={s.id}
              type={interactive ? "button" : undefined}
              onClick={interactive ? () => onNavigate(s.target!) : undefined}
              className={`bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 flex items-center gap-3 text-left ${
                interactive
                  ? "transition-all hover:border-brand-300 hover:shadow-sm active:scale-[0.99]"
                  : ""
              }`}
            >
              <span
                className={`shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg ring-1 ${toneMap[s.tone]}`}
              >
                <Icon size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 leading-none">{s.label}</p>
                <p className="mt-1.5 text-lg sm:text-xl font-bold text-slate-900 leading-none tracking-tight">
                  {s.value}
                  <span className="text-xs font-semibold text-slate-500 ml-0.5">
                    건
                  </span>
                </p>
              </div>
            </Comp>
          );
        })}
      </div>
    </section>
  );
}
