# Release Process

## Status

**Planned — Phase Zero**

No package may be published during Phase Zero. This document defines release infrastructure and future gates; it is not authorization to version or distribute packages.

## Release intent

A consumer-facing change to a future publishable package requires a Changeset describing impact and selecting the appropriate semantic version:

- Patch for backward-compatible fixes
- Minor for backward-compatible capabilities
- Major for breaking changes

Current private placeholder packages, documentation, and repository infrastructure do not require empty Changesets.

## Required gates

Before a future release can be proposed:

1. The package must be approved for publication and no longer configured as a private placeholder.
2. Ownership and release permissions must be confirmed.
3. Formatting, lint, types, tests, production builds, content, registries, links, accessibility, and AI context must pass.
4. Documentation, migration guidance, lifecycle status, and changelog intent must be reviewed.
5. The release pull request must receive the required ownership and discipline reviews.

## Changelog infrastructure

Changesets is configured to generate Markdown changelog entries when publishable packages are introduced. No changelog is generated for current private packages, and no release workflow publishes artifacts.

## Deprecation and breaking changes

Deprecation periods, compatibility promises, migrations, and support windows require explicit approval before any package becomes stable.

## Unresolved release authority

GitHub ownership identities, registry credentials, provenance, signing, environments, and publication permissions remain intentionally unresolved. They must be documented and approved before enabling a release workflow.
