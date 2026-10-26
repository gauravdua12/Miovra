"use client";

import { useState } from "react";
import { fill } from "@/lib/i18n";
import { Media } from "./Media";

interface Props {
  images: { src: string | null; label: string; focus?: string }[];
  name: string;
  t: { imageOf: string; showImage: string };
}

export function ProductGallery({ images, name, t }: Props) {
  const [active, setActive] = useState(0);
  const current = images[active];
  return (
    <div className={`gallery${images.length > 1 ? "" : " gallery--single"}`}>
      {images.length > 1 && (
      <div className="gallery__thumbs">
        {images.map((img, i) => (
            <button
              key={i}
              type="button"
              aria-current={i === active ? "true" : undefined}
              aria-label={fill(t.showImage, { n: i + 1 })}
              onClick={() => setActive(i)}
            >
              <Media src={img.src} alt="" label={String(i + 1)} sizes="88px" focus={img.focus} />
            </button>
        ))}
      </div>
      )}
      <Media
        src={current.src}
        alt={fill(t.imageOf, { name, n: active + 1 })}
        label={current.label}
        focus={current.focus}
        sizes="(max-width: 900px) 100vw, 640px"
        priority
        className="gallery__main"
      />
    </div>
  );
}
