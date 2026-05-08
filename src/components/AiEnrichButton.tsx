import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import {
  requestEnrichment,
  type EnrichMode,
  type EnrichResponse,
} from "../lib/enrich";

interface AiEnrichButtonProps {
  mode: EnrichMode;
  topic: string;
  baseContent: unknown;
  onResult: (result: EnrichResponse) => void;
  label?: string;
}

export function AiEnrichButton({
  mode,
  topic,
  baseContent,
  onResult,
  label = "AI로 설명 보강",
}: AiEnrichButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await requestEnrichment({ mode, topic, baseContent });
      onResult(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 disabled:text-slate-400 transition-colors"
      aria-busy={loading}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Sparkles size={14} />
      )}
      {loading ? "보강 중..." : label}
    </button>
  );
}
