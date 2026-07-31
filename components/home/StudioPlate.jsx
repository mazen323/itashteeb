import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { BLUR_DATA_URL } from "@/data/mock";
import { ui } from "@/data/ui";
import ArrowForward from "../ui/ArrowForward";

export default function StudioPlate({ company, locale }) {
  const t = ui[locale].certified;
  const score = company.rating.score.toFixed(1);

  return (
    <Link
      href={`/professionals/${company.id}`}
      className="group/plate relative block w-56 shrink-0 overflow-hidden rounded-3xl ring-1 ring-stone-900/10 transition-shadow duration-300 hover:shadow-2xl hover:shadow-stone-950/25 sm:w-64 lg:w-72"
    >
      <div className="relative aspect-3/4 bg-stone-200">
        <Image
          src={company.cover.src}
          alt={company.cover.alt}
          fill
          sizes="(max-width: 640px) 14rem, (max-width: 1024px) 16rem, 18rem"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover transition-transform duration-700 group-hover/plate:scale-105"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-stone-950/92 via-stone-950/35 to-stone-950/10"
          aria-hidden="true"
        />

        <span className="absolute top-3 inset-s-3 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/25 backdrop-blur-md">
          {company.specialties[0]}
        </span>

        <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2">
          <div className="flex items-start gap-1.5">
            <h3 className="text-base leading-snug font-bold text-white">
              {company.name}
            </h3>
            {company.verified && (
              <>
                <BadgeCheck
                  className="mt-0.5 size-4 shrink-0 text-brand-300"
                  aria-hidden="true"
                />
                <span className="sr-only">{ui[locale].verified}</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-white/85">
            <span className="inline-flex items-center gap-1">
              <Star
                className="size-3.5 fill-accent-400 text-accent-400"
                aria-hidden="true"
              />
              <span aria-hidden="true">{score}</span>
              <span className="sr-only">
                {ui[locale].rating(score, company.rating.count)}
              </span>
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden="true" />
              {company.city}
            </span>
            <span>{t.projectsCount(company.projectsCount)}</span>
          </div>

          <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand-900 opacity-0 transition-opacity duration-300 group-hover/plate:opacity-100 group-focus-visible/plate:opacity-100">
            {t.viewProfile}
            <ArrowForward className="size-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
