import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohammad Ayub",
    short_name: "Ayub",
    description: "The personal portfolio of Mohammad Ayub.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3eee4",
    theme_color: "#0f1513",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
