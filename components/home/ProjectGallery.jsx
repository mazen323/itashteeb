"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight, MoveHorizontal } from "lucide-react";
import { useMotionOk } from "@/hooks/useMotionOk";
import { BLUR_DATA_URL } from "@/data/mock";
import { ui } from "@/data/ui";

const AUTOPLAY_MS = 5000;


const scrollTrackTo = (track, target) => {
  const sign = getComputedStyle(track).direction === "rtl" ? -1 : 1;
  track.scrollTo({
    left: sign * target * track.clientWidth,
    behavior: "smooth",
  });
};

const nearestIndex = (track) =>
  Math.round(Math.abs(track.scrollLeft) / track.clientWidth);

export default function ProjectGallery({ images, locale }) {
  const t = ui[locale].gallery;
  const trackRef = useRef(null);
  const dragRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);

  const motionOk = useMotionOk();

  const goTo = (next) => {
    const target = Math.min(images.length - 1, Math.max(0, next));
    scrollTrackTo(trackRef.current, target);
    setIndex(target);
  };

  // autoplay only runs while the gallery is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!motionOk || !inView || dragging) return;

    const timer = setTimeout(() => {
      const next = (index + 1) % images.length;
      scrollTrackTo(trackRef.current, next);
      setIndex(next);
    }, AUTOPLAY_MS);

    return () => clearTimeout(timer);
  }, [index, images.length, motionOk, inView, dragging]);
 
  const startDrag = (event) => {
    if (event.pointerType !== "mouse") return;

    const track = trackRef.current;
    event.preventDefault();
    track.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, left: track.scrollLeft };
    setDragging(true);
  };

  const moveDrag = (event) => {
    const start = dragRef.current;
    if (!start) return;
    trackRef.current.scrollLeft = start.left - (event.clientX - start.x);
  };

  const endDrag = () => {
    if (!dragRef.current) return;

    dragRef.current = null;
    setDragging(false);
    goTo(nearestIndex(trackRef.current));
  };

  const handleScroll = () => setIndex(nearestIndex(trackRef.current));

  return (
    <div className="relative h-full">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`no-scrollbar flex h-full touch-pan-x overflow-x-auto overscroll-x-contain select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        {images.map((image) => (
          <div
            key={image.src}
            className="relative aspect-4/3 w-full shrink-0 snap-start bg-stone-200 lg:aspect-auto lg:h-full"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              draggable={false}
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="pointer-events-none object-cover"
            />
          </div>
        ))}
      </div>


      <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-3 sm:flex">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label={t.prev}
          className="pointer-events-auto grid size-10 place-items-center rounded-full bg-white/90 text-stone-800 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-0"
        >
          <ChevronRight className="size-5 ltr:rotate-180" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === images.length - 1}
          aria-label={t.next}
          className="pointer-events-auto grid size-10 place-items-center rounded-full bg-white/90 text-stone-800 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-0"
        >
          <ChevronRight className="size-5 rotate-180 ltr:rotate-0" aria-hidden="true" />
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-linear-to-t from-stone-950/55 to-transparent pt-10 pb-4">
        <div className="pointer-events-auto flex items-center gap-2">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t.goTo(i + 1)}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-xs font-medium text-white/90">
          <MoveHorizontal className="size-3.5" aria-hidden="true" />
          {t.dragHint}
        </p>
      </div>
    </div>
  );
}
