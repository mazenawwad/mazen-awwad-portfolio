"use client";

import { motion } from "motion/react";
import type { TimelineEntry } from "./timeline-track";

type TimelineEntryCardProps = {
  entry: TimelineEntry;
  index: number;
  isActive: boolean;
};

export function TimelineEntryCard({
  entry,
  index,
  isActive,
}: TimelineEntryCardProps) {
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <motion.li
      className={`timeline-entry timeline-entry-${side}${isActive ? " is-active" : ""}`}
      animate={{
        opacity: isActive ? 1 : 0.48,
        y: isActive ? 0 : 14,
        scale: isActive ? 1 : 0.975,
      }}
      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="timeline-node" aria-hidden="true" />
      <article className="timeline-card">
        <div className="timeline-meta">
          <span>{entry.kind}</span>
          <time>{entry.period}</time>
        </div>
        <h3>{entry.title}</h3>
        <p className="timeline-subtitle">{entry.subtitle}</p>
        <p>{entry.description}</p>
      </article>
    </motion.li>
  );
}
