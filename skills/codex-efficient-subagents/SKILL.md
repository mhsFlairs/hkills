---
name: codex-efficient-subagents
description: "Keep the current main agent and delegate trivial and routine Codex execution to an adequate cheaper model or lower-effort worker. Use for routine Git, transcription, shell, search, and bounded implementation; avoid Astra subagents unless necessary."
---

# Codex Efficient Subagents

Use the least costly adequate route through acceptance. Keep the current main model responsible for task framing, integration, and final judgment. This skill explicitly requests bounded subagent delegation and model/effort overrides, including for trivial and routine execution when a suitable route is available.

## Main agent and delegation preference

The main agent is whichever model the user is currently speaking with. Keep that model and its selected effort; this skill does not choose, recommend replacing, or switch the coordinator. Keep responsibility for planning, task decomposition, integration, and final acceptance with the current main agent, even when it delegates a bounded planning task.

Whatever model is currently the main agent, briefly classify work before execution and delegate trivial or routine bounded execution when an adequate cheaper model or same-model/lower-effort route is supported. This applies when the main agent is Luna at higher effort too. Task brevity, deterministic tools, and hypothetical startup overhead are not routine reasons to keep work inline. Bundle the request's routine steps into one worker packet. For example, a Sol main agent receiving an authorized commit-and-push request routes straightforward operations to Luna low, or Luna medium/Terra low-medium when bounded judgment warrants it. The parent retains scope and routing, consequential decisions, verification, and user communication; do not create a separate classifier or planner for an easy task.

Use the same model and effort as the main agent only when the work genuinely needs that capability and no adequate cheaper or lower-effort route fits; a fresh context can help but does not itself reduce cost. If the parent's effective effort is unknown, select an adequate supported effort without claiming it is lower. A lower effort alone never justifies an Astra child.

Avoid spawning Astra subagents wherever possible, including when the main agent is Astra and a lower-effort Astra child would be available. Prefer adequate Luna, Terra, or Sol workers; if the main agent is Astra, keep the work requiring Astra with it when practical. An Astra child is an exception: identify the concrete capability need that cheaper candidates cannot meet and why separate execution is warranted instead of parent handling. Context isolation or lower effort alone does not justify an Astra child. Do not require a failed cheaper attempt when its inadequacy is already clear. Honor an explicit user request for an Astra subagent.

## Decide whether to delegate

Define the result and how it will be checked before assigning work. Bundle all routine steps for one request into one worker, including inspection, authorized edits, staging, commit, push, and reporting when requested and authorized. The worker should use deterministic tools for repeatable extraction and transformation.

Keep work inline only when the user requests inline work or forbids delegation; runtime lacks a suitable model, effort, or required tool access; worker capacity is unavailable; the current main is already the cheapest adequate model at its lowest supported effort; or work genuinely cannot be separated from evolving parent reasoning. Honor an explicit worker model/effort choice when supported; it is not an instruction to avoid delegation. If no suitable route exists, continue inline when authorized, briefly disclose a material limitation, and do not stall or create a pointless same-cost duplicate. Preserve authorization boundaries; delegation does not authorize destructive Git actions. Keep tightly coupled hard reasoning with the parent or adequate stronger reasoning.

The parent owns scope, routing, consequential decisions, verification, and user communication. A bounded worker executes only its assigned packet and returns to the parent; it must not recursively delegate. The parent may reassess or escalate after reviewing results. Do not create a separate classifier or planner for an easy task.

## Separate difficult decisions from execution

For substantial tasks mixing security, concurrency, or state-management decisions with routine implementation, prefer **parent or Sol planning -> Terra execution -> focused verification** when a concrete handoff makes execution sufficiently bounded. Do not assign every domain-sized workstream to Sol/high merely because each contains one difficult part. Route the decisions, implementation, documentation, and checks separately where that separation is useful; avoid fragmenting tightly coupled work or creating tiny agents.

Use the current parent to plan when it already has the needed reasoning and context. Otherwise, assign Sol a bounded design task at medium or high effort according to the unresolved decisions. The planner's deliverable must settle the hard questions, not just list steps:

- Exact interfaces, files/ownership, dependencies, and implementation order.
- Required invariants and decisions for relevant trust boundaries, state transitions, retries, cancellation, persistence ordering, or sensitive-data handling.
- Concrete acceptance checks and expected outcomes, including important failure cases.
- Remaining assumptions or open decisions, clearly separated from settled instructions.

The parent checks that the plan is ready to execute, then gives Terra the plan and necessary source context at the lowest adequate effort, typically low or medium. Prefer Luna for the bounded operational and evidence-gathering workflows below as well as mechanical portions. Workers should use deterministic tools where they fit. Creating this handoff does not require another user approval when the work is already authorized. The executor should report contradictions, missing prerequisites, or an unresolved design decision instead of guessing or silently redesigning the solution.

