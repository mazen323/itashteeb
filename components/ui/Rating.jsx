import { Star } from "lucide-react";
import { ui } from "@/data/ui";


export default function Rating({ rating, locale }) {
  if (!rating) return null;

  const score = rating.score.toFixed(1);

  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold text-stone-800">
      <Star className="size-4 fill-accent-400 text-accent-400" aria-hidden="true" />
      <span aria-hidden="true">{score}</span>
      <span className="font-normal text-stone-500" aria-hidden="true">
        ({rating.count})
      </span>
      <span className="sr-only">{ui[locale].rating(score, rating.count)}</span>
    </span>
  );
}
