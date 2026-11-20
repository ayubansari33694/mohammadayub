"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="progress" aria-hidden />
      <div className="nav__bar">
        <Link href="/" className="nav__brand" aria-label="Mohammad Ayub, home">
          <Image src="/brand/ayub-mark.png" alt="" width={34} height={25} priority />
          <span>Mohammad Ayub</span>
        </Link>
        <nav className="nav__links" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/#contact" className="nav__cta">
          Get in touch
        </Link>
        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
      <div id="menu" className="menu" hidden={!open}>
        <ol>
          {nav.map((n, i) => (
            <li key={n.href} style={{ ["--i" as string]: i }}>
              <Link href={n.href} onClick={() => setOpen(false)}>
                <small>0{i + 1}</small>
                {n.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
