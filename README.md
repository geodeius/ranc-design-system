# Rancard Design System

The Rancard Design System repository has completed **Phase Zero** and is
currently in **Stage 1 — Research and Audit**. Stage 1 documents the existing
product ecosystem before production tokens, components, or Figma assets are
defined.

## Platform status

The Phase Zero platform contains:

- a pnpm workspace managed by Turborepo;
- a deployable documentation application and playground foundation;
- private planned package boundaries;
- shared strict TypeScript and ESLint configuration;
- validated documentation and registries;
- search and AI-readable repository context;
- governance, Changesets, CI, deployment, and quality validation.

Package implementations remain **Planned**. Their explicit boundaries do not
create stable production APIs.

Stage 1 work is tracked in
[docs/research/README.md](./docs/research/README.md). Research templates are not
approved design-system specifications.

## Development

Requirements:

- Node.js 24 or newer
- pnpm 11.17.0

```bash
corepack enable
pnpm install
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm validate:workspace
pnpm changeset:status
```

Read [AGENTS.md](./AGENTS.md), [CLAUDE.md](./CLAUDE.md), and [docs/planning/README.md](./docs/planning/README.md) before making architectural changes.
