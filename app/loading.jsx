import { getLocale } from "@/data/locale.server";
import { ui } from "@/data/ui";



function Box({ className }) {
  return <div className={`skeleton rounded-md ${className}`} />;
}

function Block({ children, className = "" }) {
  return (
    <div className={className}>
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {children}
      </div>
    </div>
  );
}

const times = (count) => Array.from({ length: count }, (_, i) => i);

export default async function Loading() {
  const locale = await getLocale();
  return (
    <main aria-busy="true">
      {/* Hero */}
      <section className="h-svh max-h-230 min-h-155 bg-brand-950">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-36 sm:px-6 lg:justify-center lg:px-8 lg:pb-32">
          <div className="flex max-w-xl flex-col gap-5 md:gap-6 lg:max-w-2xl">
            <Box className="h-8 w-56 rounded-full opacity-20" />
            <Box className="h-14 w-full opacity-20" />
            <Box className="h-14 w-9/12 opacity-20" />
            <Box className="h-5 w-10/12 opacity-20" />
            <div className="flex flex-wrap gap-3">
              <Box className="h-13 w-40 rounded-2xl opacity-20" />
              <Box className="h-13 w-44 rounded-2xl opacity-20" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Box className="h-9 w-36 rounded-full opacity-20" />
              <Box className="h-9 w-32 rounded-full opacity-20" />
              <Box className="h-9 w-32 rounded-full opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Search bar with its filters */}
      <div className="relative z-10 mx-auto -mt-14 w-full max-w-7xl px-4 sm:px-6 lg:-mt-20 lg:px-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-xl shadow-stone-900/5 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-6">
            {times(6).map((i) => (
              <Box key={i} className="h-12 rounded-2xl" />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-stone-100 pt-4">
            {times(5).map((i) => (
              <Box key={i} className="h-7 w-28 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* What we offer */}
      <Block>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {times(3).map((i) => (
            <div key={i} className="rounded-3xl border border-stone-200 bg-white p-7">
              <Box className="size-12 rounded-2xl" />
              <Box className="mt-6 h-6 w-32" />
              <Box className="mt-4 h-4 w-full" />
              <Box className="mt-2 h-4 w-11/12" />
              <Box className="mt-2 h-4 w-8/12" />
              <Box className="mt-7 h-4 w-24" />
            </div>
          ))}
        </div>
      </Block>

      {/* Featured professional */}
      <Block className="bg-stone-50/60">
        <div className="grid overflow-hidden rounded-4xl border border-stone-200 bg-white lg:grid-cols-2">
          <Box className="aspect-4/3 rounded-none" />
          <div className="p-7 md:p-10">
            <Box className="h-5 w-24" />
            <Box className="mt-5 h-8 w-11/12" />
            <Box className="mt-3 h-4 w-full" />
            <Box className="mt-2 h-4 w-10/12" />
            <div className="mt-8 flex items-center gap-3">
              <Box className="size-12 rounded-xl" />
              <Box className="h-5 w-40" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {times(4).map((i) => (
                <Box key={i} className="h-16 rounded-2xl" />
              ))}
            </div>
            <Box className="mt-8 h-12 w-44 rounded-full" />
          </div>
        </div>
      </Block>

      {/* Latest projects */}
      <Block>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {times(8).map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-3xl border border-stone-200 bg-white"
            >
              <Box className="aspect-4/3 rounded-none" />
              <div className="p-5">
                <Box className="h-5 w-10/12" />
                <Box className="mt-3 h-4 w-8/12" />
                <div className="mt-5 flex items-center gap-3 border-t border-stone-100 pt-4">
                  <Box className="size-9 rounded-lg" />
                  <Box className="h-4 flex-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* Certified professionals */}
      <Block className="bg-stone-50/60">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {times(6).map((i) => (
            <div key={i} className="rounded-3xl border border-stone-200 bg-white p-6">
              <div className="flex items-center gap-4">
                <Box className="size-14 rounded-2xl" />
                <div className="flex-1">
                  <Box className="h-5 w-32" />
                  <Box className="mt-2 h-4 w-20" />
                </div>
              </div>
              <Box className="mt-5 h-4 w-full" />
              <Box className="mt-2 h-4 w-10/12" />
              <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                <Box className="h-4 w-20" />
                <Box className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </Block>

      <span className="sr-only">{ui[locale].loading}</span>
    </main>
  );
}
