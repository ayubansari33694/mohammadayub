"use client";

import { useEffect, useState } from "react";

/** A short opening sequence, shown once per visit. */
export default function Loader() {
  const [state, setState] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("ma-intro") === "1";
      sessionStorage.setItem("ma-intro", "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setState("gone");
      document.documentElement.classList.add("intro-done");
      return;
    }
    const t1 = setTimeout(() => setState("leave"), 1500);
    const t2 = setTimeout(() => {
      setState("gone");
      document.documentElement.classList.add("intro-done");
    }, 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (state === "gone") return null;
  return (
    <div className={`loader${state === "leave" ? " is-leaving" : ""}`} aria-hidden>
      <div className="loader__mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/ayub-mark.png" alt="" width={120} height={88} />
      </div>
      <div className="loader__name">
        <span>Mohammad</span> <em>Ayub</em>
      </div>
      <div className="loader__line" />
    </div>
  );
}
