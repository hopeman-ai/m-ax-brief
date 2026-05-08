import type { TabId } from "../types";

interface TopNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string }[] = [
  { id: "brief", label: "브리프" },
  { id: "issues", label: "이슈맵" },
  { id: "topics", label: "주제후보" },
  { id: "sources", label: "근거자료" },
];

export function TopNav({ active, onChange }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-3 sm:pt-4 pb-2">
          <button
            type="button"
            onClick={() => onChange("brief")}
            aria-label="브리프로 이동"
            className="group inline-flex flex-col items-start text-left cursor-pointer transition-opacity hover:opacity-80"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold text-brand-800 group-hover:text-brand-900 tracking-tight leading-none">
                M.AX Brief
              </h1>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700 text-[11px] font-semibold tracking-wide">
                Vertical AI Brief
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-snug">
              산업혁신 생태계 효율성 제고를 위한 M.AX·Vertical AI 주제 발굴 브리프
            </p>
          </button>
        </div>
        <nav
          aria-label="주요 메뉴"
          className="-mx-4 sm:-mx-6 px-4 sm:px-6 pb-2.5 sm:pb-3 overflow-x-auto scrollbar-none"
        >
          <ul className="flex gap-1.5 min-w-max">
            {tabs.map((t) => {
              const isActive = t.id === active;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => onChange(t.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-brand-700 text-white shadow-sm"
                        : "bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {t.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
