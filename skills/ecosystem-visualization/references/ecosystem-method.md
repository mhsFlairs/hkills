# Modelling and drawing a connected ecosystem

## Preserve topology

Use stable logical IDs and keep source IDs behind merged nodes/edges. Duplicate drawings of a database or API can reference one component; identical labels alone do not prove distinct deployments are the same instance. Retain origin, destination, direction, function and evidence for each relationship.

Separate current corrections from inherited service diagrams. An API dependency does not establish an exact agent deployment, authentication mechanism, hosting boundary or data lifecycle. Use bounded overview/search/read operations for large boards. Preserve the source snapshot and semantic graph; do not assume off-scope objects were archived.

## Messaging as a route

When queues obscure the story, trace each evidenced path from a service through queue/exchange vertices to the next service. Render a message pipeline retaining all original queue/edge IDs. A label such as **RabbitMQ · interaction routing** identifies transport without a queue card.

Do not turn unrelated queues into a universal bus, imply broadcast/delivery guarantees or invent a synchronous API call. Preserve different destinations, bypasses and parallel branches. Compare represented evidence IDs with the original graph before claiming complete coverage.

## Starts, interchanges and ends

Entries can be interfaces, integrations or agent/channel clients. Derive them from evidence rather than forcing every frontend into a mandatory left column. Shared services with several supported connections are natural interchanges; a double ring is a useful cue. A crossing without a station remains a crossing.

Stores and terminal capabilities can be destinations. **End** means a terminus in this view, not that the application never responds or performs more work. Prefer journeys that answer a question: ingest knowledge, serve a request, handle a call, review results. Distinguish request direction from returned data when both are actually shown.

A force-directed layout can reveal clusters but often becomes a hairball with no reading direction. For a route-oriented briefing, arrange meaningful entries, shared hubs and destinations deliberately. Avoid both rigid tables and arbitrary scattering when the reader needs to trace a path. Respect explicit user preferences for lanes, organic placement or another layout.

## Metro geometry and hierarchy

Use straight and 45-degree segments with softly rounded bends, routed around cards and labels. Prefer readable corridors and staggered branches over long diagonals or decorative loops. Separate tracks must not imply an unsupported shared service.

Draw quieter cross-links behind primary routes. White casing can distinguish overpasses. Keep direction cues without animation. Do not manufacture connectivity if the source contains independent systems.

Journeys and stations support different questions: a journey shows a coherent subgraph; a station shows direct dependencies. Reset restores the complete map. Preserve secondary evidence so simplification stays reviewable.

## Function-specific flow styles

A useful default is purple frontend calls, blue service calls, teal data access and orange messaging. Use a legend and different packet patterns as well as colour: short dashes, paired dots, longer pulses, dense packets. Speeds are styling choices, not performance measurements. Adapt the palette to the user's brand/accessibility requirements.

Classify from endpoint roles and evidenced transport, not product area. Identity calls can be frontend-to-service or service-to-service. Do not add model/telemetry links merely because components appear together on a board.

Keep reduced-motion and print views informative. Do not label illustrative animation live telemetry unless actual measurements are connected and requested.
