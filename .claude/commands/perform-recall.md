---
description: Load relevant memory and project context for this session
---

Load context for: $ARGUMENTS (or current project if no argument)

## Memory Loading (from ECC + claude-flow)

1. **Read project memory** from `~/.claude/projects/[current-project]/memory/`
2. **Load relevant feedback** — past corrections and confirmed approaches
3. **Load project state** — ongoing work, decisions made, what's next
4. **Check for blockers** — unresolved issues or risks from last session

## Output format:
```
## Current Project Context
[1-2 sentence summary of what this project is]

## Relevant Decisions (locked)
- [decision]: [rationale]

## Active Work
- [task in progress]

## Feedback to Apply
- [pattern to follow or avoid]

## Risks/Blockers
- [any known issues]
```

After loading, state: "Context loaded. Ready to work." and wait for the next instruction.
