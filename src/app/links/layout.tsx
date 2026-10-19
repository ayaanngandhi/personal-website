import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayaan Gandhi — Links",
  description: "All of Ayaan's links in one place.",
  robots: { index: false, follow: false },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4">
      {children}
    </div>
  );
}
