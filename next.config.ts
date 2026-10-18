import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages is a static file host with no Node server, so the build
  // emits a plain HTML/CSS/JS `out/` directory instead of a runnable server.
  output: "export",
  // Required: without it Next emits `about.html` plus an `about/` directory of
  // RSC payloads. A static host redirects /about to /about/, which then has no
  // index.html and 404s — and /about, /projects and /contact are navbar links.
  // This makes Next write `about/index.html` instead.
  trailingSlash: true,
  // A static export has no image optimisation server.
  images: { unoptimized: true },
};

export default nextConfig;
