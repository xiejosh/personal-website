"use client";

import Image from "next/image";
import {
  FaJava,
  FaPython,
  FaRust,
  FaSwift,
  FaReact,
  FaAngular,
  FaNodeJs,
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
import { IconType } from "react-icons";
import AsciiBackground from "../components/AsciiBackground";
import { Typewriter, BootReveal, TerminalWindow } from "../components/Boot";
import Terminal from "../components/Terminal";

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
    title: "AWS",
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

const coursework = [
  "[EECS 280] OOP in C++",
  "[EECS 281] Data Structures and Algorithms in C++",
  "[EECS 370] Computer Organization",
  "[EECS 376] Foundations and Algorithms of CS",
  "[EECS 445] Machine Learning",
  "[EECS 481] Software Engineering",
  "[EECS 482] Operating Systems",
  "[EECS 491] Distributed Systems",
  "[EECS 492] Artificial Intelligence",
];

const activities = [
  "Alpha Kappa Psi Professional Business Fraternity - VP Technology",
  "Division III Badminton",
  "Michigan Data Science Team",
  "Sigma Nu Fraternity",
];

// ── Page ────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-[max(1rem,2vw)] py-6">
      <AsciiBackground showCompanies={false} />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-start">
        {/* Left: bio + terminal */}
        <div className="min-w-0 flex-1">
          <p className="mb-4 text-sm text-accent">
            <Typewriter text="$ cat about.md" delay={100} />
          </p>
          <TerminalWindow title="about.md" delay={700} className="mb-6">
            <div className="p-5">
              <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
                about <span className="gradient-text">me</span>
              </h1>
              <p className="text-base leading-relaxed text-muted">
                hi, i&apos;m josh, and i&apos;m currently based in seattle! i love everything tech, but specifically ai/ml, db engineering,
                cv, robotics, saas, and crypto. i&apos;m also passionate for music, spending a majority of my free time producing or djing. besides from that, i also like eating, raving, running, hiking, and much more. connect{" "}
                <a
                  href="https://www.linkedin.com/in/josh-xie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent transition-colors hover:text-accent-secondary"
                >
                  here
                </a>
                {" "}if you are a startup founder, an investor, a fellow rave goer, or in the seattle area and want to meet up :)
              </p>
            </div>
          </TerminalWindow>

          <BootReveal delay={1500} className="max-w-md">
            <Terminal />
          </BootReveal>
        </div>

        {/* Right: education + skills */}
        <div className="w-full shrink-0 lg:w-[42rem]">
          <section className="mb-6">
            <h2 className="mb-3 text-2xl font-bold">
              <Typewriter text="> education" delay={900} />
            </h2>
            <BootReveal delay={1300}>
              <div className="rounded-lg border border-card-border bg-card-bg/70 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <Image
                    src="/umich_logo.svg"
                    alt="University of Michigan"
                    width={64}
                    height={46}
                    className="h-12 w-16 object-contain"
                  />
                  <div>
                    <p className="text-base font-semibold">BSE in Computer Science</p>
                    <p className="text-sm text-muted">[Aug 2022 – May 2026]</p>
                  </div>
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-accent">&gt; coursework</p>
                    <ul className="flex flex-col gap-0.5">
                      {coursework.map((item) => (
                        <li key={item} className="text-xs text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-accent">&gt; activities</p>
                    <ul className="flex flex-col gap-0.5">
                      {activities.map((item) => (
                        <li key={item} className="text-xs text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </BootReveal>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold">
              <Typewriter text="> skills & technologies" delay={1700} />
            </h2>
            <div className="flex flex-col gap-2">
              {skillCategories.map((cat, i) => (
                <BootReveal key={cat.title} delay={2200 + i * 130}>
                  <div className="flex items-center gap-4 rounded-lg border border-card-border bg-card-bg/70 px-4 py-2 backdrop-blur-sm">
                    <span className="w-36 shrink-0 text-sm font-semibold">{cat.title}</span>
                    <div className="flex flex-wrap items-center gap-3">
                      {cat.skills.map((skill) => (
                        <a
                          key={skill.name}
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={skill.name}
                          aria-label={skill.name}
                          className="transition-transform hover:scale-125"
                        >
                          {skill.logo ? (
                            <Image
                              src={skill.logo}
                              alt={skill.name}
                              width={20}
                              height={20}
                              className="h-5 w-5 object-contain"
                            />
                          ) : skill.icon ? (
                            <skill.icon size={20} style={{ color: skill.color }} />
                          ) : null}
                        </a>
                      ))}
                    </div>
                  </div>
                </BootReveal>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
