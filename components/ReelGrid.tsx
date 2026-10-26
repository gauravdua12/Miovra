"use client";

import { useState } from "react";
import { fill } from "@/lib/i18n";
import { instagramEmbedUrl } from "@/lib/site";
import { Icon } from "./Icon";

interface ReelText {
  play: string;
  consent: string;
  soon: string;
  frameTitle: string;
}

/**
 * Instagram reels that load only when clicked: faster pages, and no Instagram
 * cookies before the visitor chooses to watch (GDPR).
 */
export function Reel({ url, index, t }: { url?: string; index: number; t: ReelText }) {
  const [playing, setPlaying] = useState(false);
  const embed = url ? instagramEmbedUrl(url) : null;

  if (playing && embed) {
    return (
      <div className="reel">
        <iframe src={embed} title={fill(t.frameTitle, { n: index + 1 })} loading="lazy" allow="encrypted-media; fullscreen" />
      </div>
    );
  }
  return (
    <div className="reel">
      <button type="button" className="reel__poster" disabled={!embed} onClick={() => setPlaying(true)}>
        <span className="reel__play"><Icon name="play" /></span>
        <span>{embed ? `${t.play}. ${t.consent}` : t.soon}</span>
      </button>
    </div>
  );
}

export function ReelGrid({ urls, t }: { urls: string[]; t: ReelText }) {
  return (
    <div className="reels">
      {[0, 1, 2].map((i) => (
        <Reel key={i} url={urls[i]} index={i} t={t} />
      ))}
    </div>
  );
}
