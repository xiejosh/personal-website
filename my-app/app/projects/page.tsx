"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  type MotionValue,
} from "framer-motion";
import { HiExternalLink, HiCode } from "react-icons/hi";
import AsciiBackground from "../components/AsciiBackground";
import { Typewriter, BootReveal } from "../components/Boot";
import Terminal from "../components/Terminal";

interface Project {
  title: string;
  shortTitle: string;
  description: string;
  expandedDescription: string[];
  highlights: string[];
  stack: string[];
  link: string | null;
  linkLabel: string;
  type: "github" | "live" | "deprecated";
  hackathonWinner?: boolean;
  hue: string; // planet base color
}

const projects: Project[] = [
  {
    title: "Agentify - Mistral AI Hackathon Submission",
    shortTitle: "agentify",
    description:
      "Basically an OS-level Browser Use. Complete tasks anywhere on your system with a single prompt — the future of task automation.",
    expandedDescription: [
      "Agentify is an OS-native computer-use agent built to carry out multi-step workflows across macOS, not just inside a browser tab. It pairs screen understanding with a virtual cursor, keyboard shortcuts, typing, and guarded shell actions so a plain-language request can become a sequence of visible, verifiable actions.",
      "The current system is a Tauri desktop app with a Rust backend and React interface. It captures the active screen, adds window and application context, routes decisions through a vision model, and keeps a step history so the agent can correct missed clicks and finish longer tasks. A floating HUD, workflow recording and replay, confidence gates, and a global emergency stop make the automation observable and controllable.",
    ],
    highlights: [
      "Vision-first agent loop with screen and app-state context",
      "OS-level virtual cursor that leaves the physical pointer free",
      "Record-and-replay workflows with safety controls",
    ],
    stack: ["Tauri 2", "Rust", "React", "TypeScript", "OpenRouter"],
    link: "https://github.com/shlawgathon/agenticify",
    linkLabel: "GitHub",
    type: "github",
    hue: "#f97316",
  },
  {
    title: "Cleanly - Ocean Tech Hackathon Winner 🏆",
    shortTitle: "cleanly",
    description:
      "View and classify trash through image recognition at the click of a button! Easily plan your ocean cleanup initiatives before you even depart from shore.",
    expandedDescription: [
      "Cleanly turns annotated drone imagery into an operational map of coastal plastic pollution. It imports imagery and polygon annotations from CVAT, measures every marked trash region, converts pixels into estimated real-world area and weight, and places those results on an interactive geographic map.",
      "The project goes beyond detection by feeding the quantified cleanup data into an AI planning agent. That agent can recommend vessels, assign available people, and outline expedition logistics before a team reaches a remote shoreline. Built for Plastic Odyssey, Cleanly won Track 1 of the Ocean Tech Hackathon.",
    ],
    highlights: [
      "Pixel-to-area, weight, and geographic coordinate conversion",
      "Interactive hotspot mapping for remote cleanup sites",
      "AI-generated vessel, staffing, and expedition plans",
    ],
    stack: ["Next.js", "FastAPI", "Leaflet", "CVAT", "OpenAI", "GeoJSON"],
    link: "https://github.com/xiejosh/cleanly",
    linkLabel: "GitHub",
    type: "github",
    hackathonWinner: true,
    hue: "#34d399",
  },
  {
    title: "Friendly - Top 4 at AWS Autonomous Agents Hackathon 🏆",
    shortTitle: "friendly",
    description:
      "Automatically find friends within your close network with shared interests at a click of a button — skip the awkward conversations and get straight into deep conversations about shared passions that go deeper than \"how was your day?\".",
    expandedDescription: [
      "Friendly converts an existing Instagram network into an explorable interest graph. After syncing an account, it analyzes posts, captions, and profile information to identify what each person genuinely cares about, then surfaces people whose interests overlap.",
      "The experience combines a D3 force-directed graph with a Neo4j backend, making relationships and shared topics visible instead of burying them in a follower list. AI-generated, interest-specific icebreakers help turn each discovery into a useful first conversation. The project placed in the top four at the AWS Autonomous Agents Hackathon.",
    ],
    highlights: [
      "Interest extraction from social posts, captions, and bios",
      "Graph-based discovery of people with shared passions",
      "Personalized conversation starters for each connection",
    ],
    stack: ["Next.js", "FastAPI", "Neo4j", "D3.js", "Reka", "TypeScript"],
    link: "https://github.com/shlawgathon/friendly",
    linkLabel: "GitHub",
    type: "github",
    hackathonWinner: true,
    hue: "#f472b6",
  },
  {
    title: "Interpreter - Return of the Agents Hackathon Winner 🏆",
    shortTitle: "interpreter",
    description:
      "Audio translation everywhere and anywhere — breaking the web's language barrier by translating the audio of any tab in real-time.",
    expandedDescription: [
      "Interpreter is a live speech translation system for browser-based calls and media. A Chrome extension captures the audio from services such as Google Meet, Zoom, or Discord, streams it to a FastAPI backend, and plays translated speech back with low enough latency to keep a conversation moving.",
      "Users can listen locally or route the translated result back into a call through a virtual audio device. The surrounding web app stores language preferences and voice profiles, while the backend coordinates real-time transcription, translation, and speech generation. Interpreter won the Return of the Agents Hackathon.",
    ],
    highlights: [
      "Real-time tab-audio capture and WebSocket streaming",
      "Translated playback to speakers or a virtual microphone",
      "Voice-profile setup for more personal synthesized speech",
    ],
    stack: ["Chrome MV3", "FastAPI", "WebSockets", "Speechmatics", "Convex", "Clerk"],
    link: "https://github.com/shlawgathon/interpreter",
    linkLabel: "GitHub",
    type: "github",
    hackathonWinner: true,
    hue: "#f6c453",
  },
  {
    title: "AI Twitch Chat",
    shortTitle: "ai-twitch-chat",
    description:
      "An agent-simulated Twitch chat. Stream to tens of thousands of fans with a click of a button.",
    expandedDescription: [
      "AI Twitch Chat creates the feeling of broadcasting to a large, reactive audience without needing a real channel following. The browser app watches a shared stream and generates a fast-moving chat populated by AI viewers, giving solo creators an immediate feedback loop while they present, practice, or experiment.",
      "The project deliberately keeps the setup lightweight: it runs from a single browser page, accepts the required model and vision credentials, and starts the simulated stream experience in a few clicks. The result is equal parts streaming tool and playful exploration of synthetic online communities.",
    ],
    highlights: [
      "AI-generated viewer personas and chat reactions",
      "Screen-sharing workflow for stream-aware responses",
      "Single-page prototype with almost no setup overhead",
    ],
    stack: ["HTML", "JavaScript", "Anthropic", "Overshoot"],
    link: "https://github.com/xiejosh/ai-twitch-chat",
    linkLabel: "GitHub",
    type: "github",
    hue: "#a78bfa",
  },
  {
    title: "Hinge Match Text Responder",
    shortTitle: "hinge-responder",
    description:
      "An agent to automatically respond to your romantic interests over iMessage.",
    expandedDescription: [
      "Hinge Match Text Responder is a macOS iMessage auto-responder designed to write like its owner rather than like a generic assistant. A voice-warmup flow collects real examples, while an allowlist makes sure the system only replies to explicitly approved conversations.",
      "A local daemon reads the Messages database in read-only mode, detects new messages, asks Claude to draft a response in the learned style, and sends it through AppleScript after a configurable human-like delay. A dashboard exposes contact controls and a global enable switch, keeping an intentionally mischievous prototype bounded and reversible.",
    ],
    highlights: [
      "Personal writing-style calibration from message examples",
      "Contact allowlist and instant global disable control",
      "Local polling daemon with AppleScript delivery",
    ],
    stack: ["Node.js", "Claude", "AppleScript", "SQLite", "React"],
    link: "https://github.com/xiejosh/auto-text-responder",
    linkLabel: "GitHub",
    type: "github",
    hue: "#fb7185",
  },
  {
    title: "Rush Website",
    shortTitle: "rush-website",
    description:
      "Fully-managed rush website for Alpha Kappa Psi – Phi Chapter. Includes login, permission, deliberation features. Successful launch W26, peaking at 400 concurrent users.",
    expandedDescription: [
      "This production platform runs the recruitment workflow for the Phi Chapter of Alpha Kappa Psi at the University of Michigan. It gives prospective members a polished public experience while providing authenticated, role-aware tools for the chapter members operating rush behind the scenes.",
      "The internal product supports the difficult parts of a live recruitment cycle: controlled access, applicant review, and deliberation. It launched successfully for Winter 2026 and handled a peak of roughly 400 concurrent users, turning a time-sensitive chapter process into one managed system.",
    ],
    highlights: [
      "Authenticated, permission-aware recruitment workflows",
      "Integrated applicant review and deliberation tools",
      "Production launch supporting about 400 concurrent users",
    ],
    stack: ["Next.js", "Supabase", "Vercel", "TypeScript"],
    link: "https://akpsi-phi.com",
    linkLabel: "akpsi-phi.com",
    type: "live",
    hue: "#60a5fa",
  },
  {
    title: "Maize Entertainment",
    shortTitle: "maize-ent",
    description: "Platform for creators to share their music and videos.",
    expandedDescription: [
      "Maize Entertainment is a creator-first publishing platform for sharing original music and video. It brings different media formats into one destination so artists can present their work as a connected catalog instead of scattering releases across unrelated profiles.",
      "The project stays focused on the essential loop between publishing and discovery: creators get a dedicated home for their releases, and audiences get a direct way to browse and experience new work across multiple formats.",
    ],
    highlights: [
      "Unified home for independent music and video",
      "Creator-oriented publishing and presentation",
      "Audience discovery across multiple media formats",
    ],
    stack: ["React.js", "AWS"],
    link: "https://maizeentertainment.com",
    linkLabel: "maizeentertainment.com",
    type: "live",
    hue: "#facc15",
  },
  {
    title: "Personal Website",
    shortTitle: "personal-website",
    description:
      "This website! Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
    expandedDescription: [
      "This personal site is an interactive portfolio shaped like a terminal drifting through space. It combines a command-line visual language, boot-sequence type effects, animated ASCII scenery, and a small solar system of projects to make exploring the work feel more like operating a small system than reading a résumé.",
      "Underneath the presentation is a responsive Next.js application with reusable terminal, navigation, motion, and background components. The project is also the place where the visual system is continually tested: restrained color, monospace typography, progressive animation, keyboard-friendly controls, and reduced-motion support all meet here.",
    ],
    highlights: [
      "Interactive solar-system project browser",
      "Reusable terminal and boot-sequence components",
      "Responsive design with reduced-motion support",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/xiejosh/personal-website",
    linkLabel: "GitHub",
    type: "github",
    hue: "#818cf8",
  },
  {
    title: "Roci AI",
    shortTitle: "roci-ai",
    description:
      "End-to-end integratable RAG system for intelligent document retrieval and question answering.",
    expandedDescription: [
      "Roci AI is an end-to-end document retrieval platform that answers natural-language questions using a private body of uploaded material. Instead of forcing users to remember filenames or manually search long documents, it retrieves relevant passages and uses them as context for a focused response.",
      "The hackathon prototype built the retrieval pipeline from scratch around Llama 3.2 running locally through Ollama, covering document parsing, chunking, vector embeddings, retrieval, and response generation. The first version deliberately concentrated on reliable plain-text ingestion, establishing a functional local RAG foundation that could later grow to more file formats.",
    ],
    highlights: [
      "Natural-language search over uploaded documents",
      "From-scratch embedding and retrieval pipeline",
      "Local model execution with a conversational interface",
    ],
    stack: ["Llama 3.2", "Ollama", "RAG", "Vector embeddings", "Document parsing"],
    link: "https://devpost.com/software/roci-ai",
    linkLabel: "Devpost",
    type: "live",
    hue: "#2dd4bf",
  },
  {
    title: "Competition Autograder",
    shortTitle: "autograder",
    description:
      "Autograder for coding competitions. Automated test case evaluation and scoring.",
    expandedDescription: [
      "Competition Autograder was built to remove manual result-checking from programming contests. It runs submissions against a defined test suite, evaluates the outputs consistently, and turns the results into scores that organizers can use immediately.",
      "It centers on a dependable judging loop: accept code, execute test cases, capture pass and failure outcomes, and calculate standings without hand-grading every submission. The result is faster feedback for competitors and a repeatable scoring process for organizers.",
    ],
    highlights: [
      "Automated execution against competition test cases",
      "Consistent pass, failure, and scoring results",
      "Reduced manual work for contest organizers",
    ],
    stack: ["JUnit", "gtest", "React.js", "PHP", "Java", "C++"],
    link: null,
    linkLabel: "Repository deprecated",
    type: "deprecated",
    hue: "#94a3b8",
  },
];

// ── Solar system layout ──
// Orbits are spaced evenly between OUTER and INNER radii, so adding or
// removing projects reflows the system instead of breaking it. Planets drift
// along their orbits (inner ones faster, Kepler-style) and hold still while a
// project is open so the zoom origin stays true.
const ORBIT_CENTER = { x: 54, y: 49 };
const OUTER_ORBIT_RADIUS = 45;
const INNER_ORBIT_RADIUS = 13;
const ORBIT_TILT = 0.52;
const GOLDEN_ANGLE = 137.5;
const OUTER_ORBIT_PERIOD_MS = 320_000;
const WINNER_GOLD = "#f6c453";

interface Orbit {
  radiusX: number;
  radiusY: number;
  baseAngle: number;
  speed: number; // radians per ms
}

const orbits: Orbit[] = projects.map((_, i) => {
  const t = projects.length > 1 ? i / (projects.length - 1) : 0;
  const radiusX = OUTER_ORBIT_RADIUS - t * (OUTER_ORBIT_RADIUS - INNER_ORBIT_RADIUS);
  return {
    radiusX,
    radiusY: radiusX * ORBIT_TILT,
    baseAngle: ((-20 + i * GOLDEN_ANGLE) * Math.PI) / 180,
    speed:
      ((2 * Math.PI) / OUTER_ORBIT_PERIOD_MS) *
      Math.pow(OUTER_ORBIT_RADIUS / radiusX, 0.8),
  };
});

function orbitPoint(orbit: Orbit, clockMs: number) {
  const angle = orbit.baseAngle + clockMs * orbit.speed;
  return {
    x: ORBIT_CENTER.x + Math.cos(angle) * orbit.radiusX,
    y: ORBIT_CENTER.y + Math.sin(angle) * orbit.radiusY,
  };
}

type PanelMode = "normal" | "minimized" | "maximized";

function Planet({ color, size = 150 }: { color: string; size?: number | string }) {
  return (
    <div
      className="shrink-0 rounded-full"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        background: `
          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35) 0%, transparent 42%),
          radial-gradient(circle at 50% 50%, ${color} 0%, color-mix(in srgb, ${color} 40%, #000) 70%, #05050a 100%)
        `,
        boxShadow: `inset -10px -8px 24px rgba(0,0,0,0.6), 0 0 40px ${color}55, 0 0 90px ${color}30`,
      }}
    />
  );
}

