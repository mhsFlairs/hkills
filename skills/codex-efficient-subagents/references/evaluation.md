# Behavioral validation and calibration

Run this when changing routing policy or deliberately evaluating savings. Ordinary use does not require a benchmark or an extra reviewer.

## Independent forward test

Give an independent agent SKILL.md, models.md, the current runtime contract, and realistic tasks. Ask it to select a route and draft dispatch arguments without spawning descendants. Withhold this scoring rubric until after its decisions.

| Scenario | Observable acceptance |
| --- | --- |
| A single known typo in an already-open file | Inline edit, no agent |
| Routing is applied to a substantial multi-part task | Treat the current model as the main agent; do not select or recommend a replacement coordinator |
| Existing main agent is Sol with an explicit user-selected effort | Preserve the active main settings and still look for useful cheaper-model or lower-effort delegation |
| Astra/high parent has a bounded task that Sol can adequately handle | Prefer Sol; Astra/medium is not justified merely because its effort is lower |
| Astra parent has work requiring Astra capability and can handle it inline | Keep that work with the parent and delegate other suitable work to cheaper models |
| Separate work genuinely needs Astra and cheaper candidates cannot meet acceptance | Astra child is eligible with a concrete capability reason and justification for separate execution; no mandatory failed cheap attempt |
| Subtask genuinely needs the same model and effort as its parent | Matching child is eligible with a compact fresh-context packet, subject to the Astra exception; do not invent savings |
| Parent effort is not exposed | Choose adequate supported worker effort; do not assert it is lower than the parent's |
| Large repeatable inventory with a precise schema; direct tooling can extract it | Use the deterministic tool, not an LLM classification service |
| Substantial bounded implementation with a known design and regression check; parent has separate integration work | Adequate lower-model candidate, complete packet, explicit model/effort, no full-history override |
| Scoped UI behavior change from a clear brief | Terra is eligible; validate the resulting behavior/appearance |
| Intermittent cross-service state bug | Sol or parent investigation; no blind cheap-tier sequence |
| Missing credentials or inaccessible required data | Report/recover the missing prerequisite; no capability escalation as a substitute |
| Latest family release absent from spawn schema | Another adequate current family or inline; no predecessor fallback |
| User specifies model and/or effort | Preserve each explicit supported component; do not silently replace |
| Supported model overrides unavailable; inherited parent is expensive | Inline or disclosed inherited execution; no claim of cheaper routing |
| Reused child needs a different model | New eligible child or parent takeover; no pretend reconfiguration through a message |
| Two tasks need to edit the same file | Serialize or restructure ownership |
| Failed acceptance after one targeted repair | Reassess/take over or report blocker; no open-ended retries |
| API price table exists but Codex counters and billing basis do not | Costs/savings unmeasured; no invented percentage |
| Hard team-wide dollar cap without accounting/enforcement | Do not promise a cap or launch work dependent on that guarantee |

Check outcomes and reasoning, not exact wording. If a result fails, change only the demonstrated weak rule and rerun the affected scenario. Keep test work in isolated scratch space.

## Live smoke test

Use a small isolated fixture with a genuine behavioral bug and known acceptance checks. Dispatch one bounded native worker with explicit eligible model/effort and fresh context. Verify the actual changed artifact and execute the checks in the parent. Record accepted request versus runtime-confirmed identity separately. This demonstrates a working delegation path, not general cost savings.

## Measure savings when telemetry is available

Use representative tasks and the same acceptance bar for direct-parent and routed runs. Avoid comparing only easy routed tasks to hard baseline tasks. Track quality, failures, wall time, and complete spend including manager/review and failed attempts. Use repeated comparable samples when variability matters.

Minimal record: task family, difficulty/verification features, requested and effective configuration, context mode, attempts, acceptance result/evidence, parent and child usage, billing unit/tier, total cost, and baseline. Missing values are `unknown`, not zero. Keep private logs and code out of shared skill files.

For an applicable API tariff, calculate each disjoint token category at its actual rate, including cache writes and billed reasoning where relevant. Do not double-count reasoning already included in output. Add tool fees where applicable. Subscription credits and included allowances require their own observed accounting.

Only report savings when accepted comparable work has a measured baseline: `(baseline_total - routed_total) / baseline_total`. Also report acceptance rate and sample size. A cheaper failed result is not an improvement.

## Initial validation record: 2026-11-15

- Skill creator's `quick_validate.py` passed. Local reference links and UI metadata passed checks. A scan of the package found only the four current model IDs in models.md. No unfinished scaffold remains.
- Independent decision test: native dispatch requested Terra 6.1 / medium with `fork_turns: "none"`. The agent received SKILL.md, models.md, and 12 scenarios, without this rubric or the research conclusions. Parent review accepted all 12 decisions: inline typo; direct inventory script; Luna/high bounded parser task; Terra/low scoped UI task; Sol/high concurrency analysis; missing-input recovery; unavailable-latest-family exclusion; explicit Terra/high preservation; inline work without override support; fresh dispatch for a changed model; serialization of overlapping edits; and no unenforceable budget promise.
- Live worker test: native dispatch requested Luna 6 / high with fresh context. In isolated temporary space, the worker could edit only a small Python batching helper, with fixed tests covering remainder handling, oversized/exact/single batches, empty inputs, iterators, input preservation, and invalid sizes. Before dispatch, the suite reported five failures and three errors across seven test methods and their subtests. After the worker's edit, the parent inspected the implementation and independently ran all seven tests successfully. No repair dispatch was required.
- Both native requests were accepted and completed. The exposed tools returned no effective-model/effort metadata or per-agent billing counters. Therefore effective model identity and monetary savings remain unverified. This is a small operational smoke test and decision evaluation, not a representative quality or cost benchmark. Sol/Astra live execution, future catalog refresh, and hard-budget enforcement were not tested.

## Delegation preference correction: 2026-11-15

The main agent remains whichever model the user is speaking with. Every main model should seek useful cheaper-model or same-model/lower-effort delegation, while avoiding Astra subagents wherever possible. Matching model and effort is allowed when genuinely needed; Astra additionally requires a concrete capability need and justified separate execution, or an explicit user request. The skill, discovery instructions, UI metadata, and scenarios reflect this corrected preference. This narrow instruction edit was reviewed inline; the initial live smoke test above was not rerun and does not validate cost savings for these preferences.
