import type { MetadataRoute } from "next";

/**
 * robots.txt, generated at build time (works with `output: "export"`).
 *
 * Pages we don't want indexed (/links) are handled with a `noindex` meta tag in
 * their own layout, NOT with a Disallow here. A blocked URL can't be crawled, so
 * the crawler never sees the noindex and the URL can still be listed in results.
 *
 * The named AI crawlers are allowed explicitly and deliberately: this site wants
 * to be readable by answer engines (ChatGPT, Claude, Perplexity, Google's AI
 * surfaces), because those are increasingly where a person is introduced to a
 * developer before they ever open a search page.
 */
export const dynamic = "force-static";

const AI_CRAWLERS = [
  "GPTBot", // OpenAI, training + browsing
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // ChatGPT on-demand fetch when a user asks about a page
  "ClaudeBot", // Anthropic
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity index
  "Perplexity-User",
  "Google-Extended", // Gemini / Vertex grounding
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: "https://ayaanngandhi.in/sitemap.xml",
    host: "https://ayaanngandhi.in",
  };
}
