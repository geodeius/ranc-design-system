# Codex Operating Rules

Codex must follow these rules throughout implementation:

1. Work incrementally.
2. Keep the repository buildable after every phase.
3. Do not invent finalized design decisions.
4. Mark assumptions clearly.
5. Prefer generated data over duplicated data.
6. Validate all structured content.
7. Maintain strict TypeScript settings.
8. Avoid circular dependencies.
9. Keep package boundaries explicit.
10. Ensure accessibility from the first implementation.
11. Add tests for generators and validators.
12. Document architectural decisions.
13. Do not expose undocumented APIs.
14. Do not treat temporary documentation styles as design-system tokens.
15. Use registries as the source of truth.
16. Keep all placeholder implementations visibly labeled.
17. Never silently modify architectural conventions.
18. Create an ADR when making a major architectural decision.

## Implementation Constraints

- Do not create final token values.
- Do not create final component APIs.
- Do not publish packages.
- Do not use temporary documentation styles as production tokens.
- Prefix temporary website variables with `--docs-`.
- Mark unfinished content as planned, draft, example, or placeholder.
- Keep builds, tests, linting, and type checking passing.
- Use registries and validated metadata as the source of truth.
- Write an ADR for major architectural decisions.
