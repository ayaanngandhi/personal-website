"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ChevronRight } from "lucide-react";
import { GithubIcon, XIcon, InstagramIcon } from "@/components/Icons";
import Link from "next/link";
import Image from "next/image";
import site from "@/data/site.json";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-24">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative h-36 w-36 overflow-hidden rounded-full ring-2 ring-accent/30">
            <Image
              src="/profile.png"
              alt="Ayaan Gandhi"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Terminal-style prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 font-mono text-sm text-muted"
        >
          <span className="text-accent">$</span> whoami
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-5xl font-bold tracking-tight sm:text-7xl"
        >
          {site.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 text-lg text-muted sm:text-xl"
        >
          &ldquo;<span className="text-accent">{site.tagline}</span>&rdquo;
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted"
        >
          <MapPin size={14} />
          {site.location}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border glass text-muted transition-all hover:border-accent hover:text-accent"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={site.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border glass text-muted transition-all hover:border-accent hover:text-accent"
            aria-label="Twitter"
          >
            <XIcon size={18} />
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border glass text-muted transition-all hover:border-accent hover:text-accent"
            aria-label="Instagram"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border glass text-muted transition-all hover:border-accent hover:text-accent"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent/80"
          >
            View Projects
            <ChevronRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
          >
            About Me
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
