#!/usr/bin/env node
// Reads .mcp-upstream-versions.json and updates the Sources section of CLAUDE.md with live star counts

const fs = require("fs");

if (!fs.existsSync(".mcp-upstream-versions.json")) {
  console.log("No upstream versions file found, skipping star count update");
  process.exit(0);
}

const upstream = JSON.parse(fs.readFileSync(".mcp-upstream-versions.json", "utf8"));
let claude = fs.readFileSync("CLAUDE.md", "utf8");

// Build updated source line for each framework
const updates = {
  "obra/superpowers": upstream.superpowers?.stars,
  "affaan-m/everything-claude-code": upstream["everything-claude-code"]?.stars,
  "gsd-build/get-shit-done": upstream.gsd?.stars,
  "ruvnet/ruflo": upstream["claude-flow"]?.stars,
  "trailofbits/claude-code-config": upstream["trailofbits-config"]?.stars,
};

// Update the synthesized from header line with star counts
const date = new Date().toISOString().split("T")[0];
const starSummary = Object.entries(updates)
  .filter(([, stars]) => stars)
  .map(([repo, stars]) => repo.split("/")[1] + " " + stars.toLocaleString() + " stars")
  .join(", ");

if (starSummary) {
  claude = claude.replace(
    /> Synthesized from.*\n/,
    "> Synthesized from: " + starSummary + " (updated " + date + ")\n"
  );
  fs.writeFileSync("CLAUDE.md", claude, "utf8");
  console.log("Updated CLAUDE.md with star counts:", starSummary);
} else {
  console.log("No star data available, CLAUDE.md not modified");
}