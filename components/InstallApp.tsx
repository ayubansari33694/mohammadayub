"use client";

import { useEffect, useState } from "react";
import type { Dict } from "@/lib/i18n";

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

/**
 * Registers the service worker and offers "Install the app".
 * Chrome, Edge and Android get the browser's own install prompt.
 * iPhone/iPad Safari has no prompt, so the button shows the Add to Home Screen steps.
 * Hidden when already running as an installed app, or when the browser cannot install.
 */
export default function InstallApp({ d }: { d: Dict }) {
  const [evt, setEvt] = useState<InstallEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;
    const ua = navigator.userAgent;
    setIos(/iPhone|iPad|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1));
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as InstallEvent);
    };
    const onInstalled = () => setEvt(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!evt && !ios) return null;

  const onClick = async () => {
    if (evt) {
      await evt.prompt();
      await evt.userChoice.catch(() => null);
      setEvt(null);
    } else {
      setHint((v) => !v);
    }
  };

  return (
    <span className="install">
      <button type="button" className="install__btn" onClick={onClick} aria-expanded={evt ? undefined : hint}>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
          <path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {d.app.install}
      </button>
      {hint && <small className="install__hint">{d.app.iosHint}</small>}
    </span>
  );
}
