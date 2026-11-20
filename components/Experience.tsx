"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";

/**
 * The site's motion engine.
 * - Lenis smooth scrolling (wheel), anchor links, scroll-to-top on route change
 * - Curtain page transitions between routes
 * - Reveals ([data-reveal], [data-split], [data-clip]) via IntersectionObserver
 * - Scroll-scrubbed effects: parallax, word highlight, expanding panels, hero exit, marquee velocity
 * - Custom cursor with labels, magnetic buttons, 3D tilt + spotlight, hover image preview
 * - Number counters
 * Everything degrades to static, readable content with reduced motion.
 */
/**
 * Is the surface behind the header dark? Looks at the page under the middle of the bar,
 * skipping the header and overlays, and reads the first solid background colour.
 */
function isDarkBehindNav() {
  const bar = document.querySelector<HTMLElement>(".nav__bar");
  if (!bar) return false;
  const r = bar.getBoundingClientRect();
  const y = Math.max(1, r.top + r.height / 2);
  const darkAt = (x: number) => {
    const el = document
      .elementsFromPoint(x, y)
      .find((e) => !e.closest(".nav, .cursor, .curtain, .loader, .progress, .hover-preview"));
    for (let n: Element | null = el ?? null; n && n !== document.documentElement; n = n.parentElement) {
      const m = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
      if (m && (m[3] === undefined || +m[3] >= 0.5)) {
        const [r1, g, b] = m.slice(0, 3).map(Number);
        return 0.2126 * r1 + 0.7152 * g + 0.0722 * b < 110;
      }
    }
    return false;
  };
  // sample left, middle and right of the bar; dark wins when most samples are dark
  return [0.2, 0.5, 0.8].filter((f) => darkAt(r.left + r.width * f)).length >= 2;
}

