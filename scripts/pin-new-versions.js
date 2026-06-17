#!/usr/bin/env node
// Updates .mcp-sources.json with new pinned SHAs from upstream check

const fs = require('fs');

const sourcesFile = JSON.parse(fs.readFileSync('.mcp-sources.json', 'utf8'));
const upstream = JSON.parse(fs.readFileSync('.mcp-upstream-versions.json', 'utf8'));

for (const source of sourcesFile.sources) {
  const up = upstream[source.id];
  if (!up) continue;
  
  if (up.latest.type === 'release') {
    source.pinnedTag = up.latest.tag;
    source.pinnedSha = up.latest.sha;
  } else if (up.latest.type === 'commit') {
    source.pinnedSha = up.latest.sha;
  }
}

sourcesFile.lastChecked = new Date().toISOString();
fs.writeFileSync('.mcp-sources.json', JSON.stringify(sourcesFile, null, 2));
console.log('Updated .mcp-sources.json with new pinned versions');
