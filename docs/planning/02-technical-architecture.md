# Technical Architecture

## Monorepo

Use:

- pnpm workspaces
- Turborepo
- TypeScript
- ESLint
- Prettier
- Changesets
- GitHub Actions

Recommended repository name:

```text
rancard-design-system
```

## Documentation Website

Use:

- Next.js App Router
- TypeScript
- MDX
- CSS Modules or vanilla CSS
- CSS custom properties
- Server-side content indexing
- Static generation where possible
- Client-side command palette
- Accessible semantic HTML

Do not introduce a production styling framework that could dictate the future design system.

The documentation website should consume temporary internal documentation styles until the real design system components are available.

Avoid making Tailwind CSS a core dependency of the design system platform.

## Planned Packages

Prepare the repository for:

```text
@rancard/tokens
@rancard/icons
@rancard/react
@rancard/react-native
@rancard/css
@rancard/themes
@rancard/eslint-config
@rancard/typescript-config
@rancard/cli
```

Each package should initially contain:

- README
- Package manifest
- Placeholder entry point
- Build configuration
- Test configuration
- Ownership metadata
- Lifecycle status

## Repository Structure

```text
rancard-design-system/
├── apps/
│   ├── docs/
│   │   ├── app/
│   │   ├── components/
│   │   ├── content/
│   │   ├── lib/
│   │   ├── public/
│   │   ├── styles/
│   │   ├── tests/
│   │   └── package.json
│   └── playground/
│       ├── app/
│       ├── examples/
│       ├── tests/
│       └── package.json
├── packages/
│   ├── tokens/
│   ├── themes/
│   ├── icons/
│   ├── react/
│   ├── react-native/
│   ├── css/
│   ├── cli/
│   ├── eslint-config/
│   ├── typescript-config/
│   └── documentation-schema/
├── content/
│   ├── foundations/
│   ├── components/
│   ├── patterns/
│   ├── templates/
│   ├── engineering/
│   ├── accessibility/
│   ├── governance/
│   ├── releases/
│   └── getting-started/
├── scripts/
│   ├── validate-content.ts
│   ├── generate-navigation.ts
│   ├── generate-search-index.ts
│   ├── validate-links.ts
│   ├── generate-component-registry.ts
│   └── generate-ai-context.ts
├── tooling/
│   ├── github/
│   ├── changesets/
│   ├── content-validation/
│   └── release/
├── .changeset/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── docs/
│   └── adr/
├── AGENTS.md
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── ROADMAP.md
├── SECURITY.md
├── LICENSE
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.json
```

## Temporary Documentation Styling

Use temporary variables only:

```css
--docs-background;
--docs-surface;
--docs-text;
--docs-text-muted;
--docs-border;
--docs-accent;
--docs-focus;
```

The `--docs-` prefix is mandatory so temporary website styles are not mistaken for production design tokens.
