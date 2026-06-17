const fs = require("fs");
const path = require("path");

const COMMANDS_DIR = path.join(__dirname, "..", ".claude", "commands");
const AGENTS_DIR = path.join(__dirname, "..", ".claude", "agents");

let passed = 0;
let failed = 0;

function check(label, condition, detail) {
  if (condition) { console.log("  OK " + label); passed++; }
  else { console.error("  FAIL " + label + (detail ? ": " + detail : "")); failed++; }
}

function validateCommandFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8").replace(/^﻿/, "");
  const name = path.relative(COMMANDS_DIR, filePath);
  console.log("\nChecking command: " + name);
  check("Has frontmatter", content.startsWith("---"));
  check("Has description in frontmatter", /^description:/m.test(content));
  check("Has body after frontmatter", content.split("---").length >= 3);
  check("Not empty body", content.split("---").slice(2).join("---").trim().length > 10);
}

function validateAgentFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8").replace(/^﻿/, "");
  const name = path.basename(filePath);
  console.log("\nChecking agent: " + name);
  check("Has frontmatter", content.startsWith("---"));
  check("Has name field", /^name:/m.test(content));
  check("Has description field", /^description:/m.test(content));
  check("Has body", content.split("---").length >= 3);
}

validateCommandFile(path.join(COMMANDS_DIR, "perform.md"));

const performDir = path.join(COMMANDS_DIR, "perform");
const subCommands = fs.readdirSync(performDir).filter(function(f) { return f.endsWith(".md"); });
check("Found 9 sub-commands", subCommands.length === 9, "found " + subCommands.length);
for (const f of subCommands) { validateCommandFile(path.join(performDir, f)); }

const agents = fs.readdirSync(AGENTS_DIR).filter(function(f) { return f.endsWith(".md"); });
check("Found 20 agents", agents.length === 20, "found " + agents.length);
for (const f of agents) { validateAgentFile(path.join(AGENTS_DIR, f)); }

console.log("\n" + "=".repeat(40));
console.log("Results: " + passed + " passed, " + failed + " failed");
if (failed > 0) process.exit(1);