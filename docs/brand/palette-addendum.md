# ALDER ROASTERS — Palette Addendum: Tropical Workshop

**Status:** Approved visual direction revision (supersedes §4 of the Phase 2 brand strategy)
**Reason:** The original parchment/clay system read as dusty and heritage-coded. The revised palette keeps the "scarce accent, structured neutrals" governance but shifts temperature and chroma toward a contemporary Malaysian tropical register.

## Core tokens (OKLCH)

| Token                              | Value                   | Role                                                               |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------ |
| `--color-paper`                    | `oklch(0.975 0.008 95)` | Default page surface — bright warm paper, not beige                |
| `--color-surface-raised`           | `oklch(0.99 0.004 95)`  | Cards, form fields, image mattes                                   |
| `--color-oat`                      | `oklch(0.93 0.022 90)`  | Secondary sections, quiet selected states                          |
| `--color-stone`                    | `oklch(0.72 0.018 95)`  | Disabled decoration, soft dividers                                 |
| `--color-ink`                      | `oklch(0.24 0.035 165)` | Primary text — rainforest black-green undertone                    |
| `--color-espresso`                 | `oklch(0.27 0.045 162)` | Dark chapters, footer                                              |
| `--color-espresso-raised`          | `oklch(0.33 0.05 160)`  | Raised surfaces inside dark chapters                               |
| `--color-pandan` / `--color-roast` | `oklch(0.42 0.07 152)`  | Origin/process context, secondary brand field                      |
| `--color-moss`                     | `oklch(0.5 0.06 150)`   | Supporting seasonal accent                                         |
| `--color-brass`                    | `oklch(0.68 0.11 80)`   | Rare data highlight; never small-text foreground on light surfaces |
| `--color-flame`                    | `oklch(0.63 0.19 41)`   | Action accent, large display moments                               |
| `--color-flame-strong`             | `oklch(0.55 0.185 38)`  | Filled buttons/controls with white text                            |
| `--color-flame-bright`             | `oklch(0.72 0.17 48)`   | Selection highlight, decorative traces                             |
| `--color-ceramic`                  | `oklch(0.52 0.06 220)`  | Focus ring, informational guidance                                 |

## Semantic states

Success/warning/error/info retain their hue families, re-tuned in OKLCH for the brighter base. Focus remains ceramic teal — deliberately cool against the warm base so it is unmistakable.

## Contrast contract

Verified pairs (WCAG 2.2):

- Ink on paper: ≥ 12:1
- Text secondary (`oklch(0.44 0.03 140)`) on paper: ≥ 7:1
- White on flame-strong: ≥ 4.5:1
- Inverted text on espresso: ≥ 10:1
- Ceramic focus ring vs paper/oat/espresso: ≥ 3:1

Any new pairing must be verified before shipping; the addendum documents the contract, not a substitute for testing.

## Governance notes

- Flame is the only saturated action accent. Pandan/ceramic are contextual, never competing CTAs.
- Usage ratios from the brand strategy still apply: neutrals carry layouts, accents stay under ~5% of any view.
- Parametric packaging derives per-coffee hues via `color-mix()` anchored to this system.
