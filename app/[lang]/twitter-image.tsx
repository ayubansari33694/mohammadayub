import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Mohammad Ayub — Student, Creative Designer, Entrepreneur, Digital Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const pub = join(process.cwd(), "public", "brand");
  const [portrait, mark] = await Promise.all([readFile(join(pub, "ayub-portrait.jpg")), readFile(join(pub, "ayub-mark.png"))]);
  const src = (b: Buffer, t: string) => `data:${t};base64,${b.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f3eee4", color: "#121815", padding: 64, fontFamily: "serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src(mark, "image/png")} width={110} height={81} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -3 }}>Mohammad</div>
            <div style={{ fontSize: 104, lineHeight: 1.05, letterSpacing: -3, color: "#047a6e", fontStyle: "italic" }}>Ayub</div>
            <div style={{ fontSize: 28, marginTop: 28, color: "#4c544f", fontFamily: "sans-serif" }}>
              Student · Creative Designer · Entrepreneur · Digital Creator
            </div>
          </div>
          <div style={{ fontSize: 22, color: "#b8872f", fontFamily: "sans-serif", letterSpacing: 4 }}>MOHAMMADAYUB.NET</div>
        </div>
        <div style={{ display: "flex", width: 400, height: 502, borderRadius: "200px 200px 8px 8px", overflow: "hidden", border: "2px solid #b8872f" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src(portrait, "image/jpeg")} width={400} height={502} style={{ objectFit: "cover" }} alt="" />
        </div>
      </div>
    ),
    size
  );
}
