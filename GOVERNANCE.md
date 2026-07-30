# Governance

## Status

**Draft — Phase Zero**

The Rancard Design System core team owns architecture, standards, approvals, releases, and governance. Contributors propose and document changes; product teams provide adoption evidence and feedback.

Major changes follow the workflow defined in `docs/planning/06-engineering-governance-and-quality.md` and require review across the relevant design, engineering, accessibility, content, and product disciplines.

## Decisions

Architectural decisions are recorded under `docs/adr/`. A proposed decision must document context, alternatives, consequences, follow-up work, status, date, and owners. Existing accepted ADRs take precedence over older planning notes.

## Ownership

Package manifests use the provisional planning owner `design-systems`. Concrete GitHub usernames or teams must not be added until the organization confirms them.

The intended critical-area coverage is documented in `.github/CODEOWNERS`. That file remains deliberately non-enforcing until the organization supplies valid identities. Once confirmed, repository administrators must:

1. Map the repository fallback, GitHub configuration, ADRs, schemas, registries, and release infrastructure to valid owners.
2. Enable required CODEOWNERS review in branch protection for `main`.
3. Record release permissions separately from review ownership.
4. Replace this provisional status without changing historical registry ownership labels silently.

Phase 7 cannot satisfy its ownership-enforcement acceptance criterion until those external identities and repository settings are confirmed.
