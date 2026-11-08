# Function-first strategy and mind maps

Read this for a customer-facing model-selection guide, a capability map, or an architecture-related mind-map presentation. A model inventory and a selection explanation answer different questions; follow the user's chosen scope.

## Choose the abstraction

- Lead with **function → need → approach → examples**. Explain why a model category suits the work before naming examples. Keep the need separate from the selection rationale.
- For an enduring customer-facing guide, model **family + role/tier** often conveys enough detail. Use the user's labels; Light / Balanced / Advanced is one possible framework, not a universal ranking. Use an earlier-generation label only when it explains a meaningful choice, without describing all other examples as newer.
- Describe specialists by function when implementation names add little: embeddings, relevance scoring, classification, document extraction, entity recognition, privacy classification, speech recognition/generation, speech activity and turn detection. Retain provider names when useful and requested. Preserve exact versions, aliases and source evidence internally when an abstract guide is derived from a repository review.
- A generic tier can appear in the framework without being assigned to a workflow. Do not infer that every function uses every tier or provider. Family/tier labels are not parameter counts. Specialist categories need not fit the general-purpose tier scale.
- Preserve the scope of observed performance claims. Do not turn a result from one workload into a universal speed, cost, accuracy or latency promise. A provider-access path, a model family, a capability and a deployed assignment are separate facts.

## Shape the mind map

- Place the governing question or selection principle at the centre. Use direct branches for the functions; put model/category examples and their purposes farther outward. A branch can contain a compact need/approach block when that information must remain visible offline.
- A two-sided layout works well for a moderate number of branches. Balance visual height, account for unequal numbers of functions and size row spacing from the tallest function or leaf stack. Do not prescribe a fixed branch count or copy the example categories as a real system's facts.
- Keep function names more prominent than their explanation, and model/category names more prominent than their purpose captions. Define tiers or evaluation criteria near the centre only when they add relevant context. Avoid decorative panels that merely fill space.
- Use curved association lines without arrowheads for hierarchy or selection. Reserve directed and animated connectors for supported data/control flow. Do not introduce network/hosting boundaries into a conceptual selection map.
- Route centre-to-function links and function-to-leaf forks through reserved gaps. Keep text inside its node, leave consistent insets, and inspect full-view and zoomed renders. Grow or rewrap nodes before shrinking text to fit.
- Keep the data separate from its coordinates. A record such as `{id, title, need: [], approach: [], examples: [{name, purpose}], side?}` allows different layouts without rewriting the explanation. The starter's embedded JSON and renderer illustrate this pattern.

## Presentation interaction

- Optional branch highlighting can support a walkthrough: click/tap or Enter/Space selects a function, quietens the others and exposes the selection through `aria-pressed`. Activate it again or use an explicit reset to restore all branches.
- Highlighting is a presentation state, not evidence of a dependency, active model, hidden capability or processing sequence. Do not imply that a highlight expands content when it only changes emphasis.
- Provide a full-size reset outside the scaled SVG for touch devices. A button drawn inside an SVG shrinks with the map; it may be impractical to tap at Fit scale.
- Keep zoom/Fit available. Hide controls that do not apply to this view, while retaining their underlying state for other views. Measure the visible toolbar before calculating Fit.
- Keep the existing default view, hash navigation, gesture behavior and approved architecture views when changing only the strategy presentation. Branch focus can remain local unless the user also wants it stored in the URL.

## Verification

Check hierarchy, connector meaning and preserved wording. Inspect the complete map and at least one readable branch. Verify function/leaf text bounds, click/tap/keyboard focus and reset, unique identifiers, view restoration, layer retention and both small-screen orientations. If touch is emulated or Safari events are synthetic, state that limit rather than claiming physical-device verification.
