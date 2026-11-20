"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, href, type Lang } from "@/lib/i18n";
import { projectsFor } from "@/lib/projects-i18n";

export default function NotFound() {
  const pathname = usePathname() || "/";
  const m = pathname.match(/^\/(bn|ar)(?=\/|$)/);
  const lang = (m ? m[1] : "en") as Lang;
  const d = t(lang);
  const n = d.notFound;
  return (
    <section className="nf">
      <title>{`${n.label} — ${d.name.full}`}</title>
      <div className="wrap">
        <p className="label">{n.label}</p>
        <h1 className="nf__title">
          {n.title1} <em>{n.title2}</em>
        </h1>
        <p className="nf__lede">{n.lede}</p>
        <div className="pactions">
          <Link className="btn btn--solid" href={href(lang, "/")}>
            {n.home} <span aria-hidden className="flip">→</span>
          </Link>
          <Link className="btn btn--line" href={href(lang, "/#contact")}>
            {n.contact}
          </Link>
        </div>
        <ul className="nf__list">
          {projectsFor(lang).map((p) => (
            <li key={p.slug}>
              <Link href={href(lang, `/work/${p.slug}`)}>
                <span>{p.no}</span> {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
