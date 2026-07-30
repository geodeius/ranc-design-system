# Registries

**Status: Experimental**

These validated JSON files are the Phase Zero source of truth for components and
tokens. Package records are also validated against their package manifests so
duplicated metadata cannot drift.

- `components.json` contains only components documented in source content.
- `packages.json` mirrors the declared package workspaces.
- `tokens.json` remains empty until token names are approved. An empty registry
  is intentional and must not be interpreted as a missing validation system.

Registry entries describe platform metadata only. They do not approve a stable
component API, a production token value, or package publication.
