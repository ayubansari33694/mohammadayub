"use client";

import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { useDhakaTime } from "./Nav";

export default function Footer() {
  const time = useDhakaTime();
  return (
    <footer className="footer" data-progress>
      <div className="footer__glow" aria-hidden />
      <div className="wrap footer__top">
        <div className="footer__cta">
          <p className="label">Have an idea worth building?</p>
          <h2 className="footer__headline">
            Let&rsquo;s make it <em>real.</em>
          </h2>
        </div>
        <Link href="/#contact" className="footer__orb" data-magnetic="0.45" data-cursor="Write">
          <span>
            Start a<br />
            conversation
          </span>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M5 19 19 5M9 5h10v10" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </Link>
      </div>

      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Image src="/brand/ayub-mark.png" alt="Mohammad Ayub logo" width={64} height={47} />
          <p>Knowledge, creativity, technology and enterprise, in one practice.</p>
        </div>
        <div>
          <h3 className="label">Work</h3>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="label">Elsewhere</h3>
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
          <h3 className="label">Contact</h3>
          <ul>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li className="footer__muted">{site.location}</li>
            <li className="footer__muted">Dhaka time · {time}</li>
          </ul>
        </div>
      </div>

      <div className="footer__word" aria-hidden>
        <span>Mohammad</span>
        <span>Ayub</span>
      </div>

      <div className="wrap footer__base">
        <span>© {new Date().getFullYear()} Mohammad Ayub. All rights reserved.</span>
        <span lang="ar">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ</span>
        <a href="#main" className="footer__top-link" data-magnetic="0.3">
          Back to top <span aria-hidden>↑</span>
        </a>
      </div>
    </footer>
  );
}