A written plan does not make every implementation safe to downgrade. Keep an inseparable security/concurrency-sensitive slice with Sol or the adequate parent when implementation still requires difficult judgment or lacks reliable checks; delegate the separable routine portions. Reserve further Sol work for those decisions, focused review of material risks, or evidence-based escalation. Routine documentation and running established checks need not use the planner's model or effort; designing missing checks may still require stronger reasoning.

Reassess model and effort at the planning-to-execution handoff. A Sol planner does not imply a Sol implementer, and an agent's own earlier conservative choice is not an explicit user requirement to keep that configuration. Honor actual user model constraints. The parent dispatches the executor with fresh context; do not ask the planner to spawn descendants or pretend a follow-up changes its model. Skip a separate planning agent when a suitable plan already exists or the handoff costs more than it saves.

## Use Luna for bounded execution and evidence gathering

Treat Luna as a capable tool-using worker that can own a complete bounded workflow. Prefer it for the following work when its supported model/effort is adequate and required tools are available. If the live spawn tool omits Luna, prefer Terra at low effort when adequate or another supported lower-cost route.

| Work | Luna assignment and handoff |
| --- | --- |
| Routine Git operations | Inspect status/diffs, manage branches, commit, fetch, pull/push, and handle straightforward merges within the existing authorization. Return the resulting branch/commit/status. Hand large or complex merges, conflict-heavy rebases, and semantic conflict resolution to the adequate parent or Sol. |
| Transcription | Run the applicable transcription skill/tool workflow, save the transcript, and return its location with available timestamps/speaker labels and uncertain passages marked. Do not invent inaudible content or assume native audio support; route difficult interpretation separately when needed. |
| PowerShell execution | Run well-scoped commands or scripts, inspect exit codes and relevant output, and report results/artifact paths. Follow existing permissions and filesystem rules. Escalate unresolved operational decisions or complex script design, rather than upgrading every command-running task. |
| Search and evidence collection | Search the repository, web, or connected sources as appropriate; write concise evidence notes with source URLs or file/line references, relevant dates, findings, and gaps. The parent or another suitable model reviews that evidence and produces the synthesis or decision. Avoid repeating the entire search with a stronger model when targeted verification suffices. |

Start at low effort for straightforward execution and medium for multi-step work or bounded judgment; use high only for concrete edge cases or reasoning needs. Choose by the actual uncertainty and checks, not merely the presence of Git, a shell, audio, or a search tool. Missing tools or access are prerequisites to resolve, not evidence that a larger model is required. The evidence reviewer may be the existing main agent; a separate reviewer is not mandatory.

## Choose the model and effort

Read [models.md](references/models.md) once per task before the first dispatch. Intersect its latest-per-family candidates with the current spawn tool's actual model IDs and effort support. Preserve explicit user model/effort choices independently; explain an unavailable choice rather than silently substituting. Do not change the main model or global configuration.

Choose the cheapest adequate model/effort pair for the worker, considering both a cheaper model and the current main model at lower effort. Do not automatically copy the parent's effort. If the parent's effective effort is unknown, select an adequate supported effort without claiming it is lower. Explicit user settings still take precedence.

The table below describes worker starting points; the main agent remains the current model. These are initial heuristics, not benchmark-derived success probabilities:

