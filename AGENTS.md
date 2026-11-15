# Repository skills

Reusable skill packages live in `skills/`. See [README.md](README.md) for the catalog and installation commands. Preserve each skill's supporting resources when updating or installing it.

- [codex-efficient-subagents](skills/codex-efficient-subagents/SKILL.md): Use for cost-aware Codex delegation, including trivial and routine bounded execution. Keep the current main agent; consider parent/Sol planning followed by Terra execution for mixed-complexity work. Prefer Luna for bounded Git, transcription, PowerShell, and search/evidence workflows; use stronger reasoning for large or complex merges and unresolved decisions. Prefer adequate cheaper models or lower effort per phase, and avoid Astra subagents except when genuinely necessary or explicitly requested. Do not keep trivial work inline when a suitable cheaper-model or lower-effort worker is available; bundle routine steps, follow the skill's limited fallback conditions and acceptance checks.
