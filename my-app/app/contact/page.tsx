"use client";

import { useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail, HiBriefcase } from "react-icons/hi";
import AsciiBackground, {
  type AsciiBackgroundHandle,
} from "../components/AsciiBackground";
import { Typewriter, BootReveal } from "../components/Boot";
import Terminal from "../components/Terminal";

interface Contact {
  label: string;
  value: string;
  href: string;
  icon: IconType;
  description: string;
  action: "copy" | "link";
  size: number; // asteroid diameter (px)
  pos: { left: string; top: string }; // % position in the belt (md+)
  blob: string; // irregular border-radius
  tilt: number; // float-animation rotation (deg)
}

const contacts: Contact[] = [
  {
    label: "Personal Email",
    value: "joshxie03@gmail.com",
    href: "mailto:joshxie03@gmail.com",
    icon: HiMail,
    description: "For general inquiries",
    action: "copy",
    size: 190,
    pos: { left: "40%", top: "34%" },
    blob: "58% 42% 55% 45% / 48% 60% 40% 52%",
    tilt: 2,
  },
  {
    label: "Business Email",
    value: "josh.xie@shopify.com",
    href: "mailto:josh.xie@shopify.com",
    icon: HiBriefcase,
    description: "For professional & business inquiries",
    action: "copy",
    size: 200,
    pos: { left: "64%", top: "22%" },
    blob: "45% 55% 48% 52% / 55% 42% 58% 45%",
    tilt: -2.4,
  },
  {
    label: "GitHub",
    value: "xiejosh",
    href: "https://github.com/xiejosh",
    icon: FaGithub,
    description: "Check out my projects",
    action: "link",
    size: 168,
    pos: { left: "79%", top: "58%" },
    blob: "52% 48% 60% 40% / 45% 55% 42% 58%",
    tilt: 2.2,
  },
  {
    label: "LinkedIn",
    value: "josh-xie",
    href: "https://www.linkedin.com/in/josh-xie/",
    icon: FaLinkedin,
    description: "Let's connect",
    action: "link",
    size: 176,
    pos: { left: "51%", top: "66%" },
    blob: "42% 58% 45% 55% / 60% 44% 56% 40%",
    tilt: -1.8,
  },
];

// Cratered rock surface: a highlight, three crater shadows, and a dark core falloff.
function rockStyle(contact: Contact): CSSProperties {
  return {
    width: contact.size,
    height: contact.size,
    borderRadius: contact.blob,
    background: `
      radial-gradient(circle at 30% 26%, rgba(255,255,255,0.16), transparent 42%),
      radial-gradient(circle at 26% 64%, rgba(0,0,0,0.42) 0%, transparent 22%),
      radial-gradient(circle at 68% 30%, rgba(0,0,0,0.36) 0%, transparent 16%),
      radial-gradient(circle at 62% 76%, rgba(0,0,0,0.4) 0%, transparent 26%),
      radial-gradient(circle at 50% 50%, #3a3a4e 0%, #272736 58%, #171721 100%)
    `,
    boxShadow:
      "inset -16px -12px 34px rgba(0,0,0,0.65), inset 8px 10px 22px rgba(255,255,255,0.05)",
  };
}

