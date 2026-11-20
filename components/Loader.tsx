"use client";

import { useEffect, useState } from "react";

/** Opening sequence, once per visit: counter, mark, name, then the curtain lifts. */
export default function Loader() {
  const [state, setState] = useState<"show" | "leave" | "gone">("show");
  const [n, setN] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("ma-intro") === "1";
      sessionStorage.setItem("ma-intro", "1");
    } catch {}
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setState("gone");
      root.classList.add("intro-done");
      return;
    }
    root.classList.add("intro-running");
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1700);
      setN(Math.round(100 * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const t1 = setTimeout(() => {
      setState("leave");
      root.classList.add("intro-done");
    }, 2000);
    const t2 = setTimeout(() => {
      setState("gone");
      root.classList.remove("intro-running");
    }, 3100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (state === "gone") return null;
  const name = "MOHAMMAD AYUB";
  return (
    <div className={`loader${state === "leave" ? " is-leaving" : ""}`} aria-hidden>
      <div className="loader__panel loader__panel--a" />
      <div className="loader__panel loader__panel--b" />
      <div className="loader__content">
        <div className="loader__mark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ayub-mark.png" alt="" width={110} height={81} />
        </div>
        <div className="loader__name">
          {Array.from(name).map((c, i) => (
            <span key={i} style={{ ["--i" as string]: i }}>
              {c === " " ? " " : c}
            </span>
          ))}
        </div>
        <div className="loader__meta">
          <span>Portfolio · MMXXVI</span>
          <span className="loader__count">{String(n).padStart(3, "0")}</span>
        </div>
        <div className="loader__bar">
          <i style={{ transform: `scaleX(${n / 100})` }} />
        </div>
      </div>
    </div>
  );
}
