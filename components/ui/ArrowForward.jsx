import { ArrowLeft } from "lucide-react";


export default function ArrowForward({ className = "size-4" }) {
  return (
    <ArrowLeft
      className={`arrow-nudge ltr:rotate-180 ${className}`}
      aria-hidden="true"
    />
  );
}
