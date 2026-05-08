import { useEffect, useState } from "react";
import type { TabId } from "./types";
import { AppShell } from "./components/AppShell";
import { TopNav } from "./components/TopNav";
import { PasswordGate } from "./components/PasswordGate";
import { Brief } from "./pages/Brief";
import { Issues } from "./pages/Issues";
import { Topics } from "./pages/Topics";
import { Sources } from "./pages/Sources";

export default function App() {
  const [tab, setTab] = useState<TabId>("brief");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tab]);

  return (
    <PasswordGate>
      <AppShell topNav={<TopNav active={tab} onChange={setTab} />}>
        {tab === "brief" && <Brief onNavigate={setTab} />}
        {tab === "issues" && <Issues />}
        {tab === "topics" && <Topics />}
        {tab === "sources" && <Sources />}
      </AppShell>
    </PasswordGate>
  );
}
