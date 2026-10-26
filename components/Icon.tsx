// Thin line icons drawn to match the stroke of the lotus mark.
const paths = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  play: <path d="M9.5 7.5l7 4.5-7 4.5z" />,
  chat: <><path d="M4.5 19.5l1.2-3.6A7.5 7.5 0 1 1 8.6 18.6z" /><path d="M9.5 10.5c.3 1.6 1.6 3 3.3 3.5" /></>,
  block: <><rect x="4" y="9" width="16" height="11" /><path d="M9 9V4h6v5M8 14.5h8" /></>,
  brush: <path d="M19 4l-8.5 8.5M10.5 12.5c-2 0-3.5 1.5-3.5 3.5 0 1.6-1 3-3 3 4 1.5 9 0 9-4" />,
  needle: <path d="M5 19L19 5M16.5 5H19v2.5M5 12c3 0 4 2 7 2s4-2 7-2" />,
  chevron: <path d="M7 10l5 5 5-5" />,
  filter: <path d="M4 7h16M7 12h10M10 17h4" />,
  hand: <path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12M11 11V5a1.5 1.5 0 0 1 3 0v6M14 11V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-.5A5.5 5.5 0 0 1 6 17.5L4.5 14a1.5 1.5 0 0 1 2.6-1.4L8 14" />,
  truck: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></>,
  return: <path d="M9 8H5V4M5.3 8A8 8 0 1 1 4 12" />,
  mail: <><rect x="3.5" y="6" width="17" height="12" /><path d="M3.5 6.5l8.5 6.5 8.5-6.5" /></>,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "icon", label }: { name: IconName; className?: string; label?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden={label ? undefined : true} aria-label={label} role={label ? "img" : undefined}>
      {paths[name]}
    </svg>
  );
}

/** The long thin arrow used on collection tiles. */
export function Arrow({ className = "tile__arrow" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M1 7h45M41 2l5 5-5 5" />
    </svg>
  );
}
