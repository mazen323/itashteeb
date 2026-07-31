"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, MoveHorizontal, Users } from "lucide-react";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { localize } from "@/data/i18n";
import { serviceCategories as rawCategories } from "@/data/mock";
import { ui } from "@/data/ui";
import SectionHeading from "../ui/SectionHeading";
import ViewAllLink from "../ui/ViewAllLink";
import ArrowForward from "../ui/ArrowForward";

// wave that cuts the white page into the tinted band, same motif as the hero
const WAVE_PATH = "M0,0 H1440 V44 C1200,96 1040,96 780,58 C520,20 260,20 0,68 Z";

// a pointer has to travel this far before the gesture counts as a drag
const DRAG_THRESHOLD = 6;
// one arrow click moves a little less than a full viewport, so a card stays in view
const PAGE_RATIO = 0.8;

// scrollLeft counts down from 0 in RTL, so distances are read as absolutes
const forwardSign = (track) =>
  getComputedStyle(track).direction === "rtl" ? -1 : 1;

export default function ServiceCategoriesSection({ locale }) {
  const t = ui[locale].services;
  const categories = localize(rawCategories, locale);
  const rtl = locale !== "en";

  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [view, setView] = useState({ ratio: 0, thumb: 100 });

  const trackRef = useRef(null);
  const tabRefs = useRef([]);
  const dragRef = useRef(null);
  const swallowClick = useRef(false);

  const category = categories[active];

  const measure = () => {
    const track = trackRef.current;
    const max = track.scrollWidth - track.clientWidth;
    const scrolled = Math.min(Math.abs(track.scrollLeft), max);

    setView({
      ratio: max > 1 ? scrolled / max : 0,
      thumb: Math.min(100, (track.clientWidth / track.scrollWidth) * 100),
    });
  };

  useAutoScroll(trackRef, { paused: dragging, resetKey: active });

  // switching category swaps the whole card set, so rewind and re-measure
  useEffect(() => {
    const track = trackRef.current;
    track.scrollTo({ left: 0 });

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [active]);

  const page = (direction) => {
    const track = trackRef.current;
    track.scrollBy({
      left: forwardSign(track) * direction * track.clientWidth * PAGE_RATIO,
      behavior: "smooth",
    });
  };

  // ArrowLeft moves forward in RTL, ArrowRight in LTR
  const handleTabKeys = (event) => {
    const step =
      event.key === "ArrowLeft" ? (rtl ? 1 : -1)
      : event.key === "ArrowRight" ? (rtl ? -1 : 1)
      : 0;
    if (!step) return;

    event.preventDefault();
    const next = (active + step + categories.length) % categories.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const startDrag = (event) => {
    swallowClick.current = false;
    if (event.pointerType !== "mouse") return;

    const track = trackRef.current;
    track.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, left: track.scrollLeft, moved: false };
  };

  const moveDrag = (event) => {
    const start = dragRef.current;
    if (!start) return;

    const dx = event.clientX - start.x;
    if (!start.moved && Math.abs(dx) < DRAG_THRESHOLD) return;

    start.moved = true;
    setDragging(true);
    trackRef.current.scrollLeft = start.left - dx;
  };

  const endDrag = () => {
    if (!dragRef.current) return;

    // a drag must not open the card it happened to end on
    swallowClick.current = dragRef.current.moved;
    dragRef.current = null;
    setDragging(false);
  };

  const handleClickCapture = (event) => {
    if (!swallowClick.current) return;

    swallowClick.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const atStart = view.ratio <= 0.01;
  const atEnd = view.ratio >= 0.99;

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-linear-to-b from-brand-50 via-brand-100/55 to-brand-50/70"
    >
      <WaveEdge className="top-0" />
      <WaveEdge className="bottom-0 rotate-180" />

      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-0 -z-10 opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 inset-s-1/4 -z-10 size-96 rounded-full bg-brand-300/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 inset-e-0 -z-10 size-80 rounded-full bg-accent-300/15 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-20 pb-20 sm:px-6 md:pt-28 md:pb-28 lg:px-8">
        <SectionHeading title={t.title} description={t.description} />

        <div
          role="tablist"
          aria-label={t.tabs}
          onKeyDown={handleTabKeys}
          className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        >
          {categories.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.id}
                ref={(node) => (tabRefs.current[i] = node)}
                type="button"
                role="tab"
                id={`service-tab-${item.id}`}
                aria-selected={on}
                aria-controls={`service-panel-${item.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className={`inline-flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                  on
                    ? "bg-brand-700 text-white shadow-lg shadow-brand-900/15"
                    : "bg-white text-stone-700 ring-1 ring-stone-200 hover:text-brand-700 hover:ring-brand-300"
                }`}
              >
                <item.icon
                  className={`size-4 ${on ? "text-accent-300" : "text-brand-600"}`}
                  aria-hidden="true"
                />
                {item.label}
                <span
                  aria-hidden="true"
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                    on ? "bg-white/15 text-white" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {item.services.length}
                </span>
                <span className="sr-only">{t.count(item.services.length)}</span>
              </button>
            );
          })}
        </div>

        {/* Active category header, with the slider controls on the end side */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-stone-200/80 pt-6">
          <div className="flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-700 shadow-sm ring-1 ring-stone-200">
              <category.icon className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-bold text-stone-900">{category.label}</h3>
              <p className="text-sm text-stone-500">{category.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="relative h-1 w-24 overflow-hidden rounded-full bg-stone-200 sm:w-40"
              aria-hidden="true"
            >
              <span
                style={{
                  width: `${view.thumb}%`,
                  insetInlineStart: `${view.ratio * (100 - view.thumb)}%`,
                }}
                className="absolute inset-y-0 rounded-full bg-brand-600 transition-[inset-inline-start] duration-150 ease-out"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => page(-1)}
                disabled={atStart}
                aria-label={t.prev}
                className="grid size-10 place-items-center rounded-full bg-white text-stone-700 ring-1 ring-stone-200 transition-colors hover:bg-brand-700 hover:text-white hover:ring-brand-700 disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight className="size-5 ltr:rotate-180" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => page(1)}
                disabled={atEnd}
                aria-label={t.next}
                className="grid size-10 place-items-center rounded-full bg-white text-stone-700 ring-1 ring-stone-200 transition-colors hover:bg-brand-700 hover:text-white hover:ring-brand-700 disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight
                  className="size-5 rotate-180 ltr:rotate-0"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          role="tabpanel"
          id={`service-panel-${category.id}`}
          aria-labelledby={`service-tab-${category.id}`}
          aria-roledescription={t.sliderRole}
          aria-label={t.slider(category.label)}
          onScroll={measure}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={handleClickCapture}
          className={`no-scrollbar -mx-4 flex gap-5 overflow-x-auto scroll-ps-4 px-4 py-2 sm:-mx-6 sm:scroll-ps-6 sm:px-6 lg:mx-0 lg:scroll-ps-0 lg:px-0 ${
            dragging
              ? "cursor-grabbing select-none"
              : "cursor-grab snap-x snap-mandatory"
          }`}
        >
          {category.services.map((service, i) => (
            <Link
              key={service.id}
              href={service.href}
              style={{ animationDelay: `${i * 60}ms` }}
              className="card-rise group relative flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-stone-200 transition-all hover:-translate-y-1 hover:ring-brand-300 hover:shadow-xl hover:shadow-brand-900/5"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 scale-x-0 from-brand-500 to-accent-400 transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right rtl:bg-linear-to-l ltr:origin-left ltr:bg-linear-to-r"
              />

              <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                <service.icon className="size-6" aria-hidden="true" />
              </span>

              <h4 className="mt-5 text-base font-bold text-stone-900 group-hover:text-brand-700">
                {service.title}
              </h4>
              <p className="mt-2 grow text-sm leading-relaxed text-stone-600">
                {service.description}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500">
                  <Users className="size-3.5 text-stone-400" aria-hidden="true" />
                  {t.pros(service.pros)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700">
                  {t.explore}
                  <ArrowForward className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-stone-500">
          <MoveHorizontal className="size-3.5" aria-hidden="true" />
          {t.dragHint}
        </p>

        <ViewAllLink href="/services">{t.viewAll}</ViewAllLink>
      </div>
    </section>
  );
}

// the wave mirrors with the reading direction, like the one closing the hero
function WaveEdge({ className }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-10 w-full fill-white ltr:-scale-x-100 sm:h-16 lg:h-20 ${className}`}
    >
      <path d={WAVE_PATH} />
    </svg>
  );
}
