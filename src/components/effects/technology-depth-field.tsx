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
  siPrisma,
  siReact,
  siRedux,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

const playwrightIcon: SimpleIcon = {
  title: "Playwright",
  slug: "playwright",
  hex: "2EAD33",
  source: "https://playwright.dev",
  svg: "",
  path: "",
};

type DepthIconConfig = {
  icon: SimpleIcon;
  assetSrc?: string;
  label: string;
  x: number;
  y: number;
  introX: number;
  introY: number;
  mobileX: number;
  mobileY: number;
  mobileIntroX: number;
  mobileIntroY: number;
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
  { icon: siReact, label: "React", x: 8, y: 14, introX: 15, introY: 39, mobileX: 12, mobileY: 12, mobileIntroX: 12, mobileIntroY: 34, minScale: 0.72, maxScale: 1.28, travel: 44, driftX: 9, driftY: 7, duration: 8, phase: 0.02, mobile: true },
  { icon: siNextdotjs, label: "Next.js", x: 86, y: 9, introX: 85, introY: 38, mobileX: 88, mobileY: 12, mobileIntroX: 88, mobileIntroY: 34, minScale: 0.68, maxScale: 1.18, travel: 36, driftX: 7, driftY: 10, duration: 10, phase: 0.23, mobile: true },
  { icon: siTypescript, label: "TypeScript", x: 91, y: 38, introX: 78, introY: 61, mobileX: 88, mobileY: 42, mobileIntroX: 88, mobileIntroY: 56, minScale: 0.66, maxScale: 1.12, travel: 52, driftX: 8, driftY: 6, duration: 9, phase: 0.44, mobile: false },
  { icon: siJavascript, label: "JavaScript", x: 6, y: 47, introX: 22, introY: 61, mobileX: 12, mobileY: 42, mobileIntroX: 12, mobileIntroY: 56, minScale: 0.7, maxScale: 1.2, travel: 40, driftX: 10, driftY: 8, duration: 11, phase: 0.64, mobile: false },
  { icon: siRedux, label: "Redux", x: 82, y: 67, introX: 64, introY: 28, mobileX: 86, mobileY: 70, mobileIntroX: 72, mobileIntroY: 25, minScale: 0.74, maxScale: 1.24, travel: 48, driftX: 11, driftY: 6, duration: 8.5, phase: 0.82, mobile: true },
  { icon: siTailwindcss, label: "Tailwind CSS", x: 13, y: 76, introX: 36, introY: 28, mobileX: 14, mobileY: 70, mobileIntroX: 28, mobileIntroY: 25, minScale: 0.68, maxScale: 1.16, travel: 56, driftX: 8, driftY: 9, duration: 10.5, phase: 0.36, mobile: false },
  { icon: siCypress, label: "Cypress", x: 73, y: 91, introX: 33, introY: 75, mobileX: 24, mobileY: 91, mobileIntroX: 28, mobileIntroY: 82, minScale: 0.7, maxScale: 1.14, travel: 42, driftX: 7, driftY: 8, duration: 9.5, phase: 0.56, mobile: false },
  { icon: siGit, label: "Git", x: 24, y: 94, introX: 67, introY: 75, mobileX: 76, mobileY: 91, mobileIntroX: 72, mobileIntroY: 82, minScale: 0.72, maxScale: 1.18, travel: 46, driftX: 10, driftY: 7, duration: 11.5, phase: 0.72, mobile: true },
  { icon: siPrisma, label: "Prisma", x: 42, y: 11, introX: 50, introY: 23, mobileX: 42, mobileY: 25, mobileIntroX: 50, mobileIntroY: 16, minScale: 0.66, maxScale: 1.12, travel: 50, driftX: 8, driftY: 7, duration: 9.8, phase: 0.14, mobile: false },
  { icon: playwrightIcon, assetSrc: "/playwright-logo.svg", label: "Playwright", x: 59, y: 88, introX: 50, introY: 80, mobileX: 58, mobileY: 79, mobileIntroX: 50, mobileIntroY: 91, minScale: 0.68, maxScale: 1.16, travel: 44, driftX: 9, driftY: 8, duration: 10.8, phase: 0.91, mobile: false },
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
      return 0.14;
    }

    const wave = (Math.sin((value * 2 + config.phase) * Math.PI * 2) + 1) / 2;
    return 0.11 + wave * 0.17;
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
    "--mobile-icon-x": `${config.mobileX}%`,
    "--mobile-icon-y": `${config.mobileY}%`,
    "--mobile-intro-icon-x": `${config.mobileIntroX}%`,
    "--mobile-intro-icon-y": `${config.mobileIntroY}%`,
    "--icon-color": brandColor,
    "--icon-glow": `${brandColor}88`,
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
        {config.assetSrc ? (
          <img src={config.assetSrc} alt="" />
        ) : (
          <svg viewBox="0 0 24 24">
            <path d={config.icon.path} fill={brandColor} />
          </svg>
        )}
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
