"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

// ── Terminal boot-up reveal ─────────────────────────────────
// Text types out character-by-character like terminal output; each instance picks a
// random speed (plus per-character jitter) for variety. The full text is rendered
// invisibly underneath so the layout never shifts while typing.

export function Typewriter({
  text,
  delay = 0,
  cps,
  cursor = true,
  holdCursor = false,
}: {
  text: string;
  delay?: number; // ms before typing starts
  cps?: number; // chars per second; randomized per instance when omitted
  cursor?: boolean;
  holdCursor?: boolean; // keep the cursor blinking after typing finishes
}) {
  const prefersReducedMotion = useReducedMotion();
  const [speed] = useState(() => cps ?? 16 + Math.random() * 18);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const shownCount = prefersReducedMotion ? text.length : count;
  const done = shownCount >= text.length;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !started || count >= text.length) return;
    const jitter = 0.5 + Math.random();
    const t = setTimeout(() => setCount((c) => c + 1), (1000 / speed) * jitter);
    return () => clearTimeout(t);
  }, [prefersReducedMotion, started, count, speed, text.length]);

  return (
    <span className="relative inline-block" aria-label={text}>
      <span aria-hidden className="invisible">{text}</span>
      <span aria-hidden className="absolute inset-0 text-left">
        {text.slice(0, shownCount)}
        {started && cursor && (!done || holdCursor) && (
          <span className="typing-cursor inline-block h-[1em] w-[0.55em] translate-y-[0.12em] bg-current" />
        )}
      </span>
    </span>
  );
}

// Non-text elements (images, buttons, dots) can't be "typed", so they appear abruptly
// at their slot in the boot sequence, like a terminal rendering a block element.
export function BootReveal({
  delay,
  className,
  inline = false,
  children,
}: {
  delay: number;
  className?: string;
  inline?: boolean;
  children?: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [shown, setShown] = useState(false);
  const visible = shown || prefersReducedMotion;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay, prefersReducedMotion]);

  const Tag = inline ? "span" : "div";
  return <Tag className={`${visible ? "" : "invisible"} ${className ?? ""}`}>{children}</Tag>;
}

// macOS-terminal-style window frame: traffic-light dots + a title bar
export function TerminalWindow({
  title,
  delay = 0,
  className = "",
  children,
}: {
  title: string;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <BootReveal
      delay={delay}
      className={`overflow-hidden rounded-lg border border-card-border bg-background/70 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-card-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs text-muted">{title}</span>
      </div>
      {children}
    </BootReveal>
  );
}
