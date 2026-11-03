---
title: 'C6: Workload Documentation'
description: Use the documentation-focused agents to generate clear operational documentation
  for the FreshConnect platform.
sidebar:
  order: 6
  badge:
    text: 15 min
    variant: note
prev:
  link: ../challenge-5-load-testing/
  label: 'C5: Load Testing'
next:
  link: ../challenge-7-diagnostics/
  label: 'C7: Diagnostics'
---

:::note[Challenge Info]
⏱️ **15 min** · 🏆 **5 pts** · 🤖 `08-As-Built` · 📄 `07-operations-runbook.md` + 1 additional `07-*.md` document

:::

## Objective

- **Do now:** Request two audience-specific documents from the artifacts you already created.
- **Input:** Prior artifacts, especially the architecture diagram, ADR, load-test results or test plan, and any deployment evidence.
- **Output:** `agent-output/freshconnect/07-operations-runbook.md` plus one additional `07-*.md` document. Without an accepted deployment, request planned-only drafts.
- **Required to move on:** One operations guide and one more document that answers a real stakeholder question.
- **Decisions now:** Audience, document type, level of detail, and which evidence matters enough to include inline.
- **Next:** C7 compresses this broader documentation into a one-page diagnostics card.

This challenge is important because it turns workshop output into something another
person could use after the event.

## The Business Challenge

FreshConnect may be deployed or still on paper, and different
stakeholders want different answers. Operations needs usable runbooks, compliance wants
documented DR intent, new team members need system orientation, and finance wants cost
clarity. Your documents should solve those problems directly rather than restating the
workshop story.

## Your Tasks

1. Pick the two highest-value audiences for FreshConnect right now.
2. Use `08-As-Built` directly, or ask `01-Orchestrator` to coordinate a bounded task.
   Explicitly request a **partial two-document scope**: `agent-output/freshconnect/07-operations-runbook.md`
   and one named additional `07-*.md` document, such as `07-design-document.md` or
   `07-backup-dr-plan.md`. Provide the audiences, relevant artifacts, and any approved
   Azure read scope.
3. For a deployed workload, provide successful deployment evidence and current
   observations from the approved read scope. Cite the source, scope, and observation
   time; identify missing or failed resources and telemetry. Distinguish measured
   load-test results from a test plan that has not been run.
4. If deployment is missing, failed, or unaccepted, explicitly request both documents
   as **planned-only drafts or gap reports**. Label assumptions, unobserved resources,
   missing evidence, and what must be verified later. Do not claim a partial request
   completed the full observed as-built suite.
5. Review and save the documents. Include FreshConnect's architecture and service
   relationships in at least one document, using the evidence available.

| If the biggest gap is... | Produce... |
| --- | --- |
| On-call support | Operations guide or troubleshooting runbook |
| Audit readiness | DR or security documentation |
| Cost visibility | Cost estimate and optimization guide |
| New team onboarding | Architecture or deployment guide |

## Key Decisions

- Which audience is most likely to fail without documentation if you stop now?
- Which document should be procedural, and which should be explanatory?
- Which prior artifacts should be embedded directly instead of referenced indirectly?
- How much detail is enough to be useful without recreating an entire handbook?

## Deliverables

- `agent-output/freshconnect/07-operations-runbook.md`
- One additional `07-*.md` document covering architecture, cost, DR, deployment, or
  security.
- Each document states its audience and purpose.
- Each document includes concrete steps, evidence, or diagrams rather than only
  narrative summary.
- Actual-state claims cite observed evidence; planned-only drafts identify gaps.

## Success Criteria

| Focus | What good looks like | Evidence |
| --- | --- | --- |
| Audience fit | Each document solves a real stakeholder problem | Audience and purpose are stated clearly in the artifact |
| Operational usefulness | The required operations guide is actionable | Steps, checks, commands, or escalation guidance are included |
| Architecture or business context | The second document adds a different kind of value | The documents explain FreshConnect's architecture and the second covers a distinct stakeholder need |
| Clarity | The documents are easy to scan under time pressure | Headings, tables, bullets, or diagrams make the content usable |

## Tips / Hints

<details>
<summary>Compact documentation prompt</summary>

```text
Request partial documentation for FreshConnect:
- 07-operations-runbook.md for [operations audience]
- [one additional 07-*.md document] for [second audience]

Deployment status: [accepted deployment, or missing/failed/unaccepted]
Approved read scope: [scope, or none]
Evidence:
- [artifact path 1]
- [artifact path 2]

Use observed evidence for actual-state claims and identify missing resources and telemetry.
If deployment is missing, failed, or unaccepted, I request planned-only drafts/gap reports.
Label assumptions and verification needs; do not claim the full suite is complete.
```

Use [Hints & Tips](../../guides/hints-and-tips/#documentation) if you need more prompt
ideas, and keep the output tight enough that another team could use it without coaching.

</details>

## Watch Out

- Two documents for the same audience usually means you skipped a more valuable gap.
- Do not let `08-As-Built` generate generic Azure background that does not help
  FreshConnect.
- The required operations guide still needs concrete steps, not architecture prose alone.
- Do not describe planned resources, checks, or test results as observed. If evidence
  or read permission is missing, record the gap rather than guessing.
- Two requested documents are a partial scope, not a completed full as-built suite.

## Artifact Handoff

| Item | Value |
| --- | --- |
| **Input from** | Prior artifacts, deployment evidence if available, and measured load-test results or a test plan that has not been run |
| **Your output** | `agent-output/freshconnect/07-operations-runbook.md` and one additional `07-*.md` document, labeled planned-only if deployment is missing, failed, or unaccepted |
| **Next challenge uses** | C7 distills this broader documentation into a one-page diagnostic quick card |

## Next Step

Challenge 7 compresses your operations knowledge into a card someone could use during an
incident. The better your docs are here, the easier that final compression becomes.
