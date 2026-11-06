# Offline architecture canvas

Read this when an HTML canvas or comparable interactive diagram is requested. Adapt the starter in `../assets/architecture-canvas-starter.html` if it fits; it is a sanitized example, not a source of facts or a mandatory template.

## Visual design

- Create a coherent visual hierarchy: short headline and context, purpose-based sections, compact nodes, a restrained palette, consistent typography, generous spacing and unambiguous arrows. Use SVG/vector shapes or an appropriate diagram library where useful; choose a layout that fits the real architecture instead of forcing information into fixed columns.
- Maintain an executive-level read at a glance and legible technical labels on inspection. Use functional grouping, clear stage names and small icons when they improve scanability. Keep explanatory status notes concise and visibly distinguish historical or inferred information.
- Prefer individual connected elements over large monolithic cards when internal structure matters. Branches must remain readable and should not suggest that unrelated components feed each other. A disconnected database can be displayed without fabricating a line to it.
- Aim for a polished canvas: align elements, avoid crossings or ambiguous line endpoints, use a clear contrast hierarchy and verify text is not clipped or too small. Do not depend on color alone to convey meaning.

## Interaction and portability

- For a flight or offline handoff, use a self-contained file: embed styles, scripts, fonts/icons or vector graphics as appropriate, with no runtime CDN, tracking or network request required. Use external libraries only when useful, and bundle or inline permitted dependencies if the output must work offline.
- Make the page the scrolling surface instead of introducing nested diagram scrollers. For large diagrams, fit the full diagram to the viewport at first load, using both width and height. Offer accessible zoom out, zoom in, and fit/reset controls; after zooming, allow page scrolling. Refit on window resize while in fit mode, preserve intentional manual zoom, and avoid hijacking standard browser zoom. Clearly label and keyboard-enable the controls.
- Animated flow should reinforce direction and remain subtle. Animate supported paths only; separate SVG paths are useful where each branch needs its own arrowhead. Respect `prefers-reduced-motion`; keep the static diagram understandable. Avoid motion for unknown or unverified flows.
- Provide a clean print/export state: disable animation, hide controls, avoid clipping and select an appropriate page orientation. Do not claim print, browser interaction or animation was verified unless actually tested.

## Verification

- Inspect the rendered artifact itself at normal and smaller viewports; test the complete page scroll and fit, zoom limits, reset and resizing. Confirm SVG/CSS content and fonts render on the target platform and offline. Test reduced-motion and print layout where supported.
- Recheck box/arrow semantics after each visual revision. In particular, a visual grouping, animation or path around a preprocessing stage can unintentionally claim an order or connection that the source does not establish.
- If direct browser inspection is unavailable, render the visual using an available renderer, run meaningful interaction logic checks where possible and disclose remaining limitations. A static render cannot prove that animation or controls work in a browser.
