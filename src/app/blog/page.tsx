"use client";

import { motion } from "framer-motion";
import { PenLine } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface">
          <PenLine size={28} className="text-muted" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-3 text-muted">Coming soon.</p>
        <p className="mt-1 font-mono text-sm text-accent">
          $ echo &quot;Stay tuned...&quot;
        </p>
      </motion.div>
    </div>
  );
}
