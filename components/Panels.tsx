import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

function Meta({ p }: { p: Project }) {
  return (
    <div className="pmeta" data-reveal>
      <span className="pmeta__no">{p.no}</span>
      <span className="pmeta__cat">{p.category}</span>
      <span className={`chip chip--${p.status === "In preparation" ? "soon" : p.status === "Preview edition" ? "beta" : "live"}`}>{p.status}</span>
    </div>
  );
}

function Actions({ p }: { p: Project }) {
  return (
    <div className="pactions" data-reveal>
      <Link className="btn btn--solid" href={`/work/${p.slug}`} data-magnetic="0.2">
        Explore the project <span aria-hidden>→</span>
      </Link>
      {p.url && (
        <a className="btn btn--line" href={p.url} target="_blank" rel="noopener noreferrer" data-magnetic="0.2">
          {p.urlLabel} <span aria-hidden>↗</span>
        </a>
      )}
    </div>
  );
}

export function SafarPanel({ p }: { p: Project }) {
  const stops = ["Lalbagh Fort", "Ahsan Manzil", "National Martyrs' Memorial", "Bhawal National Park", "Nine Dome Mosque", "Dogortoli", "Horinpala Eco Park"];
  return (
    <article data-progress className="panel t-safar" id={p.slug} aria-labelledby={`${p.slug}-t`}>
      <div className="wrap panel__grid">
        <div className="panel__text">
          <Meta p={p} />
          <Image className="safar__logo" src="/work/safar-nama/logo-dark.png" alt="Ayub Safar Nama logo" width={150} height={148} data-reveal />
          <h3 id={`${p.slug}-t`} className="safar__title" data-reveal>
            The road
            <br />
            is the <span>story.</span>
          </h3>
          <p className="panel__lede" data-reveal>{p.summary}</p>
          <Actions p={p} />
        </div>
        <div className="safar__stack" aria-hidden data-cursor="On the road">
          <figure className="polaroid polaroid--a" data-parallax="0.06">
            <Image src="/work/safar-nama/lalbagh-tomb.jpg" alt="" width={600} height={704} sizes="(max-width: 800px) 50vw, 22vw" />
            <figcaption>Lalbagh Fort · Dhaka</figcaption>
          </figure>
          <figure className="polaroid polaroid--b" data-parallax="-0.04">
            <Image src="/work/safar-nama/ayub-forest.jpg" alt="" width={900} height={675} sizes="(max-width: 800px) 70vw, 30vw" />
            <figcaption>Bhawal · Gazipur</figcaption>
          </figure>
          <figure className="polaroid polaroid--c" data-parallax="0.1">
            <Image src="/work/safar-nama/memorial-pool.jpg" alt="" width={500} height={889} sizes="(max-width: 800px) 40vw, 16vw" />
            <figcaption>Savar</figcaption>
          </figure>
        </div>
      </div>
      <div className="safar__route" aria-label="Places visited so far">
        <div className="safar__track">
          {[...stops, ...stops].map((s, i) => (
            <span key={i} aria-hidden={i >= stops.length}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function SakinahPanel({ p }: { p: Project }) {
  return (
    <article data-progress className="panel t-sakinah" id={p.slug} aria-labelledby={`${p.slug}-t`}>
      <div className="sakinah__bgword" aria-hidden>السكينة</div>
      <div className="wrap panel__grid">
        <div className="sakinah__visual">
          <div className="arch" data-clip data-cursor="As-Sakinah">
            <Image src="/work/as-sakinah/post-6-dua.jpg" alt="As-Sakinah post: a Quranic supplication in Arabic calligraphy" width={900} height={900} sizes="(max-width: 800px) 80vw, 36vw" />
          </div>
          <Image className="sakinah__mark" src="/work/as-sakinah/arabic.png" alt="As-Sakinah logo" width={150} height={148} data-reveal />
        </div>
        <div className="panel__text">
          <Meta p={p} />
          <h3 id={`${p.slug}-t`} className="sakinah__title" data-reveal>
            As-Sakinah
            <small lang="bn">আস-সাকীনা</small>
          </h3>
          <p className="sakinah__tag" data-reveal>{p.tagline}</p>
          <p className="panel__lede" data-reveal>{p.summary}</p>
          <ul className="sakinah__list" data-reveal>
            <li>The complete Quran, word by word</li>
            <li>Sahih al-Bukhari and Sahih Muslim, complete</li>
            <li>The Forty Hadith of an-Nawawi</li>
            <li>16 sections · 310+ topic pages · 3 languages</li>
          </ul>
          <Actions p={p} />
        </div>
      </div>
    </article>
  );
}

export function HistoryPanel({ p }: { p: Project }) {
  return (
    <article data-progress className="panel t-history" id={p.slug} aria-labelledby={`${p.slug}-t`}>
      <div className="wrap">
        <Meta p={p} />
        <div className="history__head">
          <h3 id={`${p.slug}-t`} className="history__title" data-reveal>
            History is not just meant to be read. <em>It is meant to be experienced.</em>
          </h3>
          <Image className="history__logo" src="/work/story-behind-history/logo.png" alt="Story Behind History logo" width={260} height={107} data-reveal />
        </div>
        <figure className="history__banner" data-clip>
          <Image src="/work/story-behind-history/banner.jpg" alt={p.cover.alt} width={2000} height={761} sizes="100vw" />
        </figure>
        <div className="history__ruler" aria-hidden>
          {["3500 BCE", "500 BCE", "622 CE", "1258", "1453", "1922", "Today"].map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>
        <div className="history__cols">
          <p className="panel__lede dropcap" data-reveal>{p.summary}</p>
          <p className="history__note" data-reveal>
            Nine lenses: period, civilisation, empire, dynasty, region, event, battle, figure and topic. One atlas, one world timeline. English, বাংলা and العربية.
          </p>
        </div>
        <Actions p={p} />
      </div>
    </article>
  );
}

export function MystrickPanel({ p }: { p: Project }) {
  return (
    <article data-progress className="panel t-mystrick" id={p.slug} aria-labelledby={`${p.slug}-t`}>
      <div className="stars" aria-hidden />
      <div className="wrap panel__grid">
        <div className="panel__text">
          <Meta p={p} />
          <div className="mystrick__brand" data-reveal>
            <Image src="/work/mystrick/icon.svg" alt="Mystrick mark" width={44} height={44} unoptimized />
            <span>MYSTRICK</span>
          </div>
          <h3 id={`${p.slug}-t`} className="mystrick__title" data-reveal>
            Beyond
            <br />
            the known.
          </h3>
          <p className="panel__lede" data-reveal>{p.summary}</p>
          <p className="mono-list" data-reveal>Technology / AI / Science / Space / Discoveries / History &amp; Mystery / Future</p>
          <Actions p={p} />
        </div>
        <div className="mystrick__visual">
          <div className="orbit" aria-hidden>
            <i />
            <i />
            <i />
          </div>
          <figure className="screen" data-clip data-tilt="6">
            <Image src="/work/mystrick/site.jpg" alt="The Mystrick homepage" width={1440} height={900} sizes="(max-width: 800px) 90vw, 44vw" />
          </figure>
        </div>
      </div>
    </article>
  );
}

export function AttarPanel({ p }: { p: Project }) {
  return (
    <article data-progress className="panel t-attar" id={p.slug} aria-labelledby={`${p.slug}-t`}>
      <div className="wrap panel__grid">
        <div className="attar__visual">
          <figure className="attar__main" data-clip data-cursor="Attar Lagbe">
            <Image src="/work/attar-lagbe/banner-vampire-blood.jpg" alt="Attar Lagbe campaign banner: Vampire Blood, a touch of mystery" width={1800} height={1013} sizes="(max-width: 800px) 92vw, 46vw" />
          </figure>
          <figure className="attar__float" data-parallax="-0.08">
            <Image src="/work/attar-lagbe/p-bakhoor-al-arais.jpg" alt="Attar Lagbe Bakhoor Al Arais, 6 ml bottle" width={900} height={900} sizes="(max-width: 800px) 40vw, 16vw" />
          </figure>
        </div>
        <div className="panel__text">
          <Meta p={p} />
          <Image className="attar__logo" src="/work/attar-lagbe/logo-light.png" alt="Attar Lagbe logo in Bengali calligraphy" width={240} height={186} data-reveal />
          <h3 id={`${p.slug}-t`} className="attar__title" data-reveal>
            Attar Lagbe
          </h3>
          <p className="panel__lede" data-reveal>{p.summary}</p>
          <dl className="attar__facts" data-reveal>
            <div>
              <dt>Alcohol-free</dt>
              <dd>Concentrated oils</dd>
            </div>
            <div>
              <dt>3 · 6 · 12 · 15 ml</dt>
              <dd>Glass bottles</dd>
            </div>
            <div>
              <dt>Nationwide</dt>
              <dd>Cash on delivery</dd>
            </div>
          </dl>
          <Actions p={p} />
        </div>
      </div>
      <div className="shelf" aria-label="Attar Lagbe products">
        <div className="shelf__track">
          {[...(p.products || []), ...(p.products || [])].map((x, i) => (
            <figure key={i} className="shelf__item" aria-hidden={i >= (p.products?.length || 0)}>
              <Image src={x.src} alt={`${x.name}, Attar Lagbe 6 ml`} width={360} height={360} sizes="220px" />
              <figcaption>{x.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </article>
  );
}

export function SundusPanel({ p }: { p: Project }) {
  return (
    <article data-progress className="panel t-sundus" id={p.slug} aria-labelledby={`${p.slug}-t`}>
      <div className="silk" aria-hidden />
      <div className="wrap sundus__inner">
        <Meta p={p} />
        <p className="sundus__ar shimmer" lang="ar" dir="rtl" aria-hidden data-reveal>
          سندس
        </p>
        <h3 id={`${p.slug}-t`} className="sundus__title" data-reveal>
          SUNDUS
        </h3>
        <p className="panel__lede" data-reveal>{p.summary}</p>
        <ul className="sundus__range" data-reveal>
          {["Jubba", "Abaya", "Hijab", "Niqab", "Burqa"].map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <Actions p={p} />
      </div>
    </article>
  );
}

export const panelFor: Record<string, (props: { p: Project }) => React.ReactElement> = {
  "safar-nama": SafarPanel,
  "as-sakinah": SakinahPanel,
  "story-behind-history": HistoryPanel,
  mystrick: MystrickPanel,
  "attar-lagbe": AttarPanel,
  sundus: SundusPanel,
};
