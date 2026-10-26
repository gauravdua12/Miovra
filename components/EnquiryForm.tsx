"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { fill, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

type Topic = keyof Dictionary["connect"]["topics"];

interface Props {
  lang: Locale;
  t: Dictionary["connect"];
  topic?: Topic;
  /** Pieces the enquiry is about, shown above the message. */
  pieces?: string[];
  message?: string;
  idPrefix?: string;
}

export function EnquiryForm({ lang, t, topic = "piece", pieces = [], message = "", idPrefix = "enq" }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "invalid" | "error">("idle");
  const [sentTo, setSentTo] = useState("");
  const id = (name: string) => `${idPrefix}-${name}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setState("invalid");
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    setState("sending");
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, pieces, lang }),
    }).catch(() => null);
    if (res?.ok) {
      setSentTo(String(data.email));
      setState("sent");
    } else {
      setState(res?.status === 400 ? "invalid" : "error");
    }
  }

  if (state === "sent") {
    return <p className="form-msg" role="status">{fill(t.sent, { email: sentTo })}</p>;
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__grid">
        <div className="field">
          <label htmlFor={id("name")}>{t.name}</label>
          <input id={id("name")} name="name" required autoComplete="name" maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor={id("email")}>{t.email}</label>
          <input id={id("email")} name="email" type="email" required autoComplete="email" maxLength={200} />
        </div>
        <div className="field">
          <label htmlFor={id("phone")}>{t.phone}</label>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
        <div className="field">
          <label htmlFor={id("topic")}>{t.topic}</label>
          <select id={id("topic")} name="topic" defaultValue={topic}>
            {(Object.keys(t.topics) as Topic[]).map((k) => (
              <option key={k} value={k}>{t.topics[k]}</option>
            ))}
          </select>
        </div>
      </div>
      {pieces.length > 0 && (
        <div className="field">
          <span className="eyebrow">{t.piece}</span>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {pieces.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      )}
      <div className="field">
        <label htmlFor={id("message")}>{t.message}</label>
        <textarea id={id("message")} name="message" required defaultValue={message} maxLength={4000} />
      </div>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {state === "invalid" && <p role="alert" className="form-msg">{t.required}</p>}
      {state === "error" && <p role="alert" className="form-msg">{fill(t.error, { email: site.email })}</p>}
      <div className="btn-row" style={{ justifyContent: "space-between" }}>
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? t.sending : t.send}
        </button>
        <Link href={`/${lang}/privacy`} className="muted-note" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
          {t.privacy}
        </Link>
      </div>
    </form>
  );
}
