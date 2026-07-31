"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Globe, LogIn, Menu, X } from "lucide-react";
import { setLocale } from "@/app/actions";
import { localize } from "@/data/i18n";
import { languages, navLinks as rawNavLinks } from "@/data/mock";
import { ui } from "@/data/ui";
import BrandLogo from "@/components/ui/BrandLogo";

const SCROLL_THRESHOLD = 24; 


const scrollStore = {
  subscribe(callback) {
    window.addEventListener("scroll", callback, { passive: true });
    return () => window.removeEventListener("scroll", callback);
  },
  get: () => window.scrollY > SCROLL_THRESHOLD,
  getServer: () => false,
};

export default function SiteHeader({ locale }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  const scrolled = useSyncExternalStore(
    scrollStore.subscribe,
    scrollStore.get,
    scrollStore.getServer,
  );

  useEffect(() => {
    if (!langOpen && !menuOpen) return;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setLangOpen(false);
      setMenuOpen(false);
    };
    const onPointerDown = (event) => {
      if (langOpen && !langRef.current?.contains(event.target)) setLangOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [langOpen, menuOpen]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const close = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

 
  const pickLang = async (code) => {
    setLangOpen(false);
    setMenuOpen(false);
    await setLocale(code);
    router.refresh();
  };

  const t = ui[locale].header;
  const navLinks = localize(rawNavLinks, locale);
  const activeLang = languages.find((item) => item.code === locale) ?? languages[0];

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white shadow-lg shadow-stone-900/5" : ""
      }`}
    >
      {!solid && (
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-stone-950/55 to-transparent"
          aria-hidden="true"
        />
      )}

      <div className="relative mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" aria-label={t.home} className="relative block shrink-0">
          <BrandLogo
            locale={locale}
            variant="dark"
            alt=""
            className={`transition-opacity duration-300 ${solid ? "opacity-0" : "opacity-100"}`}
          />
          <BrandLogo
            locale={locale}
            variant="light"
            alt=""
            className={`absolute inset-0 transition-opacity duration-300 ${
              solid ? "opacity-100" : "opacity-0"
            }`}
          />
        </a>

        <nav
          aria-label={t.nav}
          className="hidden flex-1 items-center justify-center gap-1 lg:flex"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              aria-current={link.current ? "page" : undefined}
              className={`relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                link.current
                  ? solid
                    ? "text-brand-700"
                    : "text-white"
                  : solid
                    ? "text-stone-600 hover:bg-stone-100 hover:text-brand-700"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
              {link.current && (
                <span
                  className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent-400"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none">
          <button
            type="button"
            className={`hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition sm:inline-flex ${
              solid
                ? "text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50"
                : "text-white ring-1 ring-white/35 hover:bg-white/10"
            }`}
          >
            <LogIn className="size-4" aria-hidden="true" />
            {t.signIn}
          </button>

          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              aria-label={t.lang}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
                solid
                  ? "text-stone-700 ring-1 ring-stone-200 hover:bg-stone-100"
                  : "text-white ring-1 ring-white/35 hover:bg-white/10"
              }`}
            >
              <Globe className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">{activeLang.label}</span>
              <span className="sm:hidden">{activeLang.short}</span>
              <ChevronDown
                className={`size-4 transition-transform ${langOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {langOpen && (
              <div
                role="menu"
                aria-label={t.lang}
                className="absolute inset-e-0 top-full mt-2 min-w-44 rounded-2xl bg-white p-1.5 shadow-xl shadow-stone-900/10 ring-1 ring-stone-900/10"
              >
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={item.code === locale}
                    onClick={() => pickLang(item.code)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                      item.code === locale
                        ? "bg-brand-50 text-brand-700"
                        : "text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    {item.label}
                    {item.code === locale && (
                      <Check className="size-4 shrink-0" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            className={`grid size-10 place-items-center rounded-xl transition lg:hidden ${
              solid
                ? "text-stone-700 ring-1 ring-stone-200 hover:bg-stone-100"
                : "text-white ring-1 ring-white/35 hover:bg-white/10"
            }`}
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label={t.closeMenu}
            className="fixed inset-x-0 top-18 bottom-0 -z-10 bg-stone-950/45 lg:hidden"
          />
          <div id="mobile-nav" className="border-t border-stone-200 bg-white lg:hidden">
            <nav
              aria-label={t.nav}
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  aria-current={link.current ? "page" : undefined}
                  className={`rounded-xl px-3 py-2.5 text-start text-sm font-semibold transition-colors ${
                    link.current
                      ? "bg-brand-50 text-brand-700"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                type="button"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-700 sm:hidden"
              >
                <LogIn className="size-4" aria-hidden="true" />
                {t.signIn}
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
