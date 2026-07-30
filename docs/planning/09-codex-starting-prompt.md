# Initial Codex Execution Prompt

Copy the following prompt into Codex:

```text
You are implementing Phase Zero of the Rancard Design System.

Your immediate task is to establish the repository and documentation platform foundation. Do not implement final design tokens, production components, Figma assets, or finalized visual design decisions.

Objectives:

1. Create a pnpm and Turborepo monorepo.
2. Create a Next.js TypeScript documentation application.
3. Create placeholder packages for tokens, themes, icons, React, React Native, CSS, CLI, shared ESLint, shared TypeScript, and documentation schemas.
4. Implement MDX-based documentation.
5. Implement validated frontmatter schemas.
6. Implement generated navigation.
7. Implement the documentation website shell.
8. Implement component, package, and token registries.
9. Add placeholder documentation proving each content type.
10. Add CI, Changesets, CODEOWNERS, contribution templates, and ADR support.
11. Add AI-readable documentation including AGENTS.md, llms.txt, and generated registry exports.
12. Ensure the documentation platform is accessible and responsive.

Constraints:

- Do not create final token values.
- Do not create final component APIs.
- Do not publish packages.
- Do not use temporary documentation styles as production tokens.
- Prefix temporary website variables with --docs-.
- Mark unfinished content as planned, draft, example, or placeholder.
- Keep all builds, tests, linting, and type checking passing.
- Use registries and validated metadata as the source of truth.
- Write an ADR for major architecture decisions.

Start with Phase 1 only.

Before writing code:

1. Inspect the existing repository.
2. Document assumptions.
3. Propose the exact file structure.
4. Identify architectural risks.
5. Create a Phase 1 checklist.

After implementation:

1. Run installation.
2. Run linting.
3. Run type checking.
4. Run tests.
5. Run the production build.
6. Summarize files created.
7. Report unresolved issues.
8. Recommend the next phase.

Do not proceed to Phase 2 until Phase 1 acceptance criteria are satisfied.
```
