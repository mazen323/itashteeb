import HeroSection from "@/components/home/HeroSection";
import SearchFilterBar from "@/components/home/SearchFilterBar";
import WhatWeOfferSection from "@/components/home/WhatWeOfferSection";
import ServiceCategoriesSection from "@/components/home/ServiceCategoriesSection";
import FeaturedProfessionalSection from "@/components/home/FeaturedProfessionalSection";
import PortfolioGridSection from "@/components/home/PortfolioGridSection";
import CertifiedProfessionalsSection from "@/components/home/CertifiedProfessionalsSection";
import JoinUsSection from "@/components/home/JoinUsSection";
import { localize } from "@/data/i18n";
import { getLocale } from "@/data/locale.server";
import { siteMeta } from "@/data/mock";

const KEYWORDS = {
  ar: [
    "تشطيبات",
    "تشطيب شقق",
    "مقاولين مصر",
    "مقاول تسليم مفتاح",
    "مهندسين معماريين",
    "مكاتب هندسية",
    "تصميم داخلي",
    "ديكور",
    "تجديد وترميم",
    "أي تشطيب",
  ],
  en: [
    "finishing contractors",
    "apartment fit-out",
    "contractors Egypt",
    "turnkey contractor",
    "architects",
    "engineering offices",
    "interior design",
    "decor",
    "renovation",
    "Itashteeb",
  ],
};

export async function generateMetadata() {
  const locale = await getLocale();
  const meta = localize(siteMeta, locale);

  return {
    metadataBase: new URL("https://itashteeb.com"),
    title: meta.title,
    description: meta.description,
    keywords: KEYWORDS[locale],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: meta.name,
      title: meta.title,
      description: meta.description,
      url: "/",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_EG"],
      images: [
        {
          url: "/og-image-ar.jpg",
          width: 1200,
          height: 630,
          alt: meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image-ar.jpg"],
    },
  };
}

function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8 ${className}`}
    >
      {children}
    </section>
  );
}

export default async function HomePage() {
  const locale = await getLocale();

  return (
    <main>
      <HeroSection locale={locale} />
      <SearchFilterBar locale={locale} />

      <Section id="what-we-offer">
        <WhatWeOfferSection locale={locale} />
      </Section>

      <ServiceCategoriesSection locale={locale} />

      <Section id="featured-professional" className="bg-stone-50/60">
        <FeaturedProfessionalSection locale={locale} />
      </Section>

      <Section id="latest-projects">
        <PortfolioGridSection locale={locale} />
      </Section>

      <Section id="certified-professionals" className="bg-stone-50/60">
        <CertifiedProfessionalsSection locale={locale} />
      </Section>

      <JoinUsSection locale={locale} />
    </main>
  );
}
