# Rancard Design System — Phase Zero Plan

This directory contains the implementation blueprint for building the Rancard Design System platform before starting final Figma foundations, production components, or approved design tokens.

## Objective

Build the operating system for the design system:

- Documentation website inspired by Astryx
- Scalable monorepo
- Documentation architecture
- Navigation and search
- Component and token documentation frameworks
- Engineering portal
- Governance and contribution workflows
- Versioning and release infrastructure
- AI-readable documentation
- Figma and component implementation readiness gates

## File Index

| File                                           | Purpose                                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------------------- |
| `01-objectives-and-success-criteria.md`        | Project objective, scope, and completion criteria                             |
| `02-technical-architecture.md`                 | Stack, packages, monorepo, and repository structure                           |
| `03-website-information-architecture.md`       | Navigation, homepage, layouts, and user experience                            |
| `04-documentation-and-content-model.md`        | MDX schemas, page templates, registries, and search                           |
| `05-tokens-and-figma-readiness.md`             | Planned token model and Figma readiness conditions                            |
| `06-engineering-governance-and-quality.md`     | Engineering portal, governance, CI/CD, accessibility, and analytics           |
| `07-implementation-phases.md`                  | Sequential delivery phases and acceptance criteria                            |
| `08-codex-operating-rules.md`                  | Constraints and operating rules Codex must follow                             |
| `09-codex-starting-prompt.md`                  | Primary prompt for beginning implementation                                   |
| `10-codex-task-prompts.md`                     | Ten scoped implementation prompts                                             |
| `11-final-deliverables-and-readiness-gates.md` | Required outputs and gates for later work                                     |
| `12-design-principles.md`                      | Core product, design, engineering, accessibility, and contribution principles |
| `13-roadmap.md`                                | Recommended roadmap from Phase Zero through Version 1.0 and scale             |
| `14-architecture-decision-records.md`          | Initial ADR proposals and decision rationale                                  |
| `AGENTS.md`                                    | Root-level instructions for Codex and other coding agents                     |
| `llms.txt`                                     | Concise AI-readable repository index                                          |

## Recommended Execution Order

1. Give Codex `09-codex-starting-prompt.md`.
2. Execute the tasks in `10-codex-task-prompts.md` sequentially.
3. Validate each phase against `07-implementation-phases.md`.
4. Do not begin final tokens, Figma components, or production component APIs until the readiness gates in `11-final-deliverables-and-readiness-gates.md` are satisfied.
