import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, Inter, Hind_Siliguri, Cairo, Amiri, Aref_Ruqaa } from "next/font/google";
import "../globals.css";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { langs, isLang, dir, t, langNames, href, type Lang } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";

// The same type system as the Saiful Islam portfolio: Space Grotesk + Inter, Hind Siliguri for Bengali, Cairo for Arabic.
const display = Space_Grotesk({ subsets: ["latin"], variable: "--f-display", weight: ["400", "500", "600", "700"], display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--f-sans", display: "swap" });
const bangla = Hind_Siliguri({ subsets: ["bengali", "latin"], variable: "--f-bangla", weight: ["400", "500", "600", "700"], display: "swap" });
const arabic = Cairo({ subsets: ["arabic", "latin"], variable: "--f-arabic", weight: ["400", "500", "600", "700"], display: "swap" });
const calli = Amiri({ subsets: ["arabic"], variable: "--f-calli", weight: ["400", "700"], display: "swap" });
// Ruqaa calligraphy, only for the footer motto
const ruqaa = Aref_Ruqaa({ subsets: ["arabic"], variable: "--f-ruqaa", weight: ["400", "700"], display: "swap", preload: false });

export const dynamicParams = false;
export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = t(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: d.meta.title, template: `%s — ${d.name.full}` },
    description: d.meta.description,
    applicationName: d.name.full,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    keywords: [
      "Mohammad Ayub",
      "মোহাম্মদ আইয়ুব",
      "محمد أيوب",
      "Mohammad Ayub portfolio",
      "Mohammad Ayub personal website",
      "Mohammad Ayub projects",
      "Ayub creative designer",
      "Ayub entrepreneur",
      "Ayub digital creator",
      "Attar Lagbe",
      "As-Sakinah",
      "Story Behind History",
      "Mystrick",
      "Ayub Safar Nama",
    ],
    alternates: {
      canonical: href(lang, "/"),
      languages: { en: "/", bn: "/bn", ar: "/ar", "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      url: `${site.url}${href(lang, "/")}`,
      siteName: d.name.full,
      title: d.meta.title,
      description: d.meta.description,
      locale: langNames[lang].locale,
      alternateLocale: langs.filter((l) => l !== lang).map((l) => langNames[l].locale),
      firstName: "Mohammad",
      lastName: "Ayub",
    },
    twitter: { card: "summary_large_image", title: d.meta.title, description: d.meta.description },
    robots: { index: true, follow: true },
    appleWebApp: { capable: true, title: "Ayub", statusBarStyle: "default" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3eee4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1513" },
  ],
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;
  const d = t(lang);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        alternateName: ["মোহাম্মদ আইয়ুব", "محمد أيوب"],
        url: site.url,
        image: `${site.url}/brand/ayub-portrait.jpg`,
        email: `mailto:${site.email}`,
        jobTitle: "Student, Creative Designer, Entrepreneur and Digital Creator",
        address: { "@type": "PostalAddress", addressLocality: "Mathbaria, Pirojpur", addressRegion: "Barisal", addressCountry: "BD" },
        alumniOf: [
          { "@type": "EducationalOrganization", name: "Darunnajat Siddikia Kamil Madrasa" },
          { "@type": "EducationalOrganization", name: "Dhani Safa Salehia Fazil Madrasa" },
        ],
        affiliation: { "@type": "EducationalOrganization", name: "Tamirul Millat Kamil Madrasa, Tongi Campus" },
        knowsLanguage: ["bn", "ar", "en"],
        knowsAbout: ["Graphic design", "Visual identity", "Branding", "Video editing", "Motion graphics", "Digital marketing", "Islamic studies", "Hadith"],
        sameAs: site.socials.map((s) => s.href),
        founder: projects.filter((p) => p.url).map((p) => ({ "@type": "Organization", name: p.name, url: p.url })),
      },
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: ["en", "bn", "ar"], publisher: { "@id": `${site.url}/#person` } },
    ],
  };

  return (
    <html
      suppressHydrationWarning
      lang={lang}
      dir={dir(lang)}
      data-lang={lang}
      className={`${display.variable} ${sans.variable} ${bangla.variable} ${arabic.variable} ${calli.variable} ${ruqaa.variable}`}
    >
      <head>
        {/* theme before first paint: saved choice, else the device setting */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a className="skip" href="#main">
          {lang === "bn" ? "মূল অংশে যান" : lang === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Nav lang={lang} d={d} />
        <main id="main">{children}</main>
        <Footer lang={lang} d={d} />
        <Experience />
      </body>
    </html>
  );
}
