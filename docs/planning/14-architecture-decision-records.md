# Initial Architecture Decision Records

This document defines the first set of architecture decisions that should be converted into individual ADR files under:

```text
docs/adr/
```

## ADR Format

Each ADR must include:

```markdown
# ADR-NNNN: Decision Title

- Status:
- Date:
- Owners:

## Context

## Decision

## Alternatives Considered

## Consequences

## Follow-up Actions
```

## ADR-0001 — Use a Monorepo

### Status

Proposed

### Context

The design system will contain documentation applications, playgrounds, shared configuration, tokens, components, themes, icons, CLI tools, and validation schemas.

These assets require coordinated builds, releases, testing, and dependency management.

### Decision

Use a pnpm workspace managed with Turborepo.

### Alternatives Considered

- Separate repositories for every package
- A single unstructured repository
- npm workspaces
- Yarn workspaces

### Consequences

Positive:

- Shared tooling
- Coordinated changes
- Easier cross-package testing
- Atomic pull requests
- Centralized CI
- Consistent dependency management

Tradeoffs:

- Requires package-boundary discipline
- CI optimization becomes important
- Repository permissions may need refinement as the team grows

## ADR-0002 — Use Next.js and MDX for Documentation

### Status

Proposed

### Context

The documentation platform requires structured content, interactive examples, static generation, search indexing, and custom application behavior.

### Decision

Use Next.js App Router with TypeScript and MDX.

### Alternatives Considered

- Docusaurus
- Storybook-only documentation
- Static Markdown site
- Custom React application without a framework

### Consequences

Positive:

- Flexible application architecture
- Strong content and UI integration
- Static generation support
- Custom search and registry integration
- Future interactive playground support

Tradeoffs:

- More platform code must be maintained
- Documentation conventions must be enforced internally

## ADR-0003 — Use Registries as Sources of Truth

### Status

Proposed

### Context

Component names, package names, statuses, supported platforms, ownership, Figma references, and documentation paths are likely to appear in multiple parts of the platform.

Manual duplication creates drift.

### Decision

Create validated component, package, and token registries. Generate overview pages, status summaries, search metadata, and AI context from these registries.

### Alternatives Considered

- Manually maintained documentation tables
- Frontmatter-only metadata
- Package manifests as the only source

### Consequences

Positive:

- Reduced metadata drift
- Machine-readable system state
- Better automation
- Easier AI-agent consumption
- Central validation

Tradeoffs:

- Registry schemas become critical infrastructure
- Generators and validators require tests

## ADR-0004 — Separate Documentation Styles from Production Tokens

### Status

Proposed

### Context

The documentation platform must be built before approved design-system foundations exist.

Temporary styles could accidentally become unofficial production tokens.

### Decision

Use temporary CSS variables prefixed with:

```text
--docs-
```

Do not export them through design-system packages.

### Alternatives Considered

- Wait for final tokens before building the website
- Use unprefixed variables
- Adopt an external framework as the permanent token system

### Consequences

Positive:

- Website development can proceed independently
- Clear separation from production foundations
- Easier later migration

Tradeoffs:

- Some documentation styling will need replacement later

## ADR-0005 — Use a Layered Token Model

### Status

Proposed pending foundation research

### Context

The design system must support consistency, theming, platform transformation, and understandable intent.

### Decision

Prepare for:

```text
Primitive
→ Semantic
→ Component
→ Theme or mode override
```

Final naming and values require research and approval.

### Alternatives Considered

- Primitive tokens only
- Component tokens only
- Product-owned values without a shared hierarchy

### Consequences

Positive:

- Clear separation of raw values and intent
- Better theming
- Safer component implementation
- Easier platform mapping

Tradeoffs:

- More governance is required
- Naming must be carefully controlled

## ADR-0006 — Design for Human and AI Consumers

### Status

Proposed

### Context

Engineers increasingly use coding agents to inspect repositories, generate code, and implement UI.

Unstructured or ambiguous design-system information increases hallucinated APIs and inconsistent implementation.

### Decision

Provide:

- `AGENTS.md`
- `llms.txt`
- `llms-full.txt`
- Generated registry exports
- Machine-readable schemas
- Explicit lifecycle statuses
- Clear source-of-truth rules

### Alternatives Considered

- Human-readable documentation only
- Tool-specific prompts maintained outside the repository

### Consequences

Positive:

- Better agent reliability
- Faster engineering onboarding
- Reduced invented APIs
- Shared context across tools

Tradeoffs:

- AI context must be regenerated and validated
- Instructions require ownership

## ADR-0007 — Accessibility Is a Release Requirement

### Status

Proposed

### Context

Retrofitting accessibility after component release is expensive and unreliable.

### Decision

Accessibility requirements, tests, and documentation are mandatory before a component reaches stable status.

### Alternatives Considered

- Accessibility review after release
- Product-team responsibility only
- Manual testing without automated checks

### Consequences

Positive:

- Higher baseline quality
- Reduced product-level remediation
- Consistent behavior

Tradeoffs:

- Additional implementation and review effort
- Specialist review may be required for complex components

## ADR-0008 — Use Explicit Lifecycle Statuses

### Status

Proposed

### Context

Consumers need to understand whether an asset is safe for production use and what level of support it receives.

### Decision

Use:

```text
Planned
Experimental
Alpha
Beta
Stable
Deprecated
Removed
```

### Alternatives Considered

- Stable and unstable only
- No formal lifecycle
- Package-version inference

### Consequences

Positive:

- Clear expectations
- Better roadmap visibility
- Safer adoption
- Structured deprecation

Tradeoffs:

- Status transitions require governance
- Documentation must remain current

## ADR-0009 — Use Changesets and Semantic Versioning

### Status

Proposed

### Context

Multiple packages will evolve independently but may be released together.

Consumers need understandable version changes and changelogs.

### Decision

Use Changesets with semantic versioning.

### Alternatives Considered

- Manual versions
- Date-based versions
- Single global version only

### Consequences

Positive:

- Structured release notes
- Automated versioning
- Explicit change impact
- Better package coordination

Tradeoffs:

- Contributors must create changesets
- Release automation requires maintenance

## ADR-0010 — Build Patterns After Core Components

### Status

Proposed

### Context

Patterns and templates depend on stable component behavior and token foundations.

Creating them too early risks documenting unstable compositions.

### Decision

Build and validate foundations and pilot components before formalizing shared patterns and templates.

### Alternatives Considered

- Design patterns and components simultaneously
- Begin with full-page templates

### Consequences

Positive:

- Patterns use proven building blocks
- Less rework
- Clear dependency order

Tradeoffs:

- Product teams may wait longer for complete templates
