#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const REPO_DIR = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const command = args[0];

const HELP = `
Make Claude Perform — CLI

Usage:
  npx make-claude-perform install          Install to current project
  npx make-claude-perform install --global Install to ~/.claude/ globally
  npx make-claude-perform pulse            Check upstream frameworks for updates
  npx make-claude-perform version          Show version

`;

switch (command) {
  case 'install':
    execSync(`bash "${path.join(REPO_DIR, 'install.sh')}" ${args.slice(1).join(' ')}`, { stdio: 'inherit' });
    break;
  case 'pulse':
    execSync(`node "${path.join(REPO_DIR, 'scripts/check-upstreams.js')}"`, { stdio: 'inherit' });
    execSync(`node "${path.join(REPO_DIR, 'scripts/generate-update-report.js')}"`, { stdio: 'inherit' });
    if (fs.existsSync('.mcp-update-report.md')) {
      console.log(fs.readFileSync('.mcp-update-report.md', 'utf8'));
    }
    break;
  case 'version': {
    const pkg = JSON.parse(fs.readFileSync(path.join(REPO_DIR, 'package.json'), 'utf8'));
    console.log(pkg.version);
    break;
  }
  default:
    console.log(HELP);
    process.exit(command ? 1 : 0);
}
