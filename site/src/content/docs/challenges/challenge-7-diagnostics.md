---
title: 'C7: Diagnostics'
description: Create a quick-reference troubleshooting card for on-call engineers responding
  to FreshConnect incidents.
sidebar:
  order: 7
  badge:
    text: 5 min
    variant: note
prev:
  link: ../challenge-6-documentation/
  label: 'C6: Documentation'
next:
  link: ../challenge-8-partner-showcase/
  label: 'C8: Team Showcase'
---

:::note[Challenge Info]
⏱️ **5 min** · 🏆 **5 pts** · 🤖 `09-Diagnose` · 📄 `agent-output/freshconnect/07-diagnostics-quick-card.md`

:::

## Objective

- **Do now:** Turn everything you know about FreshConnect into a one-page incident card.
- **Input:** Platform knowledge from C2-C6, plus any deployed resources and docs.
- **Output:** `agent-output/freshconnect/07-diagnostics-quick-card.md`.
- **Required to move on:** Top health checks, symptom-to-action flows, key commands or queries, and an escalation trigger.
- **Decisions now:** What to check in the first 60 seconds, what failures are most likely, and when to wake up someone else.
- **Next:** C8 uses this card as evidence that your solution is operable under pressure.

The goal is not a full runbook. It is a quick triage aid that works at 2 AM when the
reader has no spare attention.

## The Business Challenge

At 2:17 AM on a Sunday, the FreshConnect API P95 latency spikes to 8.2 seconds and the
on-call engineer is new to the rotation. They need a triage card that tells them what
to check first, what symptoms mean, and when the problem is bigger than a quick fix.

## Your Tasks

1. Pick the top three health checks that should happen in the first 60 seconds.
2. Add two or three symptom-to-action flows for the failures you think are most likely.
3. Include the key Azure CLI commands or KQL queries that make the card actionable.
4. Define the escalation trigger and save the final card at the required path.

## Key Decisions

- Which checks tell you fastest whether the issue is platform, application, or dependency?
- Which failure modes matter most for FreshConnect based on your architecture and load-test results?
- What can an on-call engineer do safely without architect approval?
- How do you keep the card short enough to scan while still being useful?

## Deliverables

- `agent-output/freshconnect/07-diagnostics-quick-card.md`
- Top 3 health checks for the first minute of an incident.
- Two or three symptom-to-action flows.
- Key commands or queries for diagnosis.
- Escalation trigger and optional path to `agent-output/freshconnect/07-ab-diagnostics-runbook.md` if you add bonus depth.

## Success Criteria

| Focus | What good looks like | Evidence |
| --- | --- | --- |
| First-minute triage | The card helps someone act immediately | Three health checks are specific and ordered |
| Symptom handling | Common failures map to concrete next actions | Two or more symptom-to-action flows are included |
| Actionability | The card is usable without extra explanation | Commands, queries, or portal checks are present |
| Escalation discipline | The card defines the handoff clearly | Clear trigger or threshold tells on-call when to escalate |

## Tips / Hints

<details>
<summary>What belongs on the card</summary>

Prioritize checks that answer "is it down, slow, or broken by a dependency?" Use
[Hints & Tips](../../guides/hints-and-tips/#diagnostics) for example diagnostic flows and
[Quick Reference Card](../../guides/quick-reference-card/#pro-tips) for example queries.

</details>

## Watch Out

- A diagnostics card full of paragraphs will not help during an incident.
- Vague escalation language creates unnecessary delay.
- Do not include five different branches if only two or three are likely to matter.
- Avoid commands that require hidden context the on-call engineer will not have.

## Artifact Handoff

| Item | Value |
| --- | --- |
| **Input from** | Deployed infrastructure, prior artifacts (architecture, IaC templates, ADR) |
| **Your output** | `agent-output/freshconnect/07-diagnostics-quick-card.md` (required), optionally `agent-output/freshconnect/07-ab-diagnostics-runbook.md` |
| **Next challenge uses** | C8 uses this card as evidence that your solution is operable, not just deployable |

## Next Step

Challenge 8 uses this quick card alongside your diagram, ADR, and other artifacts to
show operational maturity during the final presentation.
