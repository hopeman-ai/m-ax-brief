import { useState, type FormEvent, type ReactNode } from "react";
import { Lock } from "lucide-react";

/**
 * 지인 공유 단계 접근 보호 게이트.
 *
 * 주의 — 이는 "캐주얼 접근 차단" 수준입니다.
 *  - 비밀번호 자체는 코드에 저장하지 않고 SHA-256 해시만 보관.
 *  - 해시는 Web Crypto SubtleCrypto 로 클라이언트에서 비교 (HTTPS·localhost 필요).
 *  - 해제 상태는 sessionStorage 에 저장 — 탭을 닫으면 다시 입력해야 함.
 *
 * 새 비밀번호로 변경하려면:
 *   1) 셸에서 새 해시 계산
 *      node -e "console.log(require('crypto').createHash('sha256').update('새비밀번호').digest('hex'))"
 *   2) 아래 PASSWORD_HASH 상수에 결과 hex 문자열 붙여넣기
 *   3) 해제 상태 강제 갱신을 원하면 STORAGE_KEY 도 함께 변경
 */
const PASSWORD_HASH =
  "ab9dc360cb40c43a9642d966d5940ae418610d5ad9177b17f7559494e376df5d";
const STORAGE_KEY = "max-brief-unlocked-v1";

async function hashInput(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

interface PasswordGateProps {
  children: ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (unlocked) return <>{children}</>;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input || busy) return;
    setBusy(true);
    setError(null);
    try {
      const hash = await hashInput(input);
      if (hash === PASSWORD_HASH) {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* private mode 등 storage 사용 불가 시 무시 — 메모리 상태로만 잠금 해제 */
        }
        setUnlocked(true);
      } else {
        setError("비밀번호가 일치하지 않습니다.");
        setInput("");
      }
    } catch (err) {
      setError(
        err instanceof Error ? `해시 처리 실패: ${err.message}` : "해시 처리 실패"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-sm"
      >
        <div className="flex items-center gap-2 text-brand-700">
          <Lock size={18} />
          <p className="text-sm font-bold uppercase tracking-wide">M.AX Brief</p>
        </div>
        <h1 className="mt-2 text-base sm:text-lg font-bold text-slate-900">
          접근 권한 확인
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
          이 서비스는 지인 공유 단계입니다. 운영자가 알려준 비밀번호를 입력해
          주세요.
        </p>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="비밀번호"
          autoFocus
          autoComplete="current-password"
          className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400"
        />
        {error && (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || !input}
          className="mt-4 w-full bg-brand-700 text-white font-semibold py-2 rounded-lg text-sm hover:bg-brand-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
        >
          {busy ? "확인 중..." : "들어가기"}
        </button>
        <p className="mt-4 text-[11px] text-slate-400 leading-relaxed">
          세션 단위로 인증되며, 탭을 닫으면 다시 입력해야 합니다. 비밀번호 자체는
          서버나 코드에 저장되지 않고, 해시만 비교합니다.
        </p>
      </form>
    </div>
  );
}
