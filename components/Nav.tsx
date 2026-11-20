"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { projectsFor } from "@/lib/projects-i18n";
import { href, langs, langNames, type Dict, type Lang } from "@/lib/i18n";

const thumbs: Record<string, string> = {
  "safar-nama": "/work/safar-nama/ayub-forest.jpg",
  "as-sakinah": "/work/as-sakinah/post-6-dua.jpg",
  "story-behind-history": "/work/story-behind-history/banner.jpg",
  mystrick: "/work/mystrick/site.jpg",
  "attar-lagbe": "/work/attar-lagbe/banner-vampire-blood.jpg",
  sundus: "/brand/sundus-card.svg",
};

export function useDhakaTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dhaka" });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Roll({ children }: { children: string }) {
  return (
    <span className="roll" data-text={children}>
      <span>{children}</span>
    </span>
  );
}

/** The same page in another language: strip any /bn or /ar prefix, then add the new one. */
export function switchPath(pathname: string, to: Lang) {
  const bare = pathname.replace(/^\/(bn|ar)(?=\/|$)/, "") || "/";
  return href(to, bare);
}

export default function Nav({ lang, d }: { lang: Lang; d: Dict }) {
  const projects = projectsFor(lang);
  const nav = [
    { href: href(lang, "/#about"), label: d.nav.about },
    { href: href(lang, "/#work"), label: d.nav.work },
    { href: href(lang, "/#ventures"), label: d.nav.ventures },
    { href: href(lang, "/#education"), label: d.nav.education },
    { href: href(lang, "/#contact"), label: d.nav.contact },
  ];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(projects[0].slug);
  const pathname = usePathname();
  const time = useDhakaTime();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("menu-open", open);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  useEffect(() => {
    // the engine closes the menu by removing the class after in-menu navigation
    const obs = new MutationObserver(() => {
      if (!document.documentElement.classList.contains("menu-open")) setOpen(false);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <header className={`nav${open ? " is-open" : ""}`}>
      <div className="progress" aria-hidden />
      <div className="nav__bar">
        <Link href={href(lang, "/")} className="nav__brand" aria-label={`${d.name.full}, ${d.nav.home}`} data-magnetic="0.2">
          <span className="nav__mark">
            <Image src="/brand/ayub-mark.png" alt="" width={38} height={28} priority />
          </span>
          <span className="nav__name">
            <Roll>{d.name.full}</Roll>
          </span>
        </Link>

        <nav className="nav__links" aria-label={d.nav.navigate}>
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              <Roll>{n.label}</Roll>
            </Link>
          ))}
        </nav>

        <div className="nav__right">
          <span className="nav__time" aria-label={`${d.nav.time} ${time}`}>
            <i aria-hidden /> {d.nav.time} <span dir="ltr">{time}</span>
          </span>
          <div className="langsw" role="group" aria-label="Language">
            {langs.map((l) => (
              <Link
                key={l}
                href={switchPath(pathname, l)}
                hrefLang={l}
                lang={l}
                className={l === lang ? "is-on" : ""}
                aria-current={l === lang ? "true" : undefined}
                title={langNames[l].name}
              >
                {langNames[l].short}
              </Link>
            ))}
          </div>
          <Link href={href(lang, "/#contact")} className="nav__cta" data-magnetic="0.25">
            <Roll>{d.nav.talk}</Roll>
          </Link>
          <button
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? d.nav.close : d.nav.menu}
            onClick={() => setOpen((v) => !v)}
            data-magnetic="0.35"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="menu" className="menu" aria-hidden={!open} inert={!open} data-lenis-prevent>
        <div className="menu__bg" aria-hidden>
          <span lang="ar">أيوب</span>
        </div>
        <div className="menu__inner">
          <div className="menu__col">
            <p className="label">{d.nav.navigate}</p>
            <ol className="menu__nav">
              {[{ href: href(lang, "/"), label: d.nav.home }, ...nav].map((n, i) => (
                <li key={n.href} style={{ ["--i" as string]: i }}>
                  <Link href={n.href} onClick={() => setOpen(false)}>
                    <small>0{i + 1}</small>
                    <Roll>{n.label}</Roll>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <div className="menu__col menu__work">
            <p className="label">{d.nav.projects}</p>
            <ul>
              {projects.map((p, i) => (
                <li key={p.slug} style={{ ["--i" as string]: i + 2 }} onMouseEnter={() => setActive(p.slug)} onFocus={() => setActive(p.slug)}>
                  <Link href={href(lang, `/work/${p.slug}`)} onClick={() => setOpen(false)} className={active === p.slug ? "is-active" : ""}>
                    <span>{p.no}</span> {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="menu__preview" aria-hidden>
              {projects.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p.slug} src={thumbs[p.slug]} alt="" className={active === p.slug ? "is-active" : ""} loading="lazy" />
              ))}
            </div>
          </div>
          <div className="menu__foot">
            <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a>
            <span dir="ltr">{site.phone}</span>
            <span className="menu__langs">
              {langs.map((l) => (
                <Link key={l} href={switchPath(pathname, l)} hrefLang={l} lang={l} className={l === lang ? "is-on" : ""}>
                  {langNames[l].name}
                </Link>
              ))}
            </span>
            <span className="menu__socials">
              {site.socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
