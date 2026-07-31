import Link from "next/link";
import { localize } from "@/data/i18n";
import { offerings as rawOfferings } from "@/data/mock";
import { ui } from "@/data/ui";
import SectionHeading from "../ui/SectionHeading";
import ArrowForward from "../ui/ArrowForward";

export default function WhatWeOfferSection({ locale }) {
  const t = ui[locale].offer;
  const offerings = localize(rawOfferings, locale);

  return (
    <div className="flex flex-col gap-10">
      <SectionHeading title={t.title} description={t.description} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offerings.map((offering) => (
          <Link
            key={offering.id}
            href={offering.href}
            className="group flex flex-col rounded-3xl border border-stone-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/5"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-700 group-hover:text-white">
              <offering.icon className="size-6" aria-hidden="true" />
            </span>

            <h3 className="mt-6 text-xl font-bold text-stone-900">
              {offering.title}
            </h3>
            <p className="mt-3 grow leading-relaxed text-stone-600">
              {offering.description}
            </p>

            <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-700">
              {t.explore}
              <ArrowForward />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
