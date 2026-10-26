import { whatsappLink } from "@/lib/site";
import { Icon } from "./Icon";

/** Fixed chat button, as on the reference site. Hidden until a WhatsApp number is set. */
export function WhatsAppFloat({ label, text }: { label: string; text: string }) {
  const href = whatsappLink(text);
  if (!href) return null;
  return (
    <a className="wa-float" href={href} target="_blank" rel="noopener" aria-label={label}>
      <Icon name="chat" />
    </a>
  );
}
