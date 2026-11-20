"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One small motion engine for the whole site:
 *  - [data-reveal] elements get `.in` when they enter the viewport
 *  - [data-parallax="0.1"] elements drift with scroll
 *  - --scroll on <html> drives the progress bar
 * Everything is skipped when the visitor prefers reduced motion.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("js");
    // Safety net: never leave the hero waiting on the intro.
    const failsafe = setTimeout(() => root.classList.add("intro-done"), 3000);

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let io: IntersectionObserver | null = null;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      items.forEach((el) => io!.observe(el));
    }

    const par = reduce ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const tick = () => {
      raf = 0;
      const h = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll", String(h > 0 ? window.scrollY / h : 0));
      const vh = window.innerHeight;
      for (const el of par) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0.1");
        const off = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(failsafe);
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
