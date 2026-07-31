import Link from "next/link";
import { localize } from "@/data/i18n";
import { offerings as rawOfferings } from "@/data/mock";
import { ui } from "@/data/ui";
import SectionHeading from "../ui/SectionHeading";
import AutoScrollRow from "../ui/AutoScrollRow";
import ArrowForward from "../ui/ArrowForward";

export default function WhatWeOfferSection({ locale }) {
  const t = ui[locale].offer;
  const offerings = localize(rawOfferings, locale);

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <SectionHeading title={t.title} description={t.description} />

      <AutoScrollRow className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-ps-4 px-4 pb-2 sm:-mx-6 sm:scroll-ps-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
        {offerings.map((offering) => (
          <Link
            key={offering.id}
            href={offering.href}
            className="group flex w-[82%] shrink-0 snap-start flex-col rounded-3xl border border-stone-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5 sm:w-80 sm:p-8 md:w-auto"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
              <offering.icon className="size-6" aria-hidden="true" />
            </span>

            <h3 className="mt-6 text-lg font-bold text-stone-900 sm:text-xl">
              {offering.title}
            </h3>
            <p className="mt-3 grow text-sm leading-7 text-stone-600 sm:text-base">
              {offering.description}
            </p>

            <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-700">
              {t.explore}
              <ArrowForward />
            </span>
          </Link>
        ))}
      </AutoScrollRow>
    </div>
  );
}
