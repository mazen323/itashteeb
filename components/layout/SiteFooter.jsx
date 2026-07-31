import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { localize } from "@/data/i18n";
import { footer as rawFooter } from "@/data/mock";
import { ui } from "@/data/ui";
import BrandLogo from "@/components/ui/BrandLogo";

const currentYear = () => new Date().getFullYear();


function ColumnHeading({ children }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-sm font-bold text-white">{children}</h2>
      <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-accent-400/80" />
    </div>
  );
}

export default function SiteFooter({ locale }) {
  const t = ui[locale].footer;
  const footer = localize(rawFooter, locale);

  const contactRows = [
    {
      id: "email",
      icon: Mail,
      label: t.email,
      value: footer.contact.email,
      href: `mailto:${footer.contact.email}`,
    },
    {
      id: "phone",
      icon: Phone,
      label: t.phone,
      value: footer.contact.phone,
      href: `tel:${footer.contact.phone}`,
    },
  ];

  return (
  
    <footer
      aria-label={t.section}
      className="relative mt-auto overflow-hidden border-t border-white/10 bg-brand-950 text-brand-100"
    >
      <div
        className="pointer-events-none absolute -top-40 inset-s-1/4 size-112 rounded-full bg-brand-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-18 lg:px-8">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-8 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-4">
              <a href="#" aria-label={t.home} className="w-fit">
                <BrandLogo locale={locale} variant="dark" priority={false} />
              </a>

              <p className="max-w-sm text-sm leading-relaxed text-brand-100/70">
                {footer.tagline}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <ColumnHeading>{footer.contact.title}</ColumnHeading>

              <ul className="flex flex-col items-start gap-2.5">
                {contactRows.map((row) => (
                  <li key={row.id}>
                    <a
                      href={row.href}
                      className="group flex w-fit items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:ring-white/20"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-900 text-accent-300 ring-1 ring-white/10 transition-colors group-hover:bg-accent-400 group-hover:text-brand-950">
                        <row.icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-brand-100/55">
                          {row.label}
                        </span>
                     
                        <span className="block truncate text-sm font-semibold text-white">
                          <bdi>{row.value}</bdi>
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <ul aria-label={t.social} className="flex flex-wrap items-center gap-2.5">
              {footer.social.map((account) => (
                <li key={account.id}>
                  <button
                    type="button"
                    aria-label={account.label}
                    title={account.label}
                    className="grid size-9 cursor-pointer place-items-center rounded-full bg-white/5 text-brand-100 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-accent-400 hover:text-brand-950 hover:ring-accent-400/40"
                  >
                    <account.icon className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>


          {footer.columns.map((column) => (
            <nav
              key={column.id}
              aria-label={column.title}
              className="flex flex-col gap-5"
            >
              <ColumnHeading>{column.title}</ColumnHeading>

              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      className="cursor-pointer text-sm text-brand-100/70 transition-colors hover:text-accent-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-brand-100/55 sm:px-6 lg:px-8">
          {t.rights(currentYear())}
        </p>
      </div>
    </footer>
  );
}
