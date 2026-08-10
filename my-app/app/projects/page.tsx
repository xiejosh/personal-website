"use client";

import { HiExternalLink, HiCode } from "react-icons/hi";
import AsciiBackground from "../components/AsciiBackground";
import { Typewriter, BootReveal } from "../components/Boot";

const projects = [
  {
    title: "Agentify - Mistral AI Hackathon Submission",
    description:
      "Basically an OS-level Browser Use. Complete tasks anywhere on your system with a single prompt — the future of task automation.",
    link: "https://github.com/shlawgathon/agenticify",
    linkLabel: "GitHub",
    type: "github" as const,
  },
  {
    title: "Cleanly - Ocean Tech Hackathon Winner 🏆",
    description:
      "View and classify trash through image recognition at the click of a button! Easily plan your ocean cleanup initiatives before you even depart from shore.",
    link: "https://github.com/xiejosh/cleanly",
    linkLabel: "GitHub",
    type: "github" as const,
  },
  {
    title: "Friendly - Top 4 at AWS Autonomous Agents Hackathon 🏆",
    description:
      "Automatically find friends within your close network with shared interests at a click of a button — skip the awkward conversations and get straight into deep conversations about shared passions that go deeper than \"how was your day?\".",
    link: "https://github.com/shlawgathon/friendly",
    linkLabel: "GitHub",
    type: "github" as const,
  },
  {
    title: "Interpreter - Return of the Agents Hackathon Winner 🏆",
    description:
      "Audio translation everywhere and anywhere — breaking the web's language barrier by translating the audio of any tab in real-time.",
    link: "https://github.com/shlawgathon/interpreter",
    linkLabel: "GitHub",
    type: "github" as const,
  },
  {
    title: "AI Twitch Chat",
    description:
      "An agent-simulated Twitch chat. Stream to tens of thousands of fans with a click of a button.",
    link: "https://github.com/xiejosh/ai-twitch-chat",
    linkLabel: "GitHub",
    type: "github" as const,
  },
  {
    title: "Hinge Match Text Responder",
    description:
      "An agent to automatically respond to your romantic interests over iMessage.",
    link: "https://github.com/xiejosh/auto-text-responder",
    linkLabel: "GitHub",
    type: "github" as const,
  },
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

export default function Projects() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-[max(1rem,2vw)] py-16">
      <AsciiBackground showCompanies={false} />

      <div className="relative z-10">
        <p className="mb-4 text-sm text-accent">
          <Typewriter text="$ ls ~/projects" delay={100} />
        </p>
        <h1 className="mb-10 text-3xl font-bold sm:text-4xl">
          <Typewriter text="projects" delay={700} />
        </h1>

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, i) => (
            <BootReveal key={project.title} delay={1200 + i * 120} className="h-full">
              <div className="group relative flex h-full flex-col rounded-lg border border-card-border bg-card-bg/70 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                <div className="flex flex-1 items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="mb-2 text-lg font-semibold transition-colors group-hover:text-accent">
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
                      className="mt-1 shrink-0 rounded-md border border-card-border p-2 text-muted transition-all hover:border-accent/50 hover:text-accent"
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
                  <span className="mt-3 inline-block text-xs italic text-muted">
                    {project.linkLabel}
                  </span>
                )}
              </div>
            </BootReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
