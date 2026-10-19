"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  ScanSearch,
  Mail,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, XIcon, InstagramIcon } from "@/components/Icons";
import site from "@/data/site.json";
import Image from "next/image";

const links = [
  {
    label: "Personal Website",
    url: "https://ayaanngandhi.in",
    icon: Globe,
    color: "#22d3ee",
  },
  {
    label: "Zingy Downloader",
    url: "https://zingy.ayaanngandhi.in",
    icon: Smartphone,
    color: "#a78bfa",
  },
  {
    label: "Trace",
    url: "https://trace.ayaanngandhi.in",
    icon: ScanSearch,
    color: "#facc15",
  },
  {
    label: "Contact Me",
    url: "/contact",
    icon: MessageCircle,
    color: "#34d399",
    internal: true,
  },
  {
    label: "Twitter / X",
    url: site.twitter,
    icon: XIcon,
    color: "#fafafa",
  },
  {
    label: "GitHub",
    url: site.github,
    icon: GithubIcon,
    color: "#fafafa",
  },
  {
    label: "Instagram",
    url: site.instagram,
    icon: InstagramIcon,
    color: "#f472b6",
  },
  {
    label: "Email Me",
    url: `mailto:${site.email}`,
    icon: Mail,
    color: "#fb923c",
  },
];

export default function LinksPage() {
  return (
    <div className="w-full max-w-md">
      {/* Profile section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col items-center"
      >
        <div className="mb-5 h-24 w-24 overflow-hidden rounded-full ring-2 ring-accent/30 shadow-lg">
          <Image
            src="/profile.png?v=5"
            alt="Ayaan Gandhi"
            width={96}
            height={96}
            className="object-cover"
            priority
          />
        </div>

        <h1 className="mb-1.5 text-xl font-bold tracking-tight">
          {site.name}
        </h1>
        <p className="text-sm text-muted">{site.tagline}</p>
        <p className="mt-1 text-xs text-muted/70">{site.location}</p>
      </motion.div>

      {/* Link buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex flex-col gap-3"
      >
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.url}
            target={link.internal ? undefined : "_blank"}
            rel={link.internal ? undefined : "noopener noreferrer"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.35 }}
            className="glass group relative flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            style={
              {
                "--hover-glow": link.color,
              } as React.CSSProperties
            }
          >
            {/* Color indicator dot */}
            <div
              className="h-2.5 w-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: link.color }}
            />

            {/* Icon + label */}
            <link.icon
              className="h-5 w-5 text-muted transition-colors group-hover:text-foreground"
              strokeWidth={1.5}
            />
            <span className="flex-1 text-sm font-medium">{link.label}</span>

            <ExternalLink
              className="h-3.5 w-3.5 text-muted/40 transition-colors group-hover:text-muted"
              strokeWidth={1.5}
            />
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-10 text-center text-xs text-muted/50"
      >
        ayaanngandhi.in/links
      </motion.p>
    </div>
  );
}
