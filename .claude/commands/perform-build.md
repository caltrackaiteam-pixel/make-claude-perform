---
description: TDD implementation phase — tests first, implementation second
---

Implement: $ARGUMENTS

Follow strict TDD discipline:

1. **Write the test first** (RED state)
   - Name the test file and what behavior it verifies
   - Run the test — it must fail before continuing

2. **Write the minimum implementation** (GREEN state)
   - Only write code that makes the failing test pass
   - No extra features, no cleanup yet

3. **Refactor** (IMPROVE state)
   - Clean up the implementation
   - Ensure naming is clear and functions stay under 50 lines
   - Run tests again — they must still pass

4. **Commit** with a message following the format:
   `feat|fix|refactor: <description>`

Repeat for each unit of work. Report coverage after each cycle.
