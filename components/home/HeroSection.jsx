import { ui } from "@/data/ui";
import HeroSlider from "./HeroSlider";

export default function HeroSection({ locale }) {
  return (
    <section
      aria-label={ui[locale].hero.section}
      className="relative isolate h-svh max-h-230 min-h-155 w-full overflow-hidden bg-brand-950"
    >
      <HeroSlider locale={locale} />
    </section>
  );
}
