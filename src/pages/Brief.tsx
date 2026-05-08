import type { TabId } from "../types";
import { BriefDashboard } from "../components/BriefDashboard";

interface BriefProps {
  onNavigate: (tab: TabId) => void;
}

export function Brief({ onNavigate }: BriefProps) {
  return <BriefDashboard onNavigate={onNavigate} />;
}
