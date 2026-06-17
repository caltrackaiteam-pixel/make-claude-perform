#!/usr/bin/env bash
# Make Claude Perform — Installer

set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_GLOBAL="$HOME/.claude"
PROJECT_DIR="${PWD}"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}Make Claude Perform — Installer${NC}"
echo ""

INSTALL_GLOBAL=false
INSTALL_PROJECT=true

for arg in "$@"; do
  case $arg in
    --global) INSTALL_GLOBAL=true ;;
    --project-only) INSTALL_GLOBAL=false ;;
  esac
done

backup_if_exists() {
  local target="$1"
  if [ -e "$target" ]; then
    local backup="${target}.bak.$(date +%s)"
    cp -r "$target" "$backup"
    echo -e "${YELLOW}  Backed up existing $(basename "$target") → $(basename "$backup")${NC}"
  fi
}

if [ "$INSTALL_PROJECT" = true ]; then
  echo -e "${YELLOW}Installing to project: ${PROJECT_DIR}${NC}"
  mkdir -p "${PROJECT_DIR}/.claude/commands/perform"
  mkdir -p "${PROJECT_DIR}/.claude/agents"

  backup_if_exists "${PROJECT_DIR}/CLAUDE.md"
  cp "${REPO_DIR}/CLAUDE.md" "${PROJECT_DIR}/CLAUDE.md"

  backup_if_exists "${PROJECT_DIR}/.mcp-sources.json"
  cp "${REPO_DIR}/.mcp-sources.json" "${PROJECT_DIR}/.mcp-sources.json"

  cp -r "${REPO_DIR}/.claude/commands/"* "${PROJECT_DIR}/.claude/commands/"
  cp -r "${REPO_DIR}/.claude/agents/"* "${PROJECT_DIR}/.claude/agents/"

  echo -e "${GREEN}✓ Installed to ${PROJECT_DIR}/.claude/${NC}"
fi

if [ "$INSTALL_GLOBAL" = true ]; then
  echo -e "${YELLOW}Installing globally to: ${CLAUDE_GLOBAL}${NC}"
  echo -e "${RED}Warning: this may overwrite existing global commands/agents with the same names.${NC}"
  read -r -p "Continue? [y/N] " confirm
  if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Aborted."
    exit 0
  fi

  mkdir -p "${CLAUDE_GLOBAL}/commands/perform"
  mkdir -p "${CLAUDE_GLOBAL}/agents"

  cp -r "${REPO_DIR}/.claude/commands/"* "${CLAUDE_GLOBAL}/commands/"
  cp -r "${REPO_DIR}/.claude/agents/"* "${CLAUDE_GLOBAL}/agents/"

  echo -e "${GREEN}✓ Installed globally to ${CLAUDE_GLOBAL}/${NC}"
fi

echo ""
echo -e "${GREEN}Make Claude Perform is ready.${NC}"
echo ""
echo "Available commands:"
echo "  /perform          — auto-route to the right workflow"
echo "  /perform:ship     — full feature pipeline"
echo "  /perform:think    — deep analysis"
echo "  /perform:build    — TDD implementation"
echo "  /perform:swarm    — multi-agent parallel execution"
echo "  /perform:guard    — security audit"
echo "  /perform:recall   — load project memory"
echo "  /perform:research — research-only phase"
echo "  /perform:pulse    — check for upstream updates"
echo "  /perform:debrief  — session summary + memory capture"
echo ""
echo "Note: /perform:swarm and the mcp-orchestrator agent use ECC agents (ecc:planner,"
echo "ecc:code-reviewer, etc.). Install everything-claude-code for full swarm support:"
echo "  https://github.com/affaan-m/everything-claude-code"
