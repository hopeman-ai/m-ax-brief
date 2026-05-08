import type { ReactNode } from "react";

interface AppShellProps {
  topNav: ReactNode;
  children: ReactNode;
}

export function AppShell({ topNav, children }: AppShellProps) {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      {topNav}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-10 space-y-8">
        {children}
      </main>
    </div>
  );
}
