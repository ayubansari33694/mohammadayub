"use client";

import { useEffect, useState } from "react";

export default function RoleCycler({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => clearInterval(t);
  }, [roles.length]);
  return (
    <span className="cycler" aria-label={roles.join(", ")}>
      {roles.map((r, k) => (
        <span key={r} className={k === i ? "is-on" : ""} aria-hidden>
          {r}
        </span>
      ))}
    </span>
  );
}
