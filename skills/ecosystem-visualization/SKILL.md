---
name: ecosystem-visualization
description: Create connected service-ecosystem diagrams and offline interactive canvases with metro-style journeys, shared hubs, clear entries and destinations, and function-specific animated connections. Use for multi-service maps that need readable paths through a network.
---

# Ecosystem visualization

Make a connected system understandable as journeys through real services. A readable ecosystem needs recognisable entry points, shared interchanges and destinations; an attractive network of links alone is not enough. Follow the user's requested medium and layout. Metro routing is a useful pattern, not a requirement for every architecture diagram.

## From evidence to a map

- Preserve supplied diagrams, current corrections and source relationships before changing presentation. Read connected sources through available service tools when appropriate. A source board is reference material; reading it does not authorise edits to that board or public publication.
- Model frontends, services, stores, message routes and original evidence IDs. Unify duplicate appearances of the same logical component; retain distinct implementations when equivalence is unconfirmed.
- Derive station roles from supported relationships: entries, through stations, interchanges and destinations. An invocation diagram does not describe an entire interaction lifecycle.
- Choose meaningful journeys and trace them through existing edges. Keep branching and confirmed parallelism. A journey selector highlights a subgraph; it must not invent a sequential handoff.
- Read [ecosystem-method.md](references/ecosystem-method.md) for simplification, message pipelines, route geometry and avoiding tangled maps.

## Diagram and canvas

Use strong primary routes and quieter cross-cutting dependencies, with a clear legend. Represent messaging on the route when requested: for example, an orange RabbitMQ pipeline can replace queue cards while retaining queue/exchange evidence in details. Distinguish frontends, services, stores and message transport.

For an offline HTML canvas, read [canvas-contract.md](references/canvas-contract.md). The working [starter](assets/ecosystem-canvas-starter.html) contains fictional data, journey selection, service focus, technical detail, history-aware hashes, document scrolling, anchored pinch zoom and reduced-motion/print behavior. The [example model](assets/ecosystem-example.json) and [builder](scripts/build_canvas.py) reproduce it without runtime libraries:

```text
python scripts/build_canvas.py assets/ecosystem-example.json /path/to/output.html
```

Replace the example architecture and placement with the user's evidence. Its number of nodes, palette, routes and terminology are not facts or mandatory design choices. The builder routes around explicitly placed cards; it does not discover a system or choose a correct architecture.

## Review and handoff

Check each arrow, direction, interchange and boundary against evidence. Retain an editable model and source mapping. Preserve approved views when revising part of a larger canvas.

Run the portable [checker](scripts/check_canvas.mjs). Static mode checks structure/syntax; browser mode checks behavior and geometry with an available Playwright/browser installation. Inspect a complete render, a readable route close-up and touch controls. Check entries/destinations, crossings, card/text overlap, detail/focus combinations, animation, history, zoom/fit and offline operation. Emulated gestures do not establish physical-device compatibility.

For an ongoing project, save decisions and update its plan. Keep reusable assets fictional and report remaining evidence limits. Publishing or sending client artifacts requires the user's actual authorisation.
