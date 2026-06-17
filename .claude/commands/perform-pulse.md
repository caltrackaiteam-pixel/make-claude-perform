---
description: Check upstream framework versions and open a PR if updates are available
---

Check the top Claude Code frameworks for updates.

## What This Does

Queries the GitHub API for the latest release/commit of each tracked upstream framework, compares with the pinned versions in `.mcp-sources.json`, and reports what's changed.

**Tracked frameworks** (sorted by GitHub stars, live query):
1. obra/superpowers
2. affaan-m/everything-claude-code  
3. gsd-build/get-shit-done
4. ruvnet/ruflo (claude-flow successor)
5. trailofbits/claude-code-config

## Steps

1. Read `.mcp-sources.json` to get currently pinned versions
2. Query `https://api.github.com/repos/{owner}/{repo}/releases/latest` for each repo
3. Compare tags/SHAs
4. For any repo with a newer version:
   - Fetch the changelog/diff summary
   - Identify which MCP commands/agents/skills changed
   - Check if changes conflict with existing `/perform:*` commands
5. Output a report:

```
## Upstream Update Report — [date]

### Updates Available
- obra/superpowers: v1.2.3 → v1.3.0
  Key changes: [summary]
  MCP impact: [SAFE / REVIEW_NEEDED / BREAKING]

### No Changes
- affaan-m/everything-claude-code: pinned at abc1234, still current

### Recommendation
[Auto-open PR / Manual review needed / No action]
```

If updates are available: instruct the user to run `gh pr create` with the update summary, or open it automatically if the user has approved autonomous GitHub access.
