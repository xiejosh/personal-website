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
- `Navbar.tsx` / `Footer.tsx` — rendered for all pages in `layout.tsx`.
- `CareerConstellations.tsx` — SVG star-constellation background on the home page. Each constellation is a `ConstellationShape` (hand-plotted points + segments) keyed by `company`. The home page passes `activeCompany` down when hovering an experience entry to highlight the matching constellation. **The `company` strings here must match the `experience` array in `page.tsx`.**
- `NowPlaying.tsx` — polls the Last.fm API (public key inline) every 30s to show the current/last Spotify track.

## Styling conventions

- Tailwind v4: no `tailwind.config` — theme lives in `app/globals.css` via CSS variables in `:root` mapped through `@theme inline` (e.g. `--accent` → `text-accent`, `bg-accent`). Add new theme colors there, not in a config file.
- Dark indigo palette (`#1a1a2e` background, indigo/violet accents), Mulish as the primary font (Geist fallback), subtle grid background applied on `body`.
- Layout is full-bleed: no `max-w-*` containers — Navbar, Footer, and the home hero span the viewport with proportional edge padding (`px-[max(1rem,2vw)]`).
- Home page entrances are a terminal-style boot sequence, not fades: `Typewriter` (types text at a per-instance random speed with jitter; reserves layout with an invisible copy of the full text) and `BootReveal` (abrupt delayed reveal for non-text elements), both defined in `page.tsx` and both honoring `useReducedMotion`.
- Heavy use of Framer Motion elsewhere: staggered entrance animations on other pages, plus decorative interactive elements (shooting stars and neon squares that explode on hover/click on the home page, planets on contact, shattered-glass holes on projects). The home background repels away from the cursor via springs (`REPULSE_*` constants in `CareerConstellations.tsx`, `SQUARE_REPULSE_*` in `page.tsx`).
- Company logos and other images live in `my-app/public/` and are rendered with `next/image`.
