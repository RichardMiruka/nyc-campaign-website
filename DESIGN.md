---
name: Richard Miruka Campaign 2026
description: A high-performance, policy-first digital platform for NYC 2026.
colors:
  navy: "#0D1B40"
  golden: "#D4A017"
  kenyan-green: "#1A5C38"
  green-mid: "#2E7D52"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.04em"
  serif:
    fontFamily: "Playfair Display, serif"
    fontSize: "1.25rem"
    lineHeight: 1.6
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-gold:
    backgroundColor: "{colors.golden}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  card-premium:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    rounded: "{rounded.md}"
    padding: "32px"
---

# Design System: Richard Miruka Campaign 2026

## 1. Overview

**Creative North Star: "The Visionary Vanguard"**

The Visionary Vanguard is a design system built for high-stakes leadership and national representation. It balances the urgency of youth activism with the professional restraint of a serious policy platform. The aesthetic is "Professional, Calm, and Policy-Focused," utilizing a deep, authoritative palette and high-contrast typography to ensure legibility across all environments.

This system rejects the "SaaS-cliché" of soft gradients and airy whitespace in favor of a dense, data-backed authority that feels earned and intentional. It is a digital environment that is grounded in community but looking firmly toward the future.

**Key Characteristics:**
- **Authoritative Density**: Information-rich layouts that prioritize facts over filler.
- **Strategic Contrast**: Gold accents used sparingly to guide the eye to critical actions (Register & Vote).
- **Modern Heritage**: Pairing the industrial strength of Bebas Neue with the editorial grace of Playfair Display.

## 2. Colors

A palette of national pride and policy-led authority.

### Primary
- **Midnight Navy** (#0D1B40): The foundation of the system. Provides deep contrast and a sense of institutional stability. Used for main backgrounds.
- **Golden** (#D4A017): The color of prosperity and success. Used for primary CTAs and critical highlights.

### Secondary
- **Kenyan Green** (#1A5C38): Represents growth, agriculture, and the grassroots movement. Used for secondary sections and pillar backgrounds.

### Neutral
- **Paper White** (#FFFFFF): Used for high-legibility body text.
- **Glass-Light** (rgba(255, 255, 255, 0.05)): Used for card backgrounds and tonal layering.

**The Golden Ratio Rule.** The Golden accent is a "high-heat" color. It should never cover more than 5% of a screen's surface area. Its power comes from its rarity.

## 3. Typography

**Display Font:** Bebas Neue (Industrial, Powerful)
**Body Font:** DM Sans (Clean, Accessible)
**Serif Font:** Playfair Display (Editorial, Trusted)

**Character:** A pairing that feels both like a modern news report and a historic campaign poster. High contrast between weights and styles.

### Hierarchy
- **Display** (Regular, clamp(2.5rem, 8vw, 6rem), 1): Used for main section headers and hero statements. All-caps with 0.04em tracking.
- **Headline** (Bold, 2.5rem, 1.2): Used for major sub-sections.
- **Body** (Regular, 1rem, 1.6): Optimized for long-form policy reading. Max line length capped at 75ch.
- **Eyebrow** (Medium, 0.625rem, 0.25em tracking): All-caps, pill-shaped tags for categorization.

## 4. Elevation

The system is primarily flat with "tactile depth." It uses tonal layering (translucent whites over navy) and subtle glass-morphism rather than heavy shadows to create hierarchy.

### Shadow Vocabulary
- **Card-Lift** (0 20px 40px rgba(0, 0, 0, 0.3)): Applied only on hover to "premium" cards to indicate interactivity.
- **Inner-Glow** (1px white-border): Used via the `.doppelrand` utility to give elements a physical, machined feel.

## 5. Components

### Buttons
- **Shape:** Softened industrial (12px radius)
- **Primary (Gold):** Gradient (#D4A017 to #B8860B) with inner glow. Lifts 2px on hover.
- **Secondary (Navy/Outline):** High-contrast border against darker backgrounds.

### Cards
- **Premium Card:** Translucent background (rgba(255, 255, 255, 0.05)) with a 20px backdrop blur. Lift on hover with a 1px white border activation.

### Eyebrows
- **Style:** Small all-caps, 0.25em tracking. Pill-shaped background (10% Gold). Used to categorize "Pillars" and "Stats."

## 6. Do's and Don'ts

### Do:
- **Do** use `text-wrap: balance` on all section headers.
- **Do** maintain a strict 4.5:1 contrast ratio for all body text.
- **Do** use the `doppelrand` effect to give containers a premium, finished feel.

### Don't:
- **Don't** use gold for large background areas; it is for guidance, not coverage.
- **Don't** use generic "SaaS gray" for text; use pure white or high-opacity transparencies.
- **Don't** animate image transforms on hover; use the container's lift or border instead.
