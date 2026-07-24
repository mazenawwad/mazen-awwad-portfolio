"use client";

import type { Profile } from "@/content/portfolio";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type HeroProps = {
  profile: Profile;
};

const supportingVariants = {
  hidden: { opacity: 0, y: 22, pointerEvents: "none" as const },
  visible: { opacity: 1, y: 0, pointerEvents: "auto" as const },
};

export function Hero({ profile }: HeroProps) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [introOffset, setIntroOffset] = useState({ x: 0, y: 0, scale: 1 });

  useLayoutEffect(() => {
    const measure = () => {
      const name = nameRef.current;

      if (!name) {
        return;
      }

      const bounds = name.getBoundingClientRect();
      const targetWidth = Math.min(window.innerWidth * 0.86, 1120);

      setIntroOffset({
        x: window.innerWidth / 2 - (bounds.left + bounds.width / 2),
        y: window.innerHeight / 2 - (bounds.top + bounds.height / 2),
        scale: Math.max(1, Math.min(targetWidth / bounds.width, 1.48)),
      });
      setIsReady(true);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const settleTimer = window.setTimeout(() => setIsSettled(true), 1650);
    const accelerateIntro = () => {
      if (window.scrollY > 4) {
        setIsSettled(true);
      }
    };

    window.addEventListener("scroll", accelerateIntro, { passive: true });
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", accelerateIntro);
    };
  }, [shouldReduceMotion]);

  const showFinalState = shouldReduceMotion || isSettled;

  return (
    <section
      id="top"
      className={`hero hero-cinematic${isReady ? " is-ready" : ""}${showFinalState ? " is-settled" : ""}`}
    >
      <div className="hero-copy">
        {/* <motion.p
          className="eyebrow hero-supporting"
          animate={showFinalState ? "visible" : "hidden"}
          variants={supportingVariants}
          transition={{ duration: 0.7, delay: 0.62 }}
        >
          Frontend Developer · Beirut, Lebanon
        </motion.p> */}
        <motion.h1
          ref={nameRef}
          className="hero-name"
          initial={false}
          animate={
            !isReady || showFinalState
              ? { x: 0, y: 0, scale: 1, rotate: 0 }
              : {
                  x: [
                    introOffset.x,
                    introOffset.x + 14,
                    introOffset.x - 11,
                    introOffset.x,
                  ],
                  y: [
                    introOffset.y,
                    introOffset.y - 9,
                    introOffset.y + 7,
                    introOffset.y,
                  ],
                  scale: [
                    introOffset.scale,
                    introOffset.scale * 1.025,
                    introOffset.scale * 0.99,
                    introOffset.scale,
                  ],
                  rotate: [0, 0.7, -0.55, 0],
                }
          }
          transition={
            showFinalState
              ? { duration: 1.45, ease: [0.16, 1, 0.3, 1] }
              : { duration: 3.8, ease: "easeInOut", repeat: Infinity }
          }
        >
          {profile.name}
        </motion.h1>
      </div>
      <motion.a
        className="scroll-cue hero-supporting"
        href="#work"
        animate={showFinalState ? "visible" : "hidden"}
        variants={supportingVariants}
        transition={{ duration: 0.62, delay: 1.08 }}
      >
        <span>Explore work</span>
        <ArrowDown aria-hidden="true" size={17} />
      </motion.a>
    </section>
  );
}
