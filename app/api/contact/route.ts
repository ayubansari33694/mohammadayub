import { NextResponse } from "next/server";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  if (list.length >= LIMIT) {
    return NextResponse.json({ ok: false, error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots: honeypot filled, or submitted faster than a person could type.
  if (clean(body.company, 200) || Number(body.elapsed) < 2500) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 120);
  const subject = clean(body.subject, 120);
  const message = clean(body.message, 4000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ ok: false, error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  list.push(now);
  hits.set(ip, list);

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "mohammadayub.net@gmail.com";
  if (!key) {
    // No mail service configured yet: let the browser hand the message to the visitor's email app.
    return NextResponse.json({ ok: false, fallback: "mailto" });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Portfolio: ${subject || `message from ${name}`}`,
      html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });
  if (!res.ok) return NextResponse.json({ ok: false, fallback: "mailto" });
  return NextResponse.json({ ok: true });
}
