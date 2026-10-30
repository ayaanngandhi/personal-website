import type { Metadata } from "next";

/**
 * page.tsx is a client component, so the route metadata lives here.
 * Keep this layout a pass-through: the page renders its own container.
 */
export const metadata: Metadata = {
  title: "Contact — Ayaan Gandhi",
  description:
    "Get in touch with Ayaan Gandhi — email, GitHub, X and Instagram. Open to freelance work, collaborations and interesting problems.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact — Ayaan Gandhi",
    description:
      "Email, GitHub, X and Instagram. Open to freelance work, collaborations and interesting problems.",
    url: "/contact/",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
