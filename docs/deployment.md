# Documentation Deployment

## Provider

ADR-0011 selects Vercel for the Phase Zero documentation application.

## Vercel project setup

Import `geodeius/ranc-design-system` into Vercel and configure:

1. Root Directory: `apps/docs`
2. Framework Preset: Next.js
3. Include source files outside the Root Directory: enabled
4. Git integration: enabled
5. Skip deployments for unaffected projects: enabled

`apps/docs/vercel.json` supplies the monorepo-aware build command. Vercel should use the repository `pnpm-lock.yaml` and the root `packageManager` declaration for installation.

Do not commit `.vercel/`, access tokens, organization IDs, project IDs, or deployment credentials.

## Preview environments

With the GitHub integration connected, Vercel creates a preview deployment for branch pushes and pull requests and reports the deployment URL on the pull request.

Before marking preview readiness complete, verify:

- A pull request receives a Vercel deployment check.
- The preview URL loads the introduction, component registry, package registry, and representative MDX routes.
- Search, mobile navigation, generated AI files, and internal links work on the preview origin.
- The preview has no critical automated accessibility defects.

## Production

Production domains, access controls, environment variables, approval rules, and promotion permissions are unresolved. Connecting preview deployments does not authorize a production launch.

## Troubleshooting

If monorepo content or workspace packages cannot be resolved, confirm that Vercel includes source files outside `apps/docs`. If a cached build lacks `.next` output, confirm the Turborepo build outputs include `.next/**` and exclude `.next/cache/**`.
