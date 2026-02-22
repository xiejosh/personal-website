"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HiChevronDown } from "react-icons/hi";
import {
  FaJava,
  FaPython,
  FaRust,
  FaSwift,
  FaReact,
  FaAngular,
  FaNodeJs,
  FaAws,
  FaDatabase,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiReact as SiReactNative,
  SiFirebase,
  SiFlask,
  SiDjango,
  SiPostgresql,
  SiSupabase,
  SiMysql,
  SiSqlite,
  SiAmazondynamodb,
  SiAmazons3,
  SiAwslambda,
  SiAmazonecs,
  SiAmazonsqs,
} from "react-icons/si";
import { TbCursorText } from "react-icons/tb";
import { IconType } from "react-icons";

// ── Skill data ──────────────────────────────────────────────

interface Skill {
  name: string;
  icon?: IconType;
  logo?: string;
  url: string;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Java", icon: FaJava, url: "https://www.java.com", color: "#f89820" },
      { name: "Python", icon: FaPython, url: "https://www.python.org", color: "#3776ab" },
      { name: "SQL", icon: FaDatabase, url: "https://en.wikipedia.org/wiki/SQL", color: "#e38d13" },
      { name: "C++", icon: SiCplusplus, url: "https://isocpp.org", color: "#00599c" },
      { name: "TypeScript", icon: SiTypescript, url: "https://www.typescriptlang.org", color: "#3178c6" },
      { name: "JavaScript", icon: SiJavascript, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#f7df1e" },
      { name: "HTML", icon: SiHtml5, url: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "#e34f26" },
      { name: "CSS", icon: SiCss3, url: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "#1572b6" },
      { name: "Rust", icon: FaRust, url: "https://www.rust-lang.org", color: "#ce422b" },
      { name: "Swift", icon: FaSwift, url: "https://www.swift.org", color: "#f05138" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, url: "https://nextjs.org", color: "#ffffff" },
      { name: "React", icon: FaReact, url: "https://react.dev", color: "#61dafb" },
      { name: "React Native", icon: SiReactNative, url: "https://reactnative.dev", color: "#61dafb" },
      { name: "Angular", icon: FaAngular, url: "https://angular.dev", color: "#dd0031" },
    ],
  },
  {
    title: "AI Development",
    skills: [
      { name: "Cursor", logo: "/cursor_logo.png", url: "https://cursor.com", color: "#ffffff" },
      { name: "Claude Code", logo: "/claude_code_logo.svg", url: "https://claude.ai/code", color: "#d97757" },
      { name: "Codex", logo: "/codex_logo.png", url: "https://openai.com/index/openai-codex/", color: "#10a37f" },
      { name: "Amazon Q", logo: "/amazon_q_logo.png", url: "https://aws.amazon.com/q/", color: "#ff9900" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs, url: "https://nodejs.org", color: "#339933" },
      { name: "Firebase", icon: SiFirebase, url: "https://firebase.google.com", color: "#ffca28" },
      { name: "Flask", icon: SiFlask, url: "https://flask.palletsprojects.com", color: "#ffffff" },
      { name: "Django", icon: SiDjango, url: "https://www.djangoproject.com", color: "#092e20" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, url: "https://www.postgresql.org", color: "#4169e1" },
      { name: "Supabase", icon: SiSupabase, url: "https://supabase.com", color: "#3fcf8e" },
      { name: "MySQL", icon: SiMysql, url: "https://www.mysql.com", color: "#4479a1" },
      { name: "SQLite", icon: SiSqlite, url: "https://www.sqlite.org", color: "#003b57" },
    ],
  },
  {
    title: "AWS Services",
    skills: [
      { name: "API Gateway", logo: "/api_gateway_logo.svg", url: "https://aws.amazon.com/api-gateway/", color: "#ff9900" },
      { name: "DynamoDB", icon: SiAmazondynamodb, url: "https://aws.amazon.com/dynamodb/", color: "#4053d6" },
      { name: "Q for Business", logo: "/amazon_q_logo.png", url: "https://aws.amazon.com/q/", color: "#ff9900" },
      { name: "S3", icon: SiAmazons3, url: "https://aws.amazon.com/s3/", color: "#569a31" },
      { name: "Kendra", logo: "/kendra_logo.png", url: "https://aws.amazon.com/kendra/", color: "#ff9900" },
      { name: "Lambda", icon: SiAwslambda, url: "https://aws.amazon.com/lambda/", color: "#ff9900" },
      { name: "Fargate", icon: SiAmazonecs, url: "https://aws.amazon.com/fargate/", color: "#ff9900" },
      { name: "EC2/EKS", logo: "/ec2_logo.png", url: "https://aws.amazon.com/ec2/", color: "#ff9900" },
      { name: "SQS", icon: SiAmazonsqs, url: "https://aws.amazon.com/sqs/", color: "#ff4f8b" },
      { name: "SNS", logo: "/sns_logo.png", url: "https://aws.amazon.com/sns/", color: "#ff4f8b" },
      { name: "SageMaker", logo: "/sagemaker_logo.png", url: "https://aws.amazon.com/sagemaker/", color: "#a166ff" },
      { name: "Bedrock", logo: "/bedrock_logo.png", url: "https://aws.amazon.com/bedrock/", color: "#a166ff" },
    ],
  },
];

