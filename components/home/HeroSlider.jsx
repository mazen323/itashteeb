"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useMotionOk } from "@/hooks/useMotionOk";
import { localize } from "@/data/i18n";
import {
  BLUR_DATA_URL,
  heroSlides as rawHeroSlides,
  trustBadges as rawTrustBadges,
} from "@/data/mock";
import { ui } from "@/data/ui";
import ArrowForward from "../ui/ArrowForward";

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD = 48; 

export default function HeroSlider({ locale }) {
  const t = ui[locale].hero;
  const heroSlides = localize(rawHeroSlides, locale);
  const trustBadges = localize(rawTrustBadges, locale);
  // In LTR the copy sits on the left, so the scene tags mirror to the right.
  const rtl = locale !== "en";

  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const swipeStart = useRef(null);


  const motionOk = useMotionOk();

  const count = heroSlides.length;
  const goTo = (next) => setIndex(((next % count) + count) % count);

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  
  const suspended = focused || tabHidden;

  // Swipe toward the reading start goes forward: right in RTL, left in LTR.
  const handlePointerUp = (event) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;

    const dx = event.clientX - start;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    goTo(index + (dx > 0 === rtl ? 1 : -1));
  };

  // Same for the arrow keys: ArrowLeft goes forward in RTL, ArrowRight in LTR.
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") goTo(index + (rtl ? 1 : -1));
    else if (event.key === "ArrowRight") goTo(index + (rtl ? -1 : 1));
    else return;
    event.preventDefault();
  };

  return (
    <div
      role="group"
      aria-roledescription={t.sliderRole}
      aria-label={t.slider}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}

      onPointerDown={(event) => {
        swipeStart.current = event.target.closest("button, a")
          ? null
          : event.clientX;
      }}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => (swipeStart.current = null)}
      onPointerLeave={() => (swipeStart.current = null)}
      onKeyDown={handleKeyDown}
      // touch-pan-y keeps vertical scrolling native and frees up the x axis
      className="absolute inset-0 touch-pan-y select-none"
    >
      <p aria-live="polite" className="sr-only">
        {t.announce(index + 1, count)}
      </p>

      {heroSlides.map((slide, i) => (
        <Image
          key={slide.id}
          src={slide.image}
          alt={slide.imageAlt}
          fill
          priority={i === 0}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          aria-hidden={i !== index}
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          } ${i === index && motionOk ? "hero-kenburns" : ""}`}
        />
      ))}

      {/* Scrims: bottom one for depth, copy-side one for text contrast */}
      <div
        className="absolute inset-0 bg-linear-to-t from-stone-950/85 via-stone-950/30 to-stone-950/45"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 from-brand-950/92 via-brand-950/45 to-transparent rtl:bg-linear-to-l ltr:bg-linear-to-r"
        aria-hidden="true"
      />

      {/* Scene tags */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          inert={i !== index}
          aria-hidden={i !== index}
          className={`absolute inset-0 hidden transition-opacity duration-700 md:block ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <SceneHighlights
            items={slide.highlights}
            mirror={!rtl}
            active={i === index}
          />
        </div>
      ))}

   
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-32 sm:px-6 sm:pb-36 lg:justify-center lg:px-8 lg:pb-32">
        <div className="pointer-events-auto grid max-w-xl lg:max-w-2xl">
          {heroSlides.map((slide, i) => {
            const on = i === index;
            return (
              <div
                key={slide.id}
                inert={!on}
                aria-hidden={!on}
                className={`col-start-1 row-start-1 flex flex-col items-start gap-5 transition-[opacity,visibility] duration-500 md:gap-6 ${
                  on ? "opacity-100" : "invisible opacity-0"
                }`}
              >
                <span
                  style={{ animationDelay: "80ms" }}
                  className={`inline-flex items-center gap-2 rounded-full bg-stone-950/35 px-3.5 py-1.5 text-[11px] font-semibold text-white ring-1 ring-white/25 backdrop-blur-md sm:px-4 sm:text-sm ${
                    on ? "hero-rise" : ""
                  }`}
                >
                  <span
                    className="size-2 rounded-full bg-accent-400"
                    aria-hidden="true"
                  />
                  {slide.eyebrow}
                </span>

                {/* wrapper clips the heading so it wipes up from below */}
                <span className="block overflow-hidden">
                  <h1
                    style={{ animationDelay: "180ms" }}
                    className={`-mb-2 pb-2 text-[1.75rem] leading-[1.2] font-extrabold text-balance sm:leading-[1.15] tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl ${
                      on ? "hero-reveal" : ""
                    }`}
                  >
                    {slide.title}{" "}
                    <span className="text-accent-300">{slide.highlight}</span>
                  </h1>
                </span>

                <p
                  style={{ animationDelay: "340ms" }}
                  className={`max-w-lg text-sm leading-relaxed text-white/85 drop-shadow-sm sm:text-base md:text-lg ${
                    on ? "hero-rise" : ""
                  }`}
                >
                  {slide.description}
                </p>

                <div
                  style={{ animationDelay: "440ms" }}
                  className={`flex w-full flex-wrap items-center gap-3 sm:w-auto ${on ? "hero-rise" : ""}`}
                >
                  <Link
                    href={slide.cta.href}
                    className="group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent-400 px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 font-bold text-stone-950 shadow-xl shadow-stone-950/25 transition hover:bg-accent-300 sm:flex-none md:text-base"
                  >
                    {slide.cta.label}
                    <ArrowForward />
                  </Link>
                  {/* dark fill keeps the white label readable over any image */}
                  <Link
                    href="#what-we-offer"
                    className="inline-flex flex-1 items-center justify-center rounded-2xl bg-stone-950/30 px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 font-bold text-white ring-1 ring-white/35 backdrop-blur-md transition hover:bg-stone-950/50 sm:flex-none md:text-base"
                  >
                    {t.secondaryCta}
                  </Link>
                </div>

                <ul
                  style={{ animationDelay: "540ms" }}
                  className={`grid w-full grid-cols-3 divide-x divide-white/15 rounded-2xl bg-stone-950/45 ring-1 ring-white/15 backdrop-blur-md sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-2.5 sm:divide-x-0 sm:rounded-none sm:bg-transparent sm:ring-0 sm:backdrop-blur-none ${on ? "hero-rise" : ""}`}
                >
                  {trustBadges.map((badge) => (
                    <li
                      key={badge.id}
                      className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 text-center text-[11px] leading-tight font-semibold text-white/90 sm:flex-row sm:gap-2 sm:rounded-full sm:bg-stone-950/35 sm:px-3.5 sm:py-2 sm:text-sm sm:ring-1 sm:ring-white/20 sm:backdrop-blur-md"
                    >
                      <badge.icon
                        className="size-4 text-accent-300"
                        aria-hidden="true"
                      />
                      {badge.label}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Slide controls */}
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 sm:mt-10 lg:mt-12">
          <div className="flex items-center gap-3">
            {heroSlides.map((slide, i) => {
              const on = i === index;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={t.goTo(i + 1, slide.eyebrow)}
                  aria-current={on}
                  className="group flex items-center gap-2"
                >
                  <span
                    className={`text-xs font-bold tabular-nums transition-colors ${
                      on ? "text-white" : "text-white/60 group-hover:text-white/85"
                    }`}
                  >
                    {`0${i + 1}`}
                  </span>
                  <span
                    className={`h-0.5 overflow-hidden rounded-full bg-white/25 transition-[width] duration-500 ${
                      on ? "w-16 lg:w-20" : "w-5 group-hover:bg-white/45"
                    }`}
                  >
                    {on &&
                      (motionOk ? (
                        // the bar's animationEnd is what advances the slide, so
                        // they stay in sync even after a pause
                        <span
                          key={index}
                          onAnimationEnd={() => goTo(index + 1)}
                          style={{
                            animationDuration: `${AUTOPLAY_MS}ms`,
                            animationPlayState: suspended ? "paused" : "running",
                          }}
                          className="hero-progress block h-full w-full rounded-full bg-accent-400"
                        />
                      ) : (
                        <span className="block h-full w-full rounded-full bg-accent-400" />
                      ))}
                  </span>
                </button>
              );
            })}
          </div>

          {/* start side goes back, end side forward */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={t.prev}
              className="grid size-10 place-items-center rounded-full bg-stone-950/30 text-white ring-1 ring-white/30 backdrop-blur-md transition hover:bg-stone-950/55"
            >
              <ChevronRight className="size-5 ltr:rotate-180" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={t.next}
              className="grid size-10 place-items-center rounded-full bg-stone-950/30 text-white ring-1 ring-white/30 backdrop-blur-md transition hover:bg-stone-950/55"
            >
              <ChevronRight className="size-5 rotate-180 ltr:rotate-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* curve blends the hero into the page background */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-20 h-16 w-full fill-white ltr:-scale-x-100 sm:h-24 lg:h-32"
      >
        <path d="M0,120 L0,64 C260,116 520,124 780,100 C1020,78 1230,40 1440,26 L1440,120 Z" />
      </svg>
    </div>
  );
}

function SceneHighlights({ items, mirror, active }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {items.map((item, i) => (
        <div
          key={item.id}
          style={{
            left: `${mirror ? 100 - item.x : item.x}%`,
            top: `${item.y}%`,
            animationDelay: `${380 + i * 140}ms`,
          }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${
            active ? "hero-pop" : ""
          }`}
        >
          <span
            style={{
              animationDelay: `${i * 900}ms`,
              animationDuration: `${5.5 + i * 0.9}s`,
            }}
            className="marker-float relative block"
          >
            <span className="absolute inset-0 -z-10 rounded-full bg-stone-950/25 blur-xl" />
            <item.icon
              className="size-12 text-white/90 drop-shadow-[0_2px_14px_rgba(10,36,35,0.65)] lg:size-16"
              strokeWidth={1.1}
            />
          </span>
        </div>
      ))}
    </div>
  );
}
