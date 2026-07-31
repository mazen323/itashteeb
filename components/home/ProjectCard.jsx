import Image from "next/image";
import Link from "next/link";
import { Globe2, MapPin } from "lucide-react";
import { BLUR_DATA_URL } from "@/data/mock";
import { ui } from "@/data/ui";
import CompanyLogo from "../ui/CompanyLogo";
import ArrowForward from "../ui/ArrowForward";


export default function ProjectCard({ project, locale }) {
  const t = ui[locale].card;
  const { company } = project;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/5">
      <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 inset-s-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-stone-800 shadow-sm backdrop-blur">
          {project.categoryLabel}
        </span>
      </div>

      <div className="flex grow flex-col p-5">
        <h3 className="text-base font-bold text-stone-900">
          <Link href={project.href}>
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-stone-600">
          <MapPin className="size-3.5 shrink-0 text-stone-400" aria-hidden="true" />
          {project.locationLabel}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-stone-500">
          <Globe2 className="size-3.5 shrink-0 text-stone-400" aria-hidden="true" />
          {project.country}
        </p>

        <div className="mt-auto flex items-center gap-3 border-t border-stone-100 pt-4">
          <CompanyLogo company={company} size={36} className="rounded-lg" />
          <p className="min-w-0 flex-1 truncate text-sm font-semibold text-stone-700">
            {company.name}
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
