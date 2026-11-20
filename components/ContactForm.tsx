"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";

type Status = { kind: "idle" | "sending" | "sent" | "mailto" | "error"; msg?: string };

export default function ContactForm() {
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
      setStatus({ kind: "error", msg: json.error || "Something went wrong. Please try again." });
    } catch {
      setStatus({ kind: "error", msg: "Network error. Please try again, or email me directly." });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__row">
        <label>
          <span>Your name</span>
          <input name="name" required maxLength={80} autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required maxLength={120} autoComplete="email" />
        </label>
      </div>
      <label>
        <span>Subject</span>
        <input name="subject" maxLength={120} />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" required minLength={10} maxLength={4000} rows={5} />
      </label>
      {/* honeypot: real visitors never see or fill this */}
      <label className="hp" aria-hidden>
        <span>Leave this empty</span>
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form__foot">
        <button className="btn btn--solid" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send message"}
          <span aria-hidden>→</span>
        </button>
        <p className="form__status" role="status" aria-live="polite">
          {status.kind === "sent" && "Thank you. Your message has been sent."}
          {status.kind === "mailto" && "Your email app should open with the message ready to send."}
          {status.kind === "error" && status.msg}
        </p>
      </div>
    </form>
  );
}
