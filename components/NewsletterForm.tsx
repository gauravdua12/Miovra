"use client";

import { useState } from "react";

interface Props {
  lang: string;
  t: { signup: string; placeholder: string; subscribe: string; thanks: string; invalid: string };
}

export function NewsletterForm({ lang, t }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState("sending");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), website: form.get("website"), lang }),
    }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }

  if (state === "done") return <p className="form-msg" role="status">{t.thanks}</p>;

  return (
    <form onSubmit={onSubmit} className="stack" noValidate={false}>
      <label htmlFor="newsletter-email">{t.signup}</label>
      <div className="field-row">
        <input id="newsletter-email" name="email" type="email" required autoComplete="email" placeholder={t.placeholder} />
        <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="btn" type="submit" disabled={state === "sending"}>{t.subscribe}</button>
      </div>
      {state === "error" && <p role="alert" className="muted-note">{t.invalid}</p>}
    </form>
  );
}
