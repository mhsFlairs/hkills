---
name: codex-efficient-subagents
description: "Keep the current main agent and route bounded Codex work by phase: use strong reasoning for difficult plans, then capable cheaper models for execution. Use for cost-aware subagents, parallel exploration, or multi-part implementation. Prefer lower effort where adequate; avoid Astra subagents unless necessary."
---

# Codex Efficient Subagents

Use the least costly adequate route through acceptance. Keep the current main model responsible for task framing, integration, and final judgment. This skill explicitly requests bounded subagent delegation and model/effort overrides when the gates below pass; it does not require agents for every task.

## Main agent and delegation preference

The main agent is whichever model the user is currently speaking with. Keep that model and its selected effort; this skill does not choose, recommend replacing, or switch the coordinator. Keep responsibility for planning, task decomposition, integration, and final acceptance with the current main agent, even when it delegates a bounded planning task.

Whatever model is currently the main agent, actively look for useful bounded delegation at task entry and meaningful phase boundaries. Prefer an adequate cheaper model or the same model at lower reasoning effort. These are alternative ways to reduce worker cost, not a mandatory sequence of attempts. Use the same model and effort as the main agent when the subtask genuinely needs that capability; a fresh, focused context can still help even without a model-price reduction. Explain that benefit as context isolation or parallelism, not guaranteed savings. A child may also be stronger than the main agent when the work requires it.

Avoid spawning Astra subagents wherever possible, including when the main agent is Astra and a lower-effort Astra child would be available. Prefer adequate Luna, Terra, or Sol workers; if the main agent is Astra, keep the work requiring Astra with it when practical. An Astra child is an exception: identify the concrete capability need that cheaper candidates cannot meet and why separate execution is warranted instead of parent handling. Context isolation or lower effort alone does not justify an Astra child. Do not require a failed cheaper attempt when its inadequacy is already clear. Honor an explicit user request for an Astra subagent.

## Decide whether to delegate

Define the result and how it will be checked before assigning work. Delegate a coherent unit when its reading, implementation, or independent analysis can repay the cost of the task packet, child startup, review, and possible repair. Parallelism may improve latency while increasing total cost; distinguish those benefits.

Keep a tiny edit, a single tool lookup, work already nearly finished, or work needing most of the parent's evolving context inline. Use a deterministic tool directly for straightforward extraction or transformation. Do not create an agent just to choose a model. Bundle related mechanical work rather than spawning per file.

The parent should have useful coordination/integration work or avoid substantial noisy context by delegating. It must not duplicate the child's investigation. Ask about genuinely missing requirements while continuing independent work; a more expensive model cannot resolve missing access or user intent.

## Separate difficult decisions from execution

For substantial tasks mixing security, concurrency, or state-management decisions with routine implementation, prefer **parent or Sol planning -> Terra execution -> focused verification** when a concrete handoff makes execution sufficiently bounded. Do not assign every domain-sized workstream to Sol/high merely because each contains one difficult part. Route the decisions, implementation, documentation, and checks separately where that separation is useful; avoid fragmenting tightly coupled work or creating tiny agents.

Use the current parent to plan when it already has the needed reasoning and context. Otherwise, assign Sol a bounded design task at medium or high effort according to the unresolved decisions. The planner's deliverable must settle the hard questions, not just list steps:

- Exact interfaces, files/ownership, dependencies, and implementation order.
- Required invariants and decisions for relevant trust boundaries, state transitions, retries, cancellation, persistence ordering, or sensitive-data handling.
- Concrete acceptance checks and expected outcomes, including important failure cases.
- Remaining assumptions or open decisions, clearly separated from settled instructions.

The parent checks that the plan is ready to execute, then gives Terra the plan and necessary source context at the lowest adequate effort, typically low or medium. Use Luna or direct tools for sufficiently mechanical portions. Creating this handoff does not require another user approval when the work is already authorized. The executor should report contradictions, missing prerequisites, or an unresolved design decision instead of guessing or silently redesigning the solution.

A written plan does not make every implementation safe to downgrade. Keep an inseparable security/concurrency-sensitive slice with Sol or the adequate parent when implementation still requires difficult judgment or lacks reliable checks; delegate the separable routine portions. Reserve further Sol work for those decisions, focused review of material risks, or evidence-based escalation. Routine documentation and running established checks need not use the planner's model or effort; designing missing checks may still require stronger reasoning.

Reassess model and effort at the planning-to-execution handoff. A Sol planner does not imply a Sol implementer, and an agent's own earlier conservative choice is not an explicit user requirement to keep that configuration. Honor actual user model constraints. The parent dispatches the executor with fresh context; do not ask the planner to spawn descendants or pretend a follow-up changes its model. Skip a separate planning agent when a suitable plan already exists or the handoff costs more than it saves.

## Choose the model and effort

Read [models.md](references/models.md) once per task before the first dispatch. Intersect its latest-per-family candidates with the current spawn tool's actual model IDs and effort support. Preserve explicit user model/effort choices independently; explain an unavailable choice rather than silently substituting. Do not change the main model or global configuration.

Choose the cheapest adequate model/effort pair for the worker, considering both a cheaper model and the current main model at lower effort. Do not automatically copy the parent's effort. If the parent's effective effort is unknown, select an adequate supported effort without claiming it is lower. Explicit user settings still take precedence.

