"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, TrendingUp } from "lucide-react";
import { localize } from "@/data/i18n";
import { filterGroups as rawGroups, popularSearches as rawPopular } from "@/data/mock";
import { ui } from "@/data/ui";

export default function SearchFilterBar({ locale }) {
  const t = ui[locale].search;
  const filterGroups = localize(rawGroups, locale);
  const popularSearches = localize(rawPopular, locale);
  const [filters, setFilters] = useState({});

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
        <div className="grid gap-3 lg:grid-cols-6 lg:items-end">
          {filterGroups.map((group) => (
            <div key={group.id} className="flex flex-col gap-1.5">
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
                className="w-full cursor-pointer appearance-none rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-800 transition-colors hover:border-brand-300 hover:bg-white focus:border-brand-500 focus:bg-white"
              >
                <option value="">{group.placeholder}</option>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand-700 px-6 text-sm font-bold text-white transition-colors hover:bg-brand-800 active:bg-brand-900"
          >
            <Search className="size-4" aria-hidden="true" />
            {t.submit}
          </button>
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
        </div>
      </form>
    </section>
  );
}
