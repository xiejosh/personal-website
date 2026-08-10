"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail, HiBriefcase, HiArrowRight } from "react-icons/hi";
import AsciiBackground from "../components/AsciiBackground";
import { Typewriter, BootReveal } from "../components/Boot";

const contacts = [
  {
    label: "Personal Email",
    value: "joshxie03@gmail.com",
    href: "mailto:joshxie03@gmail.com",
    icon: HiMail,
    description: "For general inquiries",
  },
  {
    label: "Business Email",
    value: "joshxie@umich.edu",
    href: "mailto:joshxie@umich.edu",
    icon: HiBriefcase,
    description: "For professional & business inquiries",
  },
  {
    label: "GitHub",
    value: "xiejosh",
    href: "https://github.com/xiejosh",
    icon: FaGithub,
    description: "Check out my projects",
  },
  {
    label: "LinkedIn",
    value: "josh-xie",
    href: "https://www.linkedin.com/in/josh-xie/",
    icon: FaLinkedin,
    description: "Let's connect",
  },
];

export default function Contact() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-[max(1rem,2vw)] py-16">
      <AsciiBackground showCompanies={false} />

      <div className="relative z-10">
        <p className="mb-4 text-sm text-accent">
          <Typewriter text="$ ./contact.sh" delay={100} />
        </p>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          <Typewriter text="get in touch" delay={700} />
        </h1>
        <BootReveal delay={1400} className="mb-12 max-w-2xl">
          <p className="text-lg text-muted">
            Interested in working together or just want to say hi? Feel free to
            reach out through any of the channels below.
          </p>
        </BootReveal>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {contacts.map((contact, i) => (
            <BootReveal key={contact.label} delay={1700 + i * 150} className="h-full">
              <a
                href={contact.href}
                target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                rel={contact.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group flex h-full items-start gap-4 rounded-lg border border-card-border bg-card-bg/70 p-5 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="rounded-md bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
                  <contact.icon size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted">{contact.label}</p>
                  <p className="font-medium transition-colors group-hover:text-accent">
                    {contact.value}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                    {contact.description}
                    <HiArrowRight
                      size={12}
                      className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </p>
                </div>
              </a>
            </BootReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