The table below describes worker starting points; the main agent remains the current model. These are initial heuristics, not benchmark-derived success probabilities:

| Work characteristics | Starting route | Acceptance evidence |
| --- | --- | --- |
| Large but mechanical scan, extraction, known-pattern change; explicit boundaries and direct checks | Luna: low for extraction, medium for bounded reasoning, high for code/tool work with edge cases | Exact sources, schema checks, diff, targeted tests |
| Scoped implementation from a concrete plan or established patterns, documentation from supplied material, visual inspection with a defined outcome | Terra: low or medium | Behavior check, source fidelity, or inspected UI result |
| Unresolved design decisions, unknown bug cause, interacting components, concurrency, subtle review, weak verification or costly rework | Sol: medium; high for competing hypotheses or coupled constraints; reassess execution after planning | Reproducer, targeted regression checks, justified findings |
| A concrete capability need cannot be met by cheaper candidates, and separate execution is warranted instead of parent handling | Astra exception: lowest adequate supported effort; match the main effort only when required | Reason for the exception, explicit decision criteria, counterexamples, independent checks where useful |

Choose by uncertainty, coupling, consequences, and verification quality, not task length, file count, or role name alone. A small security-critical change can need Sol; a large mechanical batch can fit Luna. If between routes, compare likely repair costs. Skip inadequate lower tiers; do not walk the entire ladder. Keep high-consequence integration with the parent or an adequate strong model.

Use only supported efforts. Reserve xhigh/max/ultra for a stated reasoning need or measured benefit; higher effort is not automatically better. When quality permits, start with the cheaper adequate candidate. Read [research.md](references/research.md) only for evidence, tradeoffs, or policy updates.

## Dispatch with compact context

Use native subagent tools. For `collaboration.spawn_agent`, set `fork_turns: "none"` with explicit `model` and `reasoning_effort`. Use this fresh-context approach for same-model workers too, including workers matching the parent's effort, so they receive only their bounded task context. Full-history forks inherit the parent's settings and do not accept overrides on this surface. Use a full fork only when access to the full history is necessary and justifies its cost; it does not provide the same context reduction as a compact fresh-context packet.

Provide a self-contained packet, including project instructions that a fresh child cannot otherwise see:

```text
Outcome: concrete deliverable and relevant background.
Inputs: workspace, exact files/URLs, established facts and decisions; concrete plan for execution work.
Scope: read-only or explicit edit ownership; applicable AGENTS.md/skills.
Constraints: compatibility, permissions, existing user changes, dependencies.
Acceptance: checks to run and observable pass conditions.
Stop: report missing inputs or a capability gap; no unbounded retries.
Return: result or changed paths, evidence/checks, uncertainties; concise summary.
Do not spawn descendants. Do not edit outside your assigned scope.
```

A child must receive all facts needed for its job, not merely a skill name. Keep source links and file locations instead of full logs. Read-only instructions are a task boundary, not an enforced sandbox.

Start with one worker unless independent work justifies more. Respect live capacity, counting the parent. Parallel writers need disjoint ownership and stable interfaces; serialize overlapping changes. Reuse a child only for related work at the same model/effort. A follow-up message does not reconfigure a child's model; escalation requires a new eligible dispatch or parent takeover. Stop obsolete work when scope changes and await required results before completion.

If model overrides are unsupported, work inline or use supported inheritance with an explicit limitation. Inheriting Astra is still subject to the Astra exception above; it is not a routing workaround. Do not launch separate CLI/API processes or install custom-agent configuration just to force routing. A role name or prompt saying "be Luna" is not a model selector.

## Verify and escalate

Inspect the result against acceptance criteria; review edited behavior and relevant diffs. Run checks appropriate to the change, avoiding duplicate checks when reliable execution evidence already suffices. A child's success statement alone is not acceptance. Use independent review only when it can find material failures that existing checks miss.

On failure, distinguish an environment/tool problem, an unclear contract, and inadequate reasoning. Repair missing prerequisites or narrow the packet first. Allow at most one targeted repair attempt for an unchanged subtask before the parent reassesses. For a capability failure, increase effort or move directly to an adequate model, carrying the failing evidence. Do not retry the same failed approach or repeatedly add reviewers. After an unsuccessful repair/escalation, take over or report the concrete blocker.

## Account for the whole job

Make one brief routing note for meaningful delegation: phase/work unit, model/effort, and why it fits. For mixed-complexity work, distinguish the planning and execution choices instead of giving the whole workstream one configuration. Avoid repeatedly asking for approval of already authorized routing.

Evaluate parent coordination + context transfer + all child attempts + validation. Do not equate lower token prices with measured savings, API dollars with Codex credits, or a forecast with an enforced cap. If a strict budget cannot be accounted for or enforced, do not launch dependent paid work under a promise to stay within it.

Separate requested configuration, accepted dispatch, and runtime-confirmed model/effort. Report exact usage or savings only with actual counters, applicable pricing, and a comparable baseline; otherwise state that cost is unmeasured. No worker should assert its model identity from introspection.

For skill changes or calibration on representative tasks, read [evaluation.md](references/evaluation.md). Do not run calibration for every ordinary task.
