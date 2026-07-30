# Design-System Opportunity Map

Status: In progress

## Evidence base

This preliminary opportunity map is based on stakeholder-reported portfolio
needs. It must be refined when implementation constraints and Unify redesign
workflows are available.

## Opportunities

| Reported problem       | Potential system response                                      | Evidence maturity |
| ---------------------- | -------------------------------------------------------------- | ----------------- |
| Poor user experience   | Shared interaction guidance and validated composition patterns | Qualitative       |
| Inconsistent styling   | Shared foundations, themes, and documented usage               | Qualitative       |
| Accessibility limits   | WCAG 2.2 AA requirements, accessible primitives, and testing   | Qualitative       |
| Slow task completion   | Workflow-focused Unify redesign and usability measures         | Desired outcome   |
| Weak navigation        | Responsive navigation research and task-based validation       | Desired outcome   |
| Slow engineering work  | Reusable implementation, documentation, and tooling            | Desired outcome   |
| Developer access needs | Searchable documentation and clear contribution pathways       | Desired outcome   |

## Theme opportunity

- A shared Rancard theme should support the portfolio.
- Campaigns and Unify additionally require product-level color themes.
- Component behavior and non-color foundations should remain shared.
- Product themes should build on shared foundations rather than fork the core
  system.

The exact theme inheritance, override boundaries, and ownership model require a
Stage 2 architecture decision.

## Risks

- Building every component category at once would prevent a focused pilot.
- Product themes could become forks if override boundaries are not explicit.
- Qualitative success goals cannot establish improvement without a measurable
  baseline.
- Existing shadcn usage may accelerate delivery or constrain APIs; that decision
  has not been evaluated.

## Evidence limitations

- Exact product-level usage counts and analytics were explicitly deferred; the
  stakeholder accepted qualitative frequency for Stage 1.
- No opportunity has been sized by user impact, engineering effort, or risk.
- No implementation order is approved.
