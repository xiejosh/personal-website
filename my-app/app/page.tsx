"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { SiShopify } from "react-icons/si";
import { IconType } from "react-icons";
import CareerConstellations from "./components/CareerConstellations";
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

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

function Explosion({ x, y, onComplete }: { x: number; y: number; onComplete: () => void }) {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 30) + (Math.random() * 20 - 10),
      distance: 40 + Math.random() * 60,
      size: 2 + Math.random() * 4,
      color: ["#fff", "#fbbf24", "#f97316", "#ef4444", "#a78bfa"][Math.floor(Math.random() * 5)],
    }))
  );

  return (
    <div className="pointer-events-none fixed z-50" style={{ left: x, top: y }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 6px ${p.color}, 0 0 12px ${p.color}`,
            left: -p.size / 2,
            top: -p.size / 2,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={p.id === 0 ? onComplete : undefined}
        />
      ))}
      {/* Flash */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 20,
          height: 20,
          left: -10,
          top: -10,
          background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(251,191,36,0.4) 50%, transparent 70%)",
        }}
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

function ShootingStar({ delay, startX }: { delay: number; startX: string }) {
  const [exploded, setExploded] = useState(false);
  const [repeatDelay] = useState(() => 2 + Math.random() * 4);
  const [explosionPos, setExplosionPos] = useState<{ x: number; y: number } | null>(null);
  const [cycleKey, setCycleKey] = useState(0);

  const handleHover = useCallback((e: React.MouseEvent) => {
    if (exploded) return;
    setExploded(true);
    setExplosionPos({ x: e.clientX, y: e.clientY });
  }, [exploded]);

  const handleExplosionComplete = useCallback(() => {
    setExplosionPos(null);
    // Respawn the shooting star after a short delay
    setTimeout(() => {
      setExploded(false);
      setCycleKey((k) => k + 1);
    }, 1500);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!exploded && (
          <motion.div
            key={cycleKey}
            className="absolute cursor-crosshair"
            style={{
              left: startX,
              top: "-20px",
              rotate: "135deg",
              padding: "10px",
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: "-100vw",
              y: "100vh",
              opacity: [0, 0.6, 0.6, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 4,
              delay: cycleKey === 0 ? delay : 0,
              repeat: Infinity,
              repeatDelay,
              ease: "easeIn",
            }}
            onMouseEnter={handleHover}
          >
            {/* Head */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 6,
                height: 6,
                background: "rgba(255,255,255,0.7)",
                boxShadow: "0 0 6px rgba(255,255,255,0.5), 0 0 12px rgba(255,255,255,0.2)",
              }}
            />
            {/* Tail */}
            <div
              style={{
                width: "160px",
                height: "2px",
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0.6) 100%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {explosionPos && (
        <Explosion x={explosionPos.x} y={explosionPos.y} onComplete={handleExplosionComplete} />
      )}
    </>
  );
}

const SQUARE_REPULSE_RADIUS = 180;
const SQUARE_REPULSE_MAX = 9;

function NeonSquare({
  delay,
  x,
  y,
  size,
  color,
  cursorX,
  cursorY,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
  color: string;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [popped, setPopped] = useState(false);
  const [explosionPos, setExplosionPos] = useState<{ x: number; y: number } | null>(null);
  const [floatDurations] = useState(() => [
    5 + Math.random() * 2,
    5 + Math.random() * 2,
    5 + Math.random() * 2,
  ]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      centerRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  const repulse = (cx: number, cy: number, axis: "x" | "y") => {
    const center = centerRef.current;
    if (!center || prefersReducedMotion) return 0;
    const dx = center.x - cx;
    const dy = center.y - cy;
    const dist = Math.hypot(dx, dy);
    if (dist === 0 || dist > SQUARE_REPULSE_RADIUS) return 0;
    const strength = SQUARE_REPULSE_MAX * (1 - dist / SQUARE_REPULSE_RADIUS);
    return ((axis === "x" ? dx : dy) / dist) * strength;
  };

  const springConfig = { stiffness: 30, damping: 24 };
  const offsetX = useSpring(
    useTransform([cursorX, cursorY], (latest: number[]) => repulse(latest[0], latest[1], "x")),
    springConfig
  );
  const offsetY = useSpring(
    useTransform([cursorX, cursorY], (latest: number[]) => repulse(latest[0], latest[1], "y")),
    springConfig
  );

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (popped) return;
    setPopped(true);
    setExplosionPos({ x: e.clientX, y: e.clientY });
  }, [popped]);

  const handleExplosionComplete = useCallback(() => {
    setExplosionPos(null);
    setTimeout(() => setPopped(false), 2000);
  }, []);

  return (
    <>
      <motion.div
        ref={wrapperRef}
        className="absolute z-20"
        style={{ left: x, top: y, width: size, height: size, x: offsetX, y: offsetY }}
      >
        <AnimatePresence>
          {!popped && (
            <motion.div
              className="cursor-pointer rounded-md"
              style={{
                width: size,
                height: size,
                border: `1.5px solid ${color}`,
                boxShadow: `0 0 8px ${color}, inset 0 0 4px ${color}`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                y: [0, -15, 0],
                rotate: [0, 8, -8, 0],
                opacity: [0.15, 0.35, 0.15],
              }}
              whileHover={{
                opacity: 1,
                scale: 1.15,
                boxShadow: `0 0 24px ${color}, inset 0 0 10px ${color}`,
                transition: { duration: 0.2 },
              }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{
                scale: { duration: 0.6, ease: "easeOut" },
                opacity: { duration: floatDurations[0], delay, repeat: Infinity, ease: "easeInOut" },
                y: { duration: floatDurations[1], delay, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: floatDurations[2], delay, repeat: Infinity, ease: "easeInOut" },
              }}
              onClick={handleClick}
            />
          )}
        </AnimatePresence>
      </motion.div>
      {explosionPos && (
        <Explosion x={explosionPos.x} y={explosionPos.y} onComplete={handleExplosionComplete} />
      )}
    </>
  );
}

const neonSquares = [
  { delay: 0, x: "5%", y: "15%", size: 24, color: "rgba(99,102,241,0.4)" },
  { delay: 1.2, x: "15%", y: "70%", size: 18, color: "rgba(139,92,246,0.35)" },
  { delay: 0.6, x: "30%", y: "8%", size: 14, color: "rgba(167,139,250,0.3)" },
  { delay: 2, x: "50%", y: "75%", size: 20, color: "rgba(99,102,241,0.35)" },
  { delay: 0.3, x: "70%", y: "12%", size: 22, color: "rgba(139,92,246,0.4)" },
  { delay: 1.8, x: "85%", y: "55%", size: 16, color: "rgba(167,139,250,0.35)" },
  { delay: 2.5, x: "92%", y: "20%", size: 12, color: "rgba(99,102,241,0.3)" },
  { delay: 1, x: "42%", y: "40%", size: 10, color: "rgba(139,92,246,0.25)" },
  { delay: 3, x: "78%", y: "80%", size: 26, color: "rgba(167,139,250,0.3)" },
  { delay: 0.8, x: "8%", y: "45%", size: 16, color: "rgba(99,102,241,0.3)" },
  // Large colored squares
  { delay: 0, x: "8%", y: "18%", size: 80, color: "rgba(250,204,21,0.35)" },
  { delay: 1.5, x: "55%", y: "65%", size: 120, color: "rgba(74,222,128,0.3)" },
  { delay: 0.8, x: "78%", y: "10%", size: 60, color: "rgba(248,113,113,0.35)" },
];

export default function Home() {
  // Card hover and constellation hover are tracked separately so cursor movement over
  // the background never clears a highlight owned by the experience cards (and vice versa)
  const [cardCompany, setCardCompany] = useState<string | null>(null);
  const [constellationCompany, setConstellationCompany] = useState<string | null>(null);
  const activeCompany = cardCompany ?? constellationCompany;

  const cursorX = useMotionValue(-9999);
  const cursorY = useMotionValue(-9999);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleLeave = () => {
      cursorX.set(-9999);
      cursorY.set(-9999);
    };
    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-[max(1rem,2vw)]">
      <CareerConstellations activeCompany={activeCompany} onCompanyHover={setConstellationCompany} />

      {/* Neon squares */}
      {neonSquares.map((sq, i) => (
        <NeonSquare key={i} {...sq} cursorX={cursorX} cursorY={cursorY} />
      ))}
      {/* Shooting stars */}
      <ShootingStar delay={0} startX="30%" />
      <ShootingStar delay={1.5} startX="70%" />
      <ShootingStar delay={3} startX="50%" />
      <ShootingStar delay={4.5} startX="85%" />
      <ShootingStar delay={6} startX="20%" />
      <ShootingStar delay={7.5} startX="60%" />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent-secondary/5 blur-3xl" />

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
