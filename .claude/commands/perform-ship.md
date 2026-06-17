---
description: Full feature delivery pipeline — think, design, plan, build, verify
---

Execute the complete Make Claude Perform shipping workflow for: $ARGUMENTS

## Phase 1: THINK
Before touching any code:
1. State what you understand the request to be in 2-3 sentences
2. List all unknowns or ambiguities (resolve them by reading code, not asking)
3. Identify the blast radius — what could this change affect?

## Phase 2: DESIGN
1. Sketch the approach (what files change, what the data flow looks like)
2. Identify which existing patterns in the codebase to follow
3. Call out any architectural risks

## Phase 3: PLAN
Create a numbered task list where each task:
- Is independently completable (< 15 minutes of work)
- Has a single done condition
- Names the exact file(s) it touches

## Phase 4: BUILD
Execute the plan task by task:
- Write tests first (RED) for each unit
- Implement until tests pass (GREEN)
- Refactor for clarity (IMPROVE)
- Commit atomically after each task

## Phase 5: VERIFY
Goal-backward check:
1. State the original intent
2. Demonstrate that the implementation delivers it
3. Run any existing tests
4. Check the security checklist from CLAUDE.md

Report: SHIPPED ✓ or BLOCKED (with reason).
