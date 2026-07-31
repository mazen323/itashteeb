import Link from "next/link";
import ArrowForward from "./ArrowForward";

export default function ViewAllLink({ href, children }) {
  return (
    <div className="flex justify-center">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-full border-2 border-brand-700 px-7 py-3.5 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-700 hover:text-white"
      >
        {children}
        <ArrowForward />
      </Link>
    </div>
  );
}
