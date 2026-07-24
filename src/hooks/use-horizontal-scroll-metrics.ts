"use client";

import type { RefObject } from "react";
import { useEffect, useState } from "react";

const DESKTOP_MEDIA_QUERY = "(min-width: 901px)";
const CARD_DWELL_UNITS = 1;
const CARD_TRANSITION_UNITS = 0.7;
const MINIMUM_SCROLL_FACTOR = 1.25;
const UNIT_VIEWPORT_FACTOR = 0.28;

function normalizeProgress(value: number) {
  return Math.min(1, Math.max(0, value));
}

export type CardActivationRange = {
  centerEnd: number;
  centerStart: number;
};

type HorizontalScrollMetrics = {
  activationRanges: CardActivationRange[];
  offsets: number[];
  progressStops: number[];
  sectionHeight: number | undefined;
};

const emptyMetrics: HorizontalScrollMetrics = {
  activationRanges: [],
  offsets: [0, 0],
  progressStops: [0, 1],
  sectionHeight: undefined,
};

function createScrollSequence(cardOffsets: number[]) {
  if (cardOffsets.length === 0) {
    return {
      activationRanges: [] as CardActivationRange[],
      offsets: [0, 0],
      progressStops: [0, 1],
      totalUnits: 1,
    };
  }

  const totalUnits =
    cardOffsets.length * CARD_DWELL_UNITS +
    Math.max(0, cardOffsets.length - 1) * CARD_TRANSITION_UNITS;
  const progressStops: number[] = [0];
  const offsets: number[] = [cardOffsets[0]];
  const activationRanges: CardActivationRange[] = [];
  let elapsedUnits = 0;

  cardOffsets.forEach((offset, index) => {
    const centerStart = normalizeProgress(elapsedUnits / totalUnits);
    elapsedUnits += CARD_DWELL_UNITS;
    const centerEnd = normalizeProgress(elapsedUnits / totalUnits);

    activationRanges.push({ centerStart, centerEnd });
    progressStops.push(centerEnd);
    offsets.push(offset);

    if (index < cardOffsets.length - 1) {
      elapsedUnits += CARD_TRANSITION_UNITS;
      progressStops.push(normalizeProgress(elapsedUnits / totalUnits));
      offsets.push(cardOffsets[index + 1]);
    }
  });

  return {
    activationRanges,
    offsets,
    progressStops,
    totalUnits,
  };
}

export function useHorizontalScrollMetrics(
  viewportRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  isDisabled: boolean,
): HorizontalScrollMetrics {
  const [metrics, setMetrics] =
    useState<HorizontalScrollMetrics>(emptyMetrics);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    if (!viewport || !track || isDisabled || !desktopQuery.matches) {
      setMetrics(emptyMetrics);
      return;
    }

    const measure = () => {
      if (!desktopQuery.matches) {
        setMetrics(emptyMetrics);
        return;
      }

      const styles = window.getComputedStyle(viewport);
      const horizontalPadding =
        Number.parseFloat(styles.paddingLeft) +
        Number.parseFloat(styles.paddingRight);
      const availableWidth = viewport.clientWidth - horizontalPadding;
      const viewportCenter = availableWidth / 2;
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-skill-card]"),
      );
      const cardOffsets = cards.map(
        (card) => viewportCenter - (card.offsetLeft + card.offsetWidth / 2),
      );
      const sequence = createScrollSequence(cardOffsets);
      const travelDistance =
        cardOffsets.length > 1
          ? Math.abs(cardOffsets.at(-1)! - cardOffsets[0])
          : 0;
      const scrollDistance = Math.max(
        travelDistance * MINIMUM_SCROLL_FACTOR,
        window.innerHeight * sequence.totalUnits * UNIT_VIEWPORT_FACTOR,
      );

      setMetrics({
        activationRanges: sequence.activationRanges,
        offsets: sequence.offsets,
        progressStops: sequence.progressStops,
        sectionHeight: window.innerHeight + scrollDistance,
      });
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    desktopQuery.addEventListener("change", measure);
    measure();

    return () => {
      resizeObserver.disconnect();
      desktopQuery.removeEventListener("change", measure);
    };
  }, [isDisabled, trackRef, viewportRef]);

  return metrics;
}
