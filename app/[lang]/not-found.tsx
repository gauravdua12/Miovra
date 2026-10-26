import Link from "next/link";

// Rendered for unknown pieces or collections. The locale isn't available here,
// so the copy is bilingual.
export default function NotFound() {
  return (
    <section className="section">
      <div className="container section-head">
        <i className="lotus" aria-hidden="true" />
        <h1 className="display">This page can&apos;t be found</h1>
        <p lang="sv">Sidan kunde inte hittas</p>
        <p>The page may have moved, or the link may be mistyped.</p>
        <Link href="/" className="btn">Back to the Homepage</Link>
      </div>
    </section>
  );
}
