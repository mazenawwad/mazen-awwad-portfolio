"use client";

import type { SkillGroup } from "@/content/portfolio";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { useHorizontalScrollMetrics } from "@/hooks/use-horizontal-scroll-metrics";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { SkillGroupCard } from "./skill-group-card";

type SkillsSectionProps = {
  skillGroups: SkillGroup[];
};

export function SkillsSection({ skillGroups }: SkillsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { activationRanges, offsets, progressStops, sectionHeight } =
    useHorizontalScrollMetrics(
      viewportRef,
      trackRef,
      Boolean(shouldReduceMotion),
    );
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, progressStops, offsets);
  const isStatic = Boolean(shouldReduceMotion) || activationRanges.length === 0;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="skills-section"
      style={sectionHeight ? { height: sectionHeight } : undefined}
    >
      <div ref={viewportRef} className="skills-sticky">
        <ScrollReveal>
          <header className="skills-heading">
            <p className="eyebrow">Technical range</p>
            <h2>Skills used across production work.</h2>
          </header>
        </ScrollReveal>
        <motion.div
          ref={trackRef}
          className="skills-track"
          style={{ x: shouldReduceMotion ? 0 : x }}
        >
          {skillGroups.map((group, groupIndex) => (
            <SkillGroupCard
              key={group.title}
              group={group}
              groupIndex={groupIndex}
              isStatic={isStatic}
              progress={scrollYProgress}
              activationRange={activationRanges[groupIndex]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
