"use client";

import type { ExperienceItem } from "@/content/portfolio";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ArrowDownRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type CurrentWorkSectionProps = {
  experience: ExperienceItem;
};

export function CurrentWorkSection({ experience }: CurrentWorkSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="work" className="work-section">
      <ScrollReveal>
        <header className="work-intro">
          <div>
            <p className="eyebrow">Current work · {experience.period}</p>
            <h2>
              {experience.company}
              {experience.product ? <span> / {experience.product}</span> : null}
            </h2>
          </div>
          <div className="work-context">
            <p>{experience.role}</p>
            {experience.context ? <p>{experience.context}</p> : null}
          </div>
        </header>
      </ScrollReveal>

      <ol className="work-chapters">
        {experience.highlights.map((highlight, index) => (
          <motion.li
            key={highlight}
            className="work-chapter"
            initial={shouldReduceMotion ? false : { opacity: 0.22, y: 32 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ amount: 0.22, once: true }}
            transition={{ duration: 0.38, delay: index * 0.04 }}
          >
            <span className="chapter-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{experience.focusAreas?.[index]}</h3>
            <p>{highlight}</p>
            <ArrowDownRight aria-hidden="true" />
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
