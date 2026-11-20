import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { projectFor, projectsFor } from "@/lib/projects-i18n";
import { langs, t, href, isLang, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import Split from "@/components/Split";

function Fact({ v }: { v: string }) {
  const m = v.match(/^(\d+)(\+?)$/);
  if (!m) return <>{v}</>;
  return (
    <span data-count={m[1]} data-suffix={m[2]}>
      {v}
    </span>
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const p = projectFor(slug, lang);
  if (!p) return {};
  const d = t(lang);
  const title = lang === "en" && p.native ? `${p.name} (${p.native.split(" · ").pop()})` : p.name;
  const path = `/work/${p.slug}`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: href(lang, path), languages: { en: path, bn: href("bn", path), ar: href("ar", path), "x-default": path } },
    openGraph: { title: `${title} — ${d.name.full}`, description: p.summary, url: `${site.url}${href(lang, path)}`, type: "article" },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const d = t(lang);
  const c = d.case;
  const L = (x: string) => href(lang, x);
  const arrow = lang === "ar" ? "←" : "→";
  const p = projectFor(slug, lang);
  if (!p) notFound();
  const all = projectsFor(lang);
  const i = all.findIndex((x) => x.slug === p.slug);
  const next = all[(i + 1) % all.length];
  const statusCls = p.status === "In preparation" ? "soon" : p.status === "Preview edition" ? "beta" : "live";
  const dark = ["t-history", "t-mystrick", "t-attar", "t-sundus"].includes(p.theme);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": p.status === "Live business" ? "Organization" : "CreativeWork",
        name: p.name,
        alternateName: p.native,
        description: p.summary,
        url: p.url || `${site.url}/work/${p.slug}`,
        ...(p.status === "Live business" ? { founder: { "@id": `${site.url}/#person` } } : { creator: { "@id": `${site.url}/#person` } }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: c.home, item: `${site.url}${L("/")}` },
          { "@type": "ListItem", position: 2, name: c.work, item: `${site.url}${L("/#work")}` },
          { "@type": "ListItem", position: 3, name: p.name, item: `${site.url}${L(`/work/${p.slug}`)}` },
        ],
      },
    ],
  };

  return (
    <article className={`case ${p.theme}${dark ? " is-dark" : ""}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <header className="case__hero">
        {p.slug === "mystrick" && <div className="stars" aria-hidden />}
        {p.slug === "sundus" && <div className="silk" aria-hidden />}
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href={L("/")}>{c.home}</Link> <span aria-hidden>/</span> <Link href={L("/#work")}>{c.work}</Link> <span aria-hidden>/</span> <span aria-current="page">{p.name}</span>
          </nav>
          <div className="pmeta case__meta">
            <span className="pmeta__no">{p.no}</span>
            <span className="pmeta__cat">{p.category}</span>
            <span className={`chip chip--${statusCls}`}>{d.status[p.status]}</span>
          </div>
          <div className="case__titlebar">
            <div>
              <h1 className="case__title">
                <Split text={p.name} mode="chars" step={40} delay={250} />
              </h1>
              {lang === "en" && p.native && (
                <p className="case__native" lang={p.slug === "sundus" ? "ar" : undefined}>
                  {p.native}
                </p>
              )}
              {lang !== "en" && (
                <p className="case__native" lang="en" dir="ltr">
                  {projects[i].name}
                </p>
              )}
            </div>
            {p.logo && (
              <div className="case__logo">
                <Image
                  src={p.slug === "safar-nama" ? "/work/safar-nama/logo-dark.png" : p.logo.src}
                  alt={p.logo.alt}
                  width={p.logo.w}
                  height={p.logo.h}
                  unoptimized={p.logo.src.endsWith(".svg")}
                  priority
                />
              </div>
            )}
            {p.slug === "sundus" && (
              <p className="case__bigar" lang="ar" aria-hidden>
                سندس
              </p>
            )}
          </div>
          <p className="case__tagline">{p.tagline}</p>
          <div className="pactions">
            {p.url && (
              <a className="btn btn--solid" href={p.url} target="_blank" rel="noopener noreferrer" data-magnetic="0.2">
                {c.visit} <span dir="ltr">{p.urlLabel}</span> <span aria-hidden>↗</span>
              </a>
            )}
            {p.links?.map((l) => (
              <a key={l.href} className="btn btn--line" href={l.href} target="_blank" rel="noopener noreferrer" data-magnetic="0.2">
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </div>
      </header>

      {p.cover.src && p.slug !== "mystrick" && (
        <figure className="case__cover wrap" data-clip>
          <Image src={p.cover.src} alt={p.cover.alt} width={2000} height={1200} sizes="(max-width: 1400px) 100vw, 1400px" priority />
        </figure>
      )}

      <section className="case__body wrap" aria-label="Overview">
        <div className="case__story">
          <p className="label">{c.overview}</p>
          <p className="case__summary" data-reveal>
            {p.summary}
          </p>
          {p.story.map((s, k) => (
            <p key={k} data-reveal>
              {s}
            </p>
          ))}
        </div>
        <aside className="case__side">
          <dl className="case__facts">
            {p.facts.map((f) => (
              <div key={f.k} data-reveal>
                <dt>{f.k}</dt>
                <dd>
                  <Fact v={f.v} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="case__role" data-reveal>
            <p className="label">{c.role}</p>
            <ul>
              {p.role.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {p.screens && (
        <section className="case__screens wrap" aria-label="Website previews">
          <p className="label">{c.website}</p>
          <div className="devices" dir="ltr">
            <figure className={`browser${p.screens.mobile ? "" : " browser--solo"}`} data-clip data-tilt="4">
              <div className="browser__bar" aria-hidden>
                <i />
                <i />
                <i />
                <span>{p.urlLabel}</span>
              </div>
              <Image src={p.screens.desktop} alt={`${p.name} website on desktop`} width={p.screens.dw || 1440} height={p.screens.dh || 900} sizes="(max-width: 900px) 100vw, 70vw" />
            </figure>
            {p.screens.mobile && (
              <figure className="phone" data-reveal data-parallax="-0.05">
                <Image src={p.screens.mobile} alt={`${p.name} website on a phone`} width={390} height={844} sizes="(max-width: 900px) 45vw, 20vw" />
              </figure>
            )}
          </div>
          <p className="case__caption">{c.caption}</p>
        </section>
      )}

      {p.gallery.length > 0 && (
        <section className="case__gallery wrap" aria-label="Gallery">
          <p className="label">{p.slug === "attar-lagbe" ? c.productImagery : p.slug === "as-sakinah" ? c.posts : c.road}</p>
          <div className={`gallery gallery--${p.gallery.length}${p.gallery[0]?.wide ? " gallery--wide" : ""}`}>
            {p.gallery.map((g, k) => (
              <figure key={g.src} data-clip data-cursor={d.work.view} style={{ ["--d" as string]: `${k * 90}ms` }}>
                <Image src={g.src} alt={g.alt} width={g.wide ? 1800 : 900} height={g.wide ? 1013 : g.tall ? 1200 : 900} sizes={g.wide ? "(max-width: 800px) 100vw, 50vw" : "(max-width: 800px) 50vw, 25vw"} />
              </figure>
            ))}
          </div>
        </section>
      )}

      {p.products && (
        <section className="case__gallery wrap" aria-label="Product range">
          <p className="label">{c.collection}</p>
          <div className="products">
            {p.products.map((x, k) => (
              <figure key={x.src} data-reveal data-tilt="8" style={{ ["--d" as string]: `${k * 60}ms` }}>
                <Image src={x.src} alt={`${x.name}, Attar Lagbe 6 ml bottle`} width={900} height={900} sizes="(max-width: 800px) 50vw, 30vw" />
                <figcaption className="sr-only">{x.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {p.slug === "sundus" && (
        <section className="case__soon wrap" aria-label="Status">
          <p data-reveal>
            {c.soon} <Link href={L("/#contact")}>{c.soonLink}</Link>.
          </p>
        </section>
      )}

      <nav className="case__next" aria-label="Next project">
        <Link href={L(`/work/${next.slug}`)} className="wrap" data-cursor={arrow}>
          <span className="label">
            {c.next} · {next.no}
          </span>
          <span className="case__nextname">
            {next.name} <span aria-hidden>{arrow}</span>
          </span>
        </Link>
      </nav>
    </article>
  );
}
