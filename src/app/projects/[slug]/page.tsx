import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import projects from "@/data/projects.json";

type Project = {
  name: string;
  slug: string;
  image?: string;
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

const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/projects/atrium.jpg": { width: 1440, height: 1141 },
  "/projects/emporio-youth-summit.jpg": { width: 1440, height: 900 },
  "/projects/rasoi.jpg": { width: 1440, height: 900 },
  "/projects/zingy.jpg": { width: 1440, height: 900 },
};

export const dynamicParams = false;

function getProject(slug: string) {
  return allProjects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return allProjects.map(({ slug }) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const path = `/projects/${project.slug}/`;
  const dimensions = project.image ? IMAGE_DIMENSIONS[project.image] : undefined;

  return {
    title: `${project.name} — Ayaan Gandhi`,
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${project.name} — Ayaan Gandhi`,
      description: project.description,
      url: path,
      images: project.image
        ? [
            {
              url: project.image,
              width: dimensions?.width ?? 1440,
              height: dimensions?.height ?? 900,
              alt: `${project.name} screenshot`,
            },
          ]
        : [
            {
              url: "/og.png",
              width: 1200,
              height: 630,
              alt: "Ayaan Gandhi's portfolio home page over a magenta, violet and cyan gradient",
            },
          ],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = allProjects.findIndex((p) => p.slug === project.slug);
  const previous = allProjects[(index - 1 + allProjects.length) % allProjects.length];
  const next = allProjects[(index + 1) % allProjects.length];

  const isOpenSource =
    project.category === "opensource" || project.openSource === true;
  const websiteUrl =
    project.url && !project.url.includes("github") ? project.url : null;
  const repoUrl = isOpenSource
    ? project.github || (project.url?.includes("github") ? project.url : null)
    : null;
  const dimensions = project.image ? IMAGE_DIMENSIONS[project.image] : undefined;
  const canonical = `https://ayaanngandhi.in/projects/${project.slug}/`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    url: websiteUrl ?? canonical,
    ...(project.github ? { codeRepository: project.github } : {}),
    author: { "@id": "https://ayaanngandhi.in/#person" },
  };

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} />
        cd ../projects
      </Link>

      <header className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.name}
        </h1>
        {isOpenSource && (
          <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2 py-px font-mono text-[10px] text-green-400">
            open source
          </span>
        )}
        {project.status.toLowerCase() !== "open source" && (
          <span className="rounded-full border border-border px-2 py-px font-mono text-[10px] text-muted">
            {project.status}
          </span>
        )}
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
            aria-label={`${project.name} on GitHub`}
          >
            <GithubIcon size={16} />
          </a>
        )}
      </header>

      <p className="mt-6 text-lg leading-relaxed text-foreground">
        {project.description}
      </p>

      {project.image && (
        <div className="mt-8 overflow-hidden rounded-lg border border-border glass">
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            width={dimensions?.width ?? 1440}
            height={dimensions?.height ?? 900}
            unoptimized
            priority
            className="h-auto w-full"
          />
        </div>
      )}

      <section className="mt-10 rounded-lg border border-border glass p-6">
        <h2 className="text-xl font-semibold">About this project</h2>
        <p className="mt-3 leading-relaxed text-muted">{project.details}</p>
      </section>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.tech.map((technology) => (
          <span
            key={technology}
            className="rounded-md bg-background px-2 py-0.5 font-mono text-xs text-muted"
          >
            {technology}
          </span>
        ))}
      </div>

      {(websiteUrl || repoUrl) && (
        <div className="mt-8 flex flex-wrap items-center gap-5">
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
            >
              <ExternalLink size={14} />
              Live site
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
            >
              <GithubIcon size={14} />
              Repository
            </a>
          )}
        </div>
      )}

      <nav
        aria-label="Project navigation"
        className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
      >
        <Link
          href={`/projects/${previous.slug}/`}
          className="group rounded-lg border border-border glass p-4 transition-colors hover:border-accent"
        >
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
            <ArrowLeft size={12} />
            Previous
          </span>
          <span className="mt-1 block font-semibold transition-colors group-hover:text-accent">
            {previous.name}
          </span>
        </Link>
        <Link
          href={`/projects/${next.slug}/`}
          className="group rounded-lg border border-border glass p-4 transition-colors hover:border-accent sm:text-right"
        >
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted sm:justify-end">
            Next
            <ArrowRight size={12} />
          </span>
          <span className="mt-1 block font-semibold transition-colors group-hover:text-accent">
            {next.name}
          </span>
        </Link>
      </nav>

      <div className="mt-10 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
        >
          View all projects
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
