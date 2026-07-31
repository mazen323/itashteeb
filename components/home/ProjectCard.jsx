import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import { BLUR_DATA_URL } from "@/data/mock";
import { ui } from "@/data/ui";
import ArrowForward from "../ui/ArrowForward";


export default function ProjectCard({ project, locale, className = "" }) {
  const t = ui[locale].card;
  const { company } = project;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-stone-950/10 ring-1 ring-stone-200/70 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-950/25 hover:ring-brand-300 ${className}`}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* scrim carries the location line, so the body stays down to title + studio */}
        <div
          className="absolute inset-0 bg-linear-to-t from-stone-950/75 via-stone-950/10 to-transparent"
          aria-hidden="true"
        />

        <span className="absolute top-3 inset-s-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-stone-800 shadow-sm backdrop-blur">
          {project.categoryLabel}
        </span>

        <p className="absolute inset-x-4 bottom-3 flex items-center gap-1.5 text-xs font-medium text-white/95">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">
            {project.locationLabel} • {project.country}
          </span>
        </p>
      </div>

      <div className="flex grow flex-col p-5">
        <h3 className="line-clamp-2 text-base leading-snug font-bold text-stone-900 group-hover:text-brand-700">
          <Link href={project.href}>
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="inline-flex min-w-0 items-center gap-1.5 text-sm font-semibold text-stone-600">
            <span className="truncate">{company.name}</span>
            {company.verified && (
              <>
                <BadgeCheck
                  className="size-4 shrink-0 text-brand-600"
                  aria-hidden="true"
                />
                <span className="sr-only">{ui[locale].verified}</span>
              </>
            )}
          </p>

          <Link
            href={`/professionals/${company.id}`}
            className="relative z-10 inline-flex shrink-0 items-center gap-1 rounded-full bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-700 transition-colors hover:bg-brand-700 hover:text-white"
          >
            {t.enter}
            <ArrowForward className="size-3" />
            <span className="sr-only">{t.toProfile(company.name)}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
