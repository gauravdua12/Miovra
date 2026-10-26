import Image from "next/image";

interface MediaProps {
  /** Resolved public path, or null when the photo hasn't been supplied yet. */
  src: string | null;
  alt: string;
  /** Shown on the placeholder so it's clear which photo belongs here. */
  label: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** CSS object-position, so a crop keeps the subject in frame. */
  focus?: string;
}

/** A photo that fills its box, or a labelled placeholder while the file is missing. */
export function Media({ src, alt, label, sizes, priority, className = "", focus }: MediaProps) {
  if (!src) {
    return (
      <div className={`media media--placeholder ${className}`} role="img" aria-label={alt}>
        <span>{label}</span>
      </div>
    );
  }
  return (
    <div className={`media ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={focus ? { objectPosition: focus } : undefined} />
    </div>
  );
}
