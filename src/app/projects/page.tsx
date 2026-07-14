"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import projects from "@/data/projects.json";

const builtProjects = projects.filter((p) => p.category === "built");
const openSourceProjects = projects.filter((p) => p.category === "opensource");

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <motion.div
      variants={item}
      className="group rounded-lg border border-border bg-surface p-5 transition-all hover:border-accent hover:shadow-[0_0_20px_rgba(34,211,238,0.05)]"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-semibold">{project.name}</h3>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
            aria-label={`View ${project.name} on GitHub`}
          >
            {project.url.includes("github") ? (
              <GithubIcon size={16} />
            ) : (
              <ExternalLink size={16} />
            )}
          </a>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md bg-background px-2 py-0.5 font-mono text-xs text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-mono text-sm text-accent">
          <span className="text-muted">$</span> ls projects/
        </h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight">Projects</h2>
        <p className="mt-2 text-muted">
          Things I&apos;ve built and contributed to.
        </p>
      </motion.div>

      {/* Built */}
      <section className="mt-12">
        <h3 className="text-lg font-semibold text-accent">Built</h3>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          {builtProjects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </motion.div>
      </section>

      {/* Open Source */}
      <section className="mt-12">
        <h3 className="text-lg font-semibold text-accent">Open Source</h3>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          {openSourceProjects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