const education = [
  {
    school: "University of Michigan",
    degree: "BSE in Computer Science",
    period: "Aug 2022 – May 2026",
    sections: [
      {
        label: "Relevant Coursework",
        items: [
          "[EECS 280] OOP in C++",
          "[EECS 281] Data Structures and Algorithms in C++",
          "[EECS 370] Computer Organization",
          "[EECS 376] Foundations and Algorithms of Computer Science",
          "[EECS 445] Machine Learning",
          "[EECS 481] Software Engineering",
          "[EECS 482] Operating Systems",
          "[EECS 491] Distributed Systems",
          "[EECS 492] Artificial Intelligence",
        ],
      },
      {
        label: "Activities & Extracurriculars",
        items: [
          "Alpha Kappa Psi Professional Business Fraternity - VP Technology",
          "Division III Badminton",
          "Michigan Data Science Team",
          "Sigma Nu Fraternity",
        ],
      },
    ],
  },
  {
    school: "Newport Senior High School",
    degree: "High School Diploma",
    period: "Sep 2018 – Jun 2022",
    sections: [
      {
        label: "Academics",
        items: [
          "AP Computer Science",
          "1500 SAT",
          "USACO Platinum",
        ],
      },
      {
        label: "Activities & Extracurriculars",
        items: [
          "Student Government – Treasurer",
          "Football – Captain",
          "Competitive Badminton – Ranked Top 40 in U17 BS, BD, XD",
          "Cross Country",
          "Track & Field",
          "Swim & Dive",
        ],
      },
    ],
  },
];

// ── Components ──────────────────────────────────────────────

function SkillDropdown({ category }: { category: SkillCategory }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-card-border bg-card-bg">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-base font-semibold transition-colors hover:text-accent"
      >
        {category.title}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:grid-cols-4">
              {category.skills.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 rounded-lg border border-card-border bg-background p-4 transition-all hover:border-accent/40 hover:shadow-md hover:shadow-accent/5"
                >
                  {skill.logo ? (
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain transition-transform group-hover:scale-110"
                    />
                  ) : skill.icon ? (
                    <skill.icon
                      size={28}
                      style={{ color: skill.color }}
                      className="transition-transform group-hover:scale-110"
                    />
                  ) : null}
                  <span className="text-center text-sm text-muted group-hover:text-foreground">
                    {skill.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EducationDropdown({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 border-t border-card-border px-5 py-3 text-sm text-muted transition-colors hover:text-accent"
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown size={16} />
        </motion.div>
        {label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-1.5 px-5 pb-4">
              {items.map((item) => (
                <li key={item} className="text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function EducationCard({ edu }: { edu: { school: string; degree: string; period: string; sections: { label: string; items: string[] }[] } }) {
  return (
    <div className="rounded-xl border border-card-border bg-card-bg">
      <div className="p-5">
        <h3 className="text-base font-semibold">{edu.school}</h3>
        <p className="text-base text-accent">{edu.degree}</p>
        <p className="mt-1 text-sm text-muted">{edu.period}</p>
      </div>
      {edu.sections.map((section) => (
        <EducationDropdown key={section.label} label={section.label} items={section.items} />
      ))}
    </div>
  );
}

// ── Stagger animation wrapper ───────────────────────────────

const containerLeft = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const containerRight = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const itemRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

// ── Rain effect ─────────────────────────────────────────────

function Rain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Drop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }

    const drops: Drop[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 15 + Math.random() * 25,
      speed: 4 + Math.random() * 6,
      opacity: 0.08 + Math.random() * 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pageHeight = document.documentElement.scrollHeight;
      if (canvas.height !== pageHeight) {
        canvas.height = pageHeight;
      }

      for (const drop of drops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = `rgba(140, 160, 255, ${drop.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}

// ── Page ────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="relative mx-auto max-w-5xl px-6 py-24">
      <Rain />
      {/* Bio — left aligned */}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-20"
      >
        <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
          About <span className="gradient-text">Me</span>
        </h1>
        <p className="text-lg leading-relaxed text-muted">
          hi, i&apos;m josh! i&apos;m originally from seattle but currently based in the bay area.
          also a cse student at umich if that matters. i love everything tech, but specifically ai/ml, db engineering,
          cv, robotics, saas, and crypto. i like eating, raving, running, djing, hiking, and much more, as i&apos;ll
          literally try anything if it&apos;s in front of my face. connect{" "}
          <a
            href="https://www.linkedin.com/in/josh-xie/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent transition-colors hover:text-accent-secondary"
          >
            here
          </a>
          {" "}if you are a startup founder, a fellow rave goer, or in the bay area and want to meet up :)
        </p>
      </motion.section>

      {/* Education */}
      <motion.section
        variants={containerLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="mb-20"
      >
        <h2 className="mb-6 text-2xl font-bold">Education</h2>
        <div className="flex flex-col gap-4">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              variants={itemLeft}
            >
              <EducationCard edu={edu} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section
        variants={containerLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="mb-6 text-2xl font-bold">
          Skills & Technologies
        </h2>
        <div className="flex flex-col gap-3">
          {skillCategories.map((cat) => (
            <motion.div key={cat.title} variants={itemLeft}>
              <SkillDropdown category={cat} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
