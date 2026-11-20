import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { projectsFor } from "@/lib/projects-i18n";
import { t, href, isLang, type Lang } from "@/lib/i18n";
import { panelFor } from "@/components/Panels";
import Loader from "@/components/Loader";
import RoleCycler from "@/components/RoleCycler";
import ContactForm from "@/components/ContactForm";
import Split from "@/components/Split";

const thumbs: Record<string, string> = {
  "safar-nama": "/work/safar-nama/ayub-forest.jpg",
  "as-sakinah": "/work/as-sakinah/post-6-dua.jpg",
  "story-behind-history": "/work/story-behind-history/banner.jpg",
  mystrick: "/work/mystrick/site.jpg",
  "attar-lagbe": "/work/attar-lagbe/banner-vampire-blood.jpg",
  sundus: "/brand/sundus-card.svg",
};

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const d = t(lang);
  const projects = projectsFor(lang);
  const L = (p: string) => href(lang, p);
  const arrow = lang === "ar" ? "←" : "→";

  return (
    <>
      <Loader name={d.name.full.toUpperCase()} caption={d.loader} />

      {/* ─────────────── HERO ─────────────── */}
      <section className="hero" aria-labelledby="hero-name">
        <div className="hero__aurora" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <div className="hero__grid wrap">
          <div className="hero__copy">
            <p className="label hero__kicker">
              <span>{d.hero.kicker[0]}</span>
              <span>{d.hero.kicker[1]}</span>
            </p>
            <h1 id="hero-name" className="hero__name">
              <span className="hero__line">
                <Split text={d.name.first} mode={lang === "en" ? "chars" : "words"} delay={150} />
              </span>
              <span className="hero__line hero__line--2">
                <Split text={d.name.last} mode="words" delay={520} className="gold" />
                <span className="hero__ar" lang={lang === "en" ? "ar" : "en"} aria-hidden>
                  {d.hero.secondary}
                </span>
              </span>
            </h1>
            <p className="hero__roles">
              <RoleCycler roles={d.roles} />
            </p>
            <p className="hero__intro">{d.hero.intro}</p>
            <div className="hero__cta">
              <Link href={L("/#work")} className="btn btn--solid" data-magnetic="0.25">
                {d.hero.explore} <span aria-hidden>↓</span>
              </Link>
              <Link href={L("/#contact")} className="btn btn--line" data-magnetic="0.25">
                {d.hero.touch}
              </Link>
            </div>
          </div>

          <div className="hero__portrait">
            <div className="hero__arch" data-tilt="10">
              <span className="hero__sheen" aria-hidden />
              <Image src="/brand/ayub-portrait.jpg" alt={d.hero.portraitAlt} width={460} height={572} priority sizes="(max-width: 800px) 70vw, 30vw" />
            </div>
            <div className="hero__seal" aria-hidden>
              <svg viewBox="0 0 200 200">
                <defs>
                  <path id="seal" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text>
                  <textPath href="#seal">{d.hero.seal}</textPath>
                </text>
              </svg>
              <Image src="/brand/ayub-mark.png" alt="" width={70} height={51} />
            </div>
            <p className="hero__caption label">{d.hero.caption}</p>
          </div>
        </div>
        <div className="hero__index wrap" aria-hidden>
          <span className="hero__scroll">
            <i /> {d.hero.scroll}
          </span>
          {projects.map((p) => (
            <span key={p.slug}>
              <i>{p.no}</i> {p.name}
            </span>
          ))}
        </div>
      </section>

      <div className="marquee" aria-hidden>
        <div className="marquee__track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              {d.marquee.map((w, i) => (
                <span key={i}>
                  {w} <b>✦</b>{" "}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────── ABOUT ─────────────── */}
      <section className="section about" id="about" aria-labelledby="about-t">
        <div className="wrap">
          <p className="label" data-reveal>
            {d.about.label}
          </p>
          <h2 id="about-t" className="about__statement">
            <Split mode="scrub" text={d.about.statement} />
          </h2>
          <div className="about__cols">
            <div className="about__text" data-reveal>
              {d.about.p.map((x, i) => (
                <p key={i}>{x}</p>
              ))}
            </div>
            <aside className="about__aim" data-reveal>
              <p className="label">{d.about.aimLabel}</p>
              <blockquote>
                <p>{d.about.aim}</p>
              </blockquote>
            </aside>
          </div>
          <ul className="principles">
            {d.about.principles.map(([k, v], i) => (
              <li key={k} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                <span className="principles__n">0{i + 1}</span>
                <h3>{k}</h3>
                <p>{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────────── WORK ─────────────── */}
      <section className="work" id="work" aria-labelledby="work-t">
        <div className="wrap work__intro">
          <p className="label" data-reveal>
            {d.work.label}
          </p>
          <h2 id="work-t" className="work__title">
            <Split text={d.work.title1} mode="words" step={70} /> <em><Split text={d.work.title2} mode="words" delay={300} step={70} /></em>
          </h2>
          <p className="work__lede" data-reveal>
            {d.work.lede}
          </p>
          <ol className="work__index">
            {projects.map((p) => (
              <li key={p.slug} data-reveal>
                <a href={`#${p.slug}`} data-preview={thumbs[p.slug]} data-cursor={d.work.view}>
                  <span className="work__no">{p.no}</span>
                  <span className="work__name">{p.name}</span>
                  <span className="work__native" lang={p.slug === "sundus" ? "ar" : "bn"}>
                    {lang === "en" && p.native ? p.native.split(" · ").pop() : ""}
                  </span>
                  <span className="work__cat">{p.category.split(" · ")[0]}</span>
                  <span className="work__status">{d.status[p.status]}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
        {projects.map((p) => {
          const Panel = panelFor[p.slug];
          return <Panel key={p.slug} p={p} lang={lang} d={d} />;
        })}
      </section>

      {/* ─────────────── VENTURES ─────────────── */}
      <section className="section ventures" id="ventures" aria-labelledby="ventures-t">
        <div className="wrap">
          <p className="label" data-reveal>
            {d.ventures.label}
          </p>
          <h2 id="ventures-t" className="section__title" data-reveal>
            {d.ventures.title1} <em>{d.ventures.title2}</em>
          </h2>
          <div className="ventures__grid">
            <article className="venture venture--live" data-reveal data-tilt="5">
              <header>
                <span className="chip chip--live">{d.ventures.live}</span>
                <Image src="/work/attar-lagbe/logo.png" alt="Attar Lagbe logo" width={150} height={116} />
              </header>
              <h3>{projects.find((p) => p.slug === "attar-lagbe")!.name}</h3>
              <p>{d.ventures.attar}</p>
              <p className="label">{d.ventures.built}</p>
              <ul className="ticks">
                {d.ventures.builtList.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <div className="venture__links">
                <Link href={L("/work/attar-lagbe")}>{d.ventures.caseStudy}</Link>
                <a href="https://www.attarlagbe.com" target="_blank" rel="noopener noreferrer">
                  attarlagbe.com ↗
                </a>
              </div>
            </article>
            <article className="venture venture--soon" data-reveal data-tilt="5" style={{ ["--d" as string]: "120ms" }}>
              <header>
                <span className="chip chip--soon">{d.ventures.soon}</span>
                <span className="venture__ar" lang="ar">
                  سندس
                </span>
              </header>
              <h3>{projects.find((p) => p.slug === "sundus")!.name}</h3>
              <p>{d.ventures.sundus}</p>
              <p className="label">{d.ventures.planned}</p>
              <ul className="ticks ticks--soon">
                {d.ventures.plannedList.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <div className="venture__links">
                <Link href={L("/work/sundus")}>{d.ventures.aboutVenture}</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────────── EDUCATION ─────────────── */}
      <section className="section education" id="education" aria-labelledby="edu-t">
        <div className="wrap edu__grid">
          <div className="edu__head">
            <p className="label" data-reveal>
              {d.edu.label}
            </p>
            <h2 id="edu-t" className="section__title" data-reveal>
              {d.edu.title1} <em>{d.edu.title2}</em>
            </h2>
            <p className="edu__lede" data-reveal>
              {d.edu.lede}
            </p>
          </div>
          <ol className="timeline" data-progress="long">
            {d.edu.items.map((e, i) => (
              <li key={e.school} className={e.current ? "is-current" : ""} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className="timeline__when">{e.when}</span>
                <div className="timeline__body">
                  <h3>{e.school}</h3>
                  <p className="timeline__level">{e.level}</p>
                  <p className="timeline__place">{e.place}</p>
                  <p className={`timeline__note${e.grade ? " is-grade" : ""}`}>{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────────── SKILLS & LANGUAGES ─────────────── */}
      <section className="section skills" id="skills" aria-labelledby="skills-t">
        <div className="wrap">
          <p className="label" data-reveal>
            {d.skills.label}
          </p>
          <h2 id="skills-t" className="section__title" data-reveal>
            {d.skills.title1} <em>{d.skills.title2}</em>
          </h2>
          <div className="skills__grid">
            {d.skills.groups.map((s, i) => (
              <div key={s.title} className="skill" data-reveal style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className="skill__n">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p className="skill__lead">{s.lead}</p>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="langs" aria-labelledby="langs-t">
            <div className="langs__head" data-reveal>
              <h3 id="langs-t">{d.skills.langsTitle}</h3>
              <p>{d.skills.langsNote}</p>
            </div>
            <ul className="langs__list">
              {d.skills.langs.map((l, i) => (
                <li key={l.cls} className={`lang lang--${l.cls}`} data-reveal style={{ ["--v" as string]: l.value, ["--d" as string]: `${i * 120}ms` }}>
                  <svg viewBox="0 0 120 120" aria-hidden>
                    <circle cx="60" cy="60" r="54" className="lang__track" />
                    <circle cx="60" cy="60" r="54" className="lang__bar" pathLength={100} />
                  </svg>
                  <div className="lang__in">
                    <span className="lang__native" lang={l.cls}>
                      {l.native}
                    </span>
                    <span className="lang__pct">{l.value}%</span>
                  </div>
                  <p className="lang__name">{l.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────── RESEARCH ─────────────── */}
      <section className="section research" id="research" aria-labelledby="research-t">
        <div className="wrap">
          <p className="label" data-reveal>
            {d.research.label}
          </p>
          <h2 id="research-t" className="section__title" data-reveal>
            {d.research.title1} <em>{d.research.title2}</em>
          </h2>
          <div className="research__grid">
            {d.research.items.map((it, i) => (
              <article key={it.k} className="interest" data-tilt="6" data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                <span className="interest__n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{it.k}</h3>
                <p>{it.v}</p>
                {it.slug && (
                  <Link href={L(`/work/${it.slug}`)}>
                    {d.research.see} {it.link} {arrow}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CONTACT ─────────────── */}
      <section className="section contact" id="contact" aria-labelledby="contact-t">
        <div className="wrap contact__grid">
          <div>
            <p className="label" data-reveal>
              {d.contact.label}
            </p>
            <h2 id="contact-t" className="contact__title">
              <Split text={d.contact.title1} mode="words" /> <em><Split text={d.contact.title2} mode="words" delay={300} /></em>
            </h2>
            <p className="contact__lede" data-reveal>
              {d.contact.lede}
            </p>
            <dl className="contact__list" data-reveal>
              <div>
                <dt>{d.contact.email}</dt>
                <dd>
                  <a href={`mailto:${site.email}`} dir="ltr">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{d.contact.phone}</dt>
                <dd>
                  <a href={site.phoneHref} dir="ltr">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{d.contact.website}</dt>
                <dd>
                  <a href="https://www.mohammadayub.net" dir="ltr">
                    mohammadayub.net
                  </a>
                </dd>
              </div>
              <div>
                <dt>{d.contact.location}</dt>
                <dd>{d.contact.locationValue}</dd>
              </div>
              <div>
                <dt>{d.contact.social}</dt>
                <dd className="contact__socials">
                  {site.socials.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label} ↗
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div data-reveal>
            <ContactForm f={d.contact.form} />
          </div>
        </div>
      </section>
    </>
  );
}
