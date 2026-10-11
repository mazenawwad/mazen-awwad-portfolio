"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TimelineEntryCard } from "./timeline-entry-card";
import { TimelinePath, type TimelinePathPoint } from "./timeline-path";

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
  const entryRefs = useRef<(HTMLLIElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [pathPoints, setPathPoints] = useState<TimelinePathPoint[]>([]);
  const [pathHeight, setPathHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 52%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 0.45,
    restDelta: 0.0005,
  });

  useMotionValueEvent(progress, "change", (latest) => {
    const nextIndex = Math.min(
      entries.length - 1,
      Math.max(0, Math.round(latest * (entries.length - 1))),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const measurePath = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const trackBounds = track.getBoundingClientRect();
    const nextPoints = entries.map((_, index) => {
      const entry = entryRefs.current[index];
      const entryBounds = entry?.getBoundingClientRect();

      return {
        x: index % 2 === 0 ? 430 : 570,
        y: entryBounds
          ? entryBounds.top - trackBounds.top + entryBounds.height / 2
          : 130 + index * 270,
      };
    });

    setPathPoints(nextPoints);
    setPathHeight(trackBounds.height);
  }, [entries]);

  useEffect(() => {
    measurePath();

    const observer = new ResizeObserver(measurePath);
    const track = trackRef.current;

    if (track) {
      observer.observe(track);
    }

    entryRefs.current.forEach((entry) => {
      if (entry) {
        observer.observe(entry);
      }
    });

    window.addEventListener("resize", measurePath);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measurePath);
    };
  }, [measurePath]);

  return (
    <div ref={trackRef} className="timeline-track">
      <TimelinePath
        entryCount={entries.length}
        points={pathPoints}
        height={pathHeight}
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
            nodeRef={(element) => {
              entryRefs.current[index] = element;
            }}
          />
        ))}
      </ol>
    </div>
  );
}
