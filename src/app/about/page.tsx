"use client";

import { motion } from "framer-motion";
import {
  Code2,
  FileCode2,
  Atom,
  Hexagon,
  Zap,
  Sparkles,
  Smartphone,
} from "lucide-react";
import skills from "@/data/skills.json";
import timeline from "@/data/timeline.json";
import site from "@/data/site.json";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  FileCode2,
  Atom,
  Hexagon,
  Zap,
  Sparkles,
  Smartphone,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Bio */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-mono text-sm text-accent">
          <span className="text-muted">$</span> cat about.md
        </h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight">About Me</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {site.bio}
        </p>
      </motion.section>

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-16"
      >
        <h3 className="font-mono text-sm text-accent">
          <span className="text-muted">$</span> ls skills/
        </h3>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">Tech Stack</h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {skills.map((skill) => {
            const Icon = iconMap[skill.icon];
            return (
              <motion.div
                key={skill.name}
                variants={item}
                className="group flex items-center gap-3 rounded-lg border border-border bg-surface p-4 transition-all hover:border-accent hover:shadow-[0_0_20px_rgba(34,211,238,0.05)]"
              >
                {Icon && (
                  <Icon
                    size={20}
                    className="text-muted transition-colors group-hover:text-accent"
                  />
                )}
                <span className="text-sm font-medium">{skill.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-16"
      >
        <h3 className="font-mono text-sm text-accent">
          <span className="text-muted">$</span> cat timeline.log
        </h3>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">Journey</h2>

        <div className="relative mt-6">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-border" />

          <div className="flex flex-col gap-6">
            {timeline.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                className="relative flex gap-4"
              >
                {/* Dot */}
                <div className="relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-accent bg-background" />

                <div>
                  <div className="flex items-baseline gap-3">
                    <h4 className="font-medium">{event.title}</h4>
                    <span className="font-mono text-xs text-accent">
                      {event.year}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
