import { NextResponse } from "next/server";
import { notify } from "@/lib/mailer";
import { clean, EMAIL_RE, saveSubmission } from "@/lib/submissions";

const TOPICS = ["piece", "gift", "workshop", "other"];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false }, { status: 400 });

  // Bots fill the hidden "website" field; accept quietly and drop it.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const enquiry = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    topic: TOPICS.includes(body.topic) ? body.topic : "other",
    message: clean(body.message, 4000),
    pieces: Array.isArray(body.pieces) ? body.pieces.slice(0, 20).map((p: unknown) => clean(p, 200)) : [],
    lang: body.lang === "sv" ? "sv" : "en",
  };
  if (!enquiry.name || !EMAIL_RE.test(enquiry.email) || !enquiry.message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await saveSubmission("enquiries", enquiry);
  await notify(
    `New enquiry from ${enquiry.name}`,
    [
      ["Name", enquiry.name],
      ["Email", enquiry.email],
      ["Phone", enquiry.phone],
      ["Topic", enquiry.topic],
      ["Pieces", enquiry.pieces.join("\n")],
      ["Message", enquiry.message],
      ["Site language", enquiry.lang],
    ],
    enquiry.email,
  );
  return NextResponse.json({ ok: true });
}
