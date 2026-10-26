import { fill } from "@/lib/i18n";

interface Props {
  title: string;
  sections: { heading: string; body: string[] }[];
  updated: string;
  date: string;
}

export function LegalPage({ title, sections, updated, date }: Props) {
  return (
    <section className="section">
      <div className="container" style={{ display: "grid", justifyItems: "center" }}>
        <article className="prose">
          <h1 className="display">{title}</h1>
          <p className="muted-note">{fill(updated, { date })}</p>
          {sections.map((s) => (
            <section key={s.heading} className="stack">
              <h2>{s.heading}</h2>
              {s.body.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}
