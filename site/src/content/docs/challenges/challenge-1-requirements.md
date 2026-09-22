---
title: 'C1: Requirements Gathering'
description: Use the requirements agent to capture comprehensive Azure infrastructure
  requirements for the FreshConnect platform.
sidebar:
  order: 1
  badge:
    text: 30 min
    variant: note
prev:
  link: ../
  label: Challenges Overview
next:
  link: ../challenge-2-architecture/
  label: 'C2: Architecture'
---

:::note[Challenge Info]
⏱️ **30 min** · 🏆 **20 pts** · 🤖 `02-Requirements`, `10-Challenger` · 📄 requirements, SKU manifest, and review findings

:::

## Objective

- **Do now:** Turn the FreshConnect scenario into an Azure-ready requirements document.
- **Input:** Scenario brief from [Workshop Prep](../../getting-started/workshop-prep/).
- **Output:** `agent-output/freshconnect/01-requirements.md`, the initial SKU manifest, and requirements review findings.
- **Required to move on:** Scope, NFRs, compliance needs, budget constraints, resolved Challenger findings, and team approval.
- **Decisions now:** SLA target, RTO/RPO, authentication model, EU data handling.
- **Next:** C2 uses this file to choose services and justify architecture trade-offs.

This challenge creates the decision baseline for the entire workshop. If C1 is vague,
every later challenge becomes guesswork.

## The Business Challenge

Nordic Fresh Foods needs cloud infrastructure for FreshConnect, a Stockholm-based
farm-to-table delivery platform serving 500+ restaurant partners and 10,000
consumers. Peak seasons can hit 3x normal load, the MVP budget is about €500 per
month, launch is in 3 months, GDPR keeps customer data in the EU, and the small team
needs managed services they can operate in practice.

:::caution[Out of Scope]
API Management (APIM) is out of scope for this POC due to time constraints.
:::

## Your Tasks

1. Review the scenario and write down the business constraints you cannot ignore: scale, budget, timeline, compliance, and team capacity.
2. Prompt `02-Requirements` with that context and let it surface gaps, trade-offs, and open questions.
3. Refine the output until it separates functional requirements, non-functional requirements, operational expectations, and compliance needs.
4. Save the requirements and confirm the initial `sku-manifest.json` and `sku-manifest.md` exist.
5. Select `10-Challenger` for the comprehensive requirements review. Resolve every blocking finding.
6. Review the approved artifact as a team and explicitly approve the handoff to Architecture.

## Key Decisions

- What level of downtime can FreshConnect accept before orders, partners, or brand
  trust are affected?
- What data loss window is acceptable if a failure happens during peak ordering?
- Which users need different authentication or access controls: internal staff,
  restaurant partners, and consumers?
- What must stay in EU regions from day one, and what can wait for a later phase?

## Deliverables

- `agent-output/freshconnect/01-requirements.md`
- `agent-output/freshconnect/sku-manifest.json` and `sku-manifest.md`
- `agent-output/freshconnect/challenge-findings-requirements.json` with no unresolved blocking findings
- Project overview with business purpose, timeline, and budget.
- Functional requirements for the platform capabilities that must exist at MVP.
- Non-functional requirements covering SLA, performance, scalability, RTO, and RPO.
- Compliance and operational expectations, including GDPR, monitoring, backup, and support assumptions.

## Success Criteria

| Focus | What good looks like | Evidence |
| --- | --- | --- |
| Business context | The document reflects the real FreshConnect constraints instead of generic cloud goals | Purpose, users, scale, budget, and launch timing are stated clearly |
| Functional scope | The MVP capabilities are concrete enough for architecture decisions | Required capabilities are listed without mixing in phase-2 ideas |
| Operational targets | Reliability and recovery expectations are explicit | SLA, RTO, RPO, and support expectations are documented |
| Compliance and cost | Non-negotiable boundaries are visible early | EU residency, GDPR impact, and budget guardrails appear in the final doc |
| Review and approval | The team resolves required findings before architecture | Challenger evidence is current and the team records approval of the handoff |

## Watch Out

- Do not let the agent fill the page with generic requirements that are not tied to FreshConnect.
- Do not skip budget or operational assumptions because the business brief feels incomplete.
- Do not turn unresolved questions into fake certainty; mark them as assumptions if needed.
- Do not optimize for technical preference over business need.
- Do not continue to Architecture with missing review evidence or unresolved blocking findings.

## Artifact Handoff

| Item | Value |
| --- | --- |
| **Input from** | Scenario brief ([Workshop Prep](../../getting-started/workshop-prep/)) |
| **Your output** | Requirements, SKU manifest, and approved requirements review evidence |
| **Next challenge uses** | C2 reads this file to choose services, assess trade-offs, and build the architecture diagram |

## Next Step

Challenge 2 uses this requirements document as its source of truth. If a later design
choice is hard to defend, the first place to check is whether C1 captured the right
business constraint.
