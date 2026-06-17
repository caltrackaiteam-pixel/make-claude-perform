---
description: Route to the right Make Claude Perform workflow based on task type
---

Analyze the user's request and route to the right workflow:

- If it's a **new feature or product**: run `/perform:ship`
- If it's a **question or analysis before building**: run `/perform:think`
- If it's **implementing a specific unit with TDD**: run `/perform:build`
- If it's **code that needs reviewing for security**: run `/perform:guard`
- If it's **research-only, no code**: run `/perform:research`
- If the task needs **multiple parallel agents**: run `/perform:swarm`
- If the user wants **project context loaded**: run `/perform:recall`
- If it's **end of session / capture learnings**: run `/perform:debrief`
- If the user wants to **check for framework updates**: run `/perform:pulse`

For the routed workflow, follow the THINK → DESIGN → PLAN → BUILD → VERIFY discipline from CLAUDE.md.

State your routing decision in one sentence, then immediately execute the corresponding workflow.
