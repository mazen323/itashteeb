import { Cairo } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import BackToTop from "@/components/layout/BackToTop";
import { dirOf } from "@/data/i18n";
import { getLocale } from "@/data/locale.server";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});


export default async function RootLayout({ children }) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${cairo.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-stone-800">
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
        <BackToTop locale={locale} />
      </body>
    </html>
  );
}
