import type { LucideIcon } from "lucide-react";

interface CategoryDividerProps {
  icon: LucideIcon;
  label: string;
  count: number;
  tone?: "brand" | "accent";
}

const toneMap: Record<NonNullable<CategoryDividerProps["tone"]>, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  accent: "bg-cyan-50 text-cyan-700 ring-cyan-100",
};

/**
 * 그리드 안에서 카테고리 단위로 카드를 묶어주는 시각 디바이더.
 * lg 그리드가 2열일 때 col-span-2 로 한 줄 전체를 차지해 시각적 구획을 만든다.
 */
export function CategoryDivider({
  icon: Icon,
  label,
  count,
  tone = "brand",
}: CategoryDividerProps) {
  return (
    <div className="lg:col-span-2 flex items-center gap-2.5 pt-1">
      <span
        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ring-1 ${toneMap[tone]}`}
      >
        <Icon size={14} />
      </span>
      <h3 className="text-sm font-bold text-slate-800 whitespace-nowrap">
        {label}
      </h3>
      <span className="text-xs text-slate-500 whitespace-nowrap">
        {count}건
      </span>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  );
}
