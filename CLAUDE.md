# CLAUDE.md

# Rancard Design System — AI Engineering Guide

## Purpose

This repository contains the source for the Rancard Design System.

The current objective is **Phase Zero**: establish the documentation platform, engineering architecture, governance model, registries, tooling, and repository conventions **before** creating production design tokens, Figma libraries, or stable UI components.

This file provides the operational context for Claude Code and other AI coding agents.

---

# Project Goals

Build a design system that:

- Scales across all Rancard products.
- Supports designers and engineers equally.
- Treats documentation as a first-class product.
- Is accessible by default.
- Uses registries as the source of truth.
- Is AI-friendly and machine-readable.
- Can evolve without breaking consumers.

---

# Authoritative Documents

Read these before making architectural decisions:

1. AGENTS.md
2. llms.txt
3. docs/planning/README.md
4. docs/planning/01-objectives-and-success-criteria.md
5. docs/planning/02-technical-architecture.md
6. docs/planning/03-website-information-architecture.md
7. docs/planning/04-documentation-and-content-model.md
8. docs/planning/05-tokens-and-figma-readiness.md
9. docs/planning/06-engineering-governance-and-quality.md
10. docs/planning/07-implementation-phases.md
11. docs/planning/08-codex-operating-rules.md
12. docs/planning/11-final-deliverables-and-readiness-gates.md
13. docs/planning/12-design-principles.md
14. docs/planning/13-roadmap.md
15. docs/planning/14-architecture-decision-records.md

If these documents disagree, Architecture Decision Records (ADRs) take precedence over older planning notes.

---

# Current Phase

Phase Zero only.

Allowed:

- Repository architecture
- Documentation platform
- MDX
- Schemas
- Registries
- Search
- Navigation
- Playground foundation
- CI/CD
- Governance
- Contribution workflows
- AI context generation
- Accessibility infrastructure

Not allowed:

- Final design tokens
- Final color palettes
- Final typography scales
- Production Figma assets
- Stable component APIs
- Product-specific customizations
- Package publication

---

# Source of Truth

Never invent information.

Treat these as authoritative:

1. Source code
2. Component registry
3. Token registry
4. Package registry
5. Documentation schemas
6. ADRs

Never infer APIs, tokens, exports, or components that do not exist.

---

# Architecture

Repository:

- pnpm workspaces
- Turborepo
- TypeScript
- Next.js App Router
- MDX
- Changesets
- GitHub Actions

Documentation must be generated from structured metadata wherever possible.

---

# Coding Standards

- TypeScript strict mode.
- Functional, composable architecture.
- Small modules.
- Explicit exports.
- Avoid circular dependencies.
- Accessibility-first.
- Prefer composition over inheritance.
- Minimize runtime dependencies.

---

# Documentation Rules

Every new feature requires documentation.

Every component eventually requires:

- Overview
- Usage
- Accessibility
- Behavior
- API
- Examples
- Related components
- Changelog

Placeholder work must be labeled:

- Planned
- Draft
- Example
- Placeholder

---

# Registry Rules

Registries are authoritative.

Never duplicate:

- Status
- Package names
- Ownership
- Supported platforms
- Navigation metadata

Generate derived documentation from registries.

---

# Temporary Styling

During Phase Zero use only:

--docs-background
--docs-surface
--docs-text
--docs-text-muted
--docs-border
--docs-accent
--docs-focus

These are temporary documentation variables only.

Never expose them as production design tokens.

---

# Accessibility

Accessibility is mandatory.

Ensure:

- Keyboard support
- Semantic HTML
- Proper focus management
- WCAG 2.2 AA alignment
- Reduced motion support
- Screen reader compatibility

Accessibility failures block completion.

---

# AI Expectations

Before implementing anything:

- Inspect repository state.
- Identify assumptions.
- Explain risks.
- Reference existing ADRs.
- Propose minimal changes.

After implementation:

- Summarize changes.
- Report assumptions.
- Report unresolved issues.
- Suggest the next incremental task.

Do not perform unrelated refactors.

---

# Validation Checklist

Before considering work complete:

- Install succeeds
- Lint passes
- Typecheck passes
- Tests pass
- Build passes
- Content validation passes
- Registry validation passes
- Link validation passes

---

# Decision Process

If a request conflicts with architecture:

1. Explain the conflict.
2. Recommend an ADR update.
3. Do not silently change architectural conventions.

---

# Success Criteria

Optimize for:

- Maintainability
- Consistency
- Accessibility
- Scalability
- Developer experience
- Designer experience
- AI readability
- Long-term evolution

Prefer boring, predictable architecture over clever implementations.
