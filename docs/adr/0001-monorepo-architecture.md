# ADR-0001: Use a pnpm and Turborepo monorepo

- Status: Accepted
- Date: 2026-07-30
- Owners: Rancard Design System core team

## Context

The repository will contain documentation and playground applications, shared configuration, validation schemas, tokens, components, themes, icons, and tooling. These assets require coordinated builds, testing, dependency management, and future releases.

## Decision

Use a pnpm workspace managed by Turborepo. Keep application and package boundaries explicit, require `workspace:` ranges for internal dependencies, and centralize shared TypeScript and ESLint configuration in workspace packages.

## Alternatives Considered

- Separate repositories for every package
- A single unstructured repository
- npm workspaces
- Yarn workspaces

## Consequences

The repository gains shared tooling, atomic changes, coordinated validation, and consistent dependency management. Contributors must maintain package-boundary discipline, and CI optimization will become increasingly important.

## Follow-up Actions

- Confirm concrete GitHub ownership identities.
- Add dependency-boundary rules as real package relationships emerge.
- Revisit build caching and remote cache policy when CI usage is known.
