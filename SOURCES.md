# Sources & Attribution

Make Claude Perform synthesizes **patterns and principles** (not source code) from the following projects.
All are MIT-licensed. We credit them here and in `.mcp-sources.json`.

## Upstream Frameworks

### obra/superpowers
- **URL**: https://github.com/obra/superpowers
- **What we adopted**: 5-phase discipline (clarify → design → plan → code → verify), skill routing on session start, cross-tool compatibility design philosophy
- **Used in**: `CLAUDE.md` Phase Discipline section, `/perform:ship`, `/perform:think`

### affaan-m/everything-claude-code (ECC)
- **URL**: https://github.com/affaan-m/everything-claude-code
- **What we adopted**: Memory system architecture (4 types: user/feedback/project/reference), model routing by task complexity (haiku/sonnet/opus), immutability principle, context budget rules, anti-pattern definitions
- **Used in**: `CLAUDE.md` Memory System + Model Routing + Immutability sections, `/perform:recall`, `/perform:debrief`, `/perform:swarm`

### gsd-build/get-shit-done (GSD)
- **URL**: https://github.com/gsd-build/get-shit-done
- **What we adopted**: Research-first protocol, context budget rules (anti-patterns 1-15 from GSD's universal-anti-patterns.md), phase-based workflow with artifact handoffs, parallel researcher pattern, goal-backward verification
- **Used in**: `CLAUDE.md` Research-First + Context Budget + Anti-Patterns sections, `/perform:ship`, `/perform:research`

### ruvnet/ruflo (formerly claude-flow)
- **URL**: https://github.com/ruvnet/ruflo
- **What we adopted**: Swarm intelligence architecture pattern, persistent memory with vector/semantic structure, parallel agent decomposition approach
- **Used in**: `CLAUDE.md` Multi-Agent Orchestration section, `/perform:swarm`, `mcp-orchestrator` agent

### trailofbits/claude-code-config
- **URL**: https://github.com/trailofbits/claude-code-config
- **What we adopted**: Security checklist (hardcoded secrets, rm -rf guard, no direct push to main), STOP-on-security-trigger rule, security-first hook philosophy
- **Used in**: `CLAUDE.md` Security Defaults section, `/perform:guard`

---

All original work remains copyright of their respective authors.
Make Claude Perform is an independent synthesis and is not affiliated with any of the above projects.
