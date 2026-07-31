import Link from "next/link";
import { Briefcase, CalendarClock, CircleDot, MapPin } from "lucide-react";
import { localize } from "@/data/i18n";
import { featuredProfessional as rawFeatured } from "@/data/mock";
import { ui } from "@/data/ui";
import SectionHeading from "../ui/SectionHeading";
import CompanyLogo from "../ui/CompanyLogo";
import VerifiedBadge from "../ui/VerifiedBadge";
import ArrowForward from "../ui/ArrowForward";
import ProjectGallery from "./ProjectGallery";

function QuickStat({ icon: Icon, label, value, highlight = false }) {
  return (
    <div className="rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-stone-200/70">
      <span className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
        <Icon className="size-3.5" aria-hidden="true" />
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

      <article className="grid overflow-hidden rounded-4xl border border-stone-200 bg-white shadow-xl shadow-stone-900/5 lg:grid-cols-2">
        <div className="relative bg-stone-100">
          <ProjectGallery images={project.gallery} locale={locale} />
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8 md:p-10">
          <div>
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
              {project.category}
            </span>

            <h3 className="mt-4 text-2xl font-bold text-stone-900 md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 leading-relaxed text-stone-600">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-stone-100 pt-6">
            <CompanyLogo company={company} size={48} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold text-stone-900">{company.name}</p>
                {company.verified && <VerifiedBadge locale={locale} />}
              </div>
              <p className="mt-1 text-sm text-stone-500">
                {company.specialties.join(" • ")}
              </p>
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
