"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const HELP = [
  "available commands:",
  "  help          show this list",
  "  whoami        who is this guy?",
  "  ls            list pages",
  "  cd <page>     go to a page (about, projects, contact)",
  "  experience    print experience.log",
  "  clear         clear the terminal",
];

const EXPERIENCE_LINES = [
  "[jul 2026 – present]  applied ml engineer @ shopify",
  "[jul 2026 – present]  founder @ stealth startup",
  "[nov 2025 – apr 2026] founder/ceo @ autodb",
  "[may 2025 – aug 2025] sde intern @ amazon",
  "[jun 2024 – sep 2024] sde intern @ amazon",
  "[may 2023 – aug 2023] swe intern @ microsoft",
];

const PAGES = ["about", "projects", "contact"];

interface Line {
  text: string;
  kind: "cmd" | "out";
}

export default function Terminal() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([
    { text: "type 'help' to get started", kind: "out" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the newest line in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Typing anywhere on the page routes the keystroke into the terminal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      )
        return;
      e.preventDefault();
      inputRef.current?.focus();
      setInput((v) => v + e.key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const [name, ...args] = cmd.split(/\s+/);
    let out: string[];
    switch (name.toLowerCase()) {
      case "":
        out = [];
        break;
      case "help":
        out = HELP;
        break;
      case "whoami":
        out = ["josh xie — applied ml engineer @ shopify, building things for fun"];
        break;
      case "ls":
        out = ["about/  projects/  contact/  experience.log"];
        break;
      case "experience":
        out = EXPERIENCE_LINES;
        break;
      case "cat":
        out =
          args[0] === "experience.log"
            ? EXPERIENCE_LINES
            : [`cat: ${args[0] ?? ""}: no such file`];
        break;
      case "cd": {
        const dest = (args[0] ?? "").replace(/^~?\//, "").replace(/\/$/, "");
        if (PAGES.includes(dest)) {
          out = [`navigating to ~/${dest} ...`];
          router.push(`/${dest}`);
        } else if (dest === "" || dest === "~" || dest === "home") {
          out = ["already home"];
        } else {
          out = [`cd: no such directory: ${dest}`];
        }
        break;
      }
      case "sudo":
        out = ["nice try."];
        break;
      case "clear":
        setLines([]);
        return;
      default:
        out = [`command not found: ${name} — try 'help'`];
    }
    setLines((prev) => [
      ...prev,
      { text: `$ ${cmd}`, kind: "cmd" as const },
      ...out.map((text) => ({ text, kind: "out" as const })),
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    if (input.trim()) setCmdHistory((h) => [...h, input]);
    setHistIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const next = histIndex === -1 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === -1) return;
      const next = histIndex + 1;
      if (next >= cmdHistory.length) {
        setHistIndex(-1);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(cmdHistory[next]);
      }
    }
  };

  return (
    <div
      className="overflow-hidden rounded-lg border border-card-border bg-background/70 backdrop-blur-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-card-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs text-muted">visitor@joshxie:~</span>
      </div>
      <div ref={scrollRef} className="max-h-44 overflow-y-auto px-4 py-3 text-xs leading-5">
        {lines.map((line, i) => (
          <p
            key={i}
            className={`whitespace-pre-wrap ${line.kind === "cmd" ? "text-foreground/90" : "text-muted"}`}
          >
            {line.text}
          </p>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="shrink-0 text-accent">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-foreground caret-accent outline-none placeholder:text-muted/40"
            placeholder="type 'help'"
            spellCheck={false}
            autoComplete="off"
            aria-label="terminal input"
          />
        </form>
      </div>
    </div>
  );
}
