# Offline architecture canvas

Read this when an HTML canvas or comparable interactive diagram is requested. Adapt the [starter](../assets/architecture-canvas-starter.html) if useful. Its fictional views demonstrate an overview, a downstream application on the same plane, compact parallel agents, and a strategy mind map. Replace the example content and connections; neither the layout nor the example topology is a source of facts.

## Visual structure and density

- Establish a clear flow, then align cards, input/output ports, row spacing and text insets to a small grid. Give comparable nodes comparable dimensions. Size the canvas to the content; allow an application to extend horizontally when that communicates the architecture clearly.
- Start with a title and one concise line of capabilities per card. Use short sub-points when needed. Expand to child nodes only when their separate flows or behavior are important. Avoid oversized cards, repeated descriptions and nested frames that add no information.
- Keep approved product views intact while refining another area. When adding a consumer to a system overview, connect it to the established components on the same plane if requested; a separate stacked section can obscure the relationship.
- Show confirmed parallel work with a short common input fork and a shared result bus. Avoid a long route across another card or a layout that suggests a sequential handoff or an unintended one-to-one output mapping. Place unrelated outputs and controls on distinct routes.
- Repeat a shared dependency close to its consumers when that removes long return wires. Use the same identifier and label each repeat as the same service, or put a concise “via P1” reference on the consumer. Do not imply additional instances. Keep request direction distinct from data returning to a consumer.
- Put queue metadata, administration and similar supporting detail in a quiet aligned rail when it does not need a full stage. Avoid decorative control loops. Use readable platform labels or chips, and distinguish supported platforms from future extensibility.
- Use one clear hosting boundary at each relevant scope. Product groupings, hosted infrastructure, external platforms and model-provider locations are different concepts. Do not use overlapping frames or imply provider hosting from a model-access label.
- Use a restrained palette and consistent typography. Do not depend on color alone. Keep caveats proportional to the uncertainty and audience, with a clear distinction between source history and current confirmations.

## Interaction and portability

- For offline handoff, embed the styles, scripts and vector assets; avoid runtime CDN or network dependencies. Use libraries when useful and bundle permitted dependencies when offline use is required.
- Let the document scroll instead of nesting another scrolling surface. Fit the entire selected view to the viewport at first load, using both width and height. Offer keyboard-accessible zoom in/out and fit/reset controls. Refit on resize in fit mode and preserve intentional manual zoom.
- For multiple views, use an allowlisted URL hash and an explicit size/configuration map. Load the selected hash on refresh or direct navigation; otherwise use the agreed default. Tab clicks, keyboard activation, hash changes and browser back/forward must agree on the selected view. Do not add duplicate history entries when reselecting the same view. Resize the SVG, its backgrounds and header together.
- Animate supported flow paths subtly to reinforce direction. Give separate SVG branches their own arrowheads where needed. Respect `prefers-reduced-motion`; the static diagram must remain understandable. Do not animate an unconfirmed route as current behavior.
- Keep shared SVG definitions available when scenes are hidden, and give elements unique IDs. Use a clean print state: no controls or animation, appropriate orientation and no clipping.
- Add operational detail as an optional layer attached to the relevant nodes, rather than a detached appendix on the canvas. Keep the base geometry steady when a layer is toggled; layers should combine without collisions. Do not infer instrumentation, deployment or model assignments merely to fill a layer. Read [canvas-interactions.md](canvas-interactions.md) for state and gesture mechanics.
- If the story concerns functions and selection rationale, use the mind-map pattern in [strategy-mindmaps.md](strategy-mindmaps.md). Keep its association lines visually distinct from architecture flow arrows. Show view-appropriate controls; preserve disabled/hidden layer selections when switching back to the architecture.

## Verification

- Inspect a complete render and a close-up at usable sizes. Check clipping, label length, alignment, connector endpoints, crossings and overly large empty areas. Recheck the meaning of every changed arrow and boundary after visual revisions.
- Test initial/default view, direct hash links, refresh, invalid hashes, tab/keyboard activation, back/forward, repeated selection, zoom/fit and resize. Confirm the rendered dimensions of every view and that switching back restores the approved layout.
- When changing the bundled starter, run `node scripts/check_starter.mjs --static-only` for its offline structure and JavaScript syntax. Use the same runner with the environment's Playwright package and browser executable for browser checks and preview images; see `node scripts/check_starter.mjs --help`. The runner checks state, text bounds, mind-map focus and gesture behavior. Inspect overview and close-up renders as well. Emulated input does not establish physical-device compatibility.
- If browser inspection is unavailable, use an available renderer and bounded logic checks, and state the remaining limits accurately. A static render cannot prove browser animation, print behavior or interaction fidelity.
