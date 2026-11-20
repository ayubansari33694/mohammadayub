"use client";

/**
 * Light / dark switch. The choice is kept in localStorage ("theme"); with no choice the site follows the device setting.
 * The early script in layout.tsx sets html[data-theme] before the first paint, so there is no flash.
 */
export default function ThemeToggle({ labels }: { labels: { dark: string; light: string } }) {
  const flip = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", next === "dark" ? "#111815" : "#f3eee4"));
    setTimeout(() => root.classList.remove("theme-switching"), 600);
  };
  return (
    <button type="button" className="theme-btn" onClick={flip} aria-label={`${labels.dark} / ${labels.light}`} title={`${labels.dark} / ${labels.light}`} data-magnetic="0.3">
      <svg className="i-moon" viewBox="0 0 24 24" aria-hidden>
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <svg className="i-sun" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </button>
  );
}
