---
name: git-commit
description: "Format conventional commit messages when writing or reviewing commits in this repository."
---

# Git Commit Skill

## Purpose

Support conventional commit message formatting.

## When to Use

- Writing commit messages for any change in this repository
- Reviewing commit history for consistency

## Conventional Commit Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type       | When to Use                               |
| ---------- | ----------------------------------------- |
| `feat`     | New feature or content                    |
| `fix`      | Bug fix or correction                     |
| `docs`     | Documentation-only changes                |
| `style`    | Formatting, CSS, no logic change          |
| `refactor` | Code restructuring without feature change |
| `chore`    | Tooling, config, CI changes               |
| `test`     | Adding or updating tests                  |

### Scopes

| Scope          | Applies To                         |
| -------------- | ---------------------------------- |
| `site`         | Astro Starlight documentation site |
| `challenges`   | Challenge content files            |
| `facilitator`  | Facilitator-only materials         |
| `scripts`      | PowerShell or Python scripts       |
| `devcontainer` | Dev container configuration        |
| `ci`           | GitHub Actions workflows           |

### Examples

- `feat(challenges): add challenge 4 DR curveball guide`
- `fix(site): correct broken link in setup page`
- `chore(ci): update Astro build workflow`
