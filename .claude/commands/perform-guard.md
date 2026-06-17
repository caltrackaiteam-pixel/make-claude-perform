---
description: Security audit of current code — OWASP Top 10 + supply chain
---

Run a security audit on: $ARGUMENTS (or current directory if no argument)

Check against the Trail of Bits security baseline:

**Critical (BLOCK — fix before any commit):**
- [ ] Hardcoded secrets (API keys, tokens, passwords) — scan with regex `(api_key|secret|password|token)\s*=\s*["'][^"']+["']`
- [ ] SQL injection (string interpolation in queries)
- [ ] Command injection (unsanitized shell arguments)
- [ ] Path traversal (unsanitized file paths from user input)
- [ ] Authentication bypass (missing auth checks on protected routes)

**High (WARN — fix before merge):**
- [ ] XSS (unescaped user input in HTML output)
- [ ] CSRF (missing anti-forgery tokens on state-changing endpoints)
- [ ] Insecure deserialization
- [ ] Sensitive data in logs

**Infrastructure:**
- [ ] No `rm -rf` without confirmation
- [ ] No direct push to main/master
- [ ] `.env` files not tracked in git
- [ ] Dependencies have no known CVEs (check with `npm audit` / `pip audit` / `cargo audit`)

Output format:
```
CRITICAL: [issue] at [file:line]
HIGH: [issue] at [file:line]
PASS: [check name]
```

End with overall verdict: SECURE / NEEDS_FIXES / BLOCKED
