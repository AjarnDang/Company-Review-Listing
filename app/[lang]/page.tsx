import React from "react";
import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/get-dictionary";
import HomePage from "@/app/pages/HomePage";

export default function Home({ params }: { params: { lang: Locale } }) {
  const t = getDictionary(params.lang);

  return <HomePage lang={params.lang} translations={t} />;
}
