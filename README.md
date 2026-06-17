<div align="center">

# Make Claude Perform

**The unified Claude Code framework — synthesizing the best of every top harness into one.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/make-claude-perform?style=social)](https://github.com/yourusername/make-claude-perform)
[![Auto-Updated Weekly](https://img.shields.io/badge/auto--updated-weekly-brightgreen)](https://github.com/yourusername/make-claude-perform/actions)
[![Works with Claude Code](https://img.shields.io/badge/works%20with-Claude%20Code-orange)](https://claude.ai/code)

[Installation](#installation) · [Commands](#commands) · [How it works](#how-it-works) · [Contributing](#contributing)

</div>

---

## What is Make Claude Perform?

**Make Claude Perform (MCP)** is a Claude Code framework that combines the best features from every top-starred Claude Code harness into a single, cohesive, and non-conflicting system.

Instead of choosing between frameworks, you get the best of all of them — with **original `/perform:*` commands** that work alongside (not against) any framework you already have installed.

### What's synthesized from each top framework

| Source Framework | What We Took |
|-----------------|-------------|
| **obra/superpowers** | 5-phase discipline (THINK→DESIGN→PLAN→BUILD→VERIFY), skill routing |
| **affaan-m/everything-claude-code** | Memory system, model routing, immutability rules, context budgeting |
| **gsd-build/get-shit-done** | Research-first protocol, context rot prevention, goal-backward verification |
| **ruvnet/ruflo** (claude-flow) | Multi-agent swarm orchestration, persistent memory architecture |
| **trailofbits/claude-code-config** | Security-first hooks, hardcoded secrets guard, destructive command protection |

### What makes this different

- **Original commands** — all commands use the `/perform:*` namespace and won't conflict with GSD, ECC, or superpowers if you have them installed
- **Auto-updates, safely** — a weekly GitHub Actions watcher detects upstream changes and opens a **gated PR** for review, not a blind auto-merge
- **Adapter architecture** — we reference best practices from upstreams, not fork them, so updates don't break the harness
- **Free and open source** — MIT license, no lock-in, no paid tier

---

## Installation

### Option 1: One-command install (recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/yourusername/make-claude-perform/main/install.sh | bash
```

### Option 2: npm

```bash
npx make-claude-perform install
```

### Option 3: Manual

```bash
git clone https://github.com/yourusername/make-claude-perform.git
cd make-claude-perform
./install.sh
```

The installer copies the `.claude/` directory (commands + agents) to your project and optionally to your global `~/.claude/` directory.

---

## Commands

All commands use the `/perform:*` namespace. They work in any project — no project-specific setup required.

| Command | What it does |
|---------|-------------|
| `/perform` | Auto-route to the right workflow based on your request |
| `/perform:ship` | Full feature pipeline: think → design → plan → build → verify |
| `/perform:think` | Deep problem analysis before writing any code |
| `/perform:build` | TDD implementation (test first, then code) |
| `/perform:swarm` | Spawn parallel specialist agents for complex tasks |
| `/perform:guard` | Security audit — OWASP Top 10 + supply chain check |
| `/perform:recall` | Load project memory and context for this session |
| `/perform:research` | Research-only phase — gather facts, write no code |
| `/perform:pulse` | Check if upstream frameworks have new versions |
| `/perform:debrief` | Session summary + save learnings to memory |

---

## How It Works

### The THINK→DESIGN→PLAN→BUILD→VERIFY pipeline

Every non-trivial task flows through 5 phases, synthesized from superpowers and GSD:

```
THINK ──► DESIGN ──► PLAN ──► BUILD ──► VERIFY
  ↑                              │          │
  └──── research-first ──────────┘          │
                                            ↓
                                    SHIPPED ✓ / BLOCKED
```

### Auto-update architecture

```
GitHub Actions (weekly)
        │
        ▼
Query GitHub API for latest release/commit
of each tracked upstream (by stars)
        │
        ▼
Compare with .mcp-sources.json (pinned SHAs)
        │
     Changed?
      /    \
    YES      NO
     │        │
     ▼        ▼
Create PR   No action
 (gated)
     │
     ▼
Human reviews diff
Merges when safe ✓
```

### Memory system (from ECC + claude-flow)

```
~/.claude/projects/[your-project]/memory/
  ├── user_profile.md        # Who you are, your preferences
  ├── feedback_*.md          # What worked, what to avoid
  ├── project_*.md           # Project-specific context
  └── reference_*.md         # Where to find things
```

---

## Non-Conflict Design

Make Claude Perform is designed to **coexist** with any other framework you have installed:

- **GSD installed?** `/perform:*` and `/gsd-*` are separate namespaces — no conflicts
- **ECC installed?** MCP uses ECC's agents internally (e.g., `ecc:security-reviewer`) — it enhances them
- **superpowers installed?** MCP's phase discipline is compatible — both can be active

---

## How Updates Work

The `.mcp-sources.json` file tracks which version of each upstream framework we've synthesized from. The weekly GitHub Action:

1. Queries the GitHub API for the latest stars/releases of all tracked repos
2. Compares with pinned SHAs
3. If anything changed, opens a PR with a diff summary
4. A human reviews it and merges if safe

**Nothing auto-merges.** Your harness never breaks from an upstream update.

---

## Contributing

1. Fork the repo
2. Make changes to commands in `.claude/commands/`
3. Run the test suite: `npm test`
4. Open a PR

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Sources & Attribution

This framework synthesizes patterns (not code) from the following MIT-licensed projects:

- [obra/superpowers](https://github.com/obra/superpowers) — MIT
- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) — MIT
- [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) — MIT
- [ruvnet/ruflo](https://github.com/ruvnet/ruflo) — MIT
- [trailofbits/claude-code-config](https://github.com/trailofbits/claude-code-config) — MIT

See [SOURCES.md](SOURCES.md) for the full attribution record.

---

<div align="center">
MIT License · Free forever · No tracking · No telemetry

**Star this repo ⭐ to help others find it**
</div>
