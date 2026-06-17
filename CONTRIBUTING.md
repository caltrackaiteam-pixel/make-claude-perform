# Contributing to Make Claude Perform

## How to contribute

1. **Fork** the repository
2. **Read** `SOURCES.md` to understand what's adopted from where
3. **Make changes** to `.claude/commands/` or `.claude/agents/`
4. **Test** your changes with `/perform:guard` and `/perform:ship` on a real project
5. **Open a PR** with a description of:
   - What you changed
   - Which upstream framework inspired it (if any)
   - Why it doesn't conflict with existing commands

## Adding a new `/perform:*` command

1. Create `.claude/commands/perform-[name].md`
2. Add the command to the table in `README.md`
3. Add the command to the `## Available /perform:* Commands` table in `CLAUDE.md`
4. If the command wraps an upstream feature, update `SOURCES.md`

## Updating an upstream synthesis

When a tracked upstream framework releases a new version:
1. The weekly GitHub Action will open a PR automatically
2. Review what changed in the upstream
3. If the change improves our synthesis, update the relevant command file
4. Update `.mcp-sources.json` with the new pinned SHA

## What we don't accept

- Commands that use the namespace of other frameworks (no `/gsd-*`, `/ecc:*`, etc.)
- Copying source code from upstream frameworks (synthesize patterns, not code)
- Features that break when run alongside GSD, ECC, or superpowers

## Code of Conduct

Be kind. We're all building in the open.
