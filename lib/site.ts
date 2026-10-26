// Contact details and social links. Empty values hide the matching link or button,
// so the site stays tidy until each handle is confirmed (see CONTENT-TODO.md).
export const site = {
  name: "Miovra",
  url: "https://www.miovra.eu",
  email: "Miovra4u@gmail.com",
  instagram: "", // e.g. "https://www.instagram.com/miovra/"
  facebook: "", // e.g. "https://www.facebook.com/miovra"
  whatsapp: "", // international number, digits only, e.g. "46701234567"
  /** Up to three Instagram reel URLs for "See How It Is Made". */
  reels: [] as string[],
};

export function whatsappLink(text: string): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Turns an Instagram post or reel URL into its embeddable iframe URL. */
export function instagramEmbedUrl(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([\w-]+)/);
  return match ? `https://www.instagram.com/reel/${match[1]}/embed` : null;
}
