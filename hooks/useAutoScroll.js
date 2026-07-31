"use client";

import { useEffect, useRef } from "react";
import { useMotionOk } from "./useMotionOk";

// one tick moves a little less than a viewport, same as the arrow buttons
const PAGE_RATIO = 0.8;
const GESTURE_QUIET_MS = 4000;

const forwardSign = (track) =>
  getComputedStyle(track).direction === "rtl" ? -1 : 1;


export function useAutoScroll(
  trackRef,
  { intervalMs = 5000, paused = false, resetKey } = {},
) {
  const motionOk = useMotionOk();
  const engaged = useRef(false);
  const lastGesture = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !motionOk || paused) return;

    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => (inView = entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(track);

    const engage = () => (engaged.current = true);
    const release = () => (engaged.current = false);
    const gesture = () => (lastGesture.current = performance.now());

    // hovering or tabbing into the track holds it; a gesture only delays it
    track.addEventListener("pointerenter", engage);
    track.addEventListener("pointerleave", release);
    track.addEventListener("focusin", engage);
    track.addEventListener("focusout", release);
    track.addEventListener("pointerdown", gesture);
    track.addEventListener("wheel", gesture, { passive: true });
    track.addEventListener("touchstart", gesture, { passive: true });

    const timer = setInterval(() => {
      if (!inView || engaged.current || document.hidden) return;
      if (performance.now() - lastGesture.current < GESTURE_QUIET_MS) return;

      const max = track.scrollWidth - track.clientWidth;
      if (max < 4) return;

      const atEnd = Math.abs(track.scrollLeft) >= max - 4;
      track.scrollTo({
        left: atEnd
          ? 0
          : track.scrollLeft + forwardSign(track) * track.clientWidth * PAGE_RATIO,
        behavior: "smooth",
      });
    }, intervalMs);

    return () => {
      clearInterval(timer);
      observer.disconnect();
      track.removeEventListener("pointerenter", engage);
      track.removeEventListener("pointerleave", release);
      track.removeEventListener("focusin", engage);
      track.removeEventListener("focusout", release);
      track.removeEventListener("pointerdown", gesture);
      track.removeEventListener("wheel", gesture);
      track.removeEventListener("touchstart", gesture);
    };
  }, [trackRef, motionOk, paused, intervalMs, resetKey]);
}
