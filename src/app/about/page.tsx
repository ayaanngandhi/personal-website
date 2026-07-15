"use client";

import { motion } from "framer-motion";
import * as Si from "react-icons/si";
import site from "@/data/site.json";
import skills from "@/data/skills.json";

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
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((skill) => {
            const IconComponent = (Si as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[skill.icon];
            return (
              <motion.div
                key={skill.name}
                variants={item}
                className="group rounded-lg border border-border glass p-5 transition-all hover:border-accent hover:shadow-[0_0_20px_rgba(34,211,238,0.05)]"
              >
                <div className="flex items-center gap-3">
                  {IconComponent && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-background">
                      <IconComponent
                        size={20}
                        className="text-muted transition-colors group-hover:text-accent"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    {"subtext" in skill && (
                      <p className="mt-0.5 text-xs text-muted">
                        {(skill as any).subtext}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>
    </div>
  );
}
