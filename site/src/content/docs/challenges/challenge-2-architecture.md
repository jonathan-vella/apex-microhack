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
⏱️ **30 min** · 🏆 **25 pts** · 🤖 `01-Orchestrator` or `03-Architect`, `04g-Governance`, shared reviewer; optional `04-Design` and `10-Challenger` · 📄 architecture, cost, reviews, and optional design artifacts

:::

## Objective

- **Do now:** Turn the requirements into an Azure architecture you can justify.
- **Input:** Approved requirements, SKU manifest, and current requirements review evidence.
- **Output:** Architecture assessment, preliminary policy feasibility for a new practical project, current cost evidence, separate architecture and cost review findings, and an optional design diagram.
- **Required to move on:** Service choices, WAF trade-offs, current required policy and cost evidence, resolved architecture and cost findings, and team approval.
- **Decisions now:** Compute platform, data platform, network/security boundary, cost vs reliability trade-offs.
- **Next:** C3 turns this assessment and any optional design artifacts into IaC and deployment work.

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
2. In the VS Code Copilot harness, use `01-Orchestrator` to delegate bounded work to `03-Architect`, or select the Architect directly. Supply the approved inputs and ask for an Azure Well-Architected Framework assessment and SKU evidence.
3. For a new `practical-v1` project, authorize `04g-Governance` to collect preliminary `04-policy-feasibility.json` after Requirements approval, using the confirmed subscription and subscription-and-inherited policy read scope. Orchestrator can delegate this, or you can select Governance directly. This read-only collection is not formal Governance approval or permission to change Azure; a missing target, failed query, or partial coverage leaves Architecture provisional.
4. Have the Architect obtain source-backed retail pricing from the pricing worker, using Azure MCP pricing or, after an eligible MCP failure or ambiguity, the worker's documented first-party fallback. Require a current `COMPLETE` JSON result and `03-des-cost-estimate.md`; confirm the parent registers the actual result and source-evidence paths in the project index or handoff. `02-cost-estimate.json` is the initial target; a verified current versioned result is also valid on its own. Check source freshness and that the estimate matches the current SKUs, regions, quantities, currency, and usage; document any conversion assumptions before comparing it with €500 per month.
5. The Architect automatically invokes the shared independent `challenger-review-subagent` for a comprehensive architecture review and a separate cost-feasibility review; the authorized parent records the actual results. If a delegated owner cannot launch the reviewer, Orchestrator can relay it as an independent sibling. `10-Challenger` is an optional manual wrapper, not a required step.
6. Resolve blocking findings in the owning artifacts, verify both review results and required policy and pricing evidence are current, and explicitly approve Architecture as a team.
7. Use `04-Design` only when a diagram or ADR helps explain the approved design. Preserve the separate review evidence and its actual paths.

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
- `agent-output/freshconnect/04-policy-feasibility.json` for the authorized preliminary collection in a new `practical-v1` project.
- A current, registered `COMPLETE` cost JSON and its source evidence. The initial target is `agent-output/freshconnect/02-cost-estimate.json`; a verified versioned result does not need a second alias.
- `agent-output/freshconnect/03-des-cost-estimate.md`
- Current recorded architecture and separate cost-feasibility review findings with no unresolved blocking findings: `challenge-findings-architecture.json` and `challenge-findings-cost-estimate.json` by default, or the registered architecture pass files for deep review.
- Optional `03-des-*` diagram or ADR artifacts.
- Assessment includes recommended Azure services, key SKUs, WAF reasoning, risks, and cost assumptions.
- Any diagram shows services, relationships, data flows, security boundaries, and region placement.

## Success Criteria

| Focus | What good looks like | Evidence |
| --- | --- | --- |
| Service selection | The chosen Azure services fit the requirements and team capability | Each major service has a short justification tied to a requirement or trade-off |
| WAF thinking | Reliability, security, cost, performance, and operations are visible in the reasoning | The assessment explains the main trade-offs instead of listing features |
| Cost fit | The architecture is realistic for the MVP budget | Current source evidence, currency, usage, cost drivers, and any conversion assumptions are explicit |
| Architecture communication | Someone else can understand the design quickly | Optional diagram and written assessment tell the same story |
| Review and approval | Architecture and cost evidence pass their separate reviews | Both recorded reviews and required policy/pricing evidence are current, blocking findings are resolved, and the team approves Architecture |

## Tips / Hints

<details>
<summary>Compact prompt pattern and shared references</summary>

Use a prompt structure like this:

```text
Review agent-output/freshconnect/01-requirements.md and recommend an Azure MVP
architecture for FreshConnect. Use the approved SKU manifest and the confirmed
subscription and authorized inherited-policy read scope.

Decisions I need to make now:
- compute platform
- database choice
- security and network baseline
- cost trade-offs within ~€500/month

Return: WAF-aligned recommendations, a current source-backed cost estimate with
currency and usage assumptions, key risks, and a diagram-ready summary.
```

Use [Hints & Tips](../../guides/hints-and-tips/#architecture-hints) for deeper service
selection prompts, [Hints & Tips](../../guides/hints-and-tips/#cost-optimization)
for cost thinking, and [Quick Reference Card](../../guides/quick-reference-card/#security-checklist)
for the shared security baseline.

</details>

## Watch Out

- Do not accept an architecture you cannot explain in business terms.
- Do not let an optional diagram drift away from the written assessment.
- Do not compare a USD estimate directly with the EUR budget, invent prices or usage, or treat retail estimates as actual bills.
- Do not treat failed pricing, partial policy discovery, or stale evidence as success. Stop the affected approval and report the blocker; a missing target or current policy snapshot blocks final approval for a new practical project.
- Do not forget EU residency or governance requirements when comparing services; preliminary feasibility does not replace formal Governance.
- Do not merge the architecture and cost reviews into one generic approval.

## Artifact Handoff

| Item | Value |
| --- | --- |
| **Input from** | Approved requirements, SKU manifest, and requirements review evidence (Challenge 1) |
| **Your output** | Architecture, policy feasibility and cost artifacts, separate review evidence, and optional design artifacts |
| **Next challenge uses** | C3 uses the assessment and any optional diagram to choose IaC structure, validation steps, and deployment targets |

## Next Step

Challenge 3 turns this design into code. If your assessment is missing a service
boundary, security control, or cost assumption now, implementation will either stall or
invent its own answer later.
