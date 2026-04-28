---
name: StudyProx
description: Bridge the intent-action gap with cognitive ease.
colors:
  primary: "#2563eb"
  neutral-bg: "#ffffff"
  neutral-fg: "#0f172a"
  accent: "#f59e0b"
  muted: "#f1f5f9"
  destructive: "#ef4444"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Outfit, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  lg: "12px"
  md: "8px"
  sm: "4px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.lg}"
    padding: "10px 24px"
  card-minimal:
    backgroundColor: "{colors.neutral-bg}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: StudyProx

## 1. Overview

**Creative North Star: "The Calm Navigator"**

StudyProx is built on the philosophy of **Restrained Utilitarianism**. It rejects the overstimulating "glow-mesh" and glassmorphism clichés of modern AI tools in favor of absolute clarity and functional whitespace. The system is designed to meet students in a neutral state and provide a frictionless path to momentum.

**Key Characteristics:**
- High-contrast legibility.
- Predictable, border-driven affordances.
- Generous whitespace to reduce cognitive load.

## 2. Colors

The palette is anchored in a deep Neutral Slate with a singular "Action Blue" for primary momentum and "Focus Amber" for strategic highlights.

### Primary
- **Action Blue** (#2563eb): Used exclusively for primary calls to action and progress indicators. It signals the path forward.

### Neutral
- **Neutral Slate** (#0f172a): The foundation of clarity for all text and structural elements.
- **Paper White** (#ffffff): The clean, calm canvas for all study surfaces.
- **Subtle Slate** (#f1f5f9): Used for secondary backgrounds and subtle boundaries.

**The Rare Accent Rule.** The primary accent is used on ≤10% of any given screen. Its rarity is the point—it identifies "The Next Step" without shouting.

## 3. Typography

**Display Font:** Outfit (sans-serif)
**Body Font:** Inter (sans-serif)

The pairing combines the modern, friendly character of Outfit for headers with the proven legibility of Inter for task-heavy body content.

### Hierarchy
- **Display** (700, clamp(2rem, 5vw, 3rem), 1.1): Used for the main dashboard welcome and critical focus states.
- **Body** (400, 1rem, 1.5): Used for all task descriptions and micro-goals. Max line length capped at 75ch.

## 4. Elevation

The system uses a **Flat-By-Default** elevation strategy. Depth is conveyed through subtle borders and tonal layering rather than aggressive shadows.

**The Response Shadow Rule.** Surfaces are flat at rest. Subtle shadows (shadow-sm) appear only to provide affordance for interactive cards or as a response to hover states.

## 5. Components

### Buttons
- **Shape:** Softly squared with a 12px radius (`rounded-xl`).
- **Primary:** Action Blue background with White text. Focused on the "Start" action.

### Cards
- **Style:** Clean white containers with a 1px slate border (`border-slate-200`).
- **Padding:** Generous 24px internal padding (`p-6`) to ensure content has room to breathe.

### Inputs
- **Style:** Subtle slate background (`bg-slate-50`) with a focus ring in Primary Blue at 20% opacity.

## 6. Do's and Don'ts

### Do:
- **Do** use `slate-200` for all structural boundaries to maintain a light, airy feel.
- **Do** prioritize the "Next Step" by making it the most visually distinct element on the screen.

### Don't:
- **Don't** use dark mode by default unless explicitly in a "Hard Lock" focus session.
- **Don't** use cluttered feeds or infinite nesting. Keep the hierarchy shallow and clear.
- **Don't** use "dry" enterprise-style tables; use spacious bento-grid cards instead.
