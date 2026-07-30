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
pnpm validate:content
pnpm validate:registries
pnpm validate:ai
pnpm validate:workspace
pnpm validate:changesets
pnpm build
pnpm accessibility:check
pnpm changeset:status
```

## Contribution workflow

1. Confirm the request belongs to the active implementation phase.
2. Gather evidence and use the appropriate issue template for shared-system proposals.
3. Check accepted ADRs before changing architecture.
4. Update source registries, schemas, or generators instead of duplicating metadata.
5. Implement the smallest coherent change with tests and documentation.
6. Run the required validation and record the results in the pull request.
7. Request the relevant design, engineering, accessibility, content, and product review disciplines.
8. Merge only after required checks and confirmed ownership review pass.

An issue or pull request does not approve a token, component, API, package export, owner, or lifecycle change.

Until concrete CODEOWNERS identities and branch protection are configured, a repository administrator must verify the required review disciplines manually. This provisional process does not satisfy the final ownership-enforcement gate.

## Changesets

Changesets are required when a change affects a publishable package. Current private placeholder packages are deliberately excluded from versioning and publication. Infrastructure and documentation changes do not need empty changesets.

## Change discipline

- Keep changes limited to the active implementation phase.
- Use strict TypeScript and explicit package exports.
- Use `workspace:` ranges for internal package dependencies.
- Label incomplete work as Planned, Draft, Example, or Placeholder.
- Add or update an ADR before changing a major architectural convention.
- Add a changeset only when a future versioned package is affected.
- Do not publish packages during Phase Zero.

Ownership and review assignments remain provisional until the Rancard Design System core team confirms GitHub identities.
