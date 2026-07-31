import Link from "next/link";
import { localize } from "@/data/i18n";
import { joinUs as rawJoinUs } from "@/data/mock";
import ArrowForward from "../ui/ArrowForward";

export default function JoinUsSection({ locale }) {
  const joinUs = localize(rawJoinUs, locale);

  return (
    <section className="relative overflow-hidden bg-brand-900">
      {/* Soft background glows */}
      <div
        className="pointer-events-none absolute -top-24 inset-s-1/3 size-96 rounded-full bg-brand-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 inset-e-10 size-80 rounded-full bg-accent-500/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 md:py-24">
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-brand-100 ring-1 ring-white/15">
          {joinUs.eyebrow}
        </span>

        <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          {joinUs.title}
        </h2>

        <p className="max-w-2xl leading-relaxed text-brand-100/90 md:text-lg">
          {joinUs.description}
        </p>

        <Link
          href={joinUs.ctaHref}
          className="group mt-2 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-900 transition-colors hover:bg-accent-400 hover:text-brand-950"
        >
          {joinUs.ctaLabel}
          <ArrowForward className="size-5" />
        </Link>

        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {joinUs.highlights.map((highlight) => (
            <li
              key={highlight.id}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-100"
            >
              <highlight.icon className="size-4 text-accent-300" aria-hidden="true" />
              {highlight.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
