# Routing evidence and design choices

Updated 2026-11-17. Earlier benchmarks remain as historical evidence for the versions tested.

## GPT-6.2 launch evidence

OpenAI's launch report gives Sol 6.2 a FrontierCode 2.0 score within 0.5 points of Astra 6.2 at roughly one-fifth the measured cost, with both at max effort. On GDPval v2, Astra gained 6.2 points over its predecessor while generating 22% fewer output tokens, and Sol gained 5.3 points over its predecessor. Use these results to favor Sol when cheaper workers are inadequate and reserve Astra for a specific capability gap. Benchmark cost varies by workload and effort. Compare candidates against your own acceptance checks. [OpenAI launch report](https://openai.com/index/introducing-gpt-6-2-astra-sol/).

## Leaderboards

### Artificial Analysis

The [live Coding Agent Index](https://artificialanalysis.ai/agents/coding-agents) is v2.1. It combines FrontierCode-AA 2.0, Terminal-Bench 4.1, and SWE-Atlas-QnA-AA. The fetched page exposed methodology but not the individual chart values, so no numeric v2.1 ranking is claimed here.

The [Terra release analysis, 2026-10-26](https://artificialanalysis.ai/articles/gpt-6-1-terra-pushes-the-cost-efficiency-frontier/) reports these historical v2.0 index scores:

| Model | Coding Agent Index v2.0 |
| --- | ---: |
| Sol 6.1 | 54 |
| Terra 6.1 | 48 |
| Luna 6 | 31 |

These are published index scores, not task success probabilities or values from the current v2.1 board. The same article identifies Terra low and xhigh as cost-efficient settings in that coding evaluation. This argues against blindly setting every task to maximum effort.

### Search-SWE

The [2026-11-13 leaderboard snapshot](https://search-swe.github.io/leaderboard/) evaluated these earlier versions at max effort in Codex v0.164.0 on 47 tasks each:

| Model | Mean task score | Estimated cost for the entire evaluation |
| --- | ---: | ---: |
| Sol 6.1 | 46.4% | $250.79 |
| Astra 6 | 45.9% | $1,339.08 |
| Terra 6.1 | 42.5% | $232.30 |
| Luna 6 | 13.1% | $13.78 |

Scores average task-specific results; they do not mean percent of tasks solved. Cost uses recorded tokens and official API rates dated 2026-11-14, including applicable cache/context treatment. These specialized search-system tasks do not establish universal coding ability or Codex subscription consumption.

Our inference: Luna is worth trying on well-bounded work with cheap verification, while difficult engineering can justify Sol immediately. Terra's lower token price produced only a modest total-cost difference from Sol here. Astra's price did not buy a higher score in this sample. This supports capability-based selection and local evaluation, not a mandatory cheap-to-expensive retry ladder.

## Official guidance

[OpenAI model selection](https://developers.openai.com/api/docs/guides/model-selection) positions Luna for scoped work, Terra for visual work/writing/scoped fixes, Sol for complex work with cost constraints, and Astra for the most demanding reasoning. These are useful starting points; the routing table in SKILL.md is our heuristic.

[Codex Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) documents delegation via user, project, or skill instructions, model configuration, inherited permissions, and added token usage. The actual native tool schema remains the invocation authority. Current IDs and price caveats are maintained in [models.md](models.md).

## Similar GitHub projects

Reviewed as design evidence; no third-party code, install scripts, or prompts were executed or copied.

| Project | Useful idea | Adaptation in this skill |
| --- | --- | --- |
| [peterjohannmedina/codex-model-routing](https://github.com/peterjohannmedina/codex-model-routing/blob/main/SKILL.md) | Counts context transfer and coordination in routing decisions | Compact packets; current routing favors delegating even trivial routine work when a suitable lower route exists; omit its broader provider/dashboard and conservation-mode machinery |
| [Rattlhead/task-model-router](https://github.com/Rattlhead/codex-agent-skills/blob/main/skills/task-model-router/SKILL.md) | Distinguishes supported model overrides, costs through acceptance, and pricing units | Runtime eligibility checks and honest accounting; no credit-to-dollar assumptions |
| [LAwLi3tCoding/codex-subagent-router](https://github.com/LAwLi3tCoding/codex-subagent-router) | Separates model choice from permission/decision to spawn; uses problem structure to choose effort | Separate delegation and routing gates; unlike its Sol-first automatic policy, admit Luna/Terra for verifiable bounded work |
| [IonDen/subagent-optimizer](https://raw.githubusercontent.com/IonDen/skills/main/plugins/ionden-skills/skills/subagent-optimizer/SKILL.md) | Reduces startup instructions and checks platform-specific agent definitions | Short entrypoint and on-demand references; use the actual Codex tool schema |

These repositories are community implementations, not validation of savings. Their catalogs and defaults may age. This skill keeps only the newest verified release of each selected family and does not import older compatibility routes.
