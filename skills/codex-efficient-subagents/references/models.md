# Current routing candidates

Verified on 2026-11-17. Check the live spawn tool before dispatch.

| Latest verified model ID | Routing strengths | Native spawn in this session |
| --- | --- | --- |
| `gpt-6-luna` | Routine operations, extraction, transcription workflows using tools, and evidence gathering | Absent from the current spawn options. Eligible only when the active tool offers it. |
| `gpt-6.1-terra` | Bounded implementation, visual understanding, computer use, clear writing, and routine execution when Luna is unavailable | low (default), medium, high, xhigh, max, ultra |
| `gpt-6.2-sol` | Coding and review, multistep workflows, synthesis, and planning difficult work for cheaper executors | low, medium (default), high, xhigh, max, ultra |
| `gpt-6.2-astra` | Sustained reasoning across systems, difficult implementation and verification, and professional deliverables that follow templates | low (default), medium, high, xhigh, max, ultra. Exceptional subagent route. |

Sol and Astra 6.2 launched on November 17, 2026 in Codex app and CLI, ChatGPT Work, and the API on supported plans. Both accept text and images and produce text. Both API models have a 1.05M-token context window with up to 922K input and 128K output tokens. Their documented default Codex contexts are **500K for Sol** and **272K for Astra**. Keep worker packets compact in either case. Check the live worker tools for permissions and capabilities such as search or computer use. [Release notes](https://learn.chatgpt.com/docs/whats-new/gpt-62-astra-sol), [Codex model guide](https://learn.chatgpt.com/docs/models), [Sol API model](https://developers.openai.com/api/docs/models/gpt-6.2-sol), [Astra API model](https://developers.openai.com/api/docs/models/gpt-6.2-astra).

The live tool also lists earlier Sol and Astra releases. Automatic routing uses the latest verified release per family. If Luna is absent, prefer Terra at low effort for routine work when adequate, or choose an eligible same-model worker at lower effort. The spawn tool advertises `priority` and exposes no tier selector or billing counters. Confirm the applicable tariff separately.

## Pricing

Rates are per million tokens. API columns use USD at Standard speed and short context. The Codex credit column applies to eligible Standard-speed credits or pay-as-you-go usage. Included subscription usage follows its own allowance. [API pricing](https://developers.openai.com/api/docs/pricing), [Codex credit rates](https://learn.chatgpt.com/docs/pricing#token-rates), [Terra API model](https://developers.openai.com/api/docs/models/gpt-6.1-terra), [Luna API model](https://developers.openai.com/api/docs/models/gpt-6-luna).

| Model | API input | API cached input | API output | API 30m cache write | Codex credits (input / cached input / output) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Luna | $0.10 | $0.01 | $0.50 | $0.125 | 2.5 / 0.25 / 12.5 |
| Terra | $1.00 | $0.05 | $5.00 | $1.25 | 25 / 1.25 / 125 |
| Sol | $2.00 | $0.10 | $10.00 | $2.50 | 50 / 2.5 / 250 |
| Astra | $8.00 | $0.40 | $40.00 | $10.00 | 200 / 10 / 1,000 |

- Sol's Standard rates are unchanged from the prior release. Astra's Standard input and output rates fell 20%, and its cached input rate fell 60%. In absolute terms Astra costs 4× Sol for each Standard API token category shown above.
- For both 6.2 models, Standard API requests over 272K input tokens apply higher rates to the full request. At equal context length, Batch is 0.5× Standard and Fast is 2×. At short context, 12-hour API cache writes cost $5 for Sol and $20 for Astra. Codex credits have no separate cache-write charge.
- For both 6.2 models, eligible API and purchased credit/pay-as-you-go Ultrafast usage is 3× Standard through February 28, 2027 and 6× from March 1, 2027 (Pacific time). Included subscription usage in Ultrafast is 6× throughout. Check plan, tier, region, and current rates before projecting costs. [API pricing](https://developers.openai.com/api/docs/pricing), [Codex speed multipliers](https://learn.chatgpt.com/docs/pricing#speed-multipliers).

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
  "model": "gpt-6.1-terra",
  "reasoning_effort": "low",
  "message": "Self-contained outcome, file ownership, relevant project instructions, acceptance checks, parent contact, stop conditions and concise return format. Do not spawn descendants."
}
```

This illustrates parameters, not a ready-to-run task. A successful tool call proves acceptance of the request. Use returned runtime metadata, if available, to confirm the effective configuration. If not exposed, report it as unverified.

Codex documents inheritance and custom-agent configuration in [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents). This package uses native tools and needs no `.codex/agents` files, API key, routing service, or global configuration change.
