# Contributing

Thanks for improving the APEX MicroHack documentation and facilitator materials.

## Scope

This repository holds the **workshop docs site**, **facilitator guides**, and **governance scripts**.
Participant work happens in the [azure-agentic-infraops-accelerator](https://github.com/jonathan-vella/azure-agentic-infraops-accelerator) template repo — changes to agents, skills, dev container, or Bicep/Terraform scaffolds belong there, not here.

## Local development

Use Node 24 (see `.nvmrc` / `.node-version`).

```bash
npm install
cd site
npm install
npm run dev         # local preview at http://localhost:4321/
npm run build       # production build
npm run lint:md     # markdownlint
npm run lint:prose  # Vale (requires `vale` on PATH; run `vale sync` once)
```

## Pull request checklist

- `npm run lint:md` passes
- `npm run build` passes in `site/`
- `npm run lint:prose` reports zero **error**-level issues
- Internal links resolve against the built site (no 404s)
- Challenge guides that you add or edit follow [.github/skills/challenge-guide-styler/SKILL.md](.github/skills/challenge-guide-styler/SKILL.md)
- Facilitator materials (`facilitator/`) stay consistent with the challenge points and timings published on the docs site

## Commit messages

Use Conventional Commits when practical: `docs:`, `fix:`, `chore:`, `refactor:`.

## Reporting issues

Use the GitHub issue templates under **Issues → New issue** in this repository.
