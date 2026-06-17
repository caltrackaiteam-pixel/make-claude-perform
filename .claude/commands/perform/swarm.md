---
description: Multi-agent parallel execution for complex tasks
---

Launch a parallel agent swarm to handle: $ARGUMENTS

Decompose the task into independent units and spawn agents in parallel.

## Swarm Architecture (from claude-flow + ECC)

**Step 1: Decompose**
Break the task into independent work units. Each unit must:
- Have zero dependency on other units in the same batch
- Have a single clear output (a file, a report, a result)
- Be completable in one agent invocation

**Step 2: Assign roles**
- `ecc:planner` — architecture and approach decisions
- `ecc:code-reviewer` — code quality review
- `ecc:security-reviewer` — security audit
- `ecc:tdd-guide` — test coverage
- `Explore` — codebase research
- `ecc:performance-optimizer` — performance analysis

**Step 3: Launch in parallel**
Spawn all independent agents simultaneously. Pass file paths, not file contents. Each agent reads its own context.

**Step 4: Synthesize**
After all agents complete, synthesize results. Identify conflicts. Produce a unified action list ordered by priority.

**Step 5: Execute**
Hand unified action list to `/perform:build`.

Example parallel batch:
```
Agent 1: Research existing patterns (Explore)
Agent 2: Security pre-check (security-reviewer)  
Agent 3: Design the architecture (planner)
[all running simultaneously]
```
