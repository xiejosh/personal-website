"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { TbBrain } from "react-icons/tb";
import { IconType } from "react-icons";

const roles = [
  "CS student",
  "software engineer",
  "avid gamer",
  "collegiate badminton player",
  "food enthusiast",
];

interface Experience {
  role: string;
  company: string;
  period: string;
  color: string;
  logo?: string;
  icon?: IconType;
  url?: string;
}

const experience: Experience[] = [
  { role: "Founder / CEO", company: "Stealth Startup", period: "Nov 2025 – Present", logo: "/stealth_startup_logo.jpeg", color: "#a78bfa" },
  { role: "SDE Intern", company: "Amazon", period: "May 2025 – Aug 2025", logo: "/amazon_logo.jpeg", color: "#ff9900", url: "https://www.amazon.com" },
  { role: "SDE Intern", company: "Amazon", period: "Jun 2024 – Sep 2024", logo: "/amazon_logo.jpeg", color: "#ff9900", url: "https://www.amazon.com" },
  { role: "SWE Intern", company: "Microsoft", period: "May 2023 – Aug 2023", logo: "/microsoft_logo.png", color: "#00a4ef", url: "https://www.microsoft.com" },
  { role: "ML Research Intern", company: "Wormpex AI", period: "Jun 2022 – Aug 2022", icon: TbBrain, color: "#10b981" },
];

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-block gradient-text"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ShootingStar({ delay, startX }: { delay: number; startX: string }) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: startX,
        top: "-20px",
        rotate: "135deg",
      }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: "-100vw",
        y: "100vh",
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 1 + Math.random() * 3,
        ease: "easeIn",
      }}
    >
      {/* Head */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 6,
          height: 6,
          background: "rgba(255,255,255,0.7)",
          boxShadow: "0 0 6px rgba(255,255,255,0.5), 0 0 12px rgba(255,255,255,0.2)",
        }}
      />
      {/* Tail */}
      <div
        style={{
          width: "160px",
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0.6) 100%)",
        }}
      />
    </motion.div>
  );
}

function NeonSquare({ delay, x, y, size, color }: { delay: number; x: string; y: string; size: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-md"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        border: `1.5px solid ${color}`,
        boxShadow: `0 0 8px ${color}, inset 0 0 4px ${color}`,
      }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 8, -8, 0],
        opacity: [0.15, 0.35, 0.15],
      }}
      transition={{
        duration: 5 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Home() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-6">
      {/* Neon squares */}
      <NeonSquare delay={0} x="5%" y="15%" size={24} color="rgba(99,102,241,0.4)" />
      <NeonSquare delay={1.2} x="15%" y="70%" size={18} color="rgba(139,92,246,0.35)" />
      <NeonSquare delay={0.6} x="30%" y="8%" size={14} color="rgba(167,139,250,0.3)" />
      <NeonSquare delay={2} x="50%" y="75%" size={20} color="rgba(99,102,241,0.35)" />
      <NeonSquare delay={0.3} x="70%" y="12%" size={22} color="rgba(139,92,246,0.4)" />
      <NeonSquare delay={1.8} x="85%" y="55%" size={16} color="rgba(167,139,250,0.35)" />
      <NeonSquare delay={2.5} x="92%" y="20%" size={12} color="rgba(99,102,241,0.3)" />
      <NeonSquare delay={1} x="42%" y="40%" size={10} color="rgba(139,92,246,0.25)" />
      <NeonSquare delay={3} x="78%" y="80%" size={26} color="rgba(167,139,250,0.3)" />
      <NeonSquare delay={0.8} x="8%" y="45%" size={16} color="rgba(99,102,241,0.3)" />
      {/* Large colored squares */}
      <NeonSquare delay={0} x="8%" y="18%" size={80} color="rgba(250,204,21,0.35)" />
      <NeonSquare delay={1.5} x="55%" y="65%" size={120} color="rgba(74,222,128,0.3)" />
      <NeonSquare delay={0.8} x="78%" y="10%" size={60} color="rgba(248,113,113,0.35)" />

      {/* Shooting stars */}
      <ShootingStar delay={0} startX="30%" />
      <ShootingStar delay={1.5} startX="70%" />
      <ShootingStar delay={3} startX="50%" />
      <ShootingStar delay={4.5} startX="85%" />
      <ShootingStar delay={6} startX="20%" />
      <ShootingStar delay={7.5} startX="60%" />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent-secondary/5 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 md:flex-row md:items-center md:justify-between">
        {/* Left side: headshot + intro text */}
        <div className="flex-1 text-left">
          {/* Headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-2 border-card-border glow">
              <Image
                src="/headshot.png"
                alt="Josh Xie"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 font-mono text-sm text-accent"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-2 text-5xl font-bold tracking-tight sm:text-7xl"
          >
            Josh Xie
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-2 text-2xl font-semibold text-muted sm:text-3xl"
          >
            building in stealth
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-10 text-xl text-muted sm:text-2xl"
          >
            also <RotatingRole />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <Link
              href="/about"
              className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-secondary hover:shadow-lg hover:shadow-accent/20"
            >
              Learn more about me
              <HiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="flex gap-3">
              <a
                href="https://github.com/xiejosh"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-card-border p-3 text-muted transition-all hover:border-accent/50 hover:text-foreground"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/josh-xie/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-card-border p-3 text-muted transition-all hover:border-accent/50 hover:text-foreground"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right side: Experience timeline */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="shrink-0"
        >
          <div className="relative flex">
            {/* Text + logos column */}
            <div className="flex flex-col">
              {experience.map((exp, i) => {
                const content = (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className={`group flex items-center gap-5 rounded-xl p-4 text-right transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10 ${exp.url ? "cursor-pointer" : ""} mb-4 last:mb-0`}
                  >
                    {/* Text */}
                    <div className="flex-1">
                      <h4 className="text-base font-bold" style={{ color: exp.color }}>{exp.company}</h4>
                      <p className="text-sm font-medium text-foreground">{exp.role}</p>
                      <p className="mt-0.5 text-sm text-muted">{exp.period}</p>
                    </div>
                    {/* Logo */}
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-card-border ${exp.logo ? "bg-white" : "bg-card-bg"}`}
                    >
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={56}
                          height={56}
                          className={`h-full w-full ${exp.logo === "/microsoft_logo.png" ? "object-contain p-2" : "object-cover"}`}
                        />
                      ) : exp.icon ? (
                        <exp.icon size={24} style={{ color: exp.color }} />
                      ) : null}
                    </div>
                  </motion.div>
                );

                return exp.url ? (
                  <a key={i} href={exp.url} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </div>

            {/* Progress bar with dots */}
            <div className="relative ml-6 flex w-4 flex-col items-center">
              <div className="absolute inset-x-1/2 top-6 bottom-6 w-0.5 -translate-x-1/2 bg-foreground/30" />
              {experience.map((_, i) => (
                <div
                  key={i}
                  className="z-10 flex flex-1 items-center justify-center"
                >
                  <div className="h-3 w-3 rounded-full border-2 border-foreground/50 bg-background" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
