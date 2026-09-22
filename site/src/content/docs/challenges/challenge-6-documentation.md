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
⏱️ **15 min** · 🏆 **5 pts** · 🤖 `08-As-Built` · 📄 `07-operations-runbook.md` + 1 additional as-built document

:::

## Objective

- **Do now:** Produce two audience-specific documents from the artifacts you already created.
- **Input:** All prior artifacts, especially the architecture diagram, ADR, load-test results, and deployment evidence.
- **Output:** `agent-output/freshconnect/07-operations-runbook.md` plus at least one additional document from the as-built suite.
- **Required to move on:** One operations guide and one more document that answers a real stakeholder question.
- **Decisions now:** Audience, document type, level of detail, and which evidence matters enough to include inline.
- **Next:** C7 compresses this broader documentation into a one-page diagnostics card.

This challenge is important because it turns workshop output into something another
person could use after the event.

## The Business Challenge

FreshConnect now has running or at least well-defined infrastructure, and different
stakeholders want different answers. Operations needs usable runbooks, compliance wants
documented DR intent, new team members need system orientation, and finance wants cost
clarity. Your documents should solve those problems directly rather than restating the
workshop story.

## Your Tasks

1. Pick the two highest-value audiences for FreshConnect right now.
2. Use `08-As-Built` to generate `agent-output/freshconnect/07-operations-runbook.md` for the operations
   audience.
3. Generate one additional document that closes a different gap such as architecture,
   DR, cost, deployment, or security.
4. Review the output and trim it into something actionable before you save it.

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
- At least one additional document covering architecture, cost, DR, deployment, or
  security.
- Each document states its audience and purpose.
- Each document includes concrete steps, evidence, or diagrams rather than only
  narrative summary.

## Success Criteria

| Focus | What good looks like | Evidence |
| --- | --- | --- |
| Audience fit | Each document solves a real stakeholder problem | Audience and purpose are stated clearly in the artifact |
| Operational usefulness | The required operations guide is actionable | Steps, checks, commands, or escalation guidance are included |
| Architecture or business context | The second document adds a different kind of value | It explains architecture, DR, cost, deployment, or security using prior artifacts |
| Clarity | The documents are easy to scan under time pressure | Headings, tables, bullets, or diagrams make the content usable |

## Tips / Hints

<details>
<summary>Compact documentation prompt</summary>

```text
Generate [document type] for [audience] using these FreshConnect artifacts:
- [artifact path 1]
- [artifact path 2]

The document must answer:
- [business question 1]
- [business question 2]

Return markdown with headings, short tables or lists, and explicit next actions.
```

Use [Hints & Tips](../../guides/hints-and-tips/#documentation) if you need more prompt
ideas, and keep the output tight enough that another team could use it without coaching.

</details>

## Watch Out

- Two documents for the same audience usually means you skipped a more valuable gap.
- Do not let `08-As-Built` generate generic Azure background that does not help
  FreshConnect.
- The required operations guide still needs concrete steps, not architecture prose alone.
- Keep the docs grounded in the artifacts you produced, especially if some
  earlier work remained on paper.

## Artifact Handoff

| Item | Value |
| --- | --- |
| **Input from** | All prior artifacts (requirements, architecture, IaC templates, ADR, load test results) |
| **Your output** | `agent-output/freshconnect/07-operations-runbook.md` and at least one additional as-built document |
| **Next challenge uses** | C7 distills this broader documentation into a one-page diagnostic quick card |

## Next Step

Challenge 7 compresses your operations knowledge into a card someone could use during an
incident. The better your docs are here, the easier that final compression becomes.
