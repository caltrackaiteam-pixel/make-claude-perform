#!/usr/bin/env node
// Validates that all /perform:* command files are well-formed Claude Code slash commands.

const fs = require('fs');
const path = require('path');

const COMMANDS_DIR = path.join(__dirname, '..', '.claude', 'commands');
const AGENTS_DIR = path.join(__dirname, '..', '.claude', 'agents');

let passed = 0;
let failed = 0;

function check(label, condition, detail) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}${detail ? ': ' + detail : ''}`);
    failed++;
  }
}

function validateCommandFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const name = path.relative(COMMANDS_DIR, filePath);
  console.log(`\nChecking command: ${name}`);
  check('Has frontmatter', content.startsWith('---'), 'must start with ---');
  check('Has description in frontmatter', /^description:/m.test(content), 'missing description: field');
  check('Has body after frontmatter', content.split('---').length >= 3, 'no body after closing ---');
  check('Not empty body', content.split('---').slice(2).join('---').trim().length > 10, 'body too short');
}

function validateAgentFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const name = path.basename(filePath);
  console.log(`\nChecking agent: ${name}`);
  check('Has frontmatter', content.startsWith('---'));
  check('Has name field', /^name:/m.test(content));
  check('Has description field', /^description:/m.test(content));
  check('Has body', content.split('---').length >= 3);
}

// Validate perform.md (root command)
validateCommandFile(path.join(COMMANDS_DIR, 'perform.md'));

// Validate all perform/* sub-commands
const performDir = path.join(COMMANDS_DIR, 'perform');
const subCommands = fs.readdirSync(performDir).filter(f => f.endsWith('.md'));
check(`Found 9 sub-commands`, subCommands.length === 9, `found ${subCommands.length}`);
for (const f of subCommands) {
  validateCommandFile(path.join(performDir, f));
}

// Validate agents
const agents = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md'));
for (const f of agents) {
  validateAgentFile(path.join(AGENTS_DIR, f));
}

console.log(`\n${'─'.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
