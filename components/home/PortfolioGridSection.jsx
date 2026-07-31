import { localize } from "@/data/i18n";
import { projects as rawProjects } from "@/data/mock";
import { ui } from "@/data/ui";
import SectionHeading from "../ui/SectionHeading";
import ViewAllLink from "../ui/ViewAllLink";
import ProjectCard from "./ProjectCard";

export default function PortfolioGridSection({ locale }) {
  const t = ui[locale].portfolio;
  const projects = localize(rawProjects, locale);

  return (
    <div className="flex flex-col gap-10">
      <SectionHeading title={t.title} description={t.description} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>

      <ViewAllLink href="/projects">{t.viewAll}</ViewAllLink>
    </div>
  );
}
