# Current routing candidates

Verified on 2026-11-15. This is a dated snapshot, not an evergreen model resolver.

| Family | Latest verified model ID | Efforts advertised by this Codex session's spawn tool | Standard API input / output USD per 1M tokens |
| --- | --- | --- | --- |
| Luna | `gpt-6-luna` | low, medium, high, xhigh, max | $0.10 / $0.50 |
| Terra | `gpt-6.1-terra` | low, medium, high, xhigh, max, ultra | $1 / $5 |
| Sol | `gpt-6.1-sol` | low, medium, high, xhigh, max, ultra | $2 / $10 |
| Astra | `gpt-6-astra` | low, medium, high, xhigh, max, ultra | $10 / $50 |

Model IDs and baseline prices: [official model catalog](https://developers.openai.com/api/docs/models). Recheck [official pricing](https://developers.openai.com/api/docs/pricing) for applicable context length, cached input, cache writes, service tier, and regional treatment before calculating costs. The table is a price comparison, not a complete billing formula.

Runtime evidence: the live `collaboration.spawn_agent` schema observed during creation advertised all four IDs above. It advertised the `priority` service tier, but exposed no service-tier selector or billing counters. Standard API prices therefore do not establish the bill for these subagents. Model defaults also differ; set the effort explicitly.

## Resolve before use

1. Inspect the actual spawn surface, including model restrictions and per-model effort support. This is stronger evidence of dispatch capability than API documentation, a chat picker, cached configuration, or agent self-report. Availability advertised by a schema is still not proof that a particular request will run successfully.
2. On the first use after the verified date, a reported release, a changed runtime catalog, or a request for latest models, check the official catalog for the newest released version of each family. Reuse that lookup within the task. Update this reference when maintaining the skill, or keep a dated task-local resolution if the skill is read-only.
3. Retain one latest released ID per family, independently. A release in one family does not imply matching version numbers in the others. Never fabricate a version suffix, restore a superseded compatibility model, or treat a lexical maximum of available IDs as release evidence.
4. Intersect verified latest IDs with the active tool. If a family's newest release is unavailable, exclude that family from automatic routing; choose another adequate current candidate or work inline. Do not silently use its predecessor. Later explicit user choices take precedence, subject to runtime support, and should be recorded as exceptions.
5. If current release information cannot be fetched, label this snapshot unrefreshed. Do not assert it is latest or dispatch an automatic latest-only route whose freshness cannot be established. Continue inline, or honor a user-specified exact supported model with the limitation stated.

The API catalog lists effort levels that differ from this session's native tool. For example, API non-reasoning settings do not imply native spawn support. Always use the current tool's contract for the actual invocation.

## Native dispatch example

After scoping and acceptance checks, a narrowly bounded code task can be requested as:

```json
{
  "task_name": "bounded_fix",
  "fork_turns": "none",
  "model": "gpt-6-luna",
  "reasoning_effort": "high",
  "message": "Self-contained outcome, file ownership, relevant project instructions, acceptance checks, stop conditions, concise return format; no descendants."
}
```

This illustrates parameters, not a ready-to-run task. A successful tool call proves acceptance of the request. Use returned runtime metadata, if available, to confirm the effective configuration. If not exposed, report it as unverified.

Codex documents inheritance and custom-agent configuration in [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents). This package uses native tools and needs no `.codex/agents` files, API key, routing service, or global configuration change.
