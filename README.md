# Reusable agent skills

This repository contains reusable agent skills for research, reporting, architecture visualization, and cost-aware Codex subagent delegation.

## Install

Install all skills with the [Skills CLI](https://skills.sh/):

```bash
npx skills add mhsFlairs/hkills --skill comparative-research-analysis --skill branded-report-builder --skill architecture-visualization --skill ecosystem-visualization --skill codex-efficient-subagents
```

Install only one by using its skill name:

```bash
npx skills add mhsFlairs/hkills --skill comparative-research-analysis
npx skills add mhsFlairs/hkills --skill branded-report-builder
npx skills add mhsFlairs/hkills --skill architecture-visualization
npx skills add mhsFlairs/hkills --skill ecosystem-visualization
npx skills add mhsFlairs/hkills --skill codex-efficient-subagents
```

## Skills

- `comparative-research-analysis` — evidence-grounded comparisons, capability/readiness mapping, gap analysis, prioritization, and cautious timeline estimates.
- `branded-report-builder` — clear, brand-aligned reports, including synchronized Markdown and HTML deliverables.
- `architecture-visualization` — evidence-aware system diagrams and function-first strategy mind maps, with an offline starter, contextual layers, hash navigation and touch/trackpad zoom.

- `ecosystem-visualization` — connected service maps and offline metro canvases with clear entries, shared interchanges, destinations, selectable journeys and function-specific animated routes.

- [`codex-efficient-subagents`](skills/codex-efficient-subagents/SKILL.md) — keeps the current main agent and delegates trivial or routine bounded execution to an adequate cheaper model or same-model/lower-effort worker, including Luna for straightforward Git, transcription, PowerShell, and search/evidence workflows. Routes complex merges and difficult decisions to adequate stronger reasoning, verifies results, and avoids Astra subagents unless genuinely needed. Includes a dated model catalog, research sources, and evaluation guidance.
