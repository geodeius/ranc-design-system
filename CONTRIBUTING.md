# Contributing

## Current scope

The repository is in Phase Zero. Contributions must preserve the approved phase order and must not introduce final tokens, production Figma assets, stable component APIs, or package publication.

Before contributing, read:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `llms.txt`
4. every document under `docs/planning/`

## Local validation

```bash
pnpm install
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm validate:workspace
pnpm changeset:status
```

## Change discipline

- Keep changes limited to the active implementation phase.
- Use strict TypeScript and explicit package exports.
- Use `workspace:` ranges for internal package dependencies.
- Label incomplete work as Planned, Draft, Example, or Placeholder.
- Add or update an ADR before changing a major architectural convention.
- Add a changeset only when a future versioned package is affected.
- Do not publish packages during Phase Zero.

Ownership and review assignments remain provisional until the Rancard Design System core team confirms GitHub identities.
