# APEX MicroHack

> **1-day hackathon**: Master IaC-driven Azure infrastructure delivery using platform engineering practices — accelerated by GitHub Copilot.

## Overview

> This repository contains the workshop docs site, facilitator guides, and governance scripts. Participants do not work directly in this repo during the event.

| Repository | Purpose | Who uses it |
|---|---|---|
| **This repo** (`apex-microhack`) | Workshop docs, facilitator guides, scoring rubric, governance scripts | Facilitators, content maintainers |
| **[APEX Accelerator](https://github.com/jonathan-vella/apex-accelerator)** (`apex-accelerator`) | Starting point for participant work — contains agents, skills, dev container, and Bicep + Terraform scaffolds | Participants ("Use this template" → create your own) |

APEX stands for **Agentic Platform Engineering eXperience for Azure**. Teams use GitHub Copilot to move from requirements through Azure platform design, implementation planning, and delivery.

Participants should create their own repository from the [APEX Accelerator template](https://github.com/jonathan-vella/apex-accelerator) instead of cloning this repository directly. Participant guidance is published at [microhack.apexops.pro](https://microhack.apexops.pro/).

## Participant Path

1. Create a working repository from the [APEX Accelerator](https://github.com/jonathan-vella/apex-accelerator).
2. Read [Getting Started](https://microhack.apexops.pro/getting-started/) for the participant overview.
3. Complete the [Setup Guide](https://microhack.apexops.pro/getting-started/setup/) before the event.
4. Read [Workshop Prep](https://microhack.apexops.pro/getting-started/workshop-prep/) for the scenario and team roles.

## Maintainer Commands

- Use Node 24 (`.node-version` or `.nvmrc`) for local maintenance and CI parity.
- `npm install`
- `cd site && npm install && npm run lint:md && npm run build`

## Repository Structure

```text
site/                   # Astro Starlight documentation site
facilitator/            # Facilitator guide, scoring rubric, solution reference
scripts/                # Governance PowerShell scripts
```

## Quick Links

| Resource | Description |
| --- | --- |
| [APEX Accelerator](https://github.com/jonathan-vella/apex-accelerator) | Create your own working repository from the template |
| [Workshop Docs](https://microhack.apexops.pro/) | Published participant guidance |
| [Getting Started](https://microhack.apexops.pro/getting-started/) | Orientation page for participants |
| [Setup Guide](https://microhack.apexops.pro/getting-started/setup/) | Canonical pre-event setup, quota, and cleanup page |
| [Workshop Prep](https://microhack.apexops.pro/getting-started/workshop-prep/) | Scenario, mission, and team roles |
| [Copilot Guide](https://microhack.apexops.pro/guides/copilot-guide/) | Agents, skills, and prompting tips |
| [Quick Reference Card](https://microhack.apexops.pro/guides/quick-reference-card/) | Printable one-page cheat sheet |
| [Scoring Rubric](facilitator/scoring-rubric.md) | WAF-aligned evaluation criteria |
| [Troubleshooting](https://microhack.apexops.pro/reference/troubleshooting/) | Common issues and fixes |

## License

This project is released under the [MIT License](LICENSE).
