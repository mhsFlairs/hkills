# Architecture discovery and breakdown

Read this when synthesizing architecture evidence or deciding what to show.

## Evidence model

- Record the origin and date or version of each material claim, ideally down to the page or diagram. User-supplied corrections and context are distinct from historical exports, inferences and generic design proposals.
- Separate **current confirmed**, **historical**, **inferred** and **unknown**. A legacy label, a conceptual component, a feature list or the presence of a product does not establish present deployment, active security controls, a client-specific configuration or a connection.
- Resolve sequential versus parallel processing when it matters to the view. If evidence is ambiguous, ask or show a logical group without asserting an internal handoff; update it when clarified. Preserve confirmed preprocessing order and output consumers.
- A line conveys a specific relationship. Add it only when supported; do not connect adjacent boxes merely for symmetry. An unlabeled relationship or generic fan-out can still imply a data flow. Distinguish a plausible mapping from a confirmed one. Do not assume a PII layer masks, blocks or deletes data without evidence.
- When an old diagram conflicts with a newer clarification, preserve both and label the discrepancy. Ask for the minimum detail needed to resolve any claim material to the intended audience.
- For multi-turn projects that require persistence, maintain a short source register, an evidence/unknowns file and a living plan: audience, scope, current artifact, completed work, decisions and next steps. Keep originals unchanged and note any low-resolution or text-extraction limitations. Store personal or client-specific content in the user's project, not in reusable skills.

## From architecture to visual story

- Begin with the reader's question and the system or workflow in scope. Select one clear view per story, for example system context, integration, ingestion/processing/storage, request/response, or operational/security boundaries. Avoid presenting multiple products as connected without evidence.
- For each important relationship, identify origin, destination, payload and direction; record trigger/cadence, authentication, error handling and data lifecycle when those matter and are known. Use labels that a CTO can inspect while keeping the high-level path legible to a CEO or director.
- Match visual granularity to the system: one agent with several analysis types can be one compact card with sub-points. A capability, category or subtype does not automatically require a new service box. Break opaque large boxes into functional, recognizable nodes only when the breakdown improves comprehension and is grounded in evidence. Group by purpose and use separate cards or lanes for independent stages. Preserve branches and distinguish stores from processors. Treat model categories, vendors, vector databases, graph stores and relational stores as different roles, not interchangeable terms.
- Shared dependencies may be repeated for readability using a stable identifier such as P1 and an explicit “same shared service” label. This is a visual reference, not evidence of another deployed instance. General knowledge use does not establish direct access to a backing database.
- Show boundaries only when substantiated; a layout group must not be mistaken for a private network, isolation, encryption, or compliance guarantee. Show the specific flow for integrations and clearly identify unverified details; do not claim a diagram-only overview is a complete technical deep dive.
- Prefer concise labels, a short title and a legible legend. Add status or caveats in proportion to uncertainty and audience, not as a wall of disclaimers. If sensitive information is present, treat it according to the user's instructions and avoid copying it into reusable assets.
