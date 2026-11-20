import { Fragment } from "react";

/**
 * Splits text for animation while keeping it readable to screen readers
 * (the visible pieces are aria-hidden; the full string sits in an sr-only span).
 *  mode="chars"  → each letter in its own mask (used for big display type)
 *  mode="words"  → each word in its own mask (used for headings)
 *  mode="scrub"  → words that light up as you scroll (used for statements)
 */
type Props = { text: string; mode?: "chars" | "words" | "scrub"; className?: string; delay?: number; step?: number };

export default function Split({ text, mode = "words", className, delay = 0, step }: Props) {
  const words = text.split(" ");
  let n = 0;
  const s = step ?? (mode === "chars" ? 45 : 60);
  return (
    <span className={`split split--${mode}${className ? ` ${className}` : ""}`} data-split={mode}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <Fragment key={wi}>
          <span className="split__w">
            {mode === "chars" ? (
              Array.from(w).map((c, ci) => (
                <span key={ci} className="split__m">
                  <span className="split__c" style={{ ["--i" as string]: n++, ["--d" as string]: `${delay + (n - 1) * s}ms` }}>
                    {c}
                  </span>
                </span>
              ))
            ) : (
              <span className="split__m">
                <span className="split__c" style={{ ["--i" as string]: n++, ["--d" as string]: `${delay + (n - 1) * s}ms` }}>
                  {w}
                </span>
              </span>
            )}
          </span>
          {wi < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
