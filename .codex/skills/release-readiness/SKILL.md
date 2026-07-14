# Release Readiness

## Purpose

Validate that a change is ready for public review or deployment.

## When To Use

Use before release, deployment, merge or publication.

## Files To Read

- `AGENTS.md`
- `DEVELOPMENT.md`
- `docs/engineering/`
- `git status --short`
- `git diff`

## Inputs Needed

Target release, changed files and validation output.

## Procedure

1. Confirm reproducible installation.
2. Run lint, typecheck, tests and build.
3. Review console and routes.
4. Review responsive basics.
5. Review accessibility.
6. Run public safety review.
7. Review untracked files and Git state.

## Criteria

Installation, lint, typecheck, tests, build, routes, responsive behavior,
accessibility, public safety, untracked files and Git status.

## Output Format

Readiness status, checks run, failures, risks and next actions.

## Stop For Human Review

Stop if validation fails, sensitive content appears or publication impact is
unclear.
