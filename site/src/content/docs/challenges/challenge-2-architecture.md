---
title: 'C2: Architecture Assessment'
description: Use the architect agent to create a Well-Architected Framework assessment
  with service selection and cost estimates.
sidebar:
  order: 2
  badge:
    text: 30 min
    variant: note
prev:
  link: ../challenge-1-requirements/
  label: 'C1: Requirements'
next:
  link: ../challenge-3-implementation/
  label: 'C3: Implementation'
---

:::note[Challenge Info]
⏱️ **30 min** · 🏆 **25 pts** · 🤖 `03-Architect`, `10-Challenger`, optional `04-Design` · 📄 architecture, cost, reviews, and optional design artifacts

:::

## Objective

- **Do now:** Turn the requirements into an Azure architecture you can justify.
- **Input:** Approved requirements, SKU manifest, and current requirements review evidence.
- **Output:** Architecture assessment, cost evidence, separate architecture and cost review findings, and an optional design diagram.
- **Required to move on:** Service choices, WAF trade-offs, cost evidence, resolved architecture and cost findings, and team approval.
- **Decisions now:** Compute platform, data platform, network/security boundary, cost vs reliability trade-offs.
- **Next:** C3 turns this assessment and diagram into IaC and deployment work.

Your goal is not to collect every possible Azure option. Your goal is to choose a
workable MVP architecture that fits the FreshConnect constraints and can survive later
implementation and stakeholder scrutiny.

## The Business Challenge

FreshConnect now has clear requirements, but Nordic Fresh Foods still needs a design
that fits a small ops team, stays in EU regions, targets roughly 99.9% availability,
and remains defensible inside a budget of about €500 per month. Every service choice
must balance capability, cost, and operational complexity.

## Your Tasks

1. Read the approved C1 requirements and SKU manifest. Identify decisions that still need architecture judgment.
2. Use `03-Architect` to assess the workload against the Azure Well-Architected Framework and produce architecture, cost, and SKU evidence.
3. Select `10-Challenger` for a comprehensive architecture review and a separate cost-feasibility review.
4. Resolve every blocking finding in the artifact owned by `03-Architect`, then approve the architecture and cost evidence as a team.
5. Use `04-Design` only when a diagram or ADR helps explain the approved design.
6. Save the artifacts at their required paths without merging the separate review evidence.

## Key Decisions

- Which hosting model gives enough reliability and scale without creating an
  operations burden the team cannot sustain?
- Which data service best matches FreshConnect's order and partner data while staying
  within budget and compliance boundaries?
- Which security controls must be first-class from day one, and which can be deferred
  without creating unacceptable risk?
- Where should you spend money for real business value, and where is the architecture
  starting to drift into over-engineering?

## Deliverables

- `agent-output/freshconnect/02-architecture-assessment.md`
- `agent-output/freshconnect/03-des-cost-estimate.md`
- Current architecture and cost-feasibility review findings with no unresolved blocking findings.
- Optional `03-des-*` diagram or ADR artifacts.
- Assessment includes recommended Azure services, key SKUs, WAF reasoning, risks, and cost assumptions.
- Any diagram shows services, relationships, data flows, security boundaries, and region placement.

## Success Criteria

| Focus | What good looks like | Evidence |
| --- | --- | --- |
| Service selection | The chosen Azure services fit the requirements and team capability | Each major service has a short justification tied to a requirement or trade-off |
| WAF thinking | Reliability, security, cost, performance, and operations are visible in the reasoning | The assessment explains the main trade-offs instead of listing features |
| Cost fit | The architecture is realistic for the MVP budget | Cost drivers, assumptions, and guardrails are explicit |
| Architecture communication | Someone else can understand the design quickly | Optional diagram and written assessment tell the same story |
| Review and approval | Architecture and cost evidence pass their separate reviews | Both review artifacts are current, blocking findings are resolved, and the team approves the handoff |

## Tips / Hints

<details>
<summary>Compact prompt pattern and shared references</summary>

Use a prompt structure like this:

```text
Review agent-output/freshconnect/01-requirements.md and recommend an Azure MVP
architecture for FreshConnect.

Decisions I need to make now:
- compute platform
- database choice
- security and network baseline
- cost trade-offs within ~€500/month

Return: WAF-aligned recommendations, key risks, and a diagram-ready summary.
```

Use [Hints & Tips](../../guides/hints-and-tips/#architecture-hints) for deeper service
selection prompts, [Hints & Tips](../../guides/hints-and-tips/#cost-optimization)
for cost thinking, and [Quick Reference Card](../../guides/quick-reference-card/#security-checklist)
for the shared security baseline.

</details>

## Watch Out

- Do not accept an architecture you cannot explain in business terms.
- Do not let an optional diagram drift away from the written assessment.
- Do not ignore cost assumptions until the end; they shape the service choices.
- Do not forget EU residency or governance requirements when comparing services.
- Do not merge the architecture and cost reviews into one generic approval.

## Artifact Handoff

| Item | Value |
| --- | --- |
| **Input from** | Approved requirements, SKU manifest, and requirements review evidence (Challenge 1) |
| **Your output** | Architecture and cost artifacts, separate review evidence, and optional design artifacts |
| **Next challenge uses** | C3 uses the assessment and diagram to choose IaC structure, validation steps, and deployment targets |

## Next Step

Challenge 3 turns this design into code. If your assessment is missing a service
boundary, security control, or cost assumption now, implementation will either stall or
invent its own answer later.
