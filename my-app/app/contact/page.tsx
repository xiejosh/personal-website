"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail, HiBriefcase, HiArrowRight } from "react-icons/hi";

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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-lg text-muted">
          Interested in working together or just want to say hi? Feel free to
          reach out through any of the channels below.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2"
      >
        {contacts.map((contact) => (
          <motion.a
            key={contact.label}
            variants={item}
            href={contact.href}
            target={contact.href.startsWith("mailto") ? undefined : "_blank"}
            rel={contact.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="group flex items-start gap-4 rounded-xl border border-card-border bg-card-bg p-5 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="rounded-lg bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
              <contact.icon size={22} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted">{contact.label}</p>
              <p className="font-medium group-hover:text-accent transition-colors">
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
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
