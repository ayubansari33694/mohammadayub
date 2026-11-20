import type { MetadataRoute } from "next";

// Makes the site installable as an app (Android, desktop Chrome/Edge, iPhone "Add to Home Screen").
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Mohammad Ayub",
    short_name: "Ayub",
    description: "The personal portfolio of Mohammad Ayub.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f3eee4",
    theme_color: "#0f1513",
    lang: "en",
    dir: "ltr",
    categories: ["portfolio", "personal"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "বাংলা", url: "/bn", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "العربية", url: "/ar", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
