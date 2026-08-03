"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { SiShopify } from "react-icons/si";
import { IconType } from "react-icons";
import AsciiBackground from "./components/AsciiBackground";
import NowPlaying from "./components/NowPlaying";

// ── Terminal boot-up reveal ─────────────────────────────────
// Text types out character-by-character like terminal output; each instance picks a
// random speed (plus per-character jitter) for variety. The full text is rendered
// invisibly underneath so the layout never shifts while typing.

function Typewriter({
  text,
  delay = 0,
  cps,
  cursor = true,
}: {
  text: string;
  delay?: number; // ms before typing starts
  cps?: number; // chars per second; randomized per instance when omitted
  cursor?: boolean;
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
        {started && !done && cursor && (
          <span className="typing-cursor inline-block h-[1em] w-[0.55em] translate-y-[0.12em] bg-current" />
        )}
      </span>
    </span>
  );
}

// Non-text elements (images, buttons, dots) can't be "typed", so they appear abruptly
// at their slot in the boot sequence, like a terminal rendering a block element.
function BootReveal({
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

const roles = [
  "DJ",
  "freelance software engineer",
  "avid gamer",
  "food enthusiast",
  "runner",
  "producer",
  "content creator",
];

interface Experience {
  role: string;
  company: string;
  period: string;
  color: string;
  logo?: string;
  icon?: IconType;
  lightIconBackground?: boolean;
  url?: string;
}

const experience: Experience[] = [
  { role: "Applied ML Engineer", company: "Shopify", period: "Jul 2026 – Present", icon: SiShopify, color: "#95bf47", lightIconBackground: true, url: "https://www.shopify.com" },
  { role: "Founder", company: "Stealth Startup", period: "Jul 2026 – Present", logo: "/stealth_startup_logo.jpeg", color: "#a78bfa" },
  { role: "Founder / CEO", company: "AutoDB", period: "Nov 2025 – Apr 2026", logo: "/autodb_logo.png", color: "#a78bfa" },
  { role: "SDE Intern", company: "Amazon", period: "May 2025 – Aug 2025", logo: "/amazon_logo.jpeg", color: "#ff9900", url: "https://www.amazon.com" },
  { role: "SDE Intern", company: "Amazon", period: "Jun 2024 – Sep 2024", logo: "/amazon_logo.jpeg", color: "#ff9900", url: "https://www.amazon.com" },
  { role: "SWE Intern", company: "Microsoft", period: "May 2023 – Aug 2023", logo: "/microsoft_logo.png", color: "#00a4ef", url: "https://www.microsoft.com" },
];

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-block gradient-text"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Home() {
  // Card hover and constellation hover are tracked separately so cursor movement over
  // the background never clears a highlight owned by the experience cards (and vice versa)
  const [cardCompany, setCardCompany] = useState<string | null>(null);
  const [constellationCompany, setConstellationCompany] = useState<string | null>(null);
  const activeCompany = cardCompany ?? constellationCompany;

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-[max(1rem,2vw)]">
      <AsciiBackground activeCompany={activeCompany} onCompanyHover={setConstellationCompany} />

      <div className="relative z-10 flex w-full flex-col gap-12 md:flex-row md:items-center md:justify-between">
        {/* Left side: headshot + intro text */}
        <div className="flex-1 text-left">
          {/* Headshot */}
          <BootReveal delay={100} className="mb-8">
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-2 border-card-border glow">
              <Image
                src="/headshot.png"
                alt="Josh Xie"
                fill
                className="object-cover"
                priority
              />
            </div>
          </BootReveal>

          <p className="mb-4 font-mono text-sm text-accent">
            <Typewriter text="Hi, my name is" delay={250} />
          </p>

          <h1 className="mb-2 text-5xl font-bold tracking-tight sm:text-7xl">
            <Typewriter text="Josh Xie" delay={900} cps={10} />
          </h1>

          <h2 className="mb-2 text-2xl font-semibold text-muted sm:text-3xl">
            <Typewriter text="building @ Shopify" delay={1800} />
          </h2>

          <p className="mb-6 text-xl text-muted sm:text-2xl">
            <Typewriter text="also" delay={2700} />{" "}
            <BootReveal inline delay={3000}>
              <RotatingRole />
            </BootReveal>
          </p>

          <BootReveal delay={3100} className="mb-10">
            <NowPlaying />
          </BootReveal>

          <BootReveal delay={3250} className="flex items-center gap-4">
            <Link
              href="/about"
              className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-secondary hover:shadow-lg hover:shadow-accent/20"
            >
              <Typewriter text="Learn more about me" delay={3300} cps={30} />
              <HiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="flex gap-3">
              <BootReveal inline delay={3650}>
                <a
                  href="https://github.com/xiejosh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full border border-card-border p-3 text-muted transition-all hover:border-accent/50 hover:text-foreground"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </BootReveal>
              <BootReveal inline delay={3800}>
                <a
                  href="https://www.linkedin.com/in/josh-xie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full border border-card-border p-3 text-muted transition-all hover:border-accent/50 hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
              </BootReveal>
            </div>
          </BootReveal>
        </div>

        {/* Right side: Experience timeline */}
        <div className="shrink-0">
          <div className="relative flex">
            {/* Text + logos column */}
            <div className="flex flex-col">
              {experience.map((exp, i) => {
                const bootDelay = 900 + i * 450;
                const content = (
                  <div
                    onMouseEnter={() => setCardCompany(exp.company)}
                    onMouseLeave={() => setCardCompany(null)}
                    className={`group flex items-center gap-5 rounded-xl p-4 text-right transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10 ${exp.url ? "cursor-pointer" : ""} mb-4 last:mb-0 ${
                      activeCompany === exp.company ? "-translate-y-1 bg-card-bg/50 shadow-lg shadow-accent/10" : ""
                    }`}
                  >
                    {/* Text */}
                    <div className="flex-1">
                      <h4 className="text-base font-bold" style={{ color: exp.color }}>
                        <Typewriter text={exp.company} delay={bootDelay} />
                      </h4>
                      <p className="text-sm font-medium text-foreground">
                        <Typewriter text={exp.role} delay={bootDelay + 180} />
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        <Typewriter text={exp.period} delay={bootDelay + 360} />
                      </p>
                    </div>
                    {/* Logo */}
                    <BootReveal
                      delay={bootDelay}
                      className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-card-border ${exp.logo || exp.lightIconBackground ? "bg-white" : "bg-card-bg"}`}
                    >
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={56}
                          height={56}
                          className={`h-full w-full ${exp.logo === "/microsoft_logo.png" ? "object-contain p-2" : "object-cover"}`}
                        />
                      ) : exp.icon ? (
                        <exp.icon size={28} style={{ color: exp.color }} />
                      ) : null}
                    </BootReveal>
                  </div>
                );

                return exp.url ? (
                  <a
                    key={i}
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onFocus={() => setCardCompany(exp.company)}
                    onBlur={() => setCardCompany(null)}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </div>

            {/* Progress bar with dots */}
            <div className="relative ml-6 flex w-4 flex-col items-center">
              <BootReveal
                delay={850}
                className="absolute inset-x-1/2 top-6 bottom-6 w-0.5 -translate-x-1/2 bg-foreground/30"
              />
              {experience.map((_, i) => (
                <BootReveal
                  key={i}
                  delay={900 + i * 450}
                  className="z-10 flex flex-1 items-center justify-center"
                >
                  <div className="h-3 w-3 rounded-full border-2 border-foreground/50 bg-background" />
                </BootReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
