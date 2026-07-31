import Link from "next/link";
import { localize } from "@/data/i18n";
import { joinUs as rawJoinUs } from "@/data/mock";
import ArrowForward from "../ui/ArrowForward";

export default function JoinUsSection({ locale }) {
  const joinUs = localize(rawJoinUs, locale);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
      <div className="relative isolate overflow-hidden rounded-4xl bg-linear-to-br from-brand-800 via-brand-900 to-brand-950 p-7 shadow-2xl shadow-brand-950/25 sm:p-12 lg:p-14">
        <div
          aria-hidden="true"
          className="blueprint-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.09]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 inset-s-10 -z-10 size-80 rounded-full bg-brand-400/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 inset-e-0 -z-10 size-80 rounded-full bg-accent-400/20 blur-3xl"
        />

        <div className="grid gap-9 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-accent-300 ring-1 ring-white/15">
              <span
                className="size-1.5 rounded-full bg-accent-400"
                aria-hidden="true"
              />
              {joinUs.eyebrow}
            </span>

            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
              {joinUs.title}
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-brand-100/85 md:text-base">
              {joinUs.description}
            </p>

            <Link
              href={joinUs.ctaHref}
              className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand-900 shadow-lg shadow-brand-950/30 transition-colors hover:bg-accent-400 hover:text-brand-950 sm:w-fit md:text-base"
            >
              {joinUs.ctaLabel}
              <ArrowForward className="size-5" />
            </Link>
          </div>

          <ul className="grid gap-3 sm:grid-cols-3 lg:w-full lg:max-w-sm lg:grid-cols-1 lg:justify-self-end">
            {joinUs.highlights.map((highlight) => (
              <li
                key={highlight.id}
                className="flex items-center gap-3 rounded-2xl bg-white/8 p-4 ring-1 ring-white/12 backdrop-blur-sm"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-400/15 text-accent-300 ring-1 ring-accent-300/25">
                  <highlight.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold text-white">
                  {highlight.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
