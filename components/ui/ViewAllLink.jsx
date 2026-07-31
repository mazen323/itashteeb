import Link from "next/link";
import ArrowForward from "./ArrowForward";

// light = the link sits on a dark band
export default function ViewAllLink({ href, children, light = false }) {
  return (
    <div className="flex justify-center">
      <Link
        href={href}
        className={`group inline-flex items-center gap-2 rounded-full border-2 px-7 py-3.5 text-sm font-bold transition-colors ${
          light
            ? "border-white/45 text-white hover:bg-white hover:text-brand-900"
            : "border-brand-700 text-brand-700 hover:bg-brand-700 hover:text-white"
        }`}
      >
        {children}
        <ArrowForward />
      </Link>
    </div>
  );
}
