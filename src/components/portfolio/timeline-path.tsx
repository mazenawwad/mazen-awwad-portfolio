"use client";

import { motion, type MotionValue, useTransform } from "motion/react";

type TimelinePathProps = {
  entryCount: number;
  points: TimelinePathPoint[];
  height: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

const ROW_HEIGHT = 270;
const TOP_OFFSET = 130;

export type TimelinePathPoint = {
  x: number;
  y: number;
};

function getFallbackPoints(entryCount: number) {
  return Array.from({ length: entryCount }, (_, index) => ({
    x: index % 2 === 0 ? 430 : 570,
    y: TOP_OFFSET + index * ROW_HEIGHT,
  }));
}

function buildTimelinePath(points: TimelinePathPoint[]) {
  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = points[index - 1];
    const midpoint = (previous.y + point.y) / 2;
    return `${path} C ${previous.x} ${midpoint}, ${point.x} ${midpoint}, ${point.x} ${point.y}`;
  }, "");
}

export function TimelinePath({
  entryCount,
  points,
  height,
  progress,
  reducedMotion,
}: TimelinePathProps) {
  const resolvedPoints = points.length ? points : getFallbackPoints(entryCount);
  const resolvedHeight =
    height || TOP_OFFSET * 2 + Math.max(0, entryCount - 1) * ROW_HEIGHT;
  const path = buildTimelinePath(resolvedPoints);
  const dashOffset = useTransform(progress, [0, 1], [1, 0]);

  return (
    <svg
      className="timeline-curve"
      viewBox={`0 0 1000 ${resolvedHeight}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="timeline-curve-base"
        d={path}
        fill="none"
        pathLength={1}
        stroke="rgba(244, 247, 245, 0.22)"
      />
      <motion.path
        className="timeline-curve-progress"
        d={path}
        fill="none"
        pathLength={1}
        stroke="#62e6a4"
        strokeDasharray={1}
        style={{ strokeDashoffset: reducedMotion ? 0 : dashOffset }}
      />
    </svg>
  );
}