function OrbitPlanet({
  project,
  index,
  clock,
  dimmed,
  focusHidden,
  onSelect,
  buttonRef,
}: {
  project: Project;
  index: number;
  clock: MotionValue<number>;
  dimmed: boolean;
  focusHidden: boolean;
  onSelect: (index: number) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  const orbit = orbits[index];
  const left = useTransform(clock, (c) => `${orbitPoint(orbit, c).x}%`);
  const top = useTransform(clock, (c) => `${orbitPoint(orbit, c).y}%`);
  const size = 12 + ((index * 7) % 3) * 2.5;

  return (
    <motion.div
      className={`absolute transition-opacity duration-500 ${dimmed ? "opacity-0" : ""}`}
      style={{ left, top, x: "-50%", y: "-50%" }}
    >
      <BootReveal delay={900 + index * 120}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Open ${project.title}`}
          tabIndex={focusHidden ? -1 : 0}
          className="group flex flex-col items-center gap-1.5 p-1"
        >
          <span className="relative block" style={{ width: size, height: size }}>
            <span
              className="block h-full w-full rounded-full transition-transform duration-200 group-hover:scale-125"
              style={{
                background: `radial-gradient(circle at 32% 30%, rgba(255,255,255,0.7) 0%, ${project.hue} 38%, color-mix(in srgb, ${project.hue} 45%, #000) 100%)`,
                boxShadow: `0 0 10px ${project.hue}cc, 0 0 26px ${project.hue}55`,
              }}
            />
            {project.hackathonWinner && (
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 rounded-[50%] border"
                style={{
                  width: size * 2.4,
                  height: size * 0.95,
                  borderColor: `${WINNER_GOLD}cc`,
                  transform: "translate(-50%, -50%) rotate(-24deg)",
                  boxShadow: `0 0 8px ${WINNER_GOLD}59`,
                }}
              />
            )}
          </span>
          <span
            className="whitespace-nowrap text-[10px] leading-none transition-colors group-hover:text-foreground"
            style={{ color: project.hackathonWinner ? `${WINNER_GOLD}cc` : undefined }}
          >
            <span className={project.hackathonWinner ? "" : "text-muted"}>
              {project.shortTitle}
            </span>
          </span>
        </button>
      </BootReveal>
    </motion.div>
  );
}

function TrafficLight({
  color,
  glyph,
  label,
  pressed,
  onClick,
}: {
  color: string;
  glyph: string;
  label: string;
  pressed?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className="group grid h-4 w-4 place-items-center rounded-full text-[10px] font-bold leading-none text-black/70 outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{ backgroundColor: color }}
    >
      <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {glyph}
      </span>
    </button>
  );
}

function ProjectLink({ project }: { project: Project }) {
  return project.link ? (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-accent/60 bg-accent/10 px-4 py-2 text-xs font-medium text-accent transition-all hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span aria-hidden>[</span>
      {project.type === "github" ? <HiCode size={14} /> : <HiExternalLink size={14} />}
      {project.linkLabel}
      <span aria-hidden>]</span>
    </a>
  ) : (
    <span className="text-xs italic text-muted">{project.linkLabel}</span>
  );
}

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  const [panelMode, setPanelMode] = useState<PanelMode>("normal");
  const [origin, setOrigin] = useState("50% 50%");
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);

  const clock = useMotionValue(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const starRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastSelectedRef = useRef<number | null>(null);

  const isProjectFocused = selected !== null && panelMode !== "minimized";

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || selected !== null) return;
    clock.set(clock.get() + delta);
  });

  const select = (i: number) => {
    const point = orbitPoint(orbits[i], clock.get());
    setOrigin(`${point.x}% ${point.y}%`);
    setPanelMode("normal");
    setSelected(i);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Move focus into the dialog on open, and back to the planet on close.
  useEffect(() => {
    if (selected !== null) {
      lastSelectedRef.current = selected;
      panelRef.current?.focus();
    } else if (lastSelectedRef.current !== null) {
      starRefs.current[lastSelectedRef.current]?.focus();
    }
  }, [selected]);

  const current = selected === null ? null : projects[selected];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden md:h-[calc(100vh-4rem)]">
      <AsciiBackground showCompanies={false} />

      {/* ── Solar system (md+) ── */}
      <div
        className={`absolute inset-0 hidden md:block ${isProjectFocused ? "pointer-events-none" : ""}`}
      >
        <motion.div
          className="h-full w-full"
          style={{ transformOrigin: origin }}
          animate={{ scale: isProjectFocused ? 2.6 : 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            ease: [0.3, 0.7, 0.2, 1],
          }}
        >
          {/* The sun */}
          <div
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${isProjectFocused ? "opacity-0" : ""}`}
            style={{ left: `${ORBIT_CENTER.x}%`, top: `${ORBIT_CENTER.y}%` }}
          >
            <BootReveal delay={650}>
              <div
                className="relative grid h-7 w-7 place-items-center rounded-full bg-[#fff7cf] shadow-[0_0_14px_rgba(255,247,207,1),0_0_38px_rgba(246,196,83,0.85),0_0_80px_rgba(249,115,22,0.4)]"
                aria-hidden="true"
              >
                <span className="absolute inset-0 rounded-full bg-[#f6c453]/30 motion-safe:animate-ping motion-safe:[animation-duration:5s]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
              </div>
            </BootReveal>
          </div>

          {/* Planets */}
          {projects.map((project, i) => (
            <OrbitPlanet
              key={project.title}
              project={project}
              index={i}
              clock={clock}
              dimmed={isProjectFocused && selected !== i}
              focusHidden={isProjectFocused}
              onSelect={select}
              buttonRef={(el) => {
                starRefs.current[i] = el;
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Header overlay (md+) ── */}
      <div className="pointer-events-none absolute left-[max(1rem,2vw)] top-6 z-20 hidden md:block">
        <p className="mb-2 text-sm text-accent">
          <Typewriter text="$ open solar-system" delay={100} />
        </p>
        <h1 className="mb-1 text-3xl font-bold">
          <Typewriter text="projects" delay={600} />
        </h1>
        <p className="text-xs text-muted">
          <Typewriter text="> click a planet to dock" delay={1100} />
        </p>
      </div>

      {/* ── Terminal overlay (md+) ── */}
      <BootReveal
        delay={2400}
        className="absolute bottom-5 left-[max(1rem,2vw)] z-20 hidden w-[24rem] max-w-[40vw] md:block"
      >
        <Terminal />
      </BootReveal>

      {/* ── Planet panel ── */}
      <AnimatePresence>
        {current && panelMode !== "minimized" && (
          <motion.button
            key="panel-backdrop"
            type="button"
            aria-label="Close project view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="absolute inset-0 z-30 hidden cursor-default bg-background/20 backdrop-blur-[1px] md:block"
            onClick={() => setSelected(null)}
          />
        )}
        {current && (
          <motion.div
            key="panel"
            ref={panelRef}
            tabIndex={-1}
            layout={!prefersReducedMotion}
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: prefersReducedMotion ? 0 : 80 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.42,
              ease: [0.3, 0.7, 0.2, 1],
            }}
            role="dialog"
            aria-modal={panelMode !== "minimized"}
            aria-label={`${current.title} project details`}
            className={`absolute z-40 hidden overflow-hidden border border-card-border bg-background/95 shadow-2xl shadow-black/40 outline-none backdrop-blur-xl md:flex md:flex-col ${
              panelMode === "maximized"
                ? "inset-0 rounded-none"
                : panelMode === "minimized"
                  ? "right-5 top-5 max-h-[calc(100%-2.5rem)] w-[min(24rem,calc(100%-2.5rem))] rounded-xl"
                  : "inset-y-0 right-0 w-[min(58vw,58rem)] rounded-l-2xl"
            }`}
          >
            <div className="flex shrink-0 items-center gap-2 border-b border-card-border bg-card-bg/60 px-4 py-3">
              <TrafficLight
                color="#ff5f56"
                glyph="×"
                label="Close project and return to solar system"
                onClick={() => setSelected(null)}
              />
              <TrafficLight
                color="#ffbd2e"
                glyph="−"
                label={panelMode === "minimized" ? "Restore project panel" : "Minimize project panel"}
                pressed={panelMode === "minimized"}
                onClick={() =>
                  setPanelMode((mode) => (mode === "minimized" ? "normal" : "minimized"))
                }
              />
              <TrafficLight
                color="#27c93f"
                glyph="+"
                label={panelMode === "maximized" ? "Restore project panel" : "Maximize project panel"}
                pressed={panelMode === "maximized"}
                onClick={() =>
                  setPanelMode((mode) => (mode === "maximized" ? "normal" : "maximized"))
                }
              />
              <span className="ml-2 min-w-0 truncate text-xs text-muted">
                ~/projects/{current.shortTitle}
              </span>
              <span className="ml-auto hidden text-[10px] uppercase tracking-[0.18em] text-muted/60 lg:block">
                {panelMode}
              </span>
            </div>

            {panelMode === "minimized" ? (
              <div className="overflow-y-auto p-5">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-accent">
                  project signal
                </p>
                <h2 className="mb-2 text-sm font-semibold leading-snug">{current.title}</h2>
                <p className="mb-4 text-xs leading-relaxed text-muted">{current.description}</p>
                <ProjectLink project={current} />
              </div>
            ) : panelMode === "maximized" ? (
              <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(18rem,0.8fr)_minmax(28rem,1.2fr)]">
                <div className="relative grid min-h-[20rem] place-items-center overflow-hidden border-b border-card-border p-10 lg:min-h-0 lg:border-b-0 lg:border-r">
                  <div
                    className="absolute inset-0 opacity-20"
                    aria-hidden="true"
                    style={{
                      background: `radial-gradient(circle at center, ${current.hue}55, transparent 58%)`,
                    }}
                  />
                  <Planet color={current.hue} size="clamp(14rem, 26vw, 24rem)" />
                  <span className="absolute bottom-6 text-[10px] uppercase tracking-[0.3em] text-muted/60">
                    orbital object {String((selected ?? 0) + 1).padStart(2, "0")}
                  </span>
                </div>

                <article className="flex min-w-0 flex-col justify-center p-8 lg:p-12 xl:p-16">
                  <p className="mb-3 text-xs uppercase tracking-[0.22em] text-accent">
                    expanded project log
                  </p>
                  <h2 className="mb-6 text-2xl font-semibold leading-tight xl:text-4xl">
                    {current.title}
                  </h2>
                  <div className="space-y-4 text-sm leading-7 text-muted xl:text-base">
                    {current.expandedDescription.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-8 xl:grid-cols-2">
                    <section>
                      <h3 className="mb-3 text-xs uppercase tracking-[0.18em] text-foreground">
                        system highlights
                      </h3>
                      <ul className="space-y-2 text-xs leading-relaxed text-muted">
                        {current.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2">
                            <span className="text-accent" aria-hidden>
                              &gt;
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <h3 className="mb-3 text-xs uppercase tracking-[0.18em] text-foreground">
                        stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {current.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded border border-card-border bg-card-bg/60 px-2.5 py-1 text-[11px] text-muted"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="mt-9 flex items-center gap-5">
                    <ProjectLink project={current} />
                    <span className="text-[10px] text-muted/60">esc to fly back</span>
                  </div>
                </article>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-10 overflow-y-auto p-8 text-center xl:p-14">
                <div className="relative grid place-items-center">
                  <div
                    className="absolute h-[150%] w-[150%] rounded-full opacity-30 blur-3xl"
                    aria-hidden="true"
                    style={{ backgroundColor: current.hue }}
                  />
                  <Planet color={current.hue} size="clamp(12rem, 22vw, 19rem)" />
                </div>
                <div className="relative max-w-2xl">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-accent">
                    project acquired
                  </p>
                  <h2 className="mb-4 text-xl font-semibold leading-tight xl:text-3xl">
                    {current.title}
                  </h2>
                  <p className="mx-auto mb-6 max-w-xl text-sm leading-7 text-muted">
                    {current.description}
                  </p>
                  <ProjectLink project={current} />
                  <p className="mt-5 text-[10px] text-muted/60">
                    green to expand · yellow to dock · esc to fly back
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile fallback: expandable list ── */}
      <div className="relative z-10 px-[max(1rem,2vw)] py-10 md:hidden">
        <p className="mb-4 text-sm text-accent">
          <Typewriter text="$ ls ~/projects" delay={100} />
        </p>
        <h1 className="mb-8 text-3xl font-bold">
          <Typewriter text="projects" delay={600} />
        </h1>
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => {
            const open = mobileOpen === i;
            return (
              <BootReveal key={project.title} delay={1000 + i * 100}>
                <div
                  className={`rounded-lg border bg-card-bg/70 p-5 backdrop-blur-sm ${
                    project.hackathonWinner ? "border-[#f6c453]/40" : "border-card-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setMobileOpen(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-start justify-between gap-3 text-left"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        aria-hidden="true"
                        style={{
                          backgroundColor: project.hue,
                          boxShadow: `0 0 8px ${project.hue}aa`,
                        }}
                      />
                      <h2 className="text-base font-semibold leading-snug">{project.title}</h2>
                    </span>
                    <span className="mt-0.5 shrink-0 text-accent" aria-hidden>
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  <p className="mb-3 mt-3 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  {open && (
                    <div className="mb-4 space-y-4">
                      <div className="space-y-3 text-sm leading-relaxed text-muted">
                        {project.expandedDescription.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      <ul className="space-y-1.5 text-xs leading-relaxed text-muted">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2">
                            <span className="text-accent" aria-hidden>
                              &gt;
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded border border-card-border bg-card-bg/60 px-2.5 py-1 text-[11px] text-muted"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <ProjectLink project={project} />
                </div>
              </BootReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
