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
⏱️ **5 min** · 🏆 **5 pts** · 🤖 optional: `09-Diagnose` · 📄 `agent-output/freshconnect/07-diagnostics-quick-card.md`

:::

## Objective

- **Do now:** Use existing workshop evidence to write a one-page incident card; a live Diagnose run is not required.
- **Input:** Platform knowledge and documents from C2-C6, plus any authorized observations.
- **Output:** The workshop-authored `agent-output/freshconnect/07-diagnostics-quick-card.md`.
- **Required to move on:** Top health checks, symptom-to-action flows, key commands or queries, and an escalation trigger.
- **Decisions now:** What to check in the first 60 seconds, what failures are most likely, and when to wake up someone else.
- **Next:** C8 presents this card as an incident response plan alongside any observed evidence.

The goal is not a full runbook. It is a quick triage aid that works at 2 AM when the
reader has no spare attention.

## The Business Challenge

In this scenario, the FreshConnect API P95 latency spikes to 8.2 seconds at 2:17 AM on
a Sunday, and the on-call engineer is new to the rotation. They need a triage card that
tells them what to check first, what symptoms mean, and when to escalate. Treat the
scenario as an example, not a measured result.

## Your Tasks

1. Pick the top three health checks that should happen in the first 60 seconds.
2. Add two or three symptom-to-action flows using read-only checks and escalation for
   the failures you think are most likely.
3. Include the key Azure CLI commands or KQL queries, with the target, scope, and
   permissions the on-call engineer needs.
4. Define the escalation trigger and save the final card at the required path. Label
   planned checks and missing telemetry rather than presenting them as observed results.

:::caution[Optional Diagnose run]
The card can be written from existing artifacts without running `09-Diagnose`. For an
optional investigation, select `09-Diagnose` directly. Confirm the symptom, target
resource, time range, authorized read scope, and permission before diagnostic queries.
If the target is unknown, use only an explicitly approved discovery scope to identify
it; discovery does not authorize diagnosing every resource. When requested and
authorized, the agent's native report is `agent-output/freshconnect/08-resource-health-report.md`,
separate from the scored card.

Neither the card nor a read-only investigation authorizes restart, scaling,
configuration changes, enabling diagnostics, data export, or other remediation.
Each side effect needs separate explicit human approval of the exact action and target,
with its expected effect, risk, and rollback.
:::

## Key Decisions

- Which checks tell you fastest whether the issue is platform, application, or dependency?
- Which failure modes matter most based on your architecture and measured results or test plan?
- Which checks are read-only and within the approved scope, and which actions need separate approval?
- How do you keep the card short enough to scan while still being useful?

## Deliverables

- `agent-output/freshconnect/07-diagnostics-quick-card.md`
- Top 3 health checks for the first minute of an incident.
- Two or three symptom-to-action flows.
- Key read-only commands or queries for diagnosis, with scope and required context.
- An escalation trigger.
- Optional extra depth: an explicitly requested or written
  `agent-output/freshconnect/07-ab-diagnostics-runbook.md`. This is not a guaranteed
  As-Built suite output and does not replace the card.
- Optional native Diagnose report, if a scoped investigation and report are authorized:
  `agent-output/freshconnect/08-resource-health-report.md`. It does not replace the card.

## Success Criteria

| Focus | What good looks like | Evidence |
| --- | --- | --- |
| First-minute triage | The card helps someone act immediately | Three health checks are specific and ordered |
| Symptom handling | Common failures map to concrete next actions | Two or more symptom-to-action flows are included |
| Actionability | The card is usable without extra explanation | Scoped read-only commands, queries, or portal checks are present |
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
- Missing telemetry is a gap, not proof that the workload is healthy. Do not present
  planned checks or the scenario's latency as measured results.

## Artifact Handoff

| Item | Value |
| --- | --- |
| **Input from** | Prior artifacts, the C6 runbook, measured load-test results or the test plan, and any authorized observations |
| **Your output** | `agent-output/freshconnect/07-diagnostics-quick-card.md` (required); the extra diagnostics runbook and native health report are optional and distinct |
| **Next challenge uses** | C8 presents the card as a triage plan, alongside actual operational evidence where available |

## Next Step

Challenge 8 uses this quick card alongside your diagram, ADR, and other artifacts to
show operational maturity during the final presentation.
