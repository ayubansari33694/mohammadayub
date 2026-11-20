import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { panelFor } from "@/components/Panels";
import Loader from "@/components/Loader";
import RoleCycler from "@/components/RoleCycler";
import ContactForm from "@/components/ContactForm";

const education = [
  {
    when: "Now",
    level: "Second-year student · Al-Hadith and Islamic Studies",
    school: "Tamirul Millat Kamil Madrasa, Tongi Campus",
    place: "Tongi, Gazipur, Bangladesh",
    note: "First-year examinations completed; results not yet published.",
    current: true,
  },
  {
    when: "2024",
    level: "Alim (HSC equivalent) · Humanities",
    school: "Darunnajat Siddikia Kamil Madrasa",
    place: "Dhaka, Bangladesh",
    note: "GPA 5.00 (A+)",
  },
  {
    when: "2022",
    level: "Dakhil (SSC equivalent) · Humanities",
    school: "Dhani Safa Salehia Fazil Madrasa",
    place: "Pirojpur, Bangladesh",
    note: "GPA 5.00 (A+)",
  },
  {
    when: "1437–1438 AH",
    level: "Elementary Certificate (Ebtedai)",
    school: "Al-Mowaddah Primary School for Memorization",
    place: "Khamis Mushait, Aseer, Saudi Arabia",
    note: "Result: Excellent",
  },
];

const skills = [
  {
    title: "Creative & Design",
    lead: "Giving ideas a face.",
    items: ["Graphic design", "Typography", "Visual identity design", "Branding and creative direction"],
  },
  {
    title: "Video & Motion",
    lead: "Telling it in time.",
    items: ["Video editing", "Motion graphics"],
  },
  {
    title: "Digital & Business",
    lead: "Taking it to people.",
    items: ["Digital marketing", "Digital content creation", "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"],
  },
];

const languages = [
  { name: "Bengali", native: "বাংলা", value: 99, cls: "bn" },
  { name: "Arabic", native: "العربية", value: 90, cls: "ar" },
  { name: "English", native: "English", value: 80, cls: "en" },
];

const interests = [
  {
    k: "Hadith & the Islamic sciences",
    v: "My formal study. The discipline of checking a report's chain and its text shapes how I treat every source, in every field.",
    href: "/work/as-sakinah",
    link: "As-Sakinah",
  },
  {
    k: "History, read from sources",
    v: "Civilisations, dynasties and battles placed on one map and one timeline, with each story added only after verification.",
    href: "/work/story-behind-history",
    link: "Story Behind History",
  },
  {
    k: "Science & technology",
    v: "Discoveries, space, computing and the ideas behind modern AI, explained clearly and always linked to the original source.",
    href: "/work/mystrick",
    link: "Mystrick",
  },
  {
    k: "AI & automation",
    v: "I work AI-first: using AI tools and agents to research, design, build and run projects that would otherwise need a team.",
  },
];

