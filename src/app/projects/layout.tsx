import type { Metadata } from "next";

/**
 * page.tsx is a client component, so the route metadata lives here.
 * Keep this layout a pass-through: the page renders its own container.
 */
export const metadata: Metadata = {
  title: "Projects — Ayaan Gandhi",
  description:
    "Things Ayaan Gandhi has built and contributed to: Rasoi, Zingy, Atrium, Alexa Toby, an Emporio Youth Summit site, a recipe app, a video pipeline, and open-source developer tools.",
  alternates: { canonical: "/projects/" },
  openGraph: {
    title: "Projects — Ayaan Gandhi",
    description:
      "Software Ayaan Gandhi has built and contributed to, from self-hosted infrastructure to open-source developer tools.",
    url: "/projects/",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
