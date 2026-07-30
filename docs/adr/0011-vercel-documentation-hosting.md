# ADR-0011: Use Vercel for documentation hosting

- Status: Accepted
- Date: 2026-07-30
- Owners: Rancard Design System core team

## Context

Phase Zero requires deployable Next.js documentation and preview environments for pull requests. The repository is a pnpm and Turborepo monorepo, and the documentation application consumes validated content and packages outside `apps/docs`.

No hosting provider was previously selected or configured.

## Decision

Use Vercel to host the documentation application.

Configure one Vercel project with:

- GitHub repository: `geodeius/ranc-design-system`
- Root Directory: `apps/docs`
- Framework Preset: Next.js
- Include source files outside the Root Directory: enabled
- Build command from `apps/docs/vercel.json`
- Git integration enabled for pull-request preview deployments

Production deployment approval and custom-domain configuration remain separate operational decisions.

## Alternatives Considered

- OpenAI Sites
- Netlify
- GitHub Pages with a static export
- Self-managed infrastructure
- A custom GitHub Actions deployment

## Consequences

Vercel provides native Next.js support and Git-integrated preview deployments. The project must retain access to monorepo sources outside `apps/docs`, and Vercel project settings remain external state that cannot be fully represented in Git.

Preview readiness depends on importing and connecting the repository in Vercel. No deployment credentials are stored in the repository.

## Follow-up Actions

- Import the repository into Vercel using `apps/docs` as the Root Directory.
- Confirm that pull requests receive preview deployment checks and URLs.
- Record the Vercel project identity without committing `.vercel/` credentials.
- Decide production domains, access controls, and promotion permissions before launch.
