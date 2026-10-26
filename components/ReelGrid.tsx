"use client";

import { useState } from "react";
import { fill } from "@/lib/i18n";
import { instagramEmbedUrl } from "@/lib/site";
import { Icon } from "./Icon";

interface ReelText {
  play: string;
  consent: string;
  frameTitle: string;
}

/**
 * Instagram reels that load only when clicked: faster pages, and no Instagram
 * cookies before the visitor chooses to watch (GDPR).
 */
export function Reel({ url, index, t }: { url?: string; index: number; t: ReelText }) {
  const [playing, setPlaying] = useState(false);
  const embed = url ? instagramEmbedUrl(url) : null;
  if (!embed) return null;

  if (playing) {
    return (
      <div className="reel">
        <iframe src={embed} title={fill(t.frameTitle, { n: index + 1 })} loading="lazy" allow="encrypted-media; fullscreen" />
      </div>
    );
  }
  return (
    <div className="reel">
      <button type="button" className="reel__poster" onClick={() => setPlaying(true)}>
        <span className="reel__play"><Icon name="play" /></span>
        <span>{`${t.play}. ${t.consent}`}</span>
      </button>
    </div>
  );
}

export function ReelGrid({ urls, t }: { urls: string[]; t: ReelText }) {
  return (
    <div className="reels">
      {urls.slice(0, 3).map((url, i) => (
        <Reel key={url} url={url} index={i} t={t} />
      ))}
    </div>
  );
}
