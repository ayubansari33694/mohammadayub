import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Image src="/brand/ayub-mark.png" alt="Mohammad Ayub logo" width={72} height={53} />
          <p className="footer__line">
            Knowledge, creativity, technology and enterprise, <em>in one practice.</em>
          </p>
        </div>
        <div>
          <h2 className="label">Work</h2>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="label">Elsewhere</h2>
          <ul>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`}>Email</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer__base">
        <span>© {new Date().getFullYear()} Mohammad Ayub</span>
        <span>{site.location}</span>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  );
}
