"use client";

import { useRef } from "react";
import { useAutoScroll } from "@/hooks/useAutoScroll";


export default function AutoScrollRow({ className = "", children }) {
  const trackRef = useRef(null);
  useAutoScroll(trackRef);

  return (
    <div ref={trackRef} className={className}>
      {children}
    </div>
  );
}
