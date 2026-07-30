# Rancard Design System

The Rancard Design System repository is currently in **Phase Zero**. This phase builds the platform, governance, and engineering foundation before production tokens, components, or Figma assets.

## Phase 1 status

The repository foundation contains:

- a pnpm workspace managed by Turborepo;
- private placeholder applications for documentation and the playground;
- private placeholder package boundaries;
- shared strict TypeScript and ESLint configuration;
- formatting, Changesets, CI, and workspace validation.

All package implementations are marked **Planned**. Empty entry points reserve explicit boundaries without creating stable APIs.

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