export default function Experience() {
  const pathname = usePathname();
  const router = useRouter();
  const lenisRef = useRef<Lenis | null>(null);
  const first = useRef(true);

  /* ---------- global, once ---------- */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce) root.classList.add("reduced");
    const failsafe = setTimeout(() => root.classList.add("intro-done"), 3200);

    let lenis: Lenis | null = null;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
      lenisRef.current = lenis;
    }

    /* cursor */
    const dot = document.querySelector<HTMLElement>(".cursor__dot");
    const ring = document.querySelector<HTMLElement>(".cursor__ring");
    const label = document.querySelector<HTMLElement>(".cursor__label");
    const preview = document.querySelector<HTMLElement>(".hover-preview");
    let mx = innerWidth / 2,
      my = innerHeight / 2,
      rx = mx,
      ry = my,
      px = mx,
      py = my;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      root.classList.add("has-cursor");
    };
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      const lab = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a, button, [role=button], input, textarea, label");
      root.classList.toggle("cursor-link", !!link && !lab);
      root.classList.toggle("cursor-label", !!lab);
      if (label) label.textContent = lab?.dataset.cursor || "";
      const pv = t.closest<HTMLElement>("[data-preview]");
      if (preview) {
        if (pv) {
          const img = preview.querySelector("img")!;
          if (img.getAttribute("src") !== pv.dataset.preview) img.setAttribute("src", pv.dataset.preview!);
          preview.classList.add("is-on");
        } else preview.classList.remove("is-on");
      }
    };
    if (fine && !reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver);
      root.classList.add("fine");
    }

    /* magnetic + tilt (delegated) */
    const onMagnet = (e: PointerEvent) => {
      const m = (e.target as HTMLElement).closest<HTMLElement>("[data-magnetic]");
      document.querySelectorAll<HTMLElement>("[data-magnetic].is-mag").forEach((el) => {
        if (el !== m) {
          el.classList.remove("is-mag");
          el.style.transform = "";
        }
      });
      if (m) {
        const r = m.getBoundingClientRect();
        const s = parseFloat(m.dataset.magnetic || "0.3");
        m.classList.add("is-mag");
        m.style.transform = `translate3d(${(e.clientX - r.left - r.width / 2) * s}px, ${(e.clientY - r.top - r.height / 2) * s}px, 0)`;
      }
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
      if (t) {
        const r = t.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width,
          y = (e.clientY - r.top) / r.height;
        const a = parseFloat(t.dataset.tilt || "6");
        t.style.setProperty("--rx", `${(0.5 - y) * a}deg`);
        t.style.setProperty("--ry", `${(x - 0.5) * a}deg`);
        t.style.setProperty("--mx", `${x * 100}%`);
        t.style.setProperty("--my", `${y * 100}%`);
      }
    };
    const onLeaveTilt = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest?.("[data-tilt]") as HTMLElement | null;
      if (t && !t.contains(e.relatedTarget as Node)) {
        t.style.setProperty("--rx", "0deg");
        t.style.setProperty("--ry", "0deg");
      }
    };
    if (fine && !reduce) {
      document.addEventListener("pointermove", onMagnet, { passive: true });
      document.addEventListener("pointerout", onLeaveTilt);
    }

    /* the frame loop */
    let lastY = scrollY,
      vel = 0,
      raf = 0,
      frame = 5;
    const loop = (time: number) => {
      lenis?.raf(time);
      const y = scrollY;
      const vh = innerHeight;
      const h = root.scrollHeight - vh;
      root.style.setProperty("--scroll", String(h > 0 ? y / h : 0));
      root.style.setProperty("--sy", String(Math.round(y)));
      vel += (y - lastY - vel) * 0.12;
      root.style.setProperty("--vel", vel.toFixed(2));
      // header hide/show
      if (Math.abs(y - lastY) > 2) root.classList.toggle("nav-hidden", y > lastY && y > 400 && !root.classList.contains("menu-open"));
      root.classList.toggle("scrolled", y > 30);
      // header contrast: check what is behind the bar every few frames
      if (++frame % 6 === 0) root.classList.toggle("nav-dark", isDarkBehindNav());
      lastY = y;

      if (!reduce) {
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -300 || r.top > vh + 300) return;
          const sp = parseFloat(el.dataset.parallax || "0.1");
          el.style.translate = `0 ${((r.top + r.height / 2 - vh / 2) * -sp).toFixed(1)}px`;
        });
        document.querySelectorAll<HTMLElement>("[data-progress]").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -50 || r.top > vh + 50) return;
          // 0 when the element's top hits the bottom of the viewport, 1 when its top reaches the top
          const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + (el.dataset.progress === "long" ? r.height * 0.6 : 0))));
          el.style.setProperty("--p", p.toFixed(3));
        });
        document.querySelectorAll<HTMLElement>("[data-split='scrub']").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
          const ws = el.querySelectorAll<HTMLElement>(".split__c");
          const lit = p * ws.length;
          ws.forEach((w, i) => w.style.setProperty("--lit", String(Math.min(1, Math.max(0.12, lit - i)))));
        });
      }

      if (fine && !reduce) {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        px += (mx - px) * 0.1;
        py += (my - py) * 0.1;
        if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
        if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        if (preview) {
          const tilt = Math.max(-12, Math.min(12, (mx - px) * 0.15));
          preview.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${tilt}deg)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      clearTimeout(failsafe);
      cancelAnimationFrame(raf);
      lenis?.destroy();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointermove", onMagnet);
      document.removeEventListener("pointerout", onLeaveTilt);
    };
  }, []);

  /* ---------- page transitions + anchor links ---------- */
  useEffect(() => {
    const root = document.documentElement;
    const reduce = root.classList.contains("reduced");
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || /^https?:/.test(href)) return;
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;
      const samePage = url.pathname === location.pathname;
      if (samePage && url.hash) {
        e.preventDefault();
        const t = document.querySelector(url.hash);
        if (t) {
          if (lenisRef.current) lenisRef.current.scrollTo(t as HTMLElement, { offset: -20, duration: 1.4 });
          else t.scrollIntoView();
          history.replaceState(null, "", url.hash);
        }
        root.classList.remove("menu-open");
        return;
      }
      if (samePage) return;
      e.preventDefault();
      root.classList.remove("menu-open");
      if (reduce) {
        router.push(url.pathname + url.hash);
        return;
      }
      root.classList.add("is-leaving");
      setTimeout(() => router.push(url.pathname + url.hash), 700);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  /* ---------- per page: reveals, counters, scroll position ---------- */
  useEffect(() => {
    const root = document.documentElement;
    const reduce = root.classList.contains("reduced");

    if (!first.current) {
      const hash = location.hash;
      const target = hash ? document.querySelector(hash) : null;
      if (target) {
        lenisRef.current?.scrollTo(target as HTMLElement, { immediate: true, offset: -20 });
        if (!lenisRef.current) target.scrollIntoView();
      } else {
        lenisRef.current?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      }
      root.classList.remove("is-leaving");
      root.classList.add("is-entering");
      setTimeout(() => root.classList.remove("is-entering"), 900);
    }
    first.current = false;

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-split]:not([data-split='scrub']), [data-clip], [data-count]"));
    const count = (el: HTMLElement) => {
      const end = parseFloat(el.dataset.count || "0");
      const suffix = el.dataset.suffix || "";
      if (reduce) {
        el.textContent = end + suffix;
        return;
      }
      const t0 = performance.now();
      const dur = 1600;
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - k, 4);
        el.textContent = Math.round(end * e) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => {
        el.classList.add("in");
        if (el.dataset.count) count(el);
      });
      return;
    }
    // Clipped elements report no intersection, so watch a sentinel (their parent) instead.
    const owners = new Map<Element, HTMLElement[]>();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (owners.get(e.target) || []).forEach((el) => {
            el.classList.add("in");
            if (el.dataset.count) count(el);
          });
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    items.forEach((el) => {
      const target = el.hasAttribute("data-clip") && el.parentElement ? el.parentElement : el;
      const list = owners.get(target) || [];
      list.push(el);
      owners.set(target, list);
      io.observe(target);
    });
    return () => io.disconnect();
  }, [pathname]);

  return (
    <>
      <div className="cursor" aria-hidden>
        <div className="cursor__ring">
          <span className="cursor__label" />
        </div>
        <div className="cursor__dot" />
      </div>
      <div className="hover-preview" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work/safar-nama/ayub-forest.jpg" alt="" />
      </div>
      <div className="curtain" aria-hidden>
        <div className="curtain__panel curtain__panel--gold" />
        <div className="curtain__panel curtain__panel--ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ayub-mark.png" alt="" width={90} height={66} />
        </div>
      </div>
    </>
  );
}
