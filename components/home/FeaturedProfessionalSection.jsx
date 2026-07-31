import Link from "next/link";
import { Briefcase, CalendarClock, CircleDot, MapPin } from "lucide-react";
import { localize } from "@/data/i18n";
import { featuredProfessional as rawFeatured } from "@/data/mock";
import { ui } from "@/data/ui";
import SectionHeading from "../ui/SectionHeading";
import VerifiedBadge from "../ui/VerifiedBadge";
import Rating from "../ui/Rating";
import ArrowForward from "../ui/ArrowForward";
import ProjectGallery from "./ProjectGallery";

function QuickStat({ icon: Icon, label, value, highlight = false }) {
  return (
    <div className="rounded-2xl bg-stone-50 px-3.5 py-2.5 ring-1 ring-stone-200/70 sm:px-4 sm:py-3">
      <span className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
        <Icon className="size-3.5 shrink-0" aria-hidden="true" />
        {label}
      </span>
      <p
        className={`mt-1 text-sm font-bold ${
          highlight ? "text-brand-700" : "text-stone-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default function FeaturedProfessionalSection({ locale }) {
  const t = ui[locale].featured;
  const { company, project } = localize(rawFeatured, locale);

  return (
    <div className="flex flex-col gap-10">
      <SectionHeading title={t.title} description={t.description} />


      <article className="grid grid-cols-1 overflow-hidden rounded-4xl border border-stone-200 bg-white shadow-xl shadow-stone-900/5 lg:grid-cols-2">
        <div className="relative bg-stone-100">
          <ProjectGallery images={project.gallery} locale={locale} />

          <span className="pointer-events-none absolute top-4 inset-s-4 z-10 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-700 shadow-sm ring-1 ring-brand-100 backdrop-blur">
            {project.category}
          </span>
        </div>

        <div className="flex flex-col gap-5 p-5 sm:gap-6 sm:p-8 md:p-10">
          <div>
            <h3 className="text-xl font-bold text-stone-900 sm:text-2xl md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
              {project.description}
            </p>
          </div>

          <div className="border-t border-stone-100 pt-5 sm:pt-6">
            <div className="border-s-2 border-brand-200 ps-4">
              <p className="text-xs font-semibold text-stone-400">{t.by}</p>

              <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                <p className="text-lg font-bold text-stone-900">{company.name}</p>
                {company.verified && <VerifiedBadge locale={locale} />}
                <Rating rating={company.rating} locale={locale} />
              </div>

              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {company.specialties.map((specialty) => (
                  <li
                    key={specialty}
                    className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600"
                  >
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <QuickStat
              icon={Briefcase}
              label={t.projects}
              value={`${company.projectsCount}+`}
            />
            <QuickStat
              icon={CalendarClock}
              label={t.experience}
              value={t.years(company.yearsExperience)}
            />
            <QuickStat
              icon={MapPin}
              label={t.location}
              value={`${company.city}, ${company.country}`}
            />
            <QuickStat
              icon={CircleDot}
              label={t.availability}
              value={company.availableNow ? t.availableNow : t.waitlist}
              highlight={company.availableNow}
            />
          </div>

          <Link
            href={project.href}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-800 active:bg-brand-900 sm:w-fit"
          >
            {t.viewProfile}
            <ArrowForward />
          </Link>
        </div>
      </article>
    </div>
  );
}
