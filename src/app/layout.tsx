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

export const metadata: Metadata = {
  metadataBase: new URL("https://ayaanngandhi.in"),
  title: "Ayaan Gandhi — Portfolio",
  description:
    "Self-taught programmer, AI/ML enthusiast. Building things that solve real problems.",
  openGraph: {
    title: "Ayaan Gandhi — Portfolio",
    description:
      "Self-taught programmer, AI/ML enthusiast. Building things that solve real problems.",
    url: "https://ayaanngandhi.in",
    siteName: "Ayaan Gandhi",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ayaan Gandhi — portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayaan Gandhi — Portfolio",
    description:
      "Self-taught programmer, AI/ML enthusiast. Building things that solve real problems.",
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
