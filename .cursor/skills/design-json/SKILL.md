---
name: design-json
description: >-
  Extracts a visual reference into design.json (colors, type, easing, grid)
  and implements UI against those tokens. Use when the user shares a site,
  screenshot, brand, or design file, or when building, restyling, or reviewing
  pages so the result follows a written visual reference.
---

# Design JSON

`design.json` at the project root is the visual reference. Read it before writing UI. Implement the values that are already set. Leave unset fields unset until a real reference exists.

## Extract first

When the user provides a URL, screenshot, Figma frame, brand guide, or existing page:

1. Read the reference. Record only values you can see or measure.
2. Fill `colors`, `typography`, `easing`, and `grid` in `design.json`.
3. Set `source` to the reference (URL or file) and `status` to `locked`.
4. Then build. Match the file. Do not swap in a nearby default.

If `status` is `awaiting-reference` and no reference was given, ask for one before choosing a palette, typeface, or grid. The motion and cursor blocks may be used as-is.

## Token map

| Key | Use |
| --- | --- |
| `colors` | Background, surface, text, border, and the single accent |
| `typography` | Display, body, and mono families, plus the type scale |
| `easing` | Enter, exit, hover, and scroll curves |
| `grid` | Columns, max width, gutter, page margin, breakpoints |
| `motion.scrollEngine` | `lenis` or `locomotive`. One engine only |
| `motion.spring` / `motion.press` | Motion spring stiffness and damping |
| `cursor` | Fine-pointer follower states. Hidden for coarse pointers |

## Check

After a visual change, compare the result to `design.json`: color roles, type roles, column count, max width, and easing. Update the file when the user changes the reference. Do not let the code and the file drift.
