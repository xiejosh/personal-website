# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Josh Xie's personal website — a dark-themed, animation-heavy portfolio site. The Next.js app lives in `my-app/` (the repo root itself has no code). All commands below run from `my-app/`.

## Commands

```bash
cd my-app
npm run dev      # dev server at http://localhost:3000 (bun dev also works — both lockfiles exist)
npm run build    # production build
npm run lint     # eslint (flat config, extends next/core-web-vitals + next/typescript)
```

There are no tests.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · react-icons

## Architecture

Four routes under `my-app/app/`: `/` (page.tsx), `/about`, `/projects`, `/contact`. Every page and component is a `"use client"` component — there are no server components with logic, no API routes, and no data layer. Content (experience entries, projects, skills, contact links) is hardcoded as const arrays at the top of each page file; to update content, edit those arrays.

Shared pieces in `app/components/`:
- `Navbar.tsx` — rendered for all pages in `layout.tsx` (there is intentionally no footer — the home page should not scroll).
- `Boot.tsx` — the boot-sequence primitives used by every page: `Typewriter` (types text at a per-instance random speed with jitter; reserves layout with an invisible copy of the full text; never place inside a `gradient-text` parent — the overlay span loses the gradient and renders invisible), `BootReveal` (abrupt delayed reveal for non-text elements), and `TerminalWindow` (macOS-style traffic-light window frame).
- `AsciiBackground.tsx` — canvas ASCII background rendered on **every page** (`showCompanies={false}` on non-home pages hides the company shapes but keeps everything else): a grid of faint `#` characters; a moving cursor streams expanding white `~` ring outlines along its path (nothing while stationary); a lone ambient white `~` "ping" ring expands from a random point every ~6–14s; rocket-emoji-style ships (`#` cells, red nose/fins, blue porthole) fly across periodically with `-`/`.` fire trails and steer away from the cursor; company logos are drawn as colored `.` cells along hand-plotted outlines (`CompanyShape` points + segments keyed by `company`), with drift/rotation-wobble/cursor-repulsion animation and cursor hover detection reported via `onCompanyHover`. The home page passes `activeCompany` down to highlight the hovered company's shape. **The `company` strings here must match the `experience` array in `page.tsx`.**
- `Terminal.tsx` — interactive terminal on the home page: visitors type commands (`help`, `whoami`, `ls`, `cd <page>` navigates via router, `experience`/`cat experience.log`, `clear`, `sudo` easter egg) with arrow-key command history; typing a printable character anywhere on the page (outside inputs) focuses it and captures the keystroke. Content like the experience lines is duplicated here — keep in sync with `page.tsx`.
- `NowPlaying.tsx` — polls the Last.fm API (public key inline) every 30s to show the current/last Spotify track.

## Styling conventions

- Tailwind v4: no `tailwind.config` — theme lives in `app/globals.css` via CSS variables in `:root` mapped through `@theme inline` (e.g. `--accent` → `text-accent`, `bg-accent`). Add new theme colors there, not in a config file.
- Dark indigo palette (`#1a1a2e` background, indigo/violet accents), JetBrains Mono as the site-wide font (Geist Mono fallback) — the whole site is terminal-themed: prompt-style copy (`$ whoami`, `>` prefixes, `~/` nav links, bracketed `[dates]`, `[ buttons ]`), a macOS-terminal window frame around the home experience panel (`experience.log`), square-ish corners (`rounded-md`/`rounded-2xl`, not pills), and a subtle grid background on `body`.
- Layout is full-bleed: no `max-w-*` containers — Navbar, Footer, and the home hero span the viewport with proportional edge padding (`px-[max(1rem,2vw)]`).
- Every page follows the same format: `AsciiBackground` behind z-10 content, a typed `$ <command>` prompt line, typed short headings, and `BootReveal`-staggered bodies (long prose is revealed, not typed). Cards use translucent `bg-card-bg/70 backdrop-blur-sm` so the background shows through. All boot components honor `useReducedMotion`.
- Framer Motion now only handles small interactions (dropdown chevrons/heights, rotating role). Background tuning knobs (`CELL`, `TRAIL_*`, `REPULSE_*`, `ALPHA_*`, `ROCKET_*`, `PING_*`) live at the top of `AsciiBackground.tsx`. (The former shooting stars, neon squares, contact planets, projects shattered-glass/hacker-glitch, and about rain are all recoverable from git history; the unused `hacker-*` CSS classes remain in `globals.css`.)
- Company logos and other images live in `my-app/public/` and are rendered with `next/image`.
