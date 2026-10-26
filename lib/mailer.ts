import nodemailer from "nodemailer";

// Emails each enquiry and sign-up to Miovra when SMTP settings are present (see .env.example).
// Without them, submissions are only saved to data/*.jsonl, which is how local development runs.
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;

const transport =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT ?? 465),
        secure: Number(SMTP_PORT ?? 465) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null;

export async function notify(subject: string, lines: [string, string][], replyTo?: string) {
  if (!transport) return;
  const text = lines
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}:\n${value}`)
    .join("\n\n");
  try {
    await transport.sendMail({
      from: MAIL_FROM || SMTP_USER,
      to: MAIL_TO || SMTP_USER,
      replyTo,
      subject,
      text,
    });
  } catch (err) {
    // The submission is already saved to disk, so a mail failure must not fail the visitor's request.
    console.error("Email notification failed:", err);
  }
}
