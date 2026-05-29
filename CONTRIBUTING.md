# Contributing

Nexcord Connect uses a small, strict TypeScript workflow.

## Commits

Use conventional commits:

```text
feat: add provider option
fix: handle disconnected wallet state
chore: update build config
```

## Branches

Use clear branch prefixes:

- `feat/short-description`
- `fix/short-description`
- `chore/short-description`

## Pull Requests

Before opening a PR:

- CI must pass.
- Biome must be clean.
- TypeScript must build with strict mode.
- No `any` types are allowed.
- Public API changes must be reflected in the README.

## Code Style

- Use TypeScript strict mode for all packages.
- Prefer named exports.
- Keep function signatures explicit.
- Use `unknown` and narrow values instead of `any`.
- Keep files under 120 lines.
- Format with Biome using 2-space indentation, double quotes, and trailing commas.
