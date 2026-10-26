import { site, whatsappLink } from "@/lib/site";

/** Email always shows; Instagram, Facebook and WhatsApp appear once set in lib/site.ts. */
export function ContactList({ t }: { t: { email: string; instagram: string; facebook: string; whatsapp: string } }) {
  const wa = whatsappLink("");
  const rows: [string, string | null, string][] = [
    [t.email, `mailto:${site.email}`, site.email],
    [t.instagram, site.instagram || null, site.instagram.replace(/^https?:\/\/(www\.)?/, "")],
    [t.facebook, site.facebook || null, site.facebook.replace(/^https?:\/\/(www\.)?/, "")],
    [t.whatsapp, wa, site.whatsapp ? `+${site.whatsapp}` : ""],
  ];
  return (
    <ul className="contact-list">
      {rows
        .filter(([, href]) => href)
        .map(([label, href, text]) => (
          <li key={label}>
            <span>{label}</span>
            <a href={href!} target={href!.startsWith("http") ? "_blank" : undefined} rel="noopener">{text}</a>
          </li>
        ))}
    </ul>
  );
}
