"use client";

import type { SkillGroup } from "@/content/portfolio";
import type { CardActivationRange } from "@/hooks/use-horizontal-scroll-metrics";
import {
  motion,
  type MotionValue,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";
import { SkillIcon } from "./skill-icon";

type SkillGroupCardProps = {
  activationRange: CardActivationRange | undefined;
  group: SkillGroup;
  groupIndex: number;
  isStatic: boolean;
  progress: MotionValue<number>;
};

type SkillRowProps = {
  revealEnd: number;
  groupTitle: string;
  progress: MotionValue<number>;
  revealAt: number;
  skill: string;
};

function SkillRow({
  groupTitle,
  progress,
  revealAt,
  revealEnd,
  skill,
}: SkillRowProps) {
  const revealProgress = useTransform(progress, (value) => {
    if (value <= revealAt) {
      return 0;
    }

    if (value >= revealEnd) {
      return 1;
    }

    return (value - revealAt) / (revealEnd - revealAt);
  });
  const opacity = useTransform(revealProgress, [0, 1], [0, 1]);
  const y = useTransform(revealProgress, [0, 1], [14, 0]);

  return (
    <motion.li style={{ opacity, y }}>
      <SkillIcon group={groupTitle} skill={skill} />
      <span>{skill}</span>
    </motion.li>
  );
}

type SkillGroupContentProps = {
  children: ReactNode;
  group: SkillGroup;
  groupIndex: number;
};

function SkillGroupContent({
  children,
  group,
  groupIndex,
}: SkillGroupContentProps) {
  return (
    <div className="skill-group-content">
      <div className="skill-group-header">
        <span>{String(groupIndex + 1).padStart(2, "0")}</span>
        <h3>{group.title}</h3>
      </div>
      <ul>{children}</ul>
    </div>
  );
}

function getActiveProgress(
  value: number,
  activationStart: number,
  activationEnd: number,
  fadeWindow: number,
) {
  if (value < activationStart) {
    return Math.max(0, 1 - (activationStart - value) / fadeWindow);
  }

  if (value <= activationEnd) {
    return 1;
  }

  return Math.max(0, 1 - (value - activationEnd) / fadeWindow);
}

export function SkillGroupCard({
  activationRange,
  group,
  groupIndex,
  isStatic,
  progress,
}: SkillGroupCardProps) {
  const activationStart = activationRange?.centerStart ?? 0;
  const activationEnd = activationRange?.centerEnd ?? 1;
  const fadeWindow = 0.022;
  const activeProgress = useTransform(progress, (value) =>
    getActiveProgress(value, activationStart, activationEnd, fadeWindow),
  );
  const cardOpacity = useTransform(progress, (value) => {
    const active = getActiveProgress(
      value,
      activationStart,
      activationEnd,
      fadeWindow,
    );

    if (value < activationStart) {
      return 0.42 + active * 0.58;
    }

    if (value <= activationEnd) {
      return 1;
    }

    return 1;
  });
  const cardY = useTransform(progress, (value) => {
    const active = getActiveProgress(
      value,
      activationStart,
      activationEnd,
      fadeWindow,
    );

    return value < activationStart ? 18 * (1 - active) : 0;
  });
  const fillProgress = useTransform(
    progress,
    [activationStart, activationEnd],
    [0, 1],
  );
  const skillRevealWindow = activationEnd - activationStart;

  if (isStatic) {
    return (
      <article className="skill-group is-static" data-skill-card>
        <span className="skill-card-fill" aria-hidden="true" />
        <SkillGroupContent group={group} groupIndex={groupIndex}>
          {group.skills.map((skill) => (
            <li key={skill}>
              <SkillIcon group={group.title} skill={skill} />
              <span>{skill}</span>
            </li>
          ))}
        </SkillGroupContent>
      </article>
    );
  }

  return (
    <motion.article
      className="skill-group"
      data-skill-card
      style={{ opacity: cardOpacity, y: cardY }}
    >
      <motion.span
        className="skill-card-focus"
        aria-hidden="true"
        style={{ opacity: activeProgress }}
      />
      <motion.span
        className="skill-card-fill"
        aria-hidden="true"
        style={{ scaleX: fillProgress }}
      />
      <SkillGroupContent group={group} groupIndex={groupIndex}>
        {group.skills.map((skill, skillIndex) => {
          const stagger =
            ((skillIndex + 1) / (group.skills.length + 1)) *
            skillRevealWindow *
            0.75;
          const revealAt = Math.min(
            activationEnd - 0.012,
            activationStart + stagger,
          );
          const revealEnd = Math.min(
            activationEnd,
            revealAt + Math.min(0.035, skillRevealWindow * 0.28),
          );

          return (
            <SkillRow
              key={skill}
              groupTitle={group.title}
              progress={progress}
              revealAt={revealAt}
              revealEnd={revealEnd}
              skill={skill}
            />
          );
        })}
      </SkillGroupContent>
    </motion.article>
  );
}
