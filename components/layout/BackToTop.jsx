"use client";

import { useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";
import { useMotionOk } from "@/hooks/useMotionOk";
import { ui } from "@/data/ui";


const THRESHOLD = 0.85;


const scrollStore = {
  subscribe(callback) {
    window.addEventListener("scroll", callback, { passive: true });
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("scroll", callback);
      window.removeEventListener("resize", callback);
    };
  },
  get: () => window.scrollY > window.innerHeight * THRESHOLD,
  getServer: () => false,
};

export default function BackToTop({ locale }) {
  const show = useSyncExternalStore(
    scrollStore.subscribe,
    scrollStore.get,
    scrollStore.getServer,
  );
  const motionOk = useMotionOk();
  const label = ui[locale].backToTop;

  return (
   
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: motionOk ? "smooth" : "auto" })
      }
      aria-label={label}
      title={label}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`group fixed bottom-6 inset-e-4 z-40 grid size-12 cursor-pointer place-items-center rounded-2xl bg-brand-700/95 text-white shadow-xl shadow-brand-950/30 ring-1 ring-white/20 backdrop-blur-md transition duration-300 ease-out hover:bg-brand-800 hover:shadow-2xl active:bg-brand-900 sm:bottom-8 sm:inset-e-8 ${
        show
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-95 opacity-0"
      }`}
    >
      <ArrowUp
        className="size-5 transition-transform group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </button>
  );
}