function AsteroidBody({ contact, copied = false }: { contact: Contact; copied?: boolean }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 shadow-[0_0_45px_rgba(99,102,241,0.45)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <contact.icon
        size={24}
        className="mb-2 text-muted transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted">
        {contact.label}
      </span>
      <span className="mt-1 break-all px-5 text-xs font-medium text-muted">
        {contact.value}
      </span>
      <span
        className={`mt-2 text-[10px] text-muted transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }`}
      >
        {copied ? "✓ copied!" : contact.action === "copy" ? "[ click to copy ]" : "[ open ]"}
      </span>
    </>
  );
}

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const bgRef = useRef<AsciiBackgroundHandle>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null); // label of the just-copied contact
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show a status message in the header, fading it out after a few seconds
  const flash = (msg: string) => {
    setStatus(msg);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(null), 3000);
  };

  // Sonar ping on the background grid, centered behind the hovered asteroid
  const ping = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    bgRef.current?.ping(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  const copy = async (contact: Contact) => {
    try {
      await navigator.clipboard.writeText(contact.value);
      flash(`✓ copied ${contact.value} to clipboard`);
      setCopied(contact.label);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      flash("> clipboard unavailable — opening mail client...");
      window.location.assign(contact.href);
    }
  };

  const statusLine = (
    <p aria-live="polite" className="relative h-4 text-xs text-muted">
      <AnimatePresence>
        {status && (
          <motion.span
            key={status}
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="absolute left-0 top-0 whitespace-nowrap"
          >
            {status}
          </motion.span>
        )}
      </AnimatePresence>
    </p>
  );

  const asteroidClass =
    "group relative flex flex-col items-center justify-center border border-card-border text-center outline-none transition-transform duration-300 hover:scale-105 focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden md:h-[calc(100vh-4rem)]">
      <AsciiBackground ref={bgRef} showCompanies={false} asteroids />

      {/* ── Asteroid belt (md+) ── */}
      <div className="absolute inset-0 hidden md:block">
        {contacts.map((contact, i) => (
          <div
            key={contact.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={contact.pos}
          >
            <BootReveal delay={1500 + i * 200}>
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -10, 0], rotate: [0, contact.tilt, 0] }
                }
                transition={{ duration: 7 + i * 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                {contact.action === "copy" ? (
                  <button
                    type="button"
                    onClick={() => copy(contact)}
                    onMouseEnter={(e) => ping(e.currentTarget)}
                    onFocus={(e) => ping(e.currentTarget)}
                    aria-label={`Copy ${contact.label.toLowerCase()} ${contact.value} to clipboard`}
                    className={asteroidClass}
                    style={rockStyle(contact)}
                  >
                    <AsteroidBody contact={contact} copied={copied === contact.label} />
                  </button>
                ) : (
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => flash(`> opening ${contact.label.toLowerCase()}...`)}
                    onMouseEnter={(e) => ping(e.currentTarget)}
                    onFocus={(e) => ping(e.currentTarget)}
                    aria-label={`Open ${contact.label}`}
                    className={asteroidClass}
                    style={rockStyle(contact)}
                  >
                    <AsteroidBody contact={contact} />
                  </a>
                )}
              </motion.div>
            </BootReveal>
          </div>
        ))}
      </div>

      {/* ── Header overlay (md+) ── */}
      <div className="pointer-events-none absolute left-[max(1rem,2vw)] top-6 z-20 hidden md:block">
        <p className="mb-2 text-sm text-accent">
          <Typewriter text="$ ./contact.sh --scan" delay={100} />
        </p>
        <h1 className="mb-1 text-3xl font-bold">
          <Typewriter text="get in touch" delay={600} />
        </h1>
        <p className="mb-2 text-xs text-muted">
          <Typewriter text="> 4 channels found in the asteroid belt" delay={1100} />
        </p>
        {statusLine}
      </div>

      {/* ── Terminal overlay (md+) ── */}
      <BootReveal
        delay={2400}
        className="absolute bottom-5 left-[max(1rem,2vw)] z-20 hidden w-[24rem] max-w-[40vw] md:block"
      >
        <Terminal />
      </BootReveal>

      {/* ── Mobile fallback: card list ── */}
      <div className="relative z-10 px-[max(1rem,2vw)] py-10 md:hidden">
        <p className="mb-4 text-sm text-accent">
          <Typewriter text="$ ./contact.sh" delay={100} />
        </p>
        <h1 className="mb-2 text-3xl font-bold">
          <Typewriter text="get in touch" delay={600} />
        </h1>
        <div className="mb-8">{statusLine}</div>
        <div className="flex flex-col gap-4">
          {contacts.map((contact, i) => {
            const inner = (
              <>
                <div className="rounded-md bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
                  <contact.icon size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted">{contact.label}</p>
                  <p className="font-medium transition-colors group-hover:text-accent">
                    {contact.value}
                  </p>
                  <p className="mt-1 text-xs text-muted">{contact.description}</p>
                </div>
              </>
            );
            const cardClass =
              "group flex w-full items-start gap-4 rounded-lg border border-card-border bg-card-bg/70 p-5 text-left backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5";
            return (
              <BootReveal key={contact.label} delay={1200 + i * 150}>
                {contact.action === "copy" ? (
                  <button
                    type="button"
                    onClick={() => copy(contact)}
                    aria-label={`Copy ${contact.label.toLowerCase()} ${contact.value} to clipboard`}
                    className={cardClass}
                  >
                    {inner}
                  </button>
                ) : (
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {inner}
                  </a>
                )}
              </BootReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
