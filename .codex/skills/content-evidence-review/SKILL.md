# Content Evidence Review

## Purpose

Classify claims and prevent unsupported public content.

## When To Use

Use for biography, projects, research, metrics, affiliations and public claims.

## Files To Read

- `AGENTS.md`
- `docs/content/`
- relevant `.local-context/approved/`, then `reviewed/`, then `raw/`

## Inputs Needed

Claim list, sources, source dates, publication context and sensitivity.

## Procedure

1. Extract each claim.
2. Match claims to evidence.
3. Record source date and vigencia.
4. Separate fact, interpretation, opinion and aspiration.
5. Flag contradictions and privacy issues.

## Criteria

Classify each claim as verified, verified but outdated, plausible without enough
evidence, opinion, aspiration, not publishable or contradictory.

## Output Format

Table with claim, classification, evidence, risk and recommendation.

## Stop For Human Review

Stop when a claim is sensitive, contradictory, private or lacks publication
authorization. Never transform inference into fact.
