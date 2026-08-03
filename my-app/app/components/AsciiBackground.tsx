"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface ShapePoint {
  x: number;
  y: number;
  color?: string;
}

interface CompanyShape {
  company: string;
  color: string;
  origin: { x: number; y: number };
  rotation: number;
  rotationCenter: { x: number; y: number };
  points: ShapePoint[];
  segments: [number, number][];
}

const shapes: CompanyShape[] = [
  {
    company: "Shopify",
    color: "#95bf47",
    origin: { x: 90, y: 90 },
    rotation: -9,
    rotationCenter: { x: 42, y: 36 },
    points: [
      { x: 12, y: 25 }, { x: 18, y: 68 }, { x: 66, y: 68 }, { x: 72, y: 25 },
      { x: 25, y: 25 }, { x: 26, y: 4 }, { x: 35, y: -6 }, { x: 48, y: -6 },
      { x: 58, y: 4 }, { x: 59, y: 25 },
    ],
    segments: [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
    ],
  },
  {
    company: "Stealth Startup",
    color: "#a78bfa",
    origin: { x: 610, y: 120 },
    rotation: 7,
    rotationCenter: { x: 40, y: 38 },
    points: [
      { x: 40, y: 0 }, { x: 0, y: 62 }, { x: 18, y: 76 },
      { x: 40, y: 38, color: "#c4b5fd" }, { x: 62, y: 76 }, { x: 80, y: 62 },
    ],
    segments: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3]],
  },
  {
    company: "AutoDB",
    color: "#d1d5db",
    origin: { x: 420, y: 500 },
    rotation: -6,
    rotationCenter: { x: 40, y: 32 },
    points: [
      { x: 0, y: 60, color: "#9ca3af" }, { x: 0, y: 35 }, { x: 15, y: 24, color: "#f8fafc" },
      { x: 27, y: 10 }, { x: 40, y: 3, color: "#f8fafc" }, { x: 53, y: 10 },
      { x: 65, y: 24, color: "#f8fafc" }, { x: 80, y: 35 }, { x: 80, y: 60, color: "#9ca3af" },
      { x: 64, y: 60 }, { x: 52, y: 43, color: "#f8fafc" }, { x: 45, y: 32 },
      { x: 40, y: 28, color: "#f8fafc" }, { x: 35, y: 32 }, { x: 28, y: 43, color: "#f8fafc" },
      { x: 16, y: 60 },
    ],
    segments: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
      [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 0],
    ],
  },
  {
    company: "Amazon",
    color: "#ff9900",
    origin: { x: 600, y: 590 },
    rotation: 5,
    rotationCenter: { x: 47, y: 11 },
    points: [
      { x: 0, y: 5 }, { x: 14, y: 14 }, { x: 30, y: 20 }, { x: 48, y: 22 },
      { x: 65, y: 19 }, { x: 80, y: 13 }, { x: 94, y: 4 }, { x: 80, y: 0 },
      { x: 90, y: 19 },
    ],
    segments: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [6, 8]],
  },
  {
    company: "Microsoft",
    color: "#00a4ef",
    origin: { x: 1030, y: 610 },
    rotation: -8,
    rotationCenter: { x: 33, y: 33 },
    points: [
      { x: 0, y: 0, color: "#f25022" }, { x: 28, y: 0, color: "#f25022" },
      { x: 28, y: 28, color: "#f25022" }, { x: 0, y: 28, color: "#f25022" },
      { x: 38, y: 0, color: "#7fba00" }, { x: 66, y: 0, color: "#7fba00" },
      { x: 66, y: 28, color: "#7fba00" }, { x: 38, y: 28, color: "#7fba00" },
      { x: 0, y: 38, color: "#00a4ef" }, { x: 28, y: 38, color: "#00a4ef" },
      { x: 28, y: 66, color: "#00a4ef" }, { x: 0, y: 66, color: "#00a4ef" },
      { x: 38, y: 38, color: "#ffb900" }, { x: 66, y: 38, color: "#ffb900" },
      { x: 66, y: 66, color: "#ffb900" }, { x: 38, y: 66, color: "#ffb900" },
    ],
    segments: [
      [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4],
      [8, 9], [9, 10], [10, 11], [11, 8], [12, 13], [13, 14], [14, 15], [15, 12],
    ],
  },
];

