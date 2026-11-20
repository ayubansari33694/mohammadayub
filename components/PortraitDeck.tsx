"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Hero portraits as a deck of arch cards, like the Attar Lagbe hero slider:
 * the front card flies off, the cards behind step forward, a light sheen sweeps the new front card.
 * Photos are AYUB's own, background removed (public/brand/portraits).
 */
const PHOTOS = [
  { src: "/brand/portraits/ayub-1.webp", w: 1077, h: 1100, tint: "#047a6e" },
  { src: "/brand/portraits/ayub-2.webp", w: 789, h: 1100, tint: "#b8872f" },
  { src: "/brand/portraits/ayub-3.webp", w: 1118, h: 1057, tint: "#035c53" },
  { src: "/brand/portraits/ayub-4.webp", w: 796, h: 1100, tint: "#c29a4a" },
  { src: "/brand/portraits/ayub-5.webp", w: 1048, h: 1100, tint: "#047a6e" },
  { src: "/brand/portraits/ayub-6.webp", w: 762, h: 839, tint: "#b8872f" },
];
const AUTO = 3800;
// card positions: front 0, then 1 and 2 peeking behind
const DECK = [
  { x: 0, y: 0, s: 1, r: 0, o: 1, z: 30 },
  { x: 11, y: -2, s: 0.9, r: 5, o: 0.95, z: 20 },
  { x: 20, y: -4, s: 0.8, r: 9, o: 0.65, z: 10 },
];
const GONE = { x: -38, y: 4, s: 0.9, r: -11, o: 0, z: 40 };
const WAIT = { x: 26, y: -6, s: 0.74, r: 13, o: 0, z: 0 };

export default function PortraitDeck({ alt }: { alt: string }) {
  const n = PHOTOS.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const x0 = useRef<number | null>(null);
  const go = (to: number) => setI(((to % n) + n) % n);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), AUTO);
    return () => clearTimeout(t);
  }, [i, paused, n]);

  return (
    <div
      className="deck"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => (x0.current = e.clientX)}
      onPointerUp={(e) => {
        if (x0.current == null) return;
        const dx = e.clientX - x0.current;
        x0.current = null;
        if (dx < -40) go(i + 1);
        else if (dx > 40) go(i - 1);
      }}
    >
      {PHOTOS.map((p, k) => {
        const off = (k - i + n) % n;
        const pose = off <= 2 ? DECK[off] : off === n - 1 ? GONE : WAIT;
        return (
          <div
            key={p.src}
            className={`deck__card${off === 0 ? " is-front" : ""}`}
            aria-hidden={off !== 0}
            style={{
              zIndex: pose.z,
              opacity: pose.o,
              transform: `translate3d(calc(${pose.x}% * var(--deck-dir, 1)), ${pose.y}%, 0) scale(${pose.s}) rotate(calc(${pose.r}deg * var(--deck-dir, 1)))`,
              ["--tint" as string]: p.tint,
            }}
          >
            <Image
              src={p.src}
              alt={off === 0 ? alt : ""}
              width={p.w}
              height={p.h}
              priority={k === 0}
              sizes="(max-width: 860px) 60vw, 32vw"
              draggable={false}
            />
            {off === 0 && <span key={i} className="deck__shine" aria-hidden />}
          </div>
        );
      })}
      <div className="deck__dots" role="group" aria-label="Photos">
        {PHOTOS.map((p, k) => (
          <button key={p.src} type="button" className={k === i ? "is-on" : ""} aria-label={`Photo ${k + 1}`} aria-current={k === i || undefined} onClick={() => go(k)}>
            {k === i && <i key={`${i}-${paused}`} className={paused ? "is-paused" : ""} />}
          </button>
        ))}
      </div>
    </div>
  );
}
