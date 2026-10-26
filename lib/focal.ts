// Where to anchor each photo when a frame crops it (CSS object-position).
// "portrait" frames are tiles, product cards and the gallery; "wide" frames are page banners.
// Photos not listed here are centred.
type Frame = "portrait" | "wide";

const focal: Record<string, Partial<Record<Frame, string>>> = {
  "banner-home": { portrait: "64% center" },
  "collection-folk-art": { portrait: "24% center", wide: "center 45%" },
  "collection-bags": { wide: "center 58%" },
  "collection-diy-kits": { portrait: "30% center", wide: "center 62%" },
};

export function focus(base: string | undefined, frame: Frame): string | undefined {
  return base ? focal[base]?.[frame] : undefined;
}
