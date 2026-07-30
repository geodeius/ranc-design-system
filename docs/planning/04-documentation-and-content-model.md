# Documentation and Content Model

## General Requirements

All documentation should be machine-readable.

Create:

```text
packages/documentation-schema
```

Use validated frontmatter.

## General Page Schema

```yaml
title: Introduction
description: An introduction to the Rancard Design System.
category: getting-started
status: stable
order: 1
owners:
  - design-systems
lastReviewed: 2026-07-30
tags:
  - introduction
  - onboarding
```

## Component Page Schema

```yaml
title: Button
description: Triggers an action or event.
category: actions
status: planned
version: null
package: '@rancard/react'
figmaNode: null
accessibilityStatus: pending
platforms:
  - web
  - react
owners:
  - design-systems
tags:
  - action
  - interaction
```

Allowed statuses:

```text
planned
designing
development
alpha
beta
stable
deprecated
removed
```

## Foundation Page Schema

```yaml
title: Color
description: Color foundations and semantic color roles.
category: foundations
status: planned
tokenGroup: color
platforms:
  - web
  - ios
  - android
  - figma
owners:
  - design-systems
```

## Standard Component Page Template

Every component page must support:

1. Overview
2. When to use
3. When not to use
4. Anatomy
5. Variants
6. Sizes
7. States
8. Behavior
9. Content guidelines
10. Accessibility
11. Responsive behavior
12. Internationalization
13. Theming
14. API reference
15. Code examples
16. Figma guidance
17. Related components
18. Known limitations
19. Changelog

Create a placeholder Button page to validate the structure. It must not be treated as a finalized component.

## Foundation Documentation Structure

Prepare placeholder pages for:

- Color
- Typography
- Spacing
- Sizing
- Radius
- Border
- Elevation
- Opacity
- Motion
- Breakpoints
- Grid
- Layout
- Iconography
- Focus
- Interaction states

Each page should explain:

- Purpose
- Naming approach
- Expected token hierarchy
- Platform considerations
- Accessibility considerations
- Figma mapping
- Code mapping
- Current implementation status

Use this placeholder where appropriate:

```text
Token values will be defined during the visual foundation phase.
```

## Component Registry

Example:

```json
{
  "name": "button",
  "displayName": "Button",
  "category": "actions",
  "status": "planned",
  "packages": {
    "react": "@rancard/react"
  },
  "platforms": ["web"],
  "figma": null,
  "documentation": "/components/button",
  "owners": ["design-systems"]
}
```

The registry should power:

- Component overview pages
- Status filters
- Search
- Component statistics
- AI context generation
- Future CLI commands
- Future Figma synchronization

Registry entries must be validated in CI.

## Search

Search must cover:

- Page titles
- Descriptions
- Headings
- Tags
- Component names
- Token names
- Package names
- Status
- Platform

Search results should display:

- Title
- Category
- Description
- Status
- Matched heading
- URL

Example:

```text
Input: form validation

Results:
- Form Pattern
- Text Field
- Error Message
- Accessibility: Form Errors
```

## Command Palette

Recommended shortcut:

```text
Command/Ctrl + K
```

Supported actions:

- Search documentation
- Open a component
- Open foundations
- View changelog
- Open GitHub repository
- Switch theme
- Navigate to contribution guide

Accessibility requirements:

- Keyboard navigation
- Focus management
- Escape-to-close
- Screen-reader labeling
- Focus restoration

## AI-Readable Documentation

Create:

```text
AGENTS.md
llms.txt
llms-full.txt
```

Generate:

```text
public/ai/design-system-summary.md
public/ai/component-registry.json
public/ai/token-schema.json
public/ai/navigation.json
public/ai/contribution-rules.md
```

Required agent rule:

```text
Never assume a component, property, token, or package exists unless it is present in the registry or source code.
```

## Required Placeholder Content

### Getting Started

- Introduction
- Principles
- For designers
- For engineers
- Adoption guide

### Foundations

- Foundations overview
- Color
- Typography
- Spacing
- Motion
- Accessibility

### Components

- Components overview
- Component status
- Button placeholder
- Text Field placeholder
- Modal placeholder

### Patterns

- Patterns overview
- Form validation
- Empty states
- Loading states

### Engineering

- Architecture
- Installation
- Theming
- Testing
- Versioning
- AI-assisted development

### Governance

- Governance model
- Contribution process
- Component request process

### Releases

- Changelog
- Roadmap

All incomplete content must be labeled as one of:

```text
Planned
Draft
Example
Placeholder
```
