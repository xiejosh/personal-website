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

interface Planet {
  name: string;
  size: number;
  x: string;
  y: string;
  duration: number;
  delay: number;
  background: string;
  shadow: string;
  ring?: { width: number; color: string; tilt: number };
  tilt?: number;
}

const planets: Planet[] = [
  {
    name: "Earth",
    size: 90,
    x: "8%",
    y: "18%",
    duration: 4.5,
    delay: 0,
    background: `
      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 40%),
      radial-gradient(ellipse at 60% 40%, #2d8a4e 0%, transparent 50%),
      radial-gradient(ellipse at 40% 60%, #2d8a4e 0%, transparent 40%),
      radial-gradient(ellipse at 75% 30%, #1a5c32 0%, transparent 30%),
      radial-gradient(circle at 50% 50%, #1a6fa0 0%, #0d3b66 60%, #071e33 100%)
    `,
    shadow: "inset -8px -8px 20px rgba(0,0,0,0.5), inset 4px 4px 10px rgba(255,255,255,0.1), 0 0 50px rgba(30,144,255,0.35), 0 0 100px rgba(30,144,255,0.15)",
  },
  {
    name: "Jupiter",
    size: 130,
    x: "78%",
    y: "45%",
    duration: 6,
    delay: 0.5,
    background: `
      radial-gradient(circle at 30% 25%, rgba(255,255,255,0.2) 0%, transparent 35%),
      repeating-linear-gradient(
        0deg,
        #c4956a 0px, #c4956a 8px,
        #d4a574 8px, #d4a574 14px,
        #a67c52 14px, #a67c52 20px,
        #e8c49a 20px, #e8c49a 26px,
        #8b6340 26px, #8b6340 34px,
        #d4a574 34px, #d4a574 40px,
        #c9845c 40px, #c9845c 48px,
        #deb887 48px, #deb887 54px
      ),
      radial-gradient(circle at 50% 50%, #d4a574 0%, #8b6340 100%)
    `,
    shadow: "inset -12px -10px 30px rgba(0,0,0,0.5), inset 5px 5px 15px rgba(255,255,255,0.1), 0 0 60px rgba(210,160,110,0.35), 0 0 120px rgba(210,160,110,0.15)",
  },
  {
    name: "Saturn",
    size: 100,
    x: "65%",
    y: "62%",
    duration: 5.5,
    delay: 1,
    background: `
      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 40%),
      repeating-linear-gradient(
        0deg,
        #e8d5a3 0px, #e8d5a3 7px,
        #c9b87c 7px, #c9b87c 12px,
        #dcc68e 12px, #dcc68e 18px,
        #b8a76c 18px, #b8a76c 22px
      ),
      radial-gradient(circle at 50% 50%, #dcc68e 0%, #9a8a5c 100%)
    `,
    shadow: "inset -10px -8px 25px rgba(0,0,0,0.45), inset 4px 4px 12px rgba(255,255,255,0.1), 0 0 50px rgba(220,198,142,0.35), 0 0 100px rgba(220,198,142,0.15)",
    ring: { width: 190, color: "rgba(210,190,140,0.45)", tilt: 65 },
    tilt: -20,
  },
  {
    name: "Neptune",
    size: 75,
    x: "18%",
    y: "72%",
    duration: 5,
    delay: 0.3,
    background: `
      radial-gradient(circle at 30% 30%, rgba(200,220,255,0.3) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 45%, #4169e1 0%, transparent 60%),
      radial-gradient(circle at 50% 50%, #2846a0 0%, #1a2d6d 60%, #0f1a40 100%)
    `,
    shadow: "inset -8px -6px 20px rgba(0,0,0,0.5), inset 3px 3px 10px rgba(150,180,255,0.15), 0 0 45px rgba(65,105,225,0.35), 0 0 90px rgba(65,105,225,0.15)",
  },
  {
    name: "Uranus",
    size: 65,
    x: "48%",
    y: "15%",
    duration: 4,
    delay: 0.8,
    background: `
      radial-gradient(circle at 30% 30%, rgba(220,240,255,0.3) 0%, transparent 40%),
      radial-gradient(ellipse at 45% 50%, #7ec8e3 0%, transparent 60%),
      radial-gradient(circle at 50% 50%, #5ba3c9 0%, #3a7ca5 60%, #1f4f6e 100%)
    `,
    shadow: "inset -6px -5px 18px rgba(0,0,0,0.4), inset 3px 3px 8px rgba(200,230,255,0.15), 0 0 40px rgba(94,200,227,0.35), 0 0 80px rgba(94,200,227,0.15)",
  },
];

function PlanetElement({ planet }: { planet: Planet }) {
  return (
    <motion.div
      className="absolute opacity-70"
      style={{
        left: planet.x,
        top: planet.y,
        width: planet.ring ? planet.ring.width : planet.size,
        height: planet.ring ? planet.ring.width : planet.size,
        rotate: planet.tilt ?? 0,
      }}
      animate={{
        y: [0, -18, 0, 14, 0],
        x: [0, 6, 0, -6, 0],
      }}
      transition={{
        duration: planet.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: planet.delay,
      }}
    >
      {/* Ring behind (bottom half) */}
      {planet.ring && (
        <div
          className="absolute rounded-full border-4 opacity-70"
          style={{
            width: planet.ring.width,
            height: planet.ring.width * 0.35,
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) rotateX(${planet.ring.tilt}deg)`,
            borderColor: planet.ring.color,
            background: `linear-gradient(90deg, transparent 10%, ${planet.ring.color} 30%, ${planet.ring.color} 70%, transparent 90%)`,
            zIndex: 0,
            clipPath: "inset(50% 0 0 0)",
          }}
        />
      )}
      {/* Planet sphere */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: planet.size,
          height: planet.size,
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
          background: planet.background,
          boxShadow: planet.shadow,
          zIndex: 1,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 60 + planet.size * 0.3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Ring in front (top half) */}
      {planet.ring && (
        <div
          className="absolute rounded-full border-4 opacity-70"
          style={{
            width: planet.ring.width,
            height: planet.ring.width * 0.35,
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) rotateX(${planet.ring.tilt}deg)`,
            borderColor: planet.ring.color,
            background: `linear-gradient(90deg, transparent 10%, ${planet.ring.color} 30%, ${planet.ring.color} 70%, transparent 90%)`,
            zIndex: 2,
            clipPath: "inset(0 0 50% 0)",
          }}
        />
      )}
    </motion.div>
  );
}

export default function Contact() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-24">
      {/* Bobbing planets */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {planets.map((planet) => (
          <PlanetElement key={planet.name} planet={planet} />
        ))}
      </div>
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
