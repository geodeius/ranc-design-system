# Rancard Design System Principles

These principles guide every design, engineering, documentation, governance, and adoption decision made within the Rancard Design System.

## 1. One System, Many Products

The design system must support multiple Rancard products without becoming tied to one product’s requirements.

Shared foundations should be standardized centrally. Product-specific needs should be handled through documented extension mechanisms rather than by fragmenting the core system.

### Example

Preferred:

```text
Shared Button
+ documented product theme
+ approved composition pattern
```

Avoid:

```text
PaymentsButton
MessagingButton
AnalyticsButton
```

unless the behaviors are genuinely different.

## 2. Guidance Over Blind Enforcement

The system should provide clear defaults, constraints, and recommendations without preventing legitimate product needs.

Rules must explain:

- What is required
- What is recommended
- What is optional
- Why the guidance exists
- How exceptions are evaluated

## 3. Accessibility Is a Core Requirement

Accessibility must be designed, implemented, tested, and documented from the beginning.

Every component and pattern should account for:

- Keyboard interaction
- Focus management
- Screen readers
- Contrast
- Zoom and text scaling
- Reduced motion
- Touch target sizing
- Error identification
- Internationalization

Accessibility is not a final review step.

## 4. Composition Before Proliferation

Prefer combining stable primitives and components over creating narrowly specialized components.

A new component should not be created when the same result can be achieved through a documented composition of existing components.

### Example

Prefer:

```text
Card + Stack + Heading + Button
```

over:

```text
MarketingFeatureCardWithAction
```

unless the combined behavior is repeated and requires centralized maintenance.

## 5. Stable Contracts, Flexible Internals

Public APIs, token names, package exports, and documented behavior should be predictable.

Internal implementation details may evolve as long as public contracts remain stable or follow an explicit migration path.

## 6. Tokens Represent Intent

Semantic meaning should drive token usage.

Prefer:

```text
color.action.primary.background
```

over:

```text
color.blue.500
```

inside product and component implementations.

Primitive values define available choices. Semantic tokens define purpose.

## 7. Platform-Aware Consistency

The system should create consistent experiences across web, mobile, and other supported platforms without forcing identical implementation details.

Consistency should apply to:

- Meaning
- Behavior
- hierarchy
- interaction outcomes
- accessibility expectations

Platform conventions should be respected where appropriate.

## 8. Documentation Is Part of the Product

A component is not complete when only its code or Figma asset exists.

Completion requires:

- Usage guidance
- Behavior documentation
- Accessibility guidance
- API documentation
- Examples
- Known limitations
- Version status
- Ownership
- Changelog information

## 9. Source-of-Truth Discipline

Information should be generated from authoritative registries and schemas where possible.

Avoid manually duplicating:

- Component statuses
- Package names
- Navigation metadata
- Token definitions
- Supported platforms
- Ownership information

Generated documentation reduces drift.

## 10. AI and Human Readability

Repository conventions, documentation, APIs, and metadata should be understandable by both humans and coding agents.

AI agents must be able to determine:

- What exists
- What is approved
- What is planned
- What is deprecated
- Where authoritative information lives
- Which constraints must not be violated

## 11. Progressive Maturity

Not every asset must begin as stable.

Use explicit lifecycle stages:

```text
Planned
Experimental
Alpha
Beta
Stable
Deprecated
Removed
```

Each status must communicate what consumers can expect.

## 12. Measured Adoption

The success of the system should be evaluated through evidence.

Useful indicators include:

- Product adoption
- Component reuse
- Time saved
- Reduction in duplicated UI
- Accessibility defect reduction
- Upgrade completion
- Documentation success
- Search success and zero-result searches

Metrics should inform improvements rather than punish teams.

## 13. Contribution Is a Product Workflow

Contribution should be structured, understandable, and accessible to teams outside the core design-system group.

A contributor should know:

- How to request a component
- How proposals are evaluated
- What evidence is required
- Who reviews the work
- How ownership is assigned
- How the contribution is released

## 14. Backward Compatibility Matters

Breaking changes should be rare, deliberate, documented, and supported by migration guidance.

Deprecations should include:

- Replacement guidance
- Deprecation version
- Removal target
- Migration examples
- Known impact

## 15. Quality Over Catalog Size

The goal is not to build the largest component library.

The goal is to provide a trusted set of well-designed, accessible, tested, documented, and maintainable solutions.

## Decision Test

When making a major design-system decision, ask:

1. Does this solve a recurring problem?
2. Is the intent clear?
3. Is it accessible?
4. Is it reusable across products?
5. Is it maintainable?
6. Is it documented?
7. Can both engineers and designers understand it?
8. Can an AI agent identify whether it is approved?
9. Does it preserve stable contracts?
10. Is there an accountable owner?
