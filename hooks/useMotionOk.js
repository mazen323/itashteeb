"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";


let query;
const mediaQuery = () => (query ??= window.matchMedia(REDUCED_MOTION));

const motionStore = {
  subscribe(callback) {
    const target = mediaQuery();
    target.addEventListener("change", callback);
    return () => target.removeEventListener("change", callback);
  },
  getSnapshot: () => !mediaQuery().matches,
  getServerSnapshot: () => false,
};

// false on the server and during hydration, so animations start on the client
export function useMotionOk() {
  return useSyncExternalStore(
    motionStore.subscribe,
    motionStore.getSnapshot,
    motionStore.getServerSnapshot,
  );
}
