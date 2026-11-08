# Layers, state and gesture interaction

Read this when an offline canvas needs optional operational/model detail, view state, branch focus or trackpad/touch support. Adapt to the task; a static figure does not need every control described here.

## Contextual layers and navigation

- Attach a layer's labels or badges to the nodes they explain. Reuse spare space or deliberately swap a caption; avoid moving approved nodes whenever a toggle changes. Combined layers must preserve the core meaning, such as a consumer's explicit read relationship.
- Keep layer claims at the evidence level: a tool category is not proof of a specific SDK configuration, a database's instrumentation or a provider's deployment location. Do not assign a model to every sub-capability merely because one mapping is known.
- Use a small allowlisted view configuration and allowlisted layer names. A route such as `#analysis?layers=roles,telemetry` can preserve both. Canonicalize known values, avoid repeated-selection history entries, and restore view **and** layers on direct load, refresh and back/forward—including layer-only history changes. Check own properties instead of accepting inherited object names as views.
- Update SVG tabs, a responsive view selector and toolbar visibility from the same selected-view state. Synchronize controls before measuring Fit, since a strategy view may show a branch reset instead of architecture-layer toggles.
- Ensure the hidden rule wins over more-specific `display:flex` rules on controls. Keep shared SVG definitions outside hidden scenes. Print should omit controls and stop animation.

## Anchored zoom on one scrolling page

- Keep ordinary wheel/two-finger trackpad scrolling and single-finger swipes as document panning. Handle pinch separately: Ctrl+wheel where supplied, two-touch distance/midpoint for screens, and a Safari gesture-event fallback when relevant. Scope custom gestures to the canvas surface; do not disable all browser zoom commands.
- Normalize wheel delta units and clamp unreasonable inputs. For touch, track stable identifiers, use distance ratios for scale and the moving midpoint for pan. Ignore duplicated wheel/gesture streams. Suppress the accidental click that can follow a pinch, without preventing ordinary taps on the fixed controls. Clear that suppression when the user explicitly resets Fit or changes view, so a fresh tap is not discarded.
- Keep the diagram point under the cursor/fingers steady. Capture its normalized SVG coordinate before scaling; after resizing, choose the diagram's position so that coordinate returns to the requested client point. Use the actual SVG content rectangle, not only the outer card width.
- A short/wide diagram may not provide enough native page overflow for an anchored zoom. Bounded leading/trailing document space can supply it without a nested scroller. Recompute that space rather than accumulating it indefinitely. Calculate trailing room from the natural article bounds plus padding; a `min-height:100vh` page can otherwise absorb added padding without making the desired scroll reachable.
- Combine updates in `requestAnimationFrame`, retaining accumulated scale deltas. Cancel queued updates and interrupted gesture state on Fit, view change, resize, blur/hidden page and touch cancellation. Fit clears the manual pan space and restores the agreed no-scroll initial view. Preserve intentional manual zoom during ordinary resize where practical.

## Mobile viewport and controls

- Use a responsive initial card width before JavaScript runs. On a mobile page with large horizontal overflow, `innerWidth`/`innerHeight` can be inflated; use actual document client dimensions for Fit and camera calculations.
- Verify the layout viewport and fixed controls after a real emulated pinch. For a canvas-owned zoom surface, `minimum-scale=1` can prevent overflow-driven viewport expansion while leaving zoom-in unrestricted; use it as a measured compatibility choice. Avoid copying a maximum-scale or `user-scalable=no` restriction into the artifact.
- Use at least 44px touch targets for controls. Offer a native view selector on small/coarse-pointer screens when fitted SVG tabs become too small to tap. Keep controls reachable in both orientations and reserve their actual height plus a gap when fitting the diagram.
- A practical surface permits native `pan-x pan-y` and uses non-passive handlers only where a multi-touch/zoom default must be cancelled. Preserve text selection outside active gestures. Respect reduced motion for connectors and highlight transitions.

## Meaningful checks

- Verify zoom in/out, limits, focal-point stability on short and tall diagrams, moving touch midpoint, ordinary two-axis wheel scrolling, single-finger panning, cancellation and Fit restoration.
- Check both orientations, client versus visual viewport dimensions, fixed-control reachability, view/layer state and lack of network dependencies. Full-document screenshot crops must add page scroll offsets to viewport-relative element bounds.
- Browser-dispatched touch/wheel events and synthetic Safari events provide bounded behavior checks. They do not prove physical trackpad/iPhone/iPad/Safari compatibility. State what was actually exercised.

References: [MDN wheel events](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event), [MDN touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action), [Apple GestureEvent](https://developer.apple.com/documentation/webkitjs/gestureevent).
