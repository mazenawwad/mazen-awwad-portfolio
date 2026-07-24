"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    let lenis: Lenis | undefined;
    let resetFrame = 0;

    const resetScrollPosition = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      lenis?.scrollTo(0, { force: true, immediate: true });
    };

    const configureScrolling = () => {
      lenis?.destroy();
      lenis = undefined;

      if (reducedMotion.matches) {
        return;
      }

      lenis = new Lenis({
        anchors: {
          offset: -88,
        },
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchInertiaExponent: 1.65,
        touchMultiplier: 1,
        wheelMultiplier: 0.9,
      });
    };

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    reducedMotion.addEventListener("change", configureScrolling);
    configureScrolling();
    resetScrollPosition();
    resetFrame = window.requestAnimationFrame(resetScrollPosition);

    return () => {
      window.cancelAnimationFrame(resetFrame);
      reducedMotion.removeEventListener("change", configureScrolling);
      lenis?.destroy();
    };
  }, []);

  return null;
}
