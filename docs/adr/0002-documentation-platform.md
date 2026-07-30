# ADR-0002: Use Next.js and MDX for documentation

- Status: Accepted
- Date: 2026-07-30
- Owners: Rancard Design System core team

## Context

The documentation platform requires structured content, static generation, validated metadata, custom navigation, interactive examples, and future registry and search integration.

## Decision

Use the Next.js App Router with strict TypeScript and MDX. Store authored content under the repository-level `content/` directory, validate frontmatter through `@rancard/documentation-schema`, and derive routes and navigation from metadata.

Temporary presentation styles must remain internal to the documentation application and use only the `--docs-*` namespace.

## Alternatives Considered

- Docusaurus
- Storybook-only documentation
- A static Markdown site
- A custom React application without a framework

## Consequences

The platform can statically render structured content and evolve toward custom search, registries, and playground integrations. The team must maintain its own content conventions, validation, and navigation generators.

## Follow-up Actions

- Build the full accessible website shell in Phase 3.
- Introduce authoritative registries in Phase 4.
- Add complete placeholder content in Phase 5.
- Audit deployment and accessibility before Phase Zero completion.
