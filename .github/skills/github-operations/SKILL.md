# GitHub Operations Skill

## Purpose

Guide GitHub issue, pull request, and release operations for this repository.

## When to Use

- Creating or triaging issues
- Opening or reviewing pull requests
- Managing releases or milestones

## Guidelines

### Issues

- Use descriptive titles: `[Challenge X] Description of problem`
- Label with: `bug`, `enhancement`, `documentation`, `facilitator`
- Include reproduction steps for bugs
- Reference related challenge numbers

### Pull Requests

- Use conventional commit format in PR title
- Link related issues with `Closes #N` or `Fixes #N`
- Request review from repository maintainers
- Ensure CI passes before merging (Astro build + markdownlint)

### Releases

- Tag releases with semantic versioning: `v1.0.0`
- Include changelog entries summarizing content and structural changes
- Coordinate with facilitator guide updates

## Constraints

- Do not force-push to `main`
- Do not merge PRs with failing CI checks
- Do not include facilitator-only content in public issue descriptions
