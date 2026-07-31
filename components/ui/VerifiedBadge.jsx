import { BadgeCheck } from "lucide-react";
import { ui } from "@/data/ui";

export default function VerifiedBadge({ locale }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
      <BadgeCheck className="size-3.5" aria-hidden="true" />
      {ui[locale].verified}
    </span>
  );
}
