import {
  Landmark,
  Cpu,
  Database,
  Network,
  Globe2,
  Layers,
  Factory,
  Bot,
  FlaskConical,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IssueCategory, TopicCategory } from "../types";

/**
 * 카테고리별 시각 아이덴티티를 안정적으로 부여하기 위한 아이콘 매핑.
 * 카드 헤더와 카테고리 디바이더에서 동일하게 사용한다.
 */

export const issueCategoryIcon: Record<IssueCategory, LucideIcon> = {
  "정책 이슈": Landmark,
  "기술 이슈": Cpu,
  "데이터·거버넌스 이슈": Database,
  "산업 생태계 이슈": Network,
  "국가·권역별 이슈": Globe2,
};

export const topicCategoryIcon: Record<TopicCategory, LucideIcon> = {
  "데이터 인프라": Database,
  "Vertical AI": Layers,
  "AI Factory": Factory,
  "로봇·Physical AI": Bot,
  "소재 AI": FlaskConical,
  "신뢰성·검증": ShieldCheck,
  "중소·중견 제조 확산": Users,
};
