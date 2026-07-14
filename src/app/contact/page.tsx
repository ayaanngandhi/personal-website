"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, XIcon } from "@/components/Icons";
import site from "@/data/site.json";

const contacts = [
  {
    icon: GithubIcon,
    label: "GitHub",
    href: site.github,
    display: "ayaanngandhi",
  },
  {
    icon: XIcon,
    label: "Twitter / X",
    href: site.twitter,
    display: "@ayaanngandhi",
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${site.email}`,
    display: site.email,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-mono text-sm text-accent">
          <span className="text-muted">$</span> cat contact.json
        </h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight">Contact</h2>
        <p className="mt-2 text-muted">
          Find me on these platforms. Don&apos;t hesitate to reach out.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-10 flex flex-col gap-3"
      >
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-lg border border-border bg-surface p-5 transition-all hover:border-accent hover:shadow-[0_0_20px_rgba(34,211,238,0.05)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background text-muted transition-colors group-hover:text-accent">
              <c.icon size={20} />
            </div>
            <div>
              <p className="font-medium">{c.label}</p>
              <p className="font-mono text-sm text-muted">{c.display}</p>
            </div>
          </a>
        ))}
      </motion.div>
    </div>
  );
}
