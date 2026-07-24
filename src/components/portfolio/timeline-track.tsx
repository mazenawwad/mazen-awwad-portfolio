"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";
import { TimelineEntryCard } from "./timeline-entry-card";
import { TimelinePath } from "./timeline-path";

export type TimelineEntry = {
  period: string;
  title: string;
  subtitle?: string;
  description: string;
  kind: string;
  technologies?: string[];
};

type TimelineTrackProps = {
  entries: TimelineEntry[];
};

export function TimelineTrack({ entries }: TimelineTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 46%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(progress, "change", (latest) => {
    const nextIndex = Math.min(
      entries.length - 1,
      Math.max(0, Math.round(latest * (entries.length - 1))),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <div ref={trackRef} className="timeline-track">
      <TimelinePath
        entryCount={entries.length}
        progress={progress}
        reducedMotion={Boolean(shouldReduceMotion)}
      />
      <ol className="timeline-list">
        {entries.map((entry, index) => (
          <TimelineEntryCard
            key={`${entry.period}-${entry.title}`}
            entry={entry}
            index={index}
            isActive={shouldReduceMotion || index === activeIndex}
          />
        ))}
      </ol>
    </div>
  );
}
