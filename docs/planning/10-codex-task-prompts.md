# Codex Task Prompts

Execute these tasks sequentially.

## Task 1 — Workspace Foundation

```text
Initialize the pnpm and Turborepo workspace with apps/docs, apps/playground, and the planned package directories. Add strict TypeScript, ESLint, Prettier, shared workspace scripts, Changesets, and basic CI. Do not implement UI. Run install, lint, typecheck, tests, and build before reporting completion.
```

## Task 2 — Documentation Schemas

```text
Create the documentation schema package. Define and test schemas for general pages, component pages, foundation pages, component registry entries, package registry entries, token registry entries, and lifecycle statuses. Invalid metadata must fail with actionable error messages.
```

## Task 3 — MDX Documentation Engine

```text
Implement the MDX content loader, frontmatter validation, route generation, table-of-contents extraction, breadcrumbs, previous/next navigation, and generated sidebar navigation for the documentation application.
```

## Task 4 — Accessible Website Shell

```text
Implement the accessible documentation shell with a header, collapsible sidebar, mobile navigation, breadcrumbs, table of contents, previous/next navigation, code blocks, status badges, footer, and theme selector. Use temporary --docs-* CSS variables only.
```

## Task 5 — Registries

```text
Create component, package, and token registries. Generate overview pages, category pages, lifecycle status summaries, and platform filters from registry data. Make registry validation part of CI.
```

## Task 6 — Search and Command Palette

```text
Implement search indexing and an accessible Command/Ctrl + K command palette using documentation and registry metadata. Support keyboard navigation, focus restoration, escape-to-close, zero-result states, and matched heading display.
```

## Task 7 — Placeholder Documentation

```text
Create the required placeholder documentation across Getting Started, Foundations, Components, Patterns, Engineering, Governance, and Releases. Clearly label incomplete specifications as Planned, Draft, Example, or Placeholder.
```

## Task 8 — Governance and Releases

```text
Create contribution workflows, CODEOWNERS, issue templates, pull request templates, ADR templates, Changesets configuration, changelog generation, review requirements, and release documentation.
```

## Task 9 — AI Context Generation

```text
Generate AGENTS.md, llms.txt, llms-full.txt, navigation exports, component registry exports, token schema exports, and AI-readable contribution rules from repository source data. Ensure generated files cannot drift from the registries.
```

## Task 10 — Phase-Zero Audit

```text
Audit the Phase-Zero platform for accessibility, performance, broken links, content validation, responsive behavior, build reliability, registry integrity, AI context freshness, and preview deployment readiness. Fix all critical issues and produce a final audit report.
```
