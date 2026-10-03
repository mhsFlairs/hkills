---
name: branded-report-builder
description: Turn approved research or analysis into clear, branded deliverables, especially synchronized Markdown and standalone HTML reports. Use when creating, revising, or improving a report using supplied brand or design-system guidance.
---

# Branded Report Builder

Create readable, consistent deliverables from approved source material. This skill covers document production and revision, not the research subject itself. Follow the user’s design system and content requirements over generic styling preferences.

## Workflow

1. **Inventory the task.** Identify the source analysis, requested output formats, existing target files, intended readers, brand/design guidance, and the exact section or scope to change. Read existing files and relevant tokens/styles before editing. Do not overwrite a complete deliverable when the user requested only a section update.
2. **Resolve source-of-truth questions.** Treat approved analysis as the authority for facts. If Markdown and HTML already exist, identify which content is current and preserve their shared meaning. Ask before changing substantive claims, deleting requested content, or making a design choice that materially affects the deliverable. Do not stall on choices already established by the user or design system.
3. **Structure for scanning.** Lead with the takeaway; use meaningful headings, concise paragraphs, restrained lists, and consistent text blocks. Bold only key conclusions, status, timing, and caveats. Split dense material into logical groups (for example: what to build, readiness, and proposed delivery). Avoid repeating the same point across prose and tables unless the repetition aids navigation.
4. **Honor the brand.** Apply supplied colors, typography, spacing, light/dark behavior, and accessibility requirements. Preserve established visual identity during refinements. Do not replace mandated fonts, palette, voice, or existing layout conventions to satisfy generic design-detector advice. Avoid decorative elements that compete with comprehension.
5. **Keep formats aligned.** When both Markdown and HTML are requested or already maintained, preserve equivalent headings, facts, status labels, estimates, and caveats. Let each format use its native strengths, but do not let one contain a materially different conclusion or roadmap.
6. **Edit surgically.** Keep changes within the requested document/section. Preserve valid links and useful source attribution. Make responsive behavior and semantic HTML appropriate to the report; use ordered heading levels, lists for actual lists, and accessible contrast/focus treatment where relevant.
7. **Validate once, in bounded checks.** Check document structure, section/content completeness, links or source labels as appropriate, matching claims across formats, and responsive CSS for touched layouts. For HTML, verify tag nesting and required content; use the project’s available validator or a small local check when no test suite exists. Run the applicable design detector once after the final edit and distinguish intentional design-system constraints from genuine defects. Do not make repeated speculative polish passes.
8. **Report completion.** Summarize files changed, the readability/design improvement, and validation performed. Mention any intentional warning or known limitation plainly.

## Readability pattern for dense analysis

For each initiative or gap, use a repeatable unit:

- **Heading:** name the issue or opportunity and its priority when known.
- **Lead:** one short bold takeaway followed by a sentence explaining the actual gap.
- **Grouped detail:** practical requirements, workflow, or safety/trust conditions.
- **Readiness/timing:** what exists or is underway, what remains unknown, and a clearly qualified estimate if one was requested.
- **Success evidence:** include only measures relevant to the decision.

Do not force every document into identical cards or tables. Choose the lightest structure that improves scanning and keeps the reading flow clear.

## Guardrails

- Do not invent facts or alter approved claims while formatting. If the source material conflicts, flag the discrepancy rather than silently reconciling it.
- Preserve caveats, source provenance, unknowns, and “estimate, not commitment” language.
- Keep status words and timeline units exactly consistent across outputs.
- Do not introduce icons or decorative motifs when the user requested icon-free styling.
- Keep analysis/content review separate from visual polish; do not expand scope into unrelated UI or product implementation.
