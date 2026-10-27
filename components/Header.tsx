"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { Icon } from "./Icon";
import { Media } from "./Media";
import { usePrefs } from "./PrefsProvider";
import { CurrencyToggle, LanguageToggle } from "./Toggles";

interface HeaderProps {
  lang: Locale;
  t: Pick<Dictionary, "nav" | "a11y" | "prefs">;
  collections: { href: string; name: string }[];
  feature: { src: string | null; alt: string; label: string; href: string };
}

export function Header({ lang, t, collections, feature }: HeaderProps) {
  const pathname = usePathname();
  const { saved } = usePrefs();
  const [compact, setCompact] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const base = `/${lang}`;

  useEffect(() => {
    // Shrink after 200px, grow back only near the top. The gap must exceed the header's own
    // change in height (~115px on desktop), or the resize moves the scroll position back across
    // the threshold and the header flickers between the two sizes.
    const onScroll = () =>
      setCompact((was) => (was ? window.scrollY > 24 : window.scrollY > 200));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sticky toolbars further down the page sit directly under the header.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--toolbar-top", `${el.offsetHeight}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen && !megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setMegaOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, megaOpen]);

  const isActive = (href: string) => (href === base ? pathname === base : pathname.startsWith(href));
  const links = [
    { href: `${base}/workshops`, label: t.nav.workshops },
    { href: `${base}/our-story`, label: t.nav.story },
    { href: `${base}/connect`, label: t.nav.connect },
  ];

  return (
    <>
      <header ref={headerRef} className={`header${compact ? " is-compact" : ""}`}>
        <div className="container header__bar">
          <div className="header__left">
            <button type="button" className="icon-btn header__menu-btn" aria-label={t.a11y.menu} aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}>
              <Icon name="menu" />
            </button>
            <Link href={`${base}/search`} className="icon-btn hide-mobile" aria-label={t.a11y.search}>
              <Icon name="search" />
            </Link>
          </div>
          <Link href={base} className="header__logo" aria-label={t.a11y.home}>
            <i className="lotus" aria-hidden="true" />
            <i className="wordmark" aria-hidden="true" />
          </Link>
          <div className="header__right">
            <Link href={`${base}/search`} className="icon-btn header__menu-btn" aria-label={t.a11y.search}>
              <Icon name="search" />
            </Link>
            <Link href={`${base}/saved`} className="icon-btn" aria-label={`${t.a11y.wishlist} (${saved.length})`}>
              <Icon name="heart" />
              {saved.length > 0 && <span className="count" aria-hidden="true">{saved.length}</span>}
            </Link>
          </div>
        </div>
        <nav className="nav container" aria-label="Main">
          <div className="nav__item">
            <Link href={base} className="nav__link" aria-current={isActive(base) ? "page" : undefined}>
              {t.nav.home}
            </Link>
          </div>
          <div className="nav__item" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button
              type="button"
              className="nav__link"
              aria-expanded={megaOpen}
              aria-controls="mega-collections"
              aria-current={isActive(`${base}/collections`) || isActive(`${base}/products`) ? "page" : undefined}
              onClick={() => setMegaOpen((o) => !o)}
            >
              {t.nav.collections} <Icon name="chevron" />
            </button>
            {megaOpen && (
              <div className="mega" id="mega-collections">
                <div>
                  <ul>
                    {collections.map((c) => (
                      <li key={c.href}><Link href={c.href}>{c.name}</Link></li>
                    ))}
                  </ul>
                  <Link href={`${base}/collections`} className="link-caps">{t.nav.allCollections}</Link>
                </div>
                <Link href={feature.href} tabIndex={-1} aria-hidden="true">
                  <Media src={feature.src} alt="" label={feature.label} sizes="420px" />
                </Link>
              </div>
            )}
          </div>
          {links.map((l) => (
            <div className="nav__item" key={l.href}>
              <Link href={l.href} className="nav__link" aria-current={isActive(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            </div>
          ))}
        </nav>
      </header>

      {drawerOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)} />
          <div className="drawer" role="dialog" aria-modal="true" aria-label={t.a11y.menu}>
            <div className="drawer__head">
              <i className="wordmark" aria-hidden="true" />
              <button ref={closeRef} type="button" className="icon-btn" aria-label={t.a11y.close} onClick={() => setDrawerOpen(false)}>
                <Icon name="close" />
              </button>
            </div>
            <nav aria-label="Main">
              <Link href={base}>{t.nav.home}</Link>
              <Link href={`${base}/collections`}>{t.nav.collections}</Link>
              <div className="sub">
                {collections.map((c) => (
                  <Link key={c.href} href={c.href}>{c.name}</Link>
                ))}
              </div>
              {links.map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </nav>
            <div className="drawer__prefs">
              <LanguageToggle label={t.prefs.language} />
              <CurrencyToggle label={t.prefs.currency} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
