import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = process.env.MIOVRA_DATA_DIR ?? path.join(process.cwd(), "data");

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Appends one submission as a JSON line to data/<file>.jsonl, a permanent record
 * alongside the email notification in lib/mailer.ts.
 */
export async function saveSubmission(file: "enquiries" | "subscribers", record: Record<string, unknown>) {
  await mkdir(DATA_DIR, { recursive: true });
  const line = JSON.stringify({ at: new Date().toISOString(), ...record });
  await appendFile(path.join(DATA_DIR, `${file}.jsonl`), line + "\n", "utf8");
}

/** Trims a string field and caps its length; anything else becomes "". */
export function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