// Shapes are laid out in a fixed design space and scaled to cover the canvas
// ("slice" behavior, matching the old SVG viewBox).
const DESIGN_W = 1200;
const DESIGN_H = 760;

const CELL = 14; // px per character cell
const BASE_FONT = `12px ui-monospace, SFMono-Regular, Menlo, monospace`;
const DOT_FONT = `bold 16px ui-monospace, SFMono-Regular, Menlo, monospace`;
const GRID_COLOR = "99, 102, 241"; // indigo, matches --accent
const GRID_ALPHA = 0.14;
const RING_COLOR = "244, 244, 252"; // white rings streaming off the moving cursor
const RING_SPACING = 26; // px of cursor travel between spawned rings
const RING_SPEED = 95; // px/s ring expansion
const RING_LIFE = 0.9; // s before a ring fades out
const RING_MAX = 60; // safety cap on live rings
const ROCKET_MAX = 2; // concurrent rockets
const ROCKET_FONT = `bold 16px ui-monospace, SFMono-Regular, Menlo, monospace`;
const ROCKET_RED = "rgba(240, 82, 60, 0.95)"; // nose cone + fins
const ROCKET_WHITE = "rgba(236, 239, 244, 0.92)"; // body
const ROCKET_WINDOW = "rgba(41, 182, 246, 0.95)"; // porthole
// Rocket-emoji-style template in grid cells: a = cells behind the nose, p = perpendicular
// offset. Pointed red nose cone → white body with a blue porthole → flared red fins → tail.
const ROCKET_CELLS: { a: number; p: number; color: string }[] = [
  { a: 0, p: 0, color: ROCKET_RED },
  { a: 1, p: -1, color: ROCKET_RED },
  { a: 1, p: 0, color: ROCKET_RED },
  { a: 1, p: 1, color: ROCKET_RED },
  { a: 2, p: -1, color: ROCKET_WHITE },
  { a: 2, p: 0, color: ROCKET_WHITE },
  { a: 2, p: 1, color: ROCKET_WHITE },
  { a: 3, p: -1, color: ROCKET_WHITE },
  { a: 3, p: 0, color: ROCKET_WINDOW },
  { a: 3, p: 1, color: ROCKET_WHITE },
  { a: 4, p: -1, color: ROCKET_WHITE },
  { a: 4, p: 0, color: ROCKET_WHITE },
  { a: 4, p: 1, color: ROCKET_WHITE },
  { a: 5, p: -2, color: ROCKET_RED },
  { a: 5, p: -1, color: ROCKET_WHITE },
  { a: 5, p: 0, color: ROCKET_WHITE },
  { a: 5, p: 1, color: ROCKET_WHITE },
  { a: 5, p: 2, color: ROCKET_RED },
  { a: 6, p: -2, color: ROCKET_RED },
  { a: 6, p: -1, color: ROCKET_WHITE },
  { a: 6, p: 0, color: ROCKET_WHITE },
  { a: 6, p: 1, color: ROCKET_WHITE },
  { a: 6, p: 2, color: ROCKET_RED },
  { a: 7, p: 0, color: ROCKET_WHITE },
];
// Flame stamps behind the nozzle (k = heat)
const FIRE_STAMPS = [
  { a: 8, p: 0, k: 1 },
  { a: 8, p: -1, k: 0.8 },
  { a: 8, p: 1, k: 0.8 },
  { a: 9, p: 0, k: 1 },
  { a: 9.8, p: 0, k: 0.9 },
  { a: 10.6, p: 0, k: 0.8 },
];
const FIRE_DECAY = 1.6; // fade speed of the fire trail
const ROCKET_AVOID_RADIUS = 200; // px: rockets start steering away from the cursor
const ROCKET_AVOID_ACCEL = 900; // px/s² of steering at zero distance
const HOVER_PAD = 26; // px padding around a shape for hover detection
const REPULSE_RADIUS = 240; // px
const REPULSE_MAX = 9; // px, scaled with canvas
const REPULSE_RATE = 2.0; // approach speed of the smoothed offset
const ALPHA_IDLE = 0.5;
const ALPHA_ACTIVE = 0.95;
const ALPHA_DIMMED = 0.14;

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function rotatePoint(x: number, y: number, cx: number, cy: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  return {
    x: cx + dx * Math.cos(rad) - dy * Math.sin(rad),
    y: cy + dx * Math.sin(rad) + dy * Math.cos(rad),
  };
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

// Static bounds per shape in design coords (base rotation applied); the drift and
// rotation wobble are small enough that HOVER_PAD absorbs them.
const designBounds = shapes.map((shape) => {
  const pts = shape.points.map((p) =>
    rotatePoint(p.x, p.y, shape.rotationCenter.x, shape.rotationCenter.y, shape.rotation)
  );
  const xs = pts.map((p) => p.x + shape.origin.x);
  const ys = pts.map((p) => p.y + shape.origin.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { minX, maxX, minY, maxY, centerX: (minX + maxX) / 2, centerY: (minY + maxY) / 2 };
});

export default function AsciiBackground({
  activeCompany,
  onCompanyHover,
}: {
  activeCompany: string | null;
  onCompanyHover?: (company: string | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const activeRef = useRef(activeCompany);
  useEffect(() => {
    activeRef.current = activeCompany;
  }, [activeCompany]);

  const onHoverRef = useRef(onCompanyHover);
  useEffect(() => {
    onHoverRef.current = onCompanyHover;
  }, [onCompanyHover]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = !!prefersReducedMotion;
    let raf = 0;
    let last = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let fire = new Float32Array(0);
    const rockets: Rocket[] = [];
    let nextSpawn = 0;
    const rings: { x: number; y: number; start: number }[] = [];
    let ringAcc = 0; // distance travelled since the last spawned ring
    const prevCursor = { x: -99999, y: -99999 };
    let base: HTMLCanvasElement | null = null;
    const cursor = { x: -99999, y: -99999 };
    const repulseOffsets = shapes.map(() => ({ x: 0, y: 0 }));
    const alphas = shapes.map(() => 0); // fade shapes in from 0 on mount
    let hovered: string | null = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      fire = new Float32Array(cols * rows);

      // Pre-render the '#' field once; per-frame we only patch changed cells
      base = document.createElement("canvas");
      base.width = canvas.width;
      base.height = canvas.height;
      const bctx = base.getContext("2d");
      if (!bctx) return;
      bctx.scale(dpr, dpr);
      bctx.font = BASE_FONT;
      bctx.textAlign = "center";
      bctx.textBaseline = "middle";
      bctx.fillStyle = `rgba(${GRID_COLOR}, ${GRID_ALPHA})`;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          bctx.fillText("#", c * CELL + CELL / 2, r * CELL + CELL / 2);
        }
      }
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
    };

    const handleLeave = () => {
      cursor.x = -99999;
      cursor.y = -99999;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (w === 0 || h === 0 || !base) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      const t = now / 1000;

      const scale = Math.max(w / DESIGN_W, h / DESIGN_H);
      const ox = (w - DESIGN_W * scale) / 2;
      const oy = (h - DESIGN_H * scale) / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(base, 0, 0, w, h);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // ── Cursor rings: white circle outlines stream off the cursor as it moves,
      // spawned every RING_SPACING px along its path, each expanding and fading
      // independently. No effect while the cursor is stationary. ──
      const moveDist = Math.hypot(cursor.x - prevCursor.x, cursor.y - prevCursor.y);
      if (!reduced && cursor.x > -1000 && moveDist > 1.5) {
        const teleport = prevCursor.x < -1000 || moveDist > 250;
        if (teleport) {
          rings.push({ x: cursor.x, y: cursor.y, start: t });
          ringAcc = 0;
        } else {
          const ux2 = (cursor.x - prevCursor.x) / moveDist;
          const uy2 = (cursor.y - prevCursor.y) / moveDist;
          let dAlong = RING_SPACING - ringAcc;
          while (dAlong <= moveDist) {
            rings.push({
              x: prevCursor.x + ux2 * dAlong,
              y: prevCursor.y + uy2 * dAlong,
              start: t,
            });
            dAlong += RING_SPACING;
          }
          ringAcc = moveDist - (dAlong - RING_SPACING);
        }
        if (rings.length > RING_MAX) rings.splice(0, rings.length - RING_MAX);
      }
      prevCursor.x = cursor.x;
      prevCursor.y = cursor.y;

      ctx.font = BASE_FONT;
      for (let i = rings.length - 1; i >= 0; i--) {
        const rg = rings[i];
        const age = t - rg.start;
        const life = 1 - age / RING_LIFE;
        if (life <= 0) {
          rings.splice(i, 1);
          continue;
        }
        const radius = 6 + age * RING_SPEED;
        const band = CELL * 0.6; // ring thickness
        const cMin = Math.max(0, Math.floor((rg.x - radius - band) / CELL));
        const cMax = Math.min(cols - 1, Math.ceil((rg.x + radius + band) / CELL));
        const rMin = Math.max(0, Math.floor((rg.y - radius - band) / CELL));
        const rMax = Math.min(rows - 1, Math.ceil((rg.y + radius + band) / CELL));
        for (let r = rMin; r <= rMax; r++) {
          for (let c = cMin; c <= cMax; c++) {
            const d = Math.hypot(c * CELL + CELL / 2 - rg.x, r * CELL + CELL / 2 - rg.y);
            if (Math.abs(d - radius) > band) continue;
            const x = c * CELL;
            const y = r * CELL;
            ctx.clearRect(x, y, CELL, CELL);
            // Crossfade: '#' returns as the ring fades
            ctx.fillStyle = `rgba(${GRID_COLOR}, ${GRID_ALPHA * (1 - life * 0.8)})`;
            ctx.fillText("#", x + CELL / 2, y + CELL / 2);
            ctx.fillStyle = `rgba(${RING_COLOR}, ${0.85 * life})`;
            ctx.fillText("~", x + CELL / 2, y + CELL / 2);
          }
        }
      }

      // ── Rockets: spawn periodically from a random edge, stamp a fire trail ──
      if (!reduced) {
        if (nextSpawn === 0) nextSpawn = t + 2;
        if (t >= nextSpawn && rockets.length < ROCKET_MAX) {
          const side = Math.floor(Math.random() * 3);
          const speed = 240 + Math.random() * 160;
          let x = 0;
          let y = 0;
          let angle = 0;
          if (side === 0) {
            // left edge, flying right
            x = -60;
            y = h * (0.1 + Math.random() * 0.7);
            angle = ((Math.random() - 0.5) * 50 * Math.PI) / 180;
          } else if (side === 1) {
            // right edge, flying left
            x = w + 60;
            y = h * (0.1 + Math.random() * 0.7);
            angle = Math.PI + ((Math.random() - 0.5) * 50 * Math.PI) / 180;
          } else {
            // top edge, flying down
            x = w * (0.15 + Math.random() * 0.7);
            y = -60;
            angle = Math.PI / 2 + ((Math.random() - 0.5) * 60 * Math.PI) / 180;
          }
          rockets.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed });
          nextSpawn = t + 3.5 + Math.random() * 5;
        }
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const rk = rockets[i];
        // Cursor repulsion: steer away without changing speed, so the rocket
        // curves around the cursor and carries on
        if (cursor.x > -1000) {
          const dx = rk.x - cursor.x;
          const dy = rk.y - cursor.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < ROCKET_AVOID_RADIUS) {
            const speed0 = Math.hypot(rk.vx, rk.vy);
            const f = ROCKET_AVOID_ACCEL * (1 - dist / ROCKET_AVOID_RADIUS);
            rk.vx += (dx / dist) * f * dt;
            rk.vy += (dy / dist) * f * dt;
            const speed1 = Math.hypot(rk.vx, rk.vy);
            rk.vx = (rk.vx / speed1) * speed0;
            rk.vy = (rk.vy / speed1) * speed0;
          }
        }
        rk.x += rk.vx * dt;
        rk.y += rk.vy * dt;
        if (rk.x < -120 || rk.x > w + 120 || rk.y < -120 || rk.y > h + 120) {
          rockets.splice(i, 1);
          continue;
        }
        const speed = Math.hypot(rk.vx, rk.vy);
        const ux = rk.vx / speed;
        const uy = rk.vy / speed;
        for (const st of FIRE_STAMPS) {
          const px = rk.x - ux * CELL * st.a - uy * CELL * st.p;
          const py = rk.y - uy * CELL * st.a + ux * CELL * st.p;
          const c = Math.floor(px / CELL);
          const r = Math.floor(py / CELL);
          if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
          const i2 = r * cols + c;
          if (st.k > fire[i2]) fire[i2] = st.k;
        }
      }

      // Fire trail: hot '-' near the rocket cooling into '.' embers
      const fireDecay = Math.exp(-FIRE_DECAY * dt);
      for (let i = 0; i < fire.length; i++) {
        if (fire[i] === 0) continue;
        fire[i] *= fireDecay;
        if (fire[i] < 0.05) {
          fire[i] = 0;
          continue;
        }
        const k = fire[i];
        const c = i % cols;
        const r = (i / cols) | 0;
        const x = c * CELL;
        const y = r * CELL;
        ctx.clearRect(x, y, CELL, CELL);
        const g = Math.round(70 + 150 * k); // yellow when hot, red as it cools
        ctx.fillStyle = `rgba(255, ${g}, 40, ${0.15 + 0.65 * k})`;
        ctx.fillText(k > 0.55 ? "-" : ".", x + CELL / 2, y + CELL / 2);
      }

      // ── Company shapes as colored '.' cells ──
      const active = activeRef.current;
      let newHovered: string | null = null;

      ctx.font = DOT_FONT;
      for (let s = 0; s < shapes.length; s++) {
        const shape = shapes[s];
        const b = designBounds[s];

        // Gentle drift + rotation wobble (the old floating effect)
        const driftX = reduced ? 0 : Math.sin(t * 0.38 + s * 2.1) * 3 * scale;
        const driftY = reduced ? 0 : Math.sin(t * 0.31 + s * 1.7 + 1) * 4 * scale;
        const wobble = reduced ? 0 : Math.sin(t * 0.25 + s * 1.1) * 2.5;

        // Smoothed repulsion away from the cursor
        const centerX = b.centerX * scale + ox + repulseOffsets[s].x + driftX;
        const centerY = b.centerY * scale + oy + repulseOffsets[s].y + driftY;
        let targetX = 0;
        let targetY = 0;
        if (!reduced && cursor.x > -1000) {
          const dx = centerX - cursor.x;
          const dy = centerY - cursor.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < REPULSE_RADIUS) {
            const strength = REPULSE_MAX * scale * (1 - dist / REPULSE_RADIUS);
            targetX = (dx / dist) * strength;
            targetY = (dy / dist) * strength;
          }
        }
        const ease = 1 - Math.exp(-REPULSE_RATE * dt);
        repulseOffsets[s].x += (targetX - repulseOffsets[s].x) * ease;
        repulseOffsets[s].y += (targetY - repulseOffsets[s].y) * ease;

        // Hover hit-test in canvas coords
        if (
          cursor.x >= b.minX * scale + ox + repulseOffsets[s].x + driftX - HOVER_PAD &&
          cursor.x <= b.maxX * scale + ox + repulseOffsets[s].x + driftX + HOVER_PAD &&
          cursor.y >= b.minY * scale + oy + repulseOffsets[s].y + driftY - HOVER_PAD &&
          cursor.y <= b.maxY * scale + oy + repulseOffsets[s].y + driftY + HOVER_PAD
        ) {
          newHovered = newHovered ?? shape.company;
        }

        // Smoothly approach the highlight/dim state
        const targetAlpha =
          active === shape.company ? ALPHA_ACTIVE : active !== null ? ALPHA_DIMMED : ALPHA_IDLE;
        alphas[s] += (targetAlpha - alphas[s]) * Math.min(1, dt * 6);
        const alpha = alphas[s];
        if (alpha < 0.02) continue;

        // Transform points: wobble rotation → origin → design→canvas → drift + repulse
        const rotation = shape.rotation + wobble;
        const pts = shape.points.map((p) => {
          const rp = rotatePoint(p.x, p.y, shape.rotationCenter.x, shape.rotationCenter.y, rotation);
          return {
            x: (rp.x + shape.origin.x) * scale + ox + driftX + repulseOffsets[s].x,
            y: (rp.y + shape.origin.y) * scale + oy + driftY + repulseOffsets[s].y,
            color: p.color,
          };
        });

        // Rasterize segment outlines onto the grid, one '.' per touched cell
        const cells = new Map<number, string>();
        for (const [from, to] of shape.segments) {
          const p1 = pts[from];
          const p2 = pts[to];
          const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          const steps = Math.max(1, Math.ceil(len / (CELL * 0.55)));
          const color = p1.color ?? shape.color;
          for (let k = 0; k <= steps; k++) {
            const px = p1.x + ((p2.x - p1.x) * k) / steps;
            const py = p1.y + ((p2.y - p1.y) * k) / steps;
            const c = Math.floor(px / CELL);
            const r = Math.floor(py / CELL);
            if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
            const key = r * cols + c;
            if (!cells.has(key)) cells.set(key, color);
          }
        }

        for (const [key, color] of cells) {
          const c = key % cols;
          const r = (key / cols) | 0;
          const x = c * CELL;
          const y = r * CELL;
          ctx.clearRect(x, y, CELL, CELL);
          ctx.fillStyle = `rgba(${hexToRgb(color)}, ${alpha})`;
          ctx.fillText(".", x + CELL / 2, y + CELL / 2 - CELL * 0.18);
        }
      }

      // Rocket bodies drawn last so they fly over everything: red '#' tip, white '#' body
      ctx.font = ROCKET_FONT;
      for (const rk of rockets) {
        const speed = Math.hypot(rk.vx, rk.vy);
        const ux = rk.vx / speed;
        const uy = rk.vy / speed;
        for (const cell of ROCKET_CELLS) {
          const px = rk.x - ux * CELL * cell.a - uy * CELL * cell.p;
          const py = rk.y - uy * CELL * cell.a + ux * CELL * cell.p;
          const c = Math.floor(px / CELL);
          const r = Math.floor(py / CELL);
          if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
          const x = c * CELL;
          const y = r * CELL;
          ctx.clearRect(x, y, CELL, CELL);
          ctx.fillStyle = cell.color;
          ctx.fillText("#", x + CELL / 2, y + CELL / 2);
        }
      }

      if (newHovered !== hovered) {
        hovered = newHovered;
        onHoverRef.current?.(newHovered);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
    />
  );
}