export default function Home() {
  return (
    <>
      <Loader />

      {/* ─────────────── HERO ─────────────── */}
      <section className="hero" aria-labelledby="hero-name">
        <div className="hero__grid wrap">
          <div className="hero__copy">
            <p className="label hero__kicker">
              <span>Personal portfolio</span>
              <span>Bangladesh</span>
            </p>
            <h1 id="hero-name" className="hero__name">
              <span className="line">
                <span>Mohammad</span>
              </span>
              <span className="line">
                <em>Ayub</em>
              </span>
            </h1>
            <p className="hero__roles">
              <RoleCycler roles={site.roles} />
            </p>
            <p className="hero__intro">
              I study the Hadith and the Islamic sciences, and I build things: brands, digital platforms, films and ventures. This is where all of them meet.
            </p>
            <div className="hero__cta">
              <Link href="/#work" className="btn btn--solid">
                Explore my work <span aria-hidden>↓</span>
              </Link>
              <Link href="/#contact" className="btn btn--line">
                Get in touch
              </Link>
            </div>
          </div>

          <div className="hero__portrait">
            <div className="hero__arch" data-parallax="0.05">
              <Image
                src="/brand/ayub-portrait.jpg"
                alt="Portrait of Mohammad Ayub"
                width={460}
                height={572}
                priority
                sizes="(max-width: 800px) 70vw, 30vw"
              />
            </div>
            <div className="hero__seal" aria-hidden>
              <svg viewBox="0 0 200 200">
                <defs>
                  <path id="seal" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text>
                  <textPath href="#seal">KNOWLEDGE · CREATIVITY · TECHNOLOGY · ENTERPRISE · </textPath>
                </text>
              </svg>
              <Image src="/brand/ayub-mark.png" alt="" width={70} height={51} />
            </div>
            <p className="hero__caption label">Student · Al-Hadith & Islamic Studies</p>
          </div>
        </div>
        <div className="hero__index wrap" aria-hidden>
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
              Knowledge <b>✦</b> Design <b>✦</b> Enterprise <b>✦</b> Technology <b>✦</b> Storytelling <b>✦</b> Research <b>✦</b>{" "}
              <span lang="ar">العلم</span> <b>✦</b>{" "}
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────── ABOUT ─────────────── */}
      <section className="section about" id="about" aria-labelledby="about-t">
        <div className="wrap">
          <p className="label" data-reveal>01 — About</p>
          <h2 id="about-t" className="about__statement" data-reveal>
            A student by calling, a maker by habit. I believe <em>knowledge, creativity, technology</em> and <em>enterprise</em> belong in the same hands.
          </h2>
          <div className="about__cols">
            <div className="about__text" data-reveal>
              <p>
                I am a student of Al-Hadith and Islamic Studies with a wide, restless curiosity. Alongside my studies I work across Islamic scholarship, creative design,
                digital technology, entrepreneurship and research.
              </p>
              <p>
                What I enjoy most is turning an idea into something real: a visual identity, a website people use, a film, a business with customers. Each project on this
                site is one expression of that habit. Some are about knowledge, some about stories, one is about fragrance, and all of them were built with the same care.
              </p>
              <p>
                My early schooling was in Saudi Arabia, and my madrasa education continued in Bangladesh. Bengali, Arabic and English are the three languages I live and work in.
              </p>
            </div>
            <aside className="about__aim" data-reveal>
              <p className="label">My aim</p>
              <blockquote>
                <p>
                  Above all, I want to be a sincere and devoted Muslim: to grow, through the pursuit of sacred knowledge, into a knowledgeable and capable scholar; to draw closer to
                  Allah; and to carry the message of Islam to others with wisdom and compassion.
                </p>
              </blockquote>
            </aside>
          </div>
          <ul className="principles">
            {[
              ["Verify, then publish", "Whether it is a hadith, a date in history or a scientific claim, nothing goes out unchecked."],
              ["Build, don't just plan", "Plans matter only when they turn into working things. I prefer shipping and improving."],
              ["AI-first, people-centred", "I use AI to do more with less, so the work can serve more people."],
              ["Create opportunity", "My long-term aim is ventures that grow large enough to create work for others."],
            ].map(([k, v], i) => (
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
          <p className="label" data-reveal>02 — Projects & ventures</p>
          <h2 id="work-t" className="work__title" data-reveal>
            Six worlds. <em>One maker.</em>
          </h2>
          <p className="work__lede" data-reveal>
            Every project has its own name, its own audience and its own visual language. Together they map what I care about: travel, faith, history, science, enterprise and
            craft.
          </p>
          <ol className="work__index">
            {projects.map((p) => (
              <li key={p.slug} data-reveal>
                <a href={`#${p.slug}`}>
                  <span className="work__no">{p.no}</span>
                  <span className="work__name">{p.name}</span>
                  <span className="work__native" lang={p.slug === "sundus" ? "ar" : "bn"}>
                    {p.native ? p.native.split(" · ").pop() : ""}
                  </span>
                  <span className="work__cat">{p.category.split(" · ")[0]}</span>
                  <span className="work__status">{p.status}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
        {projects.map((p) => {
          const Panel = panelFor[p.slug];
          return <Panel key={p.slug} p={p} />;
        })}
      </section>

      {/* ─────────────── VENTURES ─────────────── */}
      <section className="section ventures" id="ventures" aria-labelledby="ventures-t">
        <div className="wrap">
          <p className="label" data-reveal>03 — Ventures & entrepreneurship</p>
          <h2 id="ventures-t" className="section__title" data-reveal>
            One brand on the market. <em>One in the making.</em>
          </h2>
          <div className="ventures__grid">
            <article className="venture venture--live" data-reveal>
              <header>
                <span className="chip chip--live">Live business</span>
                <Image src="/work/attar-lagbe/logo.png" alt="Attar Lagbe logo" width={150} height={116} />
              </header>
              <h3>Attar Lagbe</h3>
              <p>A fragrance brand that sells authentic, alcohol-free attar and perfume oils across Bangladesh, online, with cash on delivery.</p>
              <p className="label">What I built</p>
              <ul className="ticks">
                <li>Brand identity and Bengali calligraphic logo</li>
                <li>Product presentation and photography</li>
                <li>Packaging and visual branding</li>
                <li>Bilingual e-commerce website</li>
                <li>Digital marketing and creative content</li>
              </ul>
              <div className="venture__links">
                <Link href="/work/attar-lagbe">Case study →</Link>
                <a href="https://www.attarlagbe.com" target="_blank" rel="noopener noreferrer">
                  attarlagbe.com ↗
                </a>
              </div>
            </article>
            <article className="venture venture--soon" data-reveal style={{ ["--d" as string]: "120ms" }}>
              <header>
                <span className="chip chip--soon">In preparation</span>
                <span className="venture__ar" lang="ar">
                  سندس
                </span>
              </header>
              <h3>Sundus</h3>
              <p>A modest-fashion and clothing brand with Arabian influences, being prepared for launch. Not yet open for orders.</p>
              <p className="label">Planned range</p>
              <ul className="ticks ticks--soon">
                <li>Jubba</li>
                <li>Abaya</li>
                <li>Hijab and niqab</li>
                <li>Burqa</li>
                <li>Other modest and Arabian-inspired wear</li>
              </ul>
              <div className="venture__links">
                <Link href="/work/sundus">About the venture →</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────────── EDUCATION ─────────────── */}
      <section className="section education" id="education" aria-labelledby="edu-t">
        <div className="wrap edu__grid">
          <div className="edu__head">
            <p className="label" data-reveal>04 — Education</p>
            <h2 id="edu-t" className="section__title" data-reveal>
              From Khamis Mushait <em>to Tongi.</em>
            </h2>
            <p className="edu__lede" data-reveal>
              A madrasa education that began in Saudi Arabia and continues today in the study of the Hadith.
            </p>
          </div>
          <ol className="timeline">
            {education.map((e, i) => (
              <li key={e.school} className={e.current ? "is-current" : ""} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className="timeline__when">{e.when}</span>
                <div className="timeline__body">
                  <h3>{e.school}</h3>
                  <p className="timeline__level">{e.level}</p>
                  <p className="timeline__place">{e.place}</p>
                  <p className={`timeline__note${e.note.startsWith("GPA") ? " is-grade" : ""}`}>{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────────── SKILLS & LANGUAGES ─────────────── */}
      <section className="section skills" id="skills" aria-labelledby="skills-t">
        <div className="wrap">
          <p className="label" data-reveal>05 — Skills & expertise</p>
          <h2 id="skills-t" className="section__title" data-reveal>
            The toolkit <em>behind the work.</em>
          </h2>
          <div className="skills__grid">
            {skills.map((s, i) => (
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
              <h3 id="langs-t">Languages</h3>
              <p>Self-assessed proficiency, as stated in my CV. Not formal examination scores.</p>
            </div>
            <ul className="langs__list">
              {languages.map((l, i) => (
                <li key={l.name} className={`lang lang--${l.cls}`} data-reveal style={{ ["--v" as string]: l.value, ["--d" as string]: `${i * 120}ms` }}>
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
          <p className="label" data-reveal>06 — Research & interests</p>
          <h2 id="research-t" className="section__title" data-reveal>
            Curious about how things work, <em>and how we know.</em>
          </h2>
          <div className="research__grid">
            {interests.map((it, i) => (
              <article key={it.k} className="interest" data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                <span className="interest__n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{it.k}</h3>
                <p>{it.v}</p>
                {it.href && <Link href={it.href}>See {it.link} →</Link>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CONTACT ─────────────── */}
      <section className="section contact" id="contact" aria-labelledby="contact-t">
        <div className="wrap contact__grid">
          <div>
            <p className="label" data-reveal>07 — Contact</p>
            <h2 id="contact-t" className="contact__title" data-reveal>
              Let&rsquo;s build something <em>meaningful.</em>
            </h2>
            <p className="contact__lede" data-reveal>
              For collaborations, projects, questions about my ventures, or simply to say salam, write to me. I read every message.
            </p>
            <dl className="contact__list" data-reveal>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={site.phoneHref}>{site.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Website</dt>
                <dd>
                  <a href="https://www.mohammadayub.net">mohammadayub.net</a>
                </dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Social</dt>
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
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
