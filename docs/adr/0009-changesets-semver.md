# ADR-0009: Use Changesets and semantic versioning

- Status: Accepted
- Date: 2026-07-30
- Owners: Rancard Design System core team

## Context

Future packages may evolve independently while still being released together. Consumers will require clear version changes, changelogs, and migration intent.

## Decision

Use Changesets with semantic versioning. During Phase Zero every package remains private, package versioning is disabled, and publishing is prohibited.

## Alternatives Considered

- Manual version management
- Date-based versions
- A single global version

## Consequences

Contributors can record release intent close to a change, and future automation can derive coordinated versions and release notes. The team must define release permissions and changelog policy before publication is enabled.

## Follow-up Actions

- Define the release workflow in its dedicated Phase Zero task.
- Confirm which private packages will eventually be published.
- Enable versioning and publishing only after the relevant readiness gates pass.
