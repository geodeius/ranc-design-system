# Stage 1 Research and Audit

Status: Complete

This directory is the working area for Stage 1 of the Rancard Design System
roadmap. Stage 1 records the current product ecosystem before any foundation,
token, theme, or component contract is proposed.

The stakeholder-approved outcome and accepted limitations are recorded in
`stage-1-conclusion.md`.

## Scope

Stage 1 covers:

- product inventory
- interface screenshot audit
- existing component inventory
- existing color and typography audit
- interaction pattern inventory
- accessibility baseline audit
- engineering stack inventory
- product-team interviews
- duplicate and inconsistent pattern analysis

Stage 1 does not approve tokens, component APIs, Figma assets, packages, product
forks, or pilot products.

## Evidence rules

Every recorded observation must:

1. identify the product and surface observed
2. link to or name the evidence source
3. record the observation date
4. separate observed facts from analyst interpretation
5. state evidence limitations
6. avoid copying sensitive customer or production data

Use `Unknown`, `Not observed`, or `Not provided` when evidence is unavailable.
Do not infer ownership, adoption, accessibility conformance, implementation
technology, or product priority.

Screenshots and other binary evidence must remain outside Git unless repository
governance explicitly approves their storage. Repository records should use a
stable evidence reference instead.

## Research states

- `Planned`: the activity has not started
- `In progress`: evidence collection is underway
- `Blocked`: a named dependency prevents progress
- `Complete`: the record satisfies its template and has been reviewed

These research states describe audit progress. They do not replace the
design-system lifecycle statuses used by registries and documentation.

## Directory structure

```text
docs/research/
├── README.md
├── stage-1-plan.md
├── records/
│   └── README.md
└── templates/
    ├── accessibility-baseline.md
    ├── component-inventory.md
    ├── engineering-stack.md
    ├── foundation-audit.md
    ├── interaction-pattern.md
    ├── interview-notes.md
    ├── pilot-evaluation.md
    ├── product-inventory.md
    └── screenshot-audit.md
```

Create one record per product, interview, or independently reviewable audit
unit. Copy the appropriate template into `records/` and use a descriptive,
lowercase kebab-case filename.

## Workflow

1. Register the product with `product-inventory.md`.
2. Capture referenced interfaces with `screenshot-audit.md`.
3. Record repeated UI, foundation, and interaction observations.
4. Document the engineering and accessibility baseline.
5. Conduct and attribute product-team interviews.
6. Compare evidence across products.
7. Evaluate pilot candidates without selecting one prematurely.
8. Review the Stage 1 exit criteria in `stage-1-plan.md`.

Stage 2 may begin only after the roadmap exit criteria pass and the pilot
selection is explicitly approved.
