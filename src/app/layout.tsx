import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShaderBg } from "@/components/ShaderBg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Structured data (schema.org). Emitted as an application/ld+json script so
 * search engines and answer engines can identify the page's subject as a person
 * rather than guessing from prose. `@graph` keeps Person and WebSite in one
 * block, cross-linked by @id so the site is attributed to the person.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ayaanngandhi.in/#person",
      name: "Ayaan Gandhi",
      url: "https://ayaanngandhi.in/",
      image: "https://ayaanngandhi.in/og.png",
      jobTitle: "Self-taught programmer",
      description:
        "Self-taught programmer and AI/ML enthusiast from Faridabad, India. Builds full-stack web applications, self-hosted infrastructure and open-source developer tools.",
      email: "mailto:mail@ayaanngandhi.in",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Faridabad",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/ayaanngandhi",
        "https://x.com/ayaanngandhi",
        "https://instagram.com/ayaanngandhi",
      ],
      knowsAbout: [
        "Software engineering",
        "Artificial intelligence",
        "Machine learning",
        "Python",
        "TypeScript",
        "Next.js",
        "FastAPI",
        "Linux self-hosting",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ayaanngandhi.in/#website",
      url: "https://ayaanngandhi.in/",
      name: "Ayaan Gandhi",
      description:
        "Portfolio of Ayaan Gandhi — self-taught programmer and AI/ML enthusiast from Faridabad, India.",
      inLanguage: "en",
      publisher: { "@id": "https://ayaanngandhi.in/#person" },
    },
  ],
};

const SITE_DESCRIPTION =
  "Self-taught programmer, AI/ML enthusiast. Building things that solve real problems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ayaanngandhi.in"),
  title: "Ayaan Gandhi — Portfolio",
  description: SITE_DESCRIPTION,
  applicationName: "Ayaan Gandhi",
  authors: [{ name: "Ayaan Gandhi", url: "https://ayaanngandhi.in/" }],
  creator: "Ayaan Gandhi",
  publisher: "Ayaan Gandhi",
  // Canonical for the home page. Child routes set their own in their layouts.
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Large image previews only, plus full-length snippets, so results can show
      // the OG card rather than a cropped thumbnail.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Ayaan Gandhi — Portfolio",
    description: SITE_DESCRIPTION,
    url: "https://ayaanngandhi.in",
    siteName: "Ayaan Gandhi",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ayaan Gandhi's portfolio home page over a magenta, violet and cyan gradient",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayaan Gandhi — Portfolio",
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
    creator: "@ayaanngandhi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          // Crawlers read this from the HTML; it does not need to execute.
          // dangerouslySetInnerHTML emits the JSON raw instead of escaping it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider>
          <ShaderBg />
          <Navbar />
          <main className="flex-1 pt-14">{children}</main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
