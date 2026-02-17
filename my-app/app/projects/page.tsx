"use client";

import { motion } from "framer-motion";
import { HiExternalLink, HiCode } from "react-icons/hi";

function ShatteredHole({
  x,
  y,
  size = 1,
  rotation = 0,
  variant = 0,
}: {
  x: string;
  y: string;
  size?: number;
  rotation?: number;
  variant?: number;
}) {
  const s = 300 * size;

  // Different jagged hole shapes so they don't all look the same
  const holes = [
    // Variant 0 — big spiky impact
    {
      // Main jagged void shape — a filled polygon with sharp spikes radiating out
      shape: `
        100,58 108,72 115,42 120,70 130,65 126,78
        148,52 132,80 155,72 138,88 168,85 142,95
        172,100 140,102 165,115 138,110 155,135 130,118
        145,155 122,125 130,150 115,130 108,162 105,128
        95,165 98,125 82,155 88,120 65,148 78,115
        52,138 75,108 42,118 72,98 35,100 70,92
        45,78 75,88 55,65 82,82 62,52 90,78
        85,42 95,75
      `,
      // Debris fragments near the edges
      debris: [
        { points: "58,58 62,52 66,56 63,61", fill: 0.15 },
        { points: "148,68 153,63 156,68 151,72", fill: 0.12 },
        { points: "155,128 160,125 162,130 157,132", fill: 0.1 },
        { points: "52,125 56,120 60,124 55,128", fill: 0.13 },
        { points: "108,38 112,34 115,39 111,42", fill: 0.1 },
        { points: "90,160 94,156 97,160 93,163", fill: 0.11 },
        { points: "42,92 46,88 49,92 45,95", fill: 0.09 },
        { points: "165,98 169,95 171,99 167,101", fill: 0.1 },
      ],
    },
    // Variant 1 — asymmetric tear
    {
      shape: `
        95,55 102,70 98,38 108,68 122,58 118,75
        142,48 128,78 158,68 135,85 170,82 140,94
        175,105 142,100 162,118 135,112 150,140 125,120
        138,158 118,128 122,155 108,132 102,168 100,130
        88,158 92,122 75,145 85,115 58,132 78,108
        48,115 72,98 38,98 68,90 45,72 78,82
        58,55 85,78 72,48 92,72
      `,
      debris: [
        { points: "65,62 69,57 73,61 69,65", fill: 0.14 },
        { points: "155,58 159,54 162,59 157,62", fill: 0.11 },
        { points: "160,130 164,126 167,131 162,134", fill: 0.12 },
        { points: "48,128 52,124 55,128 50,131", fill: 0.1 },
        { points: "95,35 99,31 102,36 98,39", fill: 0.09 },
        { points: "130,158 134,154 137,159 132,161", fill: 0.1 },
      ],
    },
    // Variant 2 — smaller, tighter
    {
      shape: `
        100,62 106,74 112,48 116,72 128,60 124,78
        145,58 130,82 152,75 136,90 162,90 140,96
        165,105 140,104 158,118 135,112 148,138 126,120
        140,152 118,126 125,148 110,130 105,158 102,128
        92,155 95,124 80,142 88,118 62,135 78,110
        52,120 74,102 42,102 70,94 48,78 76,86
        60,60 86,80 75,52 94,75
      `,
      debris: [
        { points: "62,55 66,51 69,55 65,58", fill: 0.13 },
        { points: "152,65 156,62 158,66 154,68", fill: 0.1 },
        { points: "148,132 152,128 155,133 150,135", fill: 0.11 },
        { points: "55,130 59,126 62,130 57,133", fill: 0.12 },
        { points: "100,155 104,151 107,156 102,158", fill: 0.09 },
      ],
    },
  ];

  const hole = holes[variant % holes.length];

  return (
    <div
      className="fixed pointer-events-none z-1"
      style={{ left: x, top: y, transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      {/* Green glow around the outside of the hole */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: s * 0.9,
          height: s * 0.9,
          background: "radial-gradient(circle, transparent 30%, rgba(0,255,65,0.1) 55%, transparent 75%)",
          filter: "blur(14px)",
        }}
      />
      <svg
        width={s}
        height={s}
        viewBox="0 0 200 200"
        fill="none"
        style={{ display: "block" }}
      >
        {/* Main jagged void — pure black */}
        <polygon
          points={hole.shape}
          fill="#000"
        />
        {/* Green edge glow on the jagged shape */}
        <polygon
          points={hole.shape}
          fill="none"
          stroke="rgba(0,255,65,0.3)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Floating debris fragments */}
        {hole.debris.map((d, i) => (
          <polygon
            key={i}
            points={d.points}
            fill={`rgba(0,255,65,${d.fill})`}
            stroke="rgba(0,255,65,0.25)"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}

const projects = [
  {
    title: "Rush Website",
    description:
      "Fully-managed rush website for Alpha Kappa Psi – Phi Chapter. Includes login, permission, deliberation features. Successful launch W26, peaking at 400 concurrent users.",
    link: "https://akpsi-phi.com",
    linkLabel: "akpsi-phi.com",
    type: "live" as const,
  },
  {
    title: "Maize Entertainment",
    description:
      "Platform for creators to share their music and videos.",
    link: "https://maizeentertainment.com",
    linkLabel: "maizeentertainment.com",
    type: "live" as const,
  },
  {
    title: "Personal Website",
    description:
      "This website! Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
    link: "https://github.com/xiejosh/personal-website",
    linkLabel: "GitHub",
    type: "github" as const,
  },
  {
    title: "Roci AI",
    description:
      "End-to-end integratable RAG system for intelligent document retrieval and question answering.",
    link: "https://devpost.com/software/roci-ai",
    linkLabel: "Devpost",
    type: "live" as const,
  },
  {
    title: "Competition Autograder",
    description:
      "Autograder for coding competitions. Automated test case evaluation and scoring.",
    link: null,
    linkLabel: "Repository deprecated",
    type: "deprecated" as const,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
  return (
    <div className="hacker-bg mx-auto max-w-3xl px-6 py-24">
      {/* Background glitch layers */}
      <div className="hacker-tear" aria-hidden="true" />
      <div className="hacker-tear" aria-hidden="true" />
      <div className="hacker-vignette" aria-hidden="true" />

      {/* Shattered holes */}
      <ShatteredHole x="8%" y="18%" size={1.2} rotation={-15} variant={0} />
      <ShatteredHole x="88%" y="50%" size={0.9} rotation={30} variant={1} />
      <ShatteredHole x="12%" y="75%" size={0.7} rotation={-40} variant={2} />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-2 mb-10 text-3xl font-bold sm:text-4xl"
      >
        <span className="gradient-text">Projects</span>
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-2 flex flex-col gap-5"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={item}
            className="group relative rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="mb-2 text-lg font-semibold group-hover:text-accent transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 shrink-0 rounded-lg border border-card-border p-2 text-muted transition-all hover:border-accent/50 hover:text-accent"
                  aria-label={`Visit ${project.title}`}
                >
                  {project.type === "github" ? (
                    <HiCode size={18} />
                  ) : (
                    <HiExternalLink size={18} />
                  )}
                </a>
              ) : null}
            </div>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs font-medium text-accent transition-colors hover:text-accent-secondary"
              >
                {project.linkLabel} &rarr;
              </a>
            ) : (
              <span className="mt-3 inline-block text-xs text-muted italic">
                {project.linkLabel}
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
