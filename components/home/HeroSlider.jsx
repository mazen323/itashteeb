"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, GripHorizontal } from "lucide-react";
import { useMotionOk } from "@/hooks/useMotionOk";
import { localize } from "@/data/i18n";
import {
  BLUR_DATA_URL,
  heroSlides as rawHeroSlides,
  trustBadges as rawTrustBadges,
} from "@/data/mock";
import { ui } from "@/data/ui";
import SceneCustomizer from "./SceneCustomizer";
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
  const [dragging, setDragging] = useState(false);
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

  
  const suspended = focused || dragging || tabHidden;

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
        className="absolute inset-0 from-brand-950/85 via-brand-950/35 to-transparent rtl:bg-linear-to-l ltr:bg-linear-to-r"
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
          {slide.draggables ? (
            <>
              <SceneCustomizer
                key={locale}
                draggables={slide.draggables}
                mirror={!rtl}
                active={i === index}
                onDragChange={setDragging}
                label={t.dragItem}
              />
              {/* hint sits on the tags side, not the copy side */}
              <p className="absolute bottom-40 inset-e-6 flex items-center gap-2 rounded-full bg-stone-950/35 px-3.5 py-2 text-xs font-medium text-white/90 ring-1 ring-white/20 backdrop-blur-md">
                <GripHorizontal className="size-4" aria-hidden="true" />
                {t.dragHint}
              </p>
            </>
          ) : (
            <SceneHighlights
              items={slide.highlights}
              mirror={!rtl}
              active={i === index}
            />
          )}
        </div>
      ))}

   
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-36 sm:px-6 lg:justify-center lg:px-8 lg:pb-32">
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
                  className={`inline-flex items-center gap-2 rounded-full bg-stone-950/35 px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-md sm:text-sm ${
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
                    className={`-mb-2 pb-2 text-4xl leading-[1.15] font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl ${
                      on ? "hero-reveal" : ""
                    }`}
                  >
                    {slide.title}{" "}
                    <span className="text-accent-300">{slide.highlight}</span>
                  </h1>
                </span>

                <p
                  style={{ animationDelay: "340ms" }}
                  className={`max-w-lg text-base leading-relaxed text-white/85 drop-shadow-sm md:text-lg ${
                    on ? "hero-rise" : ""
                  }`}
                >
                  {slide.description}
                </p>

                <div
                  style={{ animationDelay: "440ms" }}
                  className={`flex flex-wrap items-center gap-3 ${on ? "hero-rise" : ""}`}
                >
                  <Link
                    href={slide.cta.href}
                    className="group inline-flex items-center gap-2 rounded-2xl bg-accent-400 px-6 py-3.5 text-sm font-bold text-stone-950 shadow-xl shadow-stone-950/25 transition hover:bg-accent-300 md:text-base"
                  >
                    {slide.cta.label}
                    <ArrowForward />
                  </Link>
                  {/* dark fill keeps the white label readable over any image */}
                  <Link
                    href="#what-we-offer"
                    className="inline-flex items-center rounded-2xl bg-stone-950/30 px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/35 backdrop-blur-md transition hover:bg-stone-950/50 md:text-base"
                  >
                    {t.secondaryCta}
                  </Link>
                </div>

                <ul
                  style={{ animationDelay: "540ms" }}
                  className={`flex flex-wrap items-center gap-2.5 ${on ? "hero-rise" : ""}`}
                >
                  {trustBadges.map((badge) => (
                    <li
                      key={badge.id}
                      className="inline-flex items-center gap-2 rounded-full bg-stone-950/35 px-3.5 py-2 text-xs font-semibold text-white/90 ring-1 ring-white/20 backdrop-blur-md sm:text-sm"
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
        <div className="pointer-events-auto mt-9 flex flex-wrap items-center gap-x-5 gap-y-4 lg:mt-12">
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
    <div className="absolute inset-0">
      {items.map((item, i) => (
        <div
          key={item.id}
          style={{
            left: `${mirror ? 100 - item.x : item.x}%`,
            top: `${item.y}%`,
            animationDelay: `${380 + i * 120}ms`,
          }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${
            active ? "hero-pop" : ""
          }`}
        >
          <span className="flex items-center gap-2 rounded-full bg-white/95 py-2 ps-2 pe-3.5 shadow-xl shadow-stone-950/40 ring-1 ring-stone-950/10 backdrop-blur">
            <span
              className="grid size-7 place-items-center rounded-full text-white"
              style={{ backgroundColor: item.swatch }}
            >
              <item.icon className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-stone-800">
              {item.label}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
