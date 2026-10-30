# ayaanngandhi.in

**My personal site — who I am, what I build, and how to reach me.**

Live at **[ayaanngandhi.in](https://ayaanngandhi.in)**.

A static Next.js site. Every page is pre-rendered at build time into plain HTML,
CSS and JS, and the result is uploaded to Cloudflare Pages. There is no server,
no database and no runtime cost: the whole thing is files.

---

## Pages

| Route | What is on it |
| --- | --- |
| `/` | Landing page — name, tagline, shader background, featured work |
| `/about/` | Biography, skills, timeline |
| `/projects/` | Everything I have built, with links |
| `/contact/` | Email, GitHub, X, Instagram |
| `/links/` | A short link list, sized for an Instagram bio |
| `/laugh/` | A joke page. It exists because I wanted it to. |

## Editing content

**Almost everything you would want to change is JSON, not JSX.** No component
needs to be touched to add a project or reword the bio.

```
src/data/site.json       name, tagline, bio, email, social links
src/data/projects.json   the project list
src/data/skills.json     skills, grouped
src/data/timeline.json   the about-page timeline
```

Add an entry to `projects.json`, push, and it is live in about a minute.

## How it is built

- **Next.js 16** App Router, React 19, TypeScript.
- **Tailwind CSS v4** for styling, with a light/dark theme toggle that respects
  the system preference.
- **Framer Motion** for motion — used where something moves between states, not
  as decoration on every card.
- **Shader backgrounds** from `@paper-design/shaders-react`, and `liquid-glass-react`
  for the frosted panels.
- **lucide-react** / `react-icons` for icons. No emoji in the interface.

### Three lines in `next.config.ts` that matter

```ts
output: "export",          // static HTML in out/, not a Node server
trailingSlash: true,       // /about/ → about/index.html
images: { unoptimized: true },   // nothing to optimise images at runtime
```

Remove `trailingSlash` and every subpage 404s on Cloudflare Pages: Next writes
`about.html` plus an `about/` directory of RSC payloads, the static host redirects
`/about` to `/about/`, and that directory has no `index.html`. The CI deploy is
guarded against exactly this — see `docs/deploy.md`.

---

## Running it locally

```bash
npm install
npm run dev            # http://localhost:3000
```

```bash
npm run build          # static export → out/
npm run lint
```

## Deploying

Pushing to `main` is the deploy. `.github/workflows/deploy.yml` installs from the
lockfile, builds, checks the export is well formed, and uploads it to Cloudflare
Pages with `wrangler pages deploy --branch=main`. A failed build fails the run and
Pages keeps serving the last good deployment.

The one-time setup (creating the Pages project, the `CLOUDFLARE_API_TOKEN` secret,
attaching the domain) and the rollback procedure are in **[docs/deploy.md](docs/deploy.md)**.

---

## Layout

```
personal-website/
├── src/
│   ├── app/            page · about · projects · contact · links · laugh
│   ├── components/     Navbar · Footer · ShaderBg · ThemeToggle · Icons
│   ├── data/           site.json · projects.json · skills.json · timeline.json
│   └── app/globals.css design tokens: colour, type scale, spacing
├── docs/               deploy.md · requirements.md
├── public/             static assets
└── .github/workflows/  deploy.yml
```

## License

Personal site — the writing and photographs are mine. Read it, do not republish
it as your own. The code is nothing special; take ideas from it freely.
