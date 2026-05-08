import { evidenceSources } from "../data/evidenceSources";
import { SectionHeader } from "../components/SectionHeader";
import { EvidenceSourceCard } from "../components/EvidenceSourceCard";
import { PolicyMomentumTimeline } from "../components/PolicyMomentumTimeline";

const koreanSources = evidenceSources.filter((s) => s.region === "한국");
const globalSources = evidenceSources.filter((s) => s.region !== "한국");

export function Sources() {
  return (
    <>
      {/* 국내 정책 모멘텀 — 시점 시각화 (월별 발표량 + 타임라인) */}
      <PolicyMomentumTimeline />

      {/* 국내 정책자료 패키지 — 카드 그리드 */}
      <section>
        <SectionHeader
          title="국내 정책자료 패키지"
          description="최근 산업통상부·KIAT 등이 발표한 제조 AX 정책자료입니다. AI 팩토리·M.AX 얼라이언스·산단 AX·표준화·글로벌 동향 보고서를 함께 묶어 보여줍니다."
          action={
            <span className="count-stat">
              국내 자료 {koreanSources.length}건
            </span>
          }
        />
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {koreanSources.map((s) => (
            <EvidenceSourceCard key={s.id} source={s} />
          ))}
        </div>
      </section>

      {/* 글로벌 정책·기술 자료 */}
      <section>
        <SectionHeader
          title="글로벌 정책·기술 자료"
          description="미국·일본·중국·유럽의 정책·기술 자료와 국제 표준 자료입니다."
          action={
            <span className="count-stat">
              글로벌 자료 {globalSources.length}건
            </span>
          }
        />
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {globalSources.map((s) => (
            <EvidenceSourceCard key={s.id} source={s} />
          ))}
        </div>
      </section>
    </>
  );
}
