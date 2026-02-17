"use client";

import { motion } from "framer-motion";
import { HiExternalLink, HiCode } from "react-icons/hi";

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
    <div className="mx-auto max-w-3xl px-6 py-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-3xl font-bold sm:text-4xl"
      >
        <span className="gradient-text">Projects</span>
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-5"
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
