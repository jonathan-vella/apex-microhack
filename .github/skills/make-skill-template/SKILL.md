# Make Skill Template

## Purpose

Scaffold a new skill for this repository.

## When to Use

- Adding a new domain skill to `.github/skills/`

## Template

Create a new directory under `.github/skills/<skill-name>/` with a `SKILL.md` file:

```markdown
# <Skill Name> Skill

## Purpose

<One-sentence description of what this skill does.>

## When to Use

- <Trigger condition 1>
- <Trigger condition 2>

## Guidelines

<Key rules and patterns for this skill domain.>

## Constraints

<Hard boundaries — what this skill must NOT do.>
```

## After Creating

1. Add the skill to `.github/skills/README.md`
2. If an agent references the skill, update the agent file in `.github/agents/`
3. Update `AGENTS.md` if the skills catalog section needs refreshing
