# Deploy

Auto-deploy for the Cloudflare Pages project that serves `ayaanngandhi.in`.

## How it works

`.github/workflows/deploy.yml` runs on every push to `main` — and on demand
from the Actions tab (`workflow_dispatch`). Each run installs with `npm ci`
(the repo's lockfile is `package-lock.json`), builds the static export into
`out/`, checks that the export is well formed, and uploads it with
`wrangler pages deploy --branch=main`. A successful upload becomes the
project's production deployment; Pages keeps the previous deployment live
until the new upload finishes.

## The one rule: a bad commit must not take the site down

- The build runs on a disposable CI runner, not on the machine serving the
  site. A failed build just fails the run; Pages keeps serving the last good
  deployment.
- `Verify static export is well formed` fails the run *before* upload if the
  export lost a page, `_headers`, or `404.html` — e.g. if `trailingSlash` is
  removed from `next.config.ts`, every subpage would 404 and this gate catches
  it before it reaches the live domain.
- A missing `CLOUDFLARE_API_TOKEN` fails in the preflight step, before any
  time is spent on the build, with an error saying exactly what to create.
- `timeout-minutes: 15` keeps a hung run from burning the private-repo
  Actions allowance.
- `concurrency` with `cancel-in-progress: false` queues a second quick push
  behind the first instead of cancelling an upload halfway through.

## One-time setup

1. **Create the Pages project** (once per account):

   ```sh
   npx wrangler pages project create personal-website --production-branch main
   ```

   This creates a *Direct Upload* project — Cloudflare builds nothing itself,
   the GitHub Action uploads the finished `out/` directory. Create it via
   wrangler or any Direct Upload flow in the dashboard (Workers & Pages →
   Create application → Pages). Do not set up Git integration for it: a Direct
   Upload project cannot be switched to Git integration later, and the CI
   upload is this project's auto-deploy mechanism. Keep
   `--production-branch main` aligned with the workflow's `--branch=main`;
   otherwise deploys land as previews instead of production.

2. **Add the repository secret.** GitHub repo → Settings → Secrets and
   variables → Actions → New repository secret → `CLOUDFLARE_API_TOKEN`, with
   a Cloudflare API token that has *Account → Cloudflare Pages → Edit*. The
   account ID is a public identifier and is already set in the workflow's env.

3. **Attach the domain.** Cloudflare dashboard → Workers & Pages →
   personal-website → Custom domains → add `ayaanngandhi.in`. If the domain
   currently points at another host (the old server/tunnel), remove that DNS
   record first — Cloudflare adds the CNAME for Pages itself.

## Operating it

- Watch runs: GitHub → Actions → "Deploy to Cloudflare Pages".
- Deploy right now: push to `main`, or Actions → Run workflow.
- Roll back: Cloudflare dashboard → Workers & Pages → personal-website →
  Deployments → select the last good deployment → Rollback.
- Change the project name: the `--project-name` flag in the workflow (create
  the matching project first).

## Branch

`--branch=main` at the bottom of the workflow marks deploys as production
because `main` is the project's production branch. The `on.push.branches`
filter means pushes to other branches trigger no deploy at all; changing
`--branch` to something else would stage deploys as previews, each getting a
`<branch>.<project>.pages.dev` URL.
