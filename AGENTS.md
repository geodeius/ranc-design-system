# AGENTS.md

## Repository Purpose

This repository contains the Rancard Design System platform, documentation, registries, tooling, foundations, and component packages.

The current priority is Phase Zero: building the documentation and engineering platform before final Figma assets, production tokens, or stable UI components.

## Authoritative Planning Documents

Read these files before making architectural changes:

```text
docs/planning/README.md
docs/planning/01-objectives-and-success-criteria.md
docs/planning/02-technical-architecture.md
docs/planning/03-website-information-architecture.md
docs/planning/04-documentation-and-content-model.md
docs/planning/05-tokens-and-figma-readiness.md
docs/planning/06-engineering-governance-and-quality.md
docs/planning/07-implementation-phases.md
docs/planning/08-codex-operating-rules.md
docs/planning/09-codex-starting-prompt.md
docs/planning/10-codex-task-prompts.md
docs/planning/11-final-deliverables-and-readiness-gates.md
docs/planning/12-design-principles.md
docs/planning/13-roadmap.md
docs/planning/14-architecture-decision-records.md
```

## Source-of-Truth Rules

- Never assume a component, property, token, or package exists unless it is present in the registry or source code.
- Never assume a component exists unless it appears in the component registry or source code.
- Never assume a token exists unless it appears in the token registry or source code.
- Never invent package exports.
- Never treat placeholder documentation as an approved specification.
- Never treat temporary `--docs-*` variables as production design tokens.
- Prefer generated metadata over duplicated manual content.
- Update schemas and generators when introducing new structured metadata.

## Phase-Zero Constraints

Do not:

- Define final brand colors
- Define final typography values
- Finalize spacing scales
- Create stable component APIs
- Publish packages
- Create Figma components
- Create production icons
- Introduce product-specific forks
- Skip accessibility validation
- Proceed to a later phase before the current phase passes its acceptance criteria

## Engineering Expectations

- Use strict TypeScript.
- Keep package boundaries explicit.
- Avoid circular dependencies.
- Add tests for validators, generators, and critical utilities.
- Keep lint, typecheck, tests, and production builds passing.
- Use accessible semantic HTML.
- Document major architectural decisions with ADRs.
- Mark incomplete work as Planned, Draft, Example, or Placeholder.
- Use lifecycle statuses consistently.

## Required Validation Before Completion

Run:

```text
install
lint
typecheck
test
build
content validation
registry validation
link validation
accessibility checks
```

Report:

- Files changed
- Commands run
- Results
- Assumptions
- Unresolved issues
- Recommended next task

## Change Discipline

When a request conflicts with an approved ADR or planning document:

1. Identify the conflict.
2. Do not silently override the existing decision.
3. Propose an ADR update.
4. Explain consequences.
5. Implement only after the decision is resolved.

<!-- BEGIN GENERATED REPOSITORY INVENTORY -->
## Generated Repository Inventory

- Documentation pages: 8
- Registered components: 1
- Registered packages: 10
- Registered tokens: 0
- Search entries: 88

This inventory is derived from validated MDX and registry sources. Regenerate it with `pnpm generate:ai`.
<!-- END GENERATED REPOSITORY INVENTORY -->
