#!/usr/bin/env node
// Compares pinned versions vs upstream, generates .mcp-update-report.md
// Sets GITHUB_OUTPUT has_updates=true if any updates found

const fs = require('fs');

const sources = JSON.parse(fs.readFileSync('.mcp-sources.json', 'utf8')).sources;
const upstream = JSON.parse(fs.readFileSync('.mcp-upstream-versions.json', 'utf8'));

const updates = [];
const current = [];

for (const source of sources) {
  const up = upstream[source.id];
  const pinnedSha = source.pinnedSha;
  const pinnedTag = source.pinnedTag;
  
  const latestSha = up.latest.sha || up.latest.tag;
  const isNew = latestSha && latestSha !== pinnedSha && latestSha !== pinnedTag;
  
  if (isNew) {
    updates.push({ source, up, latestSha });
  } else {
    current.push({ source, up });
  }
}

const hasUpdates = updates.length > 0;

let report = `# Make Claude Perform — Upstream Update Report\n`;
report += `Generated: ${new Date().toISOString()}\n\n`;

if (hasUpdates) {
  report += `## Updates Available (${updates.length})\n\n`;
  for (const { source, up, latestSha } of updates) {
    report += `### ${source.repo} ⭐ ${up.stars?.toLocaleString() || 'N/A'}\n`;
    report += `- Pinned: \`${source.pinnedSha || source.pinnedTag || 'unpinned'}\`\n`;
    report += `- Latest: \`${latestSha}\`\n`;
    if (up.latest.body) {
      report += `- Changes:\n${up.latest.body.split('\n').slice(0, 10).map(l => '  ' + l).join('\n')}\n`;
    }
    report += `\n**Features adopted from this repo:** ${source.featuresAdopted.join(', ')}\n`;
    report += `**Commands affected:** ${source.commandsAffected.join(', ')}\n\n`;
    report += `**Action required:** Review changes and update \`.mcp-sources.json\` + affected commands if behavior changed.\n\n`;
  }
} else {
  report += `## No Updates\n\nAll upstream frameworks are at their pinned versions.\n\n`;
}

report += `## Current (no changes)\n\n`;
for (const { source, up } of current) {
  report += `- **${source.repo}**: ⭐ ${up.stars?.toLocaleString() || 'N/A'} — pinned at \`${source.pinnedSha || source.pinnedTag || 'unpinned'}\`\n`;
}

fs.writeFileSync('.mcp-update-report.md', report);
console.log('Written .mcp-update-report.md');

// Set GitHub Actions output
const outputFile = process.env.GITHUB_OUTPUT;
if (outputFile) {
  fs.appendFileSync(outputFile, `has_updates=${hasUpdates}\n`);
}
