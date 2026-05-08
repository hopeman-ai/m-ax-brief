#!/usr/bin/env node
/**
 * 접근 비밀번호 변경 스크립트.
 *
 * 사용법:
 *   npm run set-password -- "새비밀번호"
 *   npm run set-password           ← (인자 생략 시 prompt)
 *
 * 동작:
 *   1) SHA-256 해시 계산
 *   2) src/components/PasswordGate.tsx 의 PASSWORD_HASH 갱신
 *   3) STORAGE_KEY 버전을 v(N+1) 로 자동 bump → 기존 세션 모두 즉시 만료
 *
 * 보안:
 *   - 비밀번호 평문은 디스크에 저장되지 않고 해시만 코드에 남는다.
 *   - 갱신 후 git commit + push + npm run deploy 하면 모든 접속자에게 적용된다.
 *   - 비밀번호 자체는 별도 안전한 채널(메신저 DM 등)로만 공유한다.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createInterface } from "node:readline/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GATE_PATH = resolve(
  __dirname,
  "..",
  "src",
  "components",
  "PasswordGate.tsx"
);

async function getPassword() {
  const arg = process.argv.slice(2).join(" ").trim();
  if (arg !== "") return arg;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const pw = (await rl.question("새 비밀번호 (4자 이상): ")).trim();
  rl.close();
  return pw;
}

function fail(message) {
  console.error(`\n[set-password] ${message}\n`);
  process.exit(1);
}

const password = await getPassword();

if (!password) fail("비밀번호가 비어 있습니다.");
if (password.length < 4) fail("비밀번호는 4자 이상이어야 합니다.");

const hash = createHash("sha256").update(password).digest("hex");

const src = readFileSync(GATE_PATH, "utf8");

const versionMatch = src.match(/"max-brief-unlocked-v(\d+)"/);
const nextVersion = versionMatch ? Number(versionMatch[1]) + 1 : 2;
const newKey = `max-brief-unlocked-v${nextVersion}`;

let updated = src.replace(
  /(const PASSWORD_HASH\s*=\s*)"[^"]*";/,
  `$1"${hash}";`
);
updated = updated.replace(/"max-brief-unlocked-v\d+"/, `"${newKey}"`);

if (updated === src) {
  fail(
    "PasswordGate.tsx 의 PASSWORD_HASH 또는 STORAGE_KEY 패턴을 찾지 못했습니다.\n" +
      "        파일이 직접 수정되었거나 컴포넌트 구조가 바뀐 경우입니다."
  );
}

writeFileSync(GATE_PATH, updated, "utf8");

console.log("");
console.log("✓ src/components/PasswordGate.tsx 갱신 완료");
console.log(`  · 새 해시 prefix : ${hash.slice(0, 16)}…`);
console.log(`  · storage key   : ${newKey}  (기존 세션 모두 만료)`);
console.log("");
console.log("다음 단계:");
console.log('  1) git add -A && git commit -m "chore: rotate access password"');
console.log("  2) git push        # 소스 갱신 (저장소)");
console.log("  3) npm run deploy  # gh-pages 재배포 → 사이트 갱신");
console.log("");
console.log(
  "⚠️  새 비밀번호는 안전한 채널(메신저 DM 등)로만 지인들에게 공유하세요."
);
console.log(
  "    이 스크립트의 콘솔 로그에는 평문 비밀번호가 남지 않지만, 셸 히스토리에는"
);
console.log(
  "    인자가 남을 수 있으니 필요 시 history 정리도 함께 고려하세요."
);
