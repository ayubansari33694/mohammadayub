import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope, JetBrains_Mono, Amiri, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";

const display = Bodoni_Moda({ subsets: ["latin"], variable: "--f-display", style: ["normal", "italic"], axes: ["opsz"], display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--f-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono", weight: ["400", "500"], display: "swap" });
const arabic = Amiri({ subsets: ["arabic"], variable: "--f-arabic", weight: ["400", "700"], display: "swap" });
const bangla = Hind_Siliguri({ subsets: ["bengali"], variable: "--f-bangla", weight: ["400", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — Mohammad Ayub" },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Mohammad Ayub",
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
    firstName: "Mohammad",
    lastName: "Ayub",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3eee4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1513" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
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
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, publisher: { "@id": `${site.url}/#person` } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} ${arabic.variable} ${bangla.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Experience />
      </body>
    </html>
  );
}
