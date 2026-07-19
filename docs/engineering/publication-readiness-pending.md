# Publication Readiness Pending Items

Status: pending human decisions  
Last updated: 2026-07-18

The site is technically publishable, but the following items remain open before
calling it fully mature from a legal, editorial and brand perspective.

## Legal And Privacy

- Formal legal review of privacy, cookies and license pages.
  - Why: current pages are practical notices, not a lawyer-reviewed legal set.
  - Resolve by: reviewing with a qualified lawyer for Mexico and expected
    international visitors, especially EU/UK/Swiss visitors.

- Decide whether Google Tag Manager and Google Analytics should stay in Consent
  Mode advanced or move to basic consent mode.
  - Why: the current implementation loads the GTM container with denied consent
    by default, which helps installation checks and Consent Mode behavior but may
    still send consent pings before acceptance.
  - Resolve by: choosing risk posture. If basic mode is required, load
    `gtm.js` only after analytics is accepted and accept that some installation
    checks may need consent first.

- Confirm GA4 data retention settings.
  - Why: cookie and privacy notices now describe retention generally, but the
    exact GA4 property retention must match the real Google Analytics setting.
  - Resolve by: checking the GA4 property data retention screen and updating
    `/privacy` and `/cookies` if needed.

- Decide whether to publish a formal address or legal service channel.
  - Why: a formal privacy notice may require a clearer address or official
    contact mechanism.
  - Resolve by: choosing a safe public contact address, agent or legal channel.

- Choose governing language for bilingual legal pages.
  - Why: Spanish and English pages should say which version controls if wording
    differs.
  - Resolve by: deciding whether Spanish governs, English governs, or both are
    equally informational.

## Brand And Rights

- Confirm Mikeroguez trademark strategy.
  - Why: the site avoids claiming registration, but future registration affects
    brand language and asset use.
  - Resolve by: doing an availability search, choosing jurisdictions/classes and
    deciding whether to use TM-style notices.

- Confirm rights for public assets.
  - Why: photos, logos, PDF documents and project marks are excluded from the
    default content license but still need publication permission.
  - Resolve by: completing `docs/engineering/public-assets-inventory.md`.

## Evidence And Editorial

- Confirm exact role in REDI.
  - Why: approved evidence says the role is pending, so public copy now uses a
    cautious participation claim.
  - Resolve by: adding a reviewed source that confirms role, dates and scope.

- Confirm public wording for EvPraxis operation and links.
  - Why: the safe claim is development of EvPraxis 2.0; operation,
    decentralization and maintenance dates need source support before being
    stated strongly.
  - Resolve by: adding a reviewed project source or approved statement.

- Confirm whether “coordinated” applies to El Encanto.
  - Why: current copy now uses the safer “developed during master's work.”
  - Resolve by: adding evidence for coordination if that wording is desired.

- Verify 2026 community roles for AMexIHC and LAIHC before publication pushes.
  - Why: future/current event roles can change.
  - Resolve by: checking public event pages or approved evidence before release.

## Accessibility And QA

- Run manual keyboard and screen reader review.
  - Why: automated validation passes but cannot confirm focus behavior,
    announcements, reading order and mobile menu ergonomics.
  - Resolve by: testing with keyboard, browser zoom, reduced motion and at least
    one screen reader before a stable release.

- Review mobile screenshots after route and legal changes.
  - Why: the legal pages and footer gained more links and longer text.
  - Resolve by: running the dev server and checking desktop/mobile screenshots.
