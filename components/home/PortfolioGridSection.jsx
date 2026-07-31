import { MoveHorizontal } from "lucide-react";
import { localize } from "@/data/i18n";
import { projects as rawProjects } from "@/data/mock";
import { ui } from "@/data/ui";
import SectionHeading from "../ui/SectionHeading";
import ViewAllLink from "../ui/ViewAllLink";
import AutoScrollRow from "../ui/AutoScrollRow";
import ProjectCard from "./ProjectCard";

// straight cut, a counterpart to the wave that opens the services band
const CUT_PATH = "M0,0 H1440 V24 L0,120 Z";

export default function PortfolioGridSection({ locale }) {
  const t = ui[locale].portfolio;
  const projects = localize(rawProjects, locale);

  return (
    <section
      id="latest-projects"
      className="relative isolate overflow-hidden bg-linear-to-b from-brand-950 via-brand-900 to-brand-950"
    >
      <CutEdge className="top-0" />
      <CutEdge className="bottom-0 rotate-180" />

      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 inset-s-0 -z-10 size-96 rounded-full bg-brand-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 inset-e-1/4 -z-10 size-80 rounded-full bg-accent-500/10 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-20 pb-20 sm:px-6 md:gap-10 md:pt-28 md:pb-28 lg:px-8">
        <SectionHeading title={t.title} description={t.description} light />

        <AutoScrollRow className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-ps-4 px-4 pt-1 pb-3 sm:-mx-6 sm:scroll-ps-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              className="w-[78%] shrink-0 snap-start sm:w-72 md:w-auto"
            />
          ))}
        </AutoScrollRow>

        <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-brand-100/70 md:hidden">
          <MoveHorizontal className="size-3.5" aria-hidden="true" />
          {t.dragHint}
        </p>

        <ViewAllLink href="/projects" light>
          {t.viewAll}
        </ViewAllLink>
      </div>
    </section>
  );
}


function CutEdge({ className }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 hidden w-full fill-white ltr:-scale-x-100 sm:block sm:h-12 lg:h-16 ${className}`}
    >
      <path d={CUT_PATH} />
    </svg>
  );
}
