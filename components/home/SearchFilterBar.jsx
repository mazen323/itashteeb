"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, SlidersHorizontal, TrendingUp, X } from "lucide-react";
import { localize } from "@/data/i18n";
import { filterGroups as rawGroups, popularSearches as rawPopular } from "@/data/mock";
import { ui } from "@/data/ui";

export default function SearchFilterBar({ locale }) {
  const t = ui[locale].search;
  const filterGroups = localize(rawGroups, locale);
  const popularSearches = localize(rawPopular, locale);
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);

  const chosen = Object.values(filters).filter(Boolean).length;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section
      id="search"
      aria-labelledby="search-heading"
      className="relative z-10 mx-auto -mt-14 w-full max-w-7xl px-4 sm:px-6 lg:-mt-20 lg:px-8"
    >
      <h2 id="search-heading" className="sr-only">
        {t.heading}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-stone-200 bg-white p-4 shadow-xl shadow-stone-900/5 sm:p-5"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 inset-s-4 size-5 -translate-y-1/2 text-stone-400"
              aria-hidden="true"
            />
            <input
              type="search"
              name="q"
              placeholder={t.placeholder}
              aria-label={t.heading}
              className="h-13 w-full rounded-2xl border border-stone-200 bg-stone-50 ps-12 pe-4 text-sm font-medium text-stone-800 transition-colors placeholder:text-stone-400 hover:bg-white focus:border-brand-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="search-filters"
              className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 text-sm font-bold text-stone-700 transition-colors hover:border-brand-300 hover:text-brand-700 lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              {t.filters}
              {chosen > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-brand-700 text-[11px] font-bold text-white">
                  {chosen}
                </span>
              )}
              <ChevronDown
                className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            <button
              type="submit"
              className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-700 px-7 text-sm font-bold text-white transition-colors hover:bg-brand-800 active:bg-brand-900 lg:flex-none"
            >
              <Search className="size-4" aria-hidden="true" />
              {t.submit}
            </button>
          </div>
        </div>

        <div
          id="search-filters"
          className={`grid gap-3 sm:grid-cols-2 lg:mt-4 lg:grid-cols-5 ${
            open ? "mt-4 grid" : "hidden lg:grid"
          }`}
        >
          {filterGroups.map((group) => (
            <div key={group.id} className="relative flex flex-col gap-1.5">
              <label
                htmlFor={`filter-${group.id}`}
                className="ps-1 text-xs font-semibold text-stone-500"
              >
                {group.label}
              </label>
              <select
                id={`filter-${group.id}`}
                name={group.id}
                value={filters[group.id] ?? ""}
                onChange={(event) =>
                  setFilters({ ...filters, [group.id]: event.target.value })
                }
                className={`w-full cursor-pointer appearance-none rounded-2xl border bg-stone-50 px-4 py-3 pe-10 text-sm font-medium transition-colors hover:bg-white focus:border-brand-500 focus:bg-white ${
                  filters[group.id]
                    ? "border-brand-300 bg-white text-brand-800"
                    : "border-stone-200 text-stone-800"
                }`}
              >
                <option value="">{group.placeholder}</option>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute bottom-3.5 inset-e-4 size-4 text-stone-400"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500">
            <TrendingUp className="size-3.5" aria-hidden="true" />
            {t.popular}
          </span>

          {popularSearches.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}

          {chosen > 0 && (
            <button
              type="button"
              onClick={() => setFilters({})}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-bold text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800 ms-auto"
            >
              <X className="size-3.5" aria-hidden="true" />
              {t.clear}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
