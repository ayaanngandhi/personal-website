import type { MetadataRoute } from "next";

/**
 * robots.txt, generated at build time (works with `output: "export"`).
 *
 * ⚠️ This is NOT the whole file that ships. The zone has Cloudflare's
 * "Bot Preference Sync" enabled, which PREPENDS a managed block to whatever we
 * serve. That block enforces three categories:
 *
 *   Search  → Allow   (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, ...)
 *   Agents  → Allow   (ChatGPT-User, Perplexity-User, DuckAssistBot, ...)
 *   Training→ Disallow(GPTBot, ClaudeBot, Google-Extended, CCBot, ...)
 *
 * So retrieval and user-initiated fetching are already permitted, which is what
 * citation in an answer engine actually needs, while AI training stays blocked.
 *
 * DO NOT re-add an explicit Allow list for AI crawlers here. An earlier version
 * did, and because Cloudflare's block already Disallows some of those user
 * agents, the live file contained both `Allow: /` and `Disallow: /` for GPTBot,
 * ClaudeBot and Google-Extended. Contradictory rules are resolved differently by
 * different crawlers — some take the first matching group, some merge and take
 * the most specific, some the least restrictive — so the file became a coin flip.
 * The policy belongs in ONE place: the Cloudflare dashboard
 * (Security → Settings → AI Crawler and Agent access policies).
 *
 * `/links` carries `noindex` in its layout rather than a Disallow here: a blocked
 * URL cannot be crawled, so the crawler never sees the noindex and the URL can
 * still be listed in results.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://ayaanngandhi.in/sitemap.xml",
    host: "https://ayaanngandhi.in",
  };
}
