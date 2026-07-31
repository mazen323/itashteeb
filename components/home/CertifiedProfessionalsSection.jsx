"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, MoveHorizontal } from "lucide-react";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { localize } from "@/data/i18n";
import { companies as rawCompanies } from "@/data/mock";
import { ui } from "@/data/ui";
import SectionHeading from "../ui/SectionHeading";
import ViewAllLink from "../ui/ViewAllLink";
import StudioPlate from "./StudioPlate";

const DRAG_THRESHOLD = 6;
const PAGE_RATIO = 0.8;

// scrollLeft counts down from 0 in RTL, so distances are read as absolutes
const forwardSign = (track) =>
  getComputedStyle(track).direction === "rtl" ? -1 : 1;

export default function CertifiedProfessionalsSection({ locale }) {
  const t = ui[locale].certified;
  const companies = localize(rawCompanies, locale);

  const trackRef = useRef(null);
  const dragRef = useRef(null);
  const swallowClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [view, setView] = useState({ ratio: 0, thumb: 100 });

  const measure = () => {
    const track = trackRef.current;
    const max = track.scrollWidth - track.clientWidth;
    const scrolled = Math.min(Math.abs(track.scrollLeft), max);

    setView({
      ratio: max > 1 ? scrolled / max : 0,
      thumb: Math.min(100, (track.clientWidth / track.scrollWidth) * 100),
    });
  };

  useEffect(() => {
    const observer = new ResizeObserver(measure);
    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  const page = (direction) => {
    const track = trackRef.current;
    track.scrollBy({
      left: forwardSign(track) * direction * track.clientWidth * PAGE_RATIO,
      behavior: "smooth",
    });
  };

  useAutoScroll(trackRef, { paused: dragging });

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

    // a drag must not open the plate it happened to end on
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
    <div className="flex flex-col gap-8">
      <SectionHeading title={t.title} description={t.description} />

      <div
        ref={trackRef}
        onScroll={measure}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={handleClickCapture}
        role="group"
        aria-roledescription={t.sliderRole}
        aria-label={t.slider}
        className={`no-scrollbar -mx-4 flex snap-x snap-mandatory items-start overflow-x-auto scroll-ps-4 px-4 pt-1 pb-4 sm:-mx-6 sm:scroll-ps-6 sm:px-6 lg:mx-0 lg:scroll-ps-0 lg:px-0 ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {companies.map((company, i) => (
          <div
            key={company.id}
            className={`shrink-0 snap-start pe-4 sm:pe-5 ${
              i % 2 ? "sm:pt-12" : "sm:pb-12"
            }`}
          >
            <StudioPlate company={company} locale={locale} />
          </div>
        ))}
      </div>

      {/* one control cluster, centred under the rail */}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={atStart}
          aria-label={t.prev}
          className="grid size-11 place-items-center rounded-full bg-white text-stone-700 shadow-md shadow-stone-900/10 ring-1 ring-stone-200 transition-colors hover:bg-brand-700 hover:text-white hover:ring-brand-700 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight className="size-5 ltr:rotate-180" aria-hidden="true" />
        </button>

        <div
          className="relative h-1 w-28 overflow-hidden rounded-full bg-stone-200 sm:w-48"
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

        <button
          type="button"
          onClick={() => page(1)}
          disabled={atEnd}
          aria-label={t.next}
          className="grid size-11 place-items-center rounded-full bg-white text-stone-700 shadow-md shadow-stone-900/10 ring-1 ring-stone-200 transition-colors hover:bg-brand-700 hover:text-white hover:ring-brand-700 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight
            className="size-5 rotate-180 ltr:rotate-0"
            aria-hidden="true"
          />
        </button>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-stone-500">
        <MoveHorizontal className="size-3.5" aria-hidden="true" />
        {t.dragHint}
      </p>

      <ViewAllLink href="/professionals">{t.viewAll}</ViewAllLink>
    </div>
  );
}
