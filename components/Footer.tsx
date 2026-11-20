"use client";

import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { projectsFor } from "@/lib/projects-i18n";
import { href, type Dict, type Lang } from "@/lib/i18n";
import { useDhakaTime } from "./Nav";

export default function Footer({ lang, d }: { lang: Lang; d: Dict }) {
  const time = useDhakaTime();
  const projects = projectsFor(lang);
  const f = d.footer;
  return (
    <footer className="footer" data-progress>
      <div className="footer__glow" aria-hidden />
      <div className="wrap footer__top">
        <div className="footer__cta">
          <p className="label">{f.kicker}</p>
          <h2 className="footer__headline">
            {f.title1} <em>{f.title2}</em>
          </h2>
        </div>
        <Link href={href(lang, "/#contact")} className="footer__orb" data-magnetic="0.45" data-cursor="✦">
          <span>
            {f.orb[0]}
            <br />
            {f.orb[1]}
          </span>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M5 19 19 5M9 5h10v10" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </Link>
      </div>

      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Image src="/brand/ayub-mark.png" alt="Mohammad Ayub logo" width={64} height={47} />
          <p>{f.line}</p>
        </div>
        <div>
          <h3 className="label">{f.work}</h3>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={href(lang, `/work/${p.slug}`)}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="label">{f.elsewhere}</h3>
          <ul>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="label">{f.contact}</h3>
          <ul>
            <li>
              <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a>
            </li>
            <li>
              <a href={site.phoneHref} dir="ltr">{site.phone}</a>
            </li>
            <li className="footer__muted">{d.contact.locationValue}</li>
            <li className="footer__muted">
              {f.time} · <span dir="ltr">{time}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__word" aria-hidden>
        <span>{d.name.first}</span>
        <span>{d.name.last}</span>
      </div>

      <div className="wrap footer__base">
        <span>
          © {new Date().getFullYear()} {d.name.full}. {f.rights}
        </span>
        <span lang="ar">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ</span>
        <a href="#main" className="footer__top-link" data-magnetic="0.3">
          {f.top} <span aria-hidden>↑</span>
        </a>
      </div>
    </footer>
  );
}
