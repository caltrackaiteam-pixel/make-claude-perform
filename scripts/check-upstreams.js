#!/usr/bin/env node
// Queries GitHub API for latest release/commit of each tracked upstream.
// Writes results to .mcp-upstream-versions.json

const fs = require('fs');
const https = require('https');

const sources = JSON.parse(fs.readFileSync('.mcp-sources.json', 'utf8')).sources;

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Authorization': `Bearer ${process.env.GH_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'make-claude-perform-watcher/1.0'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Invalid JSON from ${url}: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

async function getLatestVersion(repo) {
  try {
    const release = await fetchJson(`https://api.github.com/repos/${repo}/releases/latest`);
    if (release.tag_name) {
      return { type: 'release', tag: release.tag_name, sha: release.target_commitish, body: release.body || '' };
    }
  } catch {}

  try {
    const commits = await fetchJson(`https://api.github.com/repos/${repo}/commits?per_page=1`);
    const commit = commits[0];
    return {
      type: 'commit',
      sha: commit.sha,
      message: commit.commit.message.split('\n')[0],
      date: commit.commit.committer.date
    };
  } catch (e) {
    return { type: 'error', error: e.message };
  }
}

async function getStarCount(repo) {
  try {
    const info = await fetchJson(`https://api.github.com/repos/${repo}`);
    return info.stargazers_count;
  } catch {
    return null;
  }
}

async function main() {
  const results = {};
  for (const source of sources) {
    console.log(`Checking ${source.repo}...`);
    const [version, stars] = await Promise.all([
      getLatestVersion(source.repo),
      getStarCount(source.repo)
    ]);
    results[source.id] = { repo: source.repo, latest: version, stars };
  }
  fs.writeFileSync('.mcp-upstream-versions.json', JSON.stringify(results, null, 2));
  console.log('Written .mcp-upstream-versions.json');
}

main().catch(e => { console.error(e); process.exit(1); });
