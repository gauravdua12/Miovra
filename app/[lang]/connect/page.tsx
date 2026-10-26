import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactList } from "@/components/ContactList";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getProduct } from "@/lib/catalog";
import { getDictionary } from "@/lib/dictionaries";
import { fill, isLocale } from "@/lib/i18n";

type Params = Promise<{ lang: string }>;
type Search = Promise<{ topic?: string; product?: string; size?: string; items?: string }>;
const topics = ["piece", "gift", "workshop", "other"] as const;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.connect.title, description: t.connect.intro };
}

export default async function ConnectPage({ params, searchParams }: { params: Params; searchParams: Search }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const q = await searchParams;
  const t = getDictionary(lang);
  const topic = topics.find((x) => x === q.topic) ?? "piece";

  // Arriving from a product page or the saved list pre-fills the enquiry.
  const slugs = (q.items ?? q.product ?? "").split(",").filter(Boolean);
  const chosen = slugs.map(getProduct).filter((p) => !!p);
  const pieces = chosen.map((p) => `${p.name[lang]} (${p.code})${q.product && q.size ? `, ${q.size}` : ""}`);
  let message = "";
  if (chosen.length === 1) {
    const p = chosen[0];
    message = fill(t.connect.messagePiece, { name: p.name[lang], code: p.code, size: q.size ? `, ${q.size}` : "" });
  } else if (chosen.length > 1) {
    message = fill(t.wishlist.enquireText, { list: chosen.map((p) => p.name[lang]).join(", ") });
  }

  return (
    <section className="section">
      <div className="container connect">
        <div className="stack" style={{ alignContent: "start", gap: 20 }}>
          <i className="lotus" aria-hidden="true" />
          <h1 className="display">{t.connect.title}</h1>
          <p className="lede">{t.connect.intro}</p>
          <p className="eyebrow" style={{ marginTop: 24 }}>{t.connect.direct}</p>
          <ContactList t={t.home.connect} />
        </div>
        <EnquiryForm lang={lang} t={t.connect} topic={topic} pieces={pieces} message={message} />
      </div>
    </section>
  );
}
