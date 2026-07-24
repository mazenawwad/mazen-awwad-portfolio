"use client";

import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import {
  siCypress,
  siGit,
  siJavascript,
  siNextdotjs,
  siReact,
  siRedux,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

type DepthIconConfig = {
  icon: SimpleIcon;
  label: string;
  x: number;
  y: number;
  introX: number;
  introY: number;
  minScale: number;
  maxScale: number;
  travel: number;
  driftX: number;
  driftY: number;
  duration: number;
  phase: number;
  mobile: boolean;
};

const depthIcons: DepthIconConfig[] = [
  { icon: siReact, label: "React", x: 8, y: 14, introX: 15, introY: 39, minScale: 0.72, maxScale: 1.28, travel: 44, driftX: 9, driftY: 7, duration: 8, phase: 0.02, mobile: true },
  { icon: siNextdotjs, label: "Next.js", x: 86, y: 9, introX: 85, introY: 38, minScale: 0.68, maxScale: 1.18, travel: 36, driftX: 7, driftY: 10, duration: 10, phase: 0.23, mobile: true },
  { icon: siTypescript, label: "TypeScript", x: 91, y: 38, introX: 78, introY: 61, minScale: 0.66, maxScale: 1.12, travel: 52, driftX: 8, driftY: 6, duration: 9, phase: 0.44, mobile: false },
  { icon: siJavascript, label: "JavaScript", x: 6, y: 47, introX: 22, introY: 61, minScale: 0.7, maxScale: 1.2, travel: 40, driftX: 10, driftY: 8, duration: 11, phase: 0.64, mobile: false },
  { icon: siRedux, label: "Redux", x: 82, y: 67, introX: 64, introY: 28, minScale: 0.74, maxScale: 1.24, travel: 48, driftX: 11, driftY: 6, duration: 8.5, phase: 0.82, mobile: true },
  { icon: siTailwindcss, label: "Tailwind CSS", x: 13, y: 76, introX: 36, introY: 28, minScale: 0.68, maxScale: 1.16, travel: 56, driftX: 8, driftY: 9, duration: 10.5, phase: 0.36, mobile: false },
  { icon: siCypress, label: "Cypress", x: 73, y: 91, introX: 33, introY: 75, minScale: 0.7, maxScale: 1.14, travel: 42, driftX: 7, driftY: 8, duration: 9.5, phase: 0.56, mobile: false },
  { icon: siGit, label: "Git", x: 24, y: 94, introX: 67, introY: 75, minScale: 0.72, maxScale: 1.18, travel: 46, driftX: 10, driftY: 7, duration: 11.5, phase: 0.72, mobile: true },
];

type AnimatedDepthIconProps = {
  config: DepthIconConfig;
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

function getVisibleBrandColor(icon: SimpleIcon) {
  const color = `#${icon.hex}`;
  return icon.hex.toLowerCase() === "000000" ? "#f4f7f5" : color;
}

function AnimatedDepthIcon({
  config,
  progress,
  reducedMotion,
}: AnimatedDepthIconProps) {
  const scale = useTransform(progress, (value) => {
    if (reducedMotion) {
      return (config.minScale + config.maxScale) / 2;
    }

    const wave = (Math.sin((value * 2 + config.phase) * Math.PI * 2) + 1) / 2;
    return config.minScale + wave * (config.maxScale - config.minScale);
  });
  const y = useTransform(progress, (value) => {
    if (reducedMotion) {
      return 0;
    }

    return Math.sin((value * 2 + config.phase) * Math.PI * 2) * config.travel;
  });
  const opacity = useTransform(progress, (value) => {
    if (reducedMotion) {
      return 0.09;
    }

    const wave = (Math.sin((value * 2 + config.phase) * Math.PI * 2) + 1) / 2;
    return 0.07 + wave * 0.12;
  });
  const rotate = useTransform(progress, (value) => {
    if (reducedMotion) {
      return 0;
    }

    return Math.sin((value + config.phase) * Math.PI * 2) * 5;
  });
  const brandColor = getVisibleBrandColor(config.icon);
  const style = {
    "--icon-x": `${config.x}%`,
    "--icon-y": `${config.y}%`,
    "--intro-icon-x": `${config.introX}%`,
    "--intro-icon-y": `${config.introY}%`,
    "--icon-color": brandColor,
    "--icon-glow": `${brandColor}66`,
    "--drift-x": `${config.driftX}px`,
    "--drift-y": `${config.driftY}px`,
    "--drift-duration": `${config.duration}s`,
    "--drift-delay": `${config.phase * -10}s`,
    "--intro-orbit-angle": `${config.phase * 360}deg`,
    "--intro-orbit-radius": "clamp(170px, 28vw, 410px)",
    "--intro-orbit-duration": `${6.4 + config.phase * 4}s`,
  } as CSSProperties;

  return (
    <motion.span
      className={`depth-icon${config.mobile ? " depth-icon-mobile" : ""}`}
      style={{ ...style, opacity, rotate, scale, y }}
    >
      <span className="depth-icon-drift">
        <svg viewBox="0 0 24 24">
          <path d={config.icon.path} fill={brandColor} />
        </svg>
      </span>
    </motion.span>
  );
}

export function TechnologyDepthField() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateTopState = () => {
      document.body.classList.toggle("is-at-page-top", window.scrollY <= 4);
    };

    updateTopState();
    window.addEventListener("scroll", updateTopState, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateTopState);
      document.body.classList.remove("is-at-page-top");
    };
  }, []);

  return (
    <div className="technology-depth-field" aria-hidden="true">
      {depthIcons.map((config) => (
        <AnimatedDepthIcon
          key={config.label}
          config={config}
          progress={scrollYProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        />
      ))}
    </div>
  );
}
