"use server";

import { cookies } from "next/headers";
import { LOCALE_COOKIE, LOCALE_MAX_AGE, isLocale } from "@/data/i18n";

// layout and page read this cookie on the next render
export async function setLocale(code) {
  if (!isLocale(code)) return;

  const store = await cookies();
  store.set(LOCALE_COOKIE, code, {
    path: "/",
    maxAge: LOCALE_MAX_AGE,
    sameSite: "lax",
  });
}
