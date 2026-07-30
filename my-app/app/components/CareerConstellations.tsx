"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

interface ConstellationPoint {
  x: number;
  y: number;
  color?: string;
}

interface ConstellationShape {
  company: string;
  color: string;
  origin: { x: number; y: number };
  rotation: number;
  rotationCenter: { x: number; y: number };
  points: ConstellationPoint[];
  segments: [number, number][];
}

const shapes: ConstellationShape[] = [
  {
    company: "Shopify",
    color: "#95bf47",
    origin: { x: 90, y: 90 },
    rotation: -9,
    rotationCenter: { x: 42, y: 36 },
    points: [
      { x: 12, y: 25 }, { x: 18, y: 68 }, { x: 66, y: 68 }, { x: 72, y: 25 },
      { x: 25, y: 25 }, { x: 27, y: 11 }, { x: 36, y: 3 }, { x: 47, y: 3 },
      { x: 57, y: 11 }, { x: 59, y: 25 },
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
      { x: 65, y: 19 }, { x: 80, y: 13 }, { x: 94, y: 4 }, { x: 84, y: 1 },
      { x: 91, y: 15 },
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

// Cursor hit-testing happens in viewBox coordinates against precomputed bounds, so
// constellations stay hoverable even where other page content is stacked above the SVG.
const HOVER_PAD = 20;
const REPULSE_RADIUS = 220;
const REPULSE_MAX = 7;

function rotatePoint(x: number, y: number, cx: number, cy: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  return {
    x: cx + dx * Math.cos(rad) - dy * Math.sin(rad),
    y: cy + dx * Math.sin(rad) + dy * Math.cos(rad),
  };
}

const worldBounds = shapes.map((shape) => {
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

function ConstellationGroup({
  shape,
  shapeIndex,
  isActive,
  isDimmed,
  cursorX,
  cursorY,
  prefersReducedMotion,
}: {
  shape: ConstellationShape;
  shapeIndex: number;
  isActive: boolean;
  isDimmed: boolean;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  prefersReducedMotion: boolean | null;
}) {
  const bounds = worldBounds[shapeIndex];

  const repulse = (cx: number, cy: number, axis: "x" | "y") => {
    if (prefersReducedMotion) return 0;
    const dx = bounds.centerX - cx;
    const dy = bounds.centerY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist === 0 || dist > REPULSE_RADIUS) return 0;
    const strength = REPULSE_MAX * (1 - dist / REPULSE_RADIUS);
    return ((axis === "x" ? dx : dy) / dist) * strength;
  };

  const springConfig = { stiffness: 25, damping: 22 };
  const offsetX = useSpring(
    useTransform([cursorX, cursorY], (latest: number[]) => repulse(latest[0], latest[1], "x")),
    springConfig
  );
  const offsetY = useSpring(
    useTransform([cursorX, cursorY], (latest: number[]) => repulse(latest[0], latest[1], "y")),
    springConfig
  );

  return (
    <g
      transform={`translate(${shape.origin.x} ${shape.origin.y}) rotate(${shape.rotation} ${shape.rotationCenter.x} ${shape.rotationCenter.y})`}
    >
      <motion.g style={{ x: offsetX, y: offsetY }}>
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: isDimmed ? 0.1 : isActive ? 0.85 : 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <motion.g
                animate={prefersReducedMotion ? undefined : {
                  x: [0, shapeIndex % 2 === 0 ? 3 : -3, 0],
                  y: [0, -4, 0],
                }}
                transition={{ duration: 15 + shapeIndex * 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {shape.segments.map(([from, to], segmentIndex) => (
                  <motion.line
                    key={segmentIndex}
                    x1={shape.points[from].x}
                    y1={shape.points[from].y}
                    x2={shape.points[to].x}
                    y2={shape.points[to].y}
                    stroke={shape.points[from].color ?? shape.color}
                    strokeWidth={isActive ? 1.15 : 0.8}
                    animate={{ opacity: isActive ? 0.48 : 0.24 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}

                {shape.points.map((point, pointIndex) => {
                  const color = point.color ?? shape.color;
                  const shouldSparkle = (pointIndex + shapeIndex * 2) % 5 === 0;
                  const sparkleDelay = 1.2 + ((pointIndex * 2 + shapeIndex) % 5);
                  const sparklePause = 4.5 + ((pointIndex + shapeIndex) % 4) * 1.25;

                  return (
                    <g key={pointIndex}>
                      <motion.circle
                        cx={point.x}
                        cy={point.y}
                        fill={color}
                        animate={{ r: isActive ? 7 : 4.5, opacity: isActive ? 0.15 : 0.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.circle
                        cx={point.x}
                        cy={point.y}
                        fill={color}
                        filter="url(#career-star-glow)"
                        animate={prefersReducedMotion
                          ? { r: isActive ? 3 : 2.2, opacity: 0.85 }
                          : { r: isActive ? 3 : 2.2, opacity: [0.55, 1, 0.55] }}
                        transition={{
                          r: { duration: 0.3 },
                          opacity: {
                            duration: 3 + ((pointIndex + shapeIndex) % 5) * 0.45,
                            repeat: prefersReducedMotion ? 0 : Infinity,
                            ease: "easeInOut",
                          },
                        }}
                      />
                      {!prefersReducedMotion && shouldSparkle && (
                        <g transform={`translate(${point.x} ${point.y})`}>
                          <motion.circle
                            fill="none"
                            stroke={color}
                            strokeWidth="0.8"
                            initial={{ r: 2, opacity: 0 }}
                            animate={{ r: [2, 2, 6.5, 8], opacity: [0, 0, 0.65, 0] }}
                            transition={{
                              duration: 0.9,
                              times: [0, 0.55, 0.72, 1],
                              delay: sparkleDelay,
                              repeat: Infinity,
                              repeatDelay: sparklePause,
                              ease: "easeOut",
                            }}
                          />
                          <motion.path
                            d="M -7 0 H 7 M 0 -7 V 7"
                            fill="none"
                            stroke={color}
                            strokeWidth="1"
                            strokeLinecap="round"
                            filter="url(#career-star-glow)"
                            initial={{ opacity: 0, pathLength: 0 }}
                            animate={{
                              opacity: [0, 0, 0.9, 0],
                              pathLength: [0, 0, 1, 1],
                            }}
                            transition={{
                              duration: 0.9,
                              times: [0, 0.55, 0.72, 1],
                              delay: sparkleDelay,
                              repeat: Infinity,
                              repeatDelay: sparklePause,
                              ease: "easeOut",
                            }}
                          />
                        </g>
                      )}
                    </g>
                  );
                })}
              </motion.g>
            </motion.g>
      </motion.g>
    </g>
  );
}

export default function CareerConstellations({
  activeCompany,
  onCompanyHover,
}: {
  activeCompany: string | null;
  onCompanyHover?: (company: string | null) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const cursorX = useMotionValue(-9999);
  const cursorY = useMotionValue(-9999);
  const hoveredRef = useRef<string | null>(null);
  const onHoverRef = useRef(onCompanyHover);

  useEffect(() => {
    onHoverRef.current = onCompanyHover;
  }, [onCompanyHover]);

  useEffect(() => {
    let frame = 0;
    let latest: { x: number; y: number } | null = null;

    const setHover = (company: string | null) => {
      if (hoveredRef.current !== company) {
        hoveredRef.current = company;
        onHoverRef.current?.(company);
      }
    };

    const update = () => {
      frame = 0;
      const svg = svgRef.current;
      const ctm = svg?.getScreenCTM();
      if (!svg || !ctm || !latest) return;
      const pt = new DOMPoint(latest.x, latest.y).matrixTransform(ctm.inverse());
      cursorX.set(pt.x);
      cursorY.set(pt.y);
      let hit: string | null = null;
      for (let i = 0; i < shapes.length; i++) {
        const b = worldBounds[i];
        if (
          pt.x >= b.minX - HOVER_PAD &&
          pt.x <= b.maxX + HOVER_PAD &&
          pt.y >= b.minY - HOVER_PAD &&
          pt.y <= b.maxY + HOVER_PAD
        ) {
          hit = shapes[i].company;
          break;
        }
      }
      setHover(hit);
    };

    const handleMove = (e: MouseEvent) => {
      latest = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };

    const handleLeave = () => {
      latest = null;
      cursorX.set(-9999);
      cursorY.set(-9999);
      setHover(null);
    };

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cursorX, cursorY]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
    >
      <defs>
        <filter id="career-star-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {shapes.map((shape, shapeIndex) => (
        <ConstellationGroup
          key={shape.company}
          shape={shape}
          shapeIndex={shapeIndex}
          isActive={activeCompany === shape.company}
          isDimmed={activeCompany !== null && activeCompany !== shape.company}
          cursorX={cursorX}
          cursorY={cursorY}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </svg>
  );
}
