"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Info, X } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import projects from "@/data/projects.json";

type Project = {
  name: string;
  description: string;
  details: string;
  tech: string[];
  category: string;
  status: string;
  url?: string;
  github?: string;
  openSource?: boolean;
};

const allProjects = projects as Project[];
const builtProjects = allProjects.filter((p) => p.category === "built");
const openSourceProjects = allProjects.filter((p) => p.category === "opensource");

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
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
}) {
  const isOpenSource = project.category === "opensource" || project.openSource;
  const websiteUrl = project.url && !project.url.includes("github") ? project.url : null;

  return (
    <motion.div
      variants={item}
      className="group rounded-lg border border-border glass p-5 transition-all hover:border-accent hover:shadow-[0_0_20px_rgba(34,211,238,0.05)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{project.name}</h3>
          {isOpenSource && (
            <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2 py-px font-mono text-[10px] text-green-400">
              open source
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
              aria-label={`Visit ${project.name}`}
            >
              <ExternalLink size={16} />
            </a>
          )}
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            aria-haspopup="dialog"
            className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Info size={14} />
            More detail
          </button>
        </div>
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

function ProjectDialog({
  project,
  onClose,
  dialogRef,
}: {
  project: Project | null;
  onClose: () => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}) {
  const titleId = project
    ? `detail-title-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    : undefined;
  const repoUrl = project
    ? project.github || (project.url?.includes("github") ? project.url : null)
    : null;
  const websiteUrl =
    project && project.url && !project.url.includes("github") ? project.url : null;
  // Shown inside the detail dialog only, for projects whose repository is the
  // deliverable itself (the Contributed / open-source set). Cards never link
  // to GitHub.
  const showRepo = project?.category === "opensource" && repoUrl;

  // Native <dialog> makes the rest of the page inert but does not wrap Tab
  // focus at the edges, so trap it explicitly.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab") return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusables = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (!active || !dialog.contains(active)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onKeyDown={handleKeyDown}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="m-auto w-[min(34rem,calc(100vw-2rem))] max-h-[85vh] overflow-y-auto rounded-lg border border-border glass-dialog detail-dialog p-5 text-foreground"
    >
      {project && (
        <>
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <h3 id={titleId} className="text-lg font-semibold">
                {project.name}
              </h3>
              <span className="rounded-full border border-border px-2 py-px font-mono text-[10px] text-muted">
                {project.status}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close detail"
              className="text-muted transition-colors hover:text-accent"
            >
              <X size={18} />
            </button>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {project.details}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-background px-2 py-0.5 font-mono text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          {(websiteUrl || showRepo) && (
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  <ExternalLink size={14} />
                  Live product
                </a>
              )}
              {showRepo && repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  <GithubIcon size={14} />
                  Repository
                </a>
              )}
            </div>
          )}
        </>
      )}
    </dialog>
  );
}

export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) {
      dialog.showModal();
    } else if (!selected && dialog.open) {
      dialog.close();
    }
  }, [selected]);

  const openDetail = (project: Project, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger;
    setSelected(project);
  };

  const closeDetail = () => {
    setSelected(null);
    lastTrigger.current?.focus();
  };

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
            <ProjectCard key={p.name} project={p} onOpen={openDetail} />
          ))}
        </motion.div>
      </section>

      {/* Contributed */}
      <section className="mt-12">
        <h3 className="text-lg font-semibold text-accent">Contributed</h3>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          {openSourceProjects.map((p) => (
            <ProjectCard key={p.name} project={p} onOpen={openDetail} />
          ))}
        </motion.div>
      </section>

      <ProjectDialog
        project={selected}
        onClose={closeDetail}
        dialogRef={dialogRef}
      />
    </div>
  );
}
