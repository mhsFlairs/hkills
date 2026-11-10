# Editable model and offline canvas

The [example model](../assets/ecosystem-example.json) is fictional. The builder uses Python's standard library; generated HTML embeds data, SVG, styles and interactions. Readers need no installation or network connection.

## Schema

| Field | Meaning |
| --- | --- |
| `title`, `subtitle`, `notice` | Reader-facing text; identify fictional or uncertain material accurately |
| `width`, `height` | SVG canvas size with header, legend, journey buttons and footer space |
| `nodes` | Stations and explicit placement |
| `edges` | Supported directed relationships |
| `journeys` | Named subsets of known stations/edges |

Nodes have stable `id`, `title`, `role` (`frontend`, `service`, `database`), `x`, `y`, optional `width`/`height` (350/128 defaults), `area`, `description`, `details` and `evidence`. Place below the header (`y >= 380`) and inside the plot. The builder rejects overlapping cards; it does not choose architecture or station placement. Reflow text or enlarge cards for longer content.

Edges have `id`, `start`, `end`, optional `kind`, `via`, `both`, `main_route` and `evidence`. Default kinds are `frontend`, `api`, `data`, `rabbit`. Endpoint roles classify direct calls when omitted. A message edge must name an evidenced `via` route. `both` is for supported bidirectionality. `main_route: false` makes a cross-link quieter without deleting it; quiet styling does not establish verification.

Journeys have `label`, `nodes` and optional `links`. Without explicit links, the builder selects existing edges with both endpoints in the station set; it invents no steps. Evidence remains in the embedded model; source validation still requires comparison with actual sources.

## Build

```text
python scripts/build_canvas.py /path/to/model.json /path/to/canvas.html
```

The builder validates IDs, roles, bounds, card separation and journey membership, finds obstacle-aware eight-direction routes, rounds bends and embeds the prepared model in the starter. Invalid/unroutable inputs fail before overwriting output. Adjust placement/space rather than drawing through a station. `--shell` accepts a deliberately revised shell.

## Interaction invariants

- One document scroll surface. Fit uses both viewport dimensions and actual toolbar height; manual zoom retains native panning.
- Ctrl+wheel/trackpad pinch and two-touch pinch preserve the focal point; moving the midpoint pans. Ordinary wheel/swipe remain native. Deduplicate Safari fallback/input streams.
- Touch controls are at least 44px and reachable in both orientations.
- `#ecosystem?journey=serve&details=1` restores journey/detail state. Allowlist IDs, canonicalise invalid values and avoid duplicate history entries. Station preview/pin is transient.
- All routes clears focus. Technical detail never moves stations. Enter/Space and Escape complement pointer/touch.
- Reduced-motion and print hide packets. Printing restores the whole graph even if focused.

For multiple product views, extend the profile/view allowlist and coordinate SVG, backgrounds, header, controls and hash from one selected-view state. Preserve approved scenes; this starter deliberately demonstrates one ecosystem view.

## Validate

```text
node scripts/check_canvas.mjs /path/to/canvas.html --static-only
node scripts/check_canvas.mjs /path/to/canvas.html --playwright-module /path/to/playwright --browser-executable /path/to/chrome --output-dir /path/to/previews
```

The checker installs nothing. Browser mode checks model/render counts, text bounds, route/card separation, journeys, focus/reset, refresh/history, functional styles, Fit, anchored wheel zoom, mobile touch controls/pinch, reduced motion, print and external requests. Inspect images too: unclipped geometry is not proof of a clear story. Chrome emulation does not verify physical trackpad/native Safari/iPhone/iPad behavior.
