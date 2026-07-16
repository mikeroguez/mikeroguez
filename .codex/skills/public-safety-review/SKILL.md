---
name: public-safety-review
description: Prevent accidental publication of secrets, private data, sensitive material, risky metadata, or reputationally harmful content before commits, PRs, releases, and deployments.
---

# Public Safety Review

## Purpose

Prevent accidental publication of sensitive, private or reputationally risky
material.

## When To Use

Use before commits, PRs, releases, deployments and content publication.

## Files To Read

- `AGENTS.md`
- `docs/engineering/public-repository-safety.md`
- `git diff`
- `git status --short`
- relevant workflows and generated files

## Inputs Needed

Diff, untracked files, generated artifacts and content sources.

## Procedure

1. Run `npm run check:public` when available.
2. Inspect secrets and private data.
3. Review local paths, emails, phones and third-party data.
4. Review ignored files and generated artifacts.
5. Review dependencies and workflows.
6. Confirm `.local-context/` remains ignored.

## Criteria

Secrets, private information, sensitive content, local paths, third-party data,
internal documents, metadata, ignored files, generated files and dependencies.

## Output Format

Proceed, pause or stop, followed by findings and required fixes.

## Stop For Human Review

Stop on any likely secret, private data, confidential material or unclear
publication authorization.
