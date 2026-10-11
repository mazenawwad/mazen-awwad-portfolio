"use client";

import { motion } from "motion/react";
import type { TimelineEntry } from "./timeline-track";
import { TimelineTechnologies } from "./timeline-technologies";

type TimelineEntryCardProps = {
  entry: TimelineEntry;
  index: number;
  isActive: boolean;
  nodeRef?: (element: HTMLLIElement | null) => void;
};

export function TimelineEntryCard({
  entry,
  index,
  isActive,
  nodeRef,
}: TimelineEntryCardProps) {
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <motion.li
      ref={nodeRef}
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
        {entry.subtitle ? (
          <p className="timeline-subtitle">{entry.subtitle}</p>
        ) : null}
        <p className="timeline-description">{entry.description}</p>
        {entry.technologies?.length ? (
          <TimelineTechnologies technologies={entry.technologies} />
        ) : null}
      </article>
    </motion.li>
  );
}
