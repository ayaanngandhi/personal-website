import type { Metadata } from "next";

/**
 * page.tsx is a client component ("use client") and cannot export `metadata`,
 * so the route's title/description/canonical live here instead. The page renders
 * its own container — this layout is a pass-through and must not add markup.
 */
export const metadata: Metadata = {
  title: "About — Ayaan Gandhi",
  description:
    "Ayaan Gandhi is a self-taught programmer and AI/ML enthusiast from Faridabad, India — a Class 10 student who builds production software, from e-commerce platforms to automated content pipelines.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About — Ayaan Gandhi",
    description:
      "Self-taught programmer and AI/ML enthusiast from Faridabad, India. Building things that solve real problems.",
    url: "/about/",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
