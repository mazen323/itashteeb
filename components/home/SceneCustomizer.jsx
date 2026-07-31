"use client";

import { useRef, useState } from "react";

const KEYS = {
  ArrowUp: [0, -4],
  ArrowDown: [0, 4],
  ArrowLeft: [-4, 0],
  ArrowRight: [4, 0],
};

const clamp = (value) => Math.min(94, Math.max(6, value));


export default function SceneCustomizer({
  draggables,
  mirror,
  active,
  onDragChange,
  label,
}) {
  const sceneRef = useRef(null);
  const [items, setItems] = useState(() =>
    draggables.map((item) => ({ ...item, x: mirror ? 100 - item.x : item.x })),
  );
  const [activeId, setActiveId] = useState(null);

  const update = (id, next) =>
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...next(item) } : item)),
    );

  const dragTo = (id, clientX, clientY) => {
    const box = sceneRef.current.getBoundingClientRect();
    update(id, () => ({
      x: clamp(((clientX - box.left) / box.width) * 100),
      y: clamp(((clientY - box.top) / box.height) * 100),
    }));
  };

  const endDrag = () => {
    setActiveId(null);
    onDragChange(false);
  };

  const handleKeyDown = (event, id) => {
    const step = KEYS[event.key];
    if (!step) return;

    event.stopPropagation();
    event.preventDefault();
    update(id, (item) => ({
      x: clamp(item.x + step[0]),
      y: clamp(item.y + step[1]),
    }));
  };

  return (
    <div ref={sceneRef} className="absolute inset-0 select-none">
      {/* wrapper handles position + entry animation, button handles drag + scale,
          so the two transforms don't fight */}
      {items.map((item, i) => (
        <div
          key={item.id}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationDelay: `${300 + i * 110}ms`,
          }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${
            active ? "hero-pop" : ""
          }`}
        >
          <button
            type="button"
            onPointerDown={(event) => {
              event.stopPropagation();
              event.currentTarget.setPointerCapture(event.pointerId);
              setActiveId(item.id);
              onDragChange(true);
              dragTo(item.id, event.clientX, event.clientY);
            }}
           
            onPointerMove={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                dragTo(item.id, event.clientX, event.clientY);
              }
            }}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={(event) => handleKeyDown(event, item.id)}
            aria-label={label(item.label)}
            className={`flex cursor-grab touch-none items-center gap-2 rounded-full bg-white/95 py-2 ps-2 pe-3.5 shadow-xl shadow-stone-950/40 ring-1 ring-stone-950/10 backdrop-blur transition-[scale,box-shadow] active:cursor-grabbing ${
              activeId === item.id ? "scale-110 shadow-xl" : "hover:scale-105"
            }`}
          >
            <span
              className="pointer-events-none grid size-7 place-items-center rounded-full text-white"
              style={{ backgroundColor: item.swatch }}
            >
              <item.icon className="size-4" aria-hidden="true" />
            </span>
            <span className="pointer-events-none text-sm font-semibold text-stone-800">
              {item.label}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
