import { NextResponse } from "next/server";
import { clean, EMAIL_RE, saveSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false }, { status: 400 });
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const email = clean(body.email, 200);
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false }, { status: 400 });

  await saveSubmission("subscribers", { email, lang: body.lang === "sv" ? "sv" : "en" });
  return NextResponse.json({ ok: true });
}
