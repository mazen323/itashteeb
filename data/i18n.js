export const LOCALES = ["ar", "en"];
export const DEFAULT_LOCALE = "ar";
export const LOCALE_COOKIE = "itashteeb-lang";
export const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

export const isLocale = (value) => LOCALES.includes(value);
export const dirOf = (locale) => (locale === "en" ? "ltr" : "rtl");

// a bilingual string is an object with exactly the keys ar and en
const isBilingual = (value) =>
  typeof value.ar === "string" &&
  typeof value.en === "string" &&
  Object.keys(value).length === 2;


export function localize(value, locale) {
  if (Array.isArray(value)) return value.map((item) => localize(item, locale));

  if (value === null || typeof value !== "object" || value.$$typeof) return value;

  if (isBilingual(value)) return value[locale] ?? value[DEFAULT_LOCALE];

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, localize(item, locale)]),
  );
}
