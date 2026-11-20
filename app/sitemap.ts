import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { langs, href } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["/", ...projects.map((p) => `/work/${p.slug}`)];
  return paths.flatMap((path) =>
    langs.map((lang) => ({
      url: `${site.url}${href(lang, path)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? (lang === "en" ? 1 : 0.9) : 0.8,
      alternates: { languages: Object.fromEntries(langs.map((l) => [l, `${site.url}${href(l, path)}`])) },
    }))
  );
}
