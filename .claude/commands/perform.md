---
description: Route to the right Make Claude Perform workflow based on task type
---

Analyze the user's request and route to the right workflow:

- If it's a **new feature or product**: run `/perform:ship`
- If it's a **question or analysis**: run `/perform:think`
- If it's **code that needs reviewing**: run `/perform:guard`
- If it's **research-only**: run `/perform:research`
- If the task needs **multiple parallel agents**: run `/perform:swarm`
- If the user wants **project context loaded**: run `/perform:recall`

For the routed workflow, follow the THINK → DESIGN → PLAN → BUILD → VERIFY discipline from CLAUDE.md.

State your routing decision in one sentence, then immediately execute the corresponding workflow.
