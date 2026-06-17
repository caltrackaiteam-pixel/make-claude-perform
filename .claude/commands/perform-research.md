---
description: Research-only phase — no code written, facts gathered and synthesized
---

Research: $ARGUMENTS

This is a read-only phase. No files are created or modified here.

## Research Protocol (from GSD research-first + ECC)

**Step 1: Codebase scan** (if in a project)
- Search for existing implementations of similar patterns
- Check `grep` for related functions, types, or modules
- Note what already exists so we don't duplicate it

**Step 2: Installed tools scan**
- Check available skills in `~/.claude/skills/` for relevant ones
- Check installed agents for domain expertise
- Use Context7 MCP for library documentation if available

**Step 3: Web research** (only if Steps 1-2 are insufficient)
- Search for established patterns
- Check official documentation
- Look for battle-tested libraries that solve 80%+ of the problem

## Output

```
## Research Summary: [topic]

### What Exists (in codebase/tools)
- [finding]

### Recommended Approach
[1-2 paragraph synthesis]

### Key Libraries/Patterns
- [name]: [why it fits]

### Risks Identified
- [risk]: [mitigation]

### Ready for
/perform:think → /perform:ship
```
