import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type Params = Promise<{ lang: string }>;
const UPDATED = { en: "26 October 2026", sv: "26 oktober 2026" };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).legal.shipping.title };
}

export default async function ShippingPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang).legal;
  return <LegalPage {...t.shipping} updated={t.updated} date={UPDATED[lang]} />;
}
