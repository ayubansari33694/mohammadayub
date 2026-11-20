"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

type Status = { kind: "idle" | "sending" | "sent" | "mailto" | "error"; msg?: string };

export default function ContactForm({ f }: { f: Dict["contact"]["form"] }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const started = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - started.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        form.reset();
        setStatus({ kind: "sent" });
        return;
      }
      if (json.fallback === "mailto") {
        const subject = encodeURIComponent(data.subject || `Message from ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name}\n${data.email}`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus({ kind: "mailto" });
        return;
      }
      setStatus({ kind: "error", msg: f.error });
    } catch {
      setStatus({ kind: "error", msg: f.network });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__row">
        <label>
          <span>{f.name}</span>
          <input name="name" required maxLength={80} autoComplete="name" />
        </label>
        <label>
          <span>{f.email}</span>
          <input name="email" type="email" required maxLength={120} autoComplete="email" />
        </label>
      </div>
      <label>
        <span>{f.subject}</span>
        <input name="subject" maxLength={120} />
      </label>
      <label>
        <span>{f.message}</span>
        <textarea name="message" required minLength={10} maxLength={4000} rows={5} />
      </label>
      {/* honeypot: real visitors never see or fill this */}
      <label className="hp" aria-hidden>
        <span>{f.hp}</span>
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form__foot">
        <button className="btn btn--solid" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? f.sending : f.send}
          <span aria-hidden className="flip">→</span>
        </button>
        <p className="form__status" role="status" aria-live="polite">
          {status.kind === "sent" && f.sent}
          {status.kind === "mailto" && f.mailto}
          {status.kind === "error" && status.msg}
        </p>
      </div>
    </form>
  );
}
