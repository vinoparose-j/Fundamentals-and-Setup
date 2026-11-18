# Team Workflows & Communication Protocols

## 1. Daily Standup Format

Keep daily updates concise, asynchronous-friendly, and outcome-oriented:

1. **Yesterday:** What tasks or PRs were completed (include PR/commit links)?
2. **Today:** What is the primary milestone or ticket in progress?
3. **Blockers:** Any dependency, environment, or specification questions?

## 2. Mentor & Peer Interaction Guidelines

- **Research First (15-Minute Rule):** Check official docs, error stack traces, and repo README before escalating.
- **Ask Structured Questions:** Include:
  1. Goal (what you are trying to achieve)
  2. Context (OS, Java/Node version, branch)
  3. Reproducible steps & exact error output
  4. What you already tried
- **Response Etiquette:** Acknowledge review feedback promptly, resolve threads only after pushing fixes, and avoid huge monolithic PRs.

## 3. Code Review Standards

- **As an Author:** Self-review your diff on GitHub before requesting review; verify tests pass locally and in CI.
- **As a Reviewer:** Critique the code, never the person; distinguish blocking correctness/security issues from optional style suggestions (`nit:`).

## 4. Definition of Done (Phase 1)

- Clean build and passing unit/integration tests on both backend and frontend.
- Updated documentation (`README.md`, `docs/`) reflecting any structural or config changes.
- Zero secrets or generated artifacts committed to Git.
