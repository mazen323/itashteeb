import Link from "next/link";
import { CalendarClock, MapPin } from "lucide-react";
import { localize } from "@/data/i18n";
import { companies as rawCompanies } from "@/data/mock";
import { ui } from "@/data/ui";
import SectionHeading from "../ui/SectionHeading";
import CompanyLogo from "../ui/CompanyLogo";
import VerifiedBadge from "../ui/VerifiedBadge";
import ViewAllLink from "../ui/ViewAllLink";
import Rating from "../ui/Rating";

export default function CertifiedProfessionalsSection({ locale }) {
  const t = ui[locale].certified;
  const companies = localize(rawCompanies, locale);

  return (
    <div className="flex flex-col gap-10">
      <SectionHeading title={t.title} description={t.description} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <Link
            key={company.id}
            href={`/professionals/${company.id}`}
            className="group flex flex-col rounded-3xl border border-stone-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/5"
          >
            <div className="flex items-start gap-4">
              <CompanyLogo company={company} size={56} className="rounded-2xl" />
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-stone-900 group-hover:text-brand-700">
                  {company.name}
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <Rating rating={company.rating} locale={locale} />
                  {company.verified && <VerifiedBadge locale={locale} />}
                </div>
              </div>
            </div>

            <p className="mt-4 grow text-sm leading-relaxed text-stone-600">
              {company.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 text-xs font-medium text-stone-500">
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="size-3.5" aria-hidden="true" />
                {t.yearsExperience(company.yearsExperience)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden="true" />
                {company.city}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <ViewAllLink href="/professionals">{t.viewAll}</ViewAllLink>
    </div>
  );
}