| Work characteristics | Starting route | Acceptance evidence |
| --- | --- | --- |
| Routine Git, transcription workflows, PowerShell execution, search/evidence collection, extraction, or known-pattern changes with clear scope | Luna: low for straightforward execution, medium for multi-step work, high for concrete reasoning needs | Command results, repository state, transcript artifacts/uncertainties, cited evidence, or targeted checks |
| Scoped implementation from a concrete plan or established patterns, documentation from supplied material, visual inspection with a defined outcome | Terra: low or medium | Behavior check, source fidelity, or inspected UI result |
| Design, coding, review, or multistep workflows beyond a cheaper worker's capability | GPT-6.2 Sol at the lowest adequate effort. Start around medium for unresolved design or debugging and use high for competing hypotheses or coupled constraints. Reassess after planning. | Reproducer, targeted regression checks, justified findings |
| Sustained cross-system reasoning, difficult implementation and verification, or template-sensitive deliverables when cheaper workers are inadequate and separate execution is warranted | GPT-6.2 Astra exception at the lowest adequate supported effort | Reason for the exception, explicit decision criteria, counterexamples, independent checks where useful |

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
Manager: the actual parent task/agent target for mid-task check-ins; do not hardcode a root target.
Stop: report material ambiguity, a blocked prerequisite/access, contradictory instructions, unexpected scope/complexity, or failing acceptance beyond your capability; no unbounded retries. Stop only affected decisions or mutations and continue independent authorized work.
Return: result or changed paths, evidence/checks, uncertainties; concise summary. Send a check-in when escalation is needed. If no independent work remains, send a clearly labeled needs-parent checkpoint and yield without claiming completion.
Do not spawn descendants. Do not edit outside your assigned scope.
```

A child must receive all facts needed for its job, not merely a skill name. Keep source links and file locations instead of full logs. Read-only instructions are a task boundary, not an enforced sandbox.

Start with one worker unless independent work justifies more. Respect live capacity, counting the parent. Parallel writers need disjoint ownership and stable interfaces; serialize overlapping changes. Reuse a child only for related work at the same model/effort. A follow-up message does not reconfigure a child's model; escalation requires a new eligible dispatch or parent takeover. Stop obsolete work when scope changes and await required results before completion.

If model overrides are unsupported, work inline or use supported inheritance with an explicit limitation. Inheriting Astra is still subject to the Astra exception above; it is not a routing workaround. Do not launch separate CLI/API processes or install custom-agent configuration just to force routing. A role name or prompt saying "be Luna" is not a model selector.

## Worker and parent check-ins

Workers should proactively contact their actual parent when material ambiguity, a blocked prerequisite/access, contradictory instructions, unexpected scope or complexity, or acceptance failure exceeds their assignment capability. On this runtime, workers use `collaboration.send_message` to contact the parent. They need not exhaust a retry budget first. Routine local decisions within a clear packet remain autonomous; do not ask for approval per command. For parent replies, use `send_message` for a running worker and `followup_task` to resume an idle/completed worker, because `send_message` does not start a new turn. Both preserve the worker's model and effort; changing either requires a new eligible dispatch with a fresh packet. If mid-task messaging is unavailable, return the same checkpoint through the result channel.

Keep the check-in compact: task/outcome; need (clarification, unblock, or reassignment); specific question/blocker with evidence and what was tried; completed work, changed paths, checks and side effects; recommended next step/options; and independent work possible while waiting. Do not include credential values. Stop only affected decisions or mutations; continue independent authorized work. Do not guess consequential requirements, expand scope, repeat failed attempts, or spawn a replacement. If nothing independent remains, send a clearly labeled needs-parent checkpoint and yield/end the turn without claiming completion. A needs-parent checkpoint leaves the assignment unfinished; the parent must resolve it, resume or reassign the work, or report the actual blocker rather than treating the checkpoint as success. Any wait must be bounded; silence is not approval. Avoid endless polling or repeated messages.

The parent monitors and responds to check-ins as they arrive, rather than waiting for all workers to finish. Resolve questions from existing context or inspect the needed evidence; answer the specific question, provide missing inputs or unblock within existing authorization, narrow or split the task with a concrete plan, take over, or reassign to an adequate worker. Escalate to the user only for a decision or authority the parent cannot resolve. Clarification alone does not require a model upgrade. Before a replacement writes, confirm the prior worker has stopped or explicitly relinquished edit ownership; inspect partial changes and completed side effects, transfer the checkpoint and failing evidence, establish file ownership, and avoid concurrent edits or replaying side effects.

## Verify and escalate

Inspect the result against acceptance criteria; review edited behavior and relevant diffs. Run checks appropriate to the change, avoiding duplicate checks when reliable execution evidence already suffices. A child's success statement alone is not acceptance. Use independent review only when it can find material failures that existing checks miss.

On failure, distinguish an environment/tool problem, an unclear contract, and inadequate reasoning. Ask the parent to resolve a material blocker as soon as it is found; a retry is not a prerequisite. Repair missing prerequisites or narrow the packet first. Allow at most one targeted repair attempt for an unchanged subtask before reassessment, not as a mandatory step before asking for help. For a capability failure, the parent may increase effort or move directly to an adequate model, carrying the failing evidence and partial-work checkpoint. Do not retry the same failed approach or repeatedly add reviewers. Before reassignment, preserve work and side-effect state and prevent overlapping ownership. After an unsuccessful repair/escalation, the parent takes over or reports the concrete blocker.

## Account for the whole job

Make one brief routing note for meaningful delegation: phase/work unit, model/effort, and why it fits. For mixed-complexity work, distinguish the planning and execution choices instead of giving the whole workstream one configuration. Avoid repeatedly asking for approval of already authorized routing.

Evaluate parent coordination + context transfer + all child attempts + validation. Do not equate lower token prices with measured savings, API dollars with Codex credits, or a forecast with an enforced cap. If a strict budget cannot be accounted for or enforced, do not launch dependent paid work under a promise to stay within it.

Separate requested configuration, accepted dispatch, and runtime-confirmed model/effort. Report exact usage or savings only with actual counters, applicable pricing, and a comparable baseline; otherwise state that cost is unmeasured. No worker should assert its model identity from introspection.

For skill changes or calibration on representative tasks, read [evaluation.md](references/evaluation.md). Do not run calibration for every ordinary task.
