import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap">
        <p className="label">Error 404</p>
        <h1 className="nf__title">
          This page took <em>a different road.</em>
        </h1>
        <p className="nf__lede">The page you were looking for does not exist, or it has moved. Try one of these instead.</p>
        <div className="pactions">
          <Link className="btn btn--solid" href="/">
            Back to home <span aria-hidden>→</span>
          </Link>
          <Link className="btn btn--line" href="/#contact">
            Contact me
          </Link>
        </div>
        <ul className="nf__list">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`}>
                <span>{p.no}</span> {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
