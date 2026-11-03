---
title: 'C4: DR Curveball'
description: Respond to a surprise business requirement change — add high availability
  and disaster recovery to your FreshConnect infrastructure.
sidebar:
  order: 4
  badge:
    text: 45 min
    variant: caution
prev:
  link: ../challenge-3-implementation/
  label: 'C3: Implementation'
next:
  link: ../challenge-5-load-testing/
  label: 'C5: Load Testing'
---

:::note[Challenge Info]
⏱️ **45 min** · 🏆 **10 pts** · 🤖 `01-Orchestrator` or affected domain owners, shared reviewer, and the selected CodeGen/Deploy track (optional `10-Challenger`) · 📄 `agent-output/freshconnect/03-des-adr-NNNN-ha-dr-strategy.md`, updated IaC or paper design, updated diagram

:::

## Objective

- **Do now:** Respond to the DR curveball with an ADR, updated design, and revised delivery path.
- **Input:** C3 templates where available, deployment outcome, implementation plan, and any architecture diagram.
- **Output:** `agent-output/freshconnect/03-des-adr-NNNN-ha-dr-strategy.md`, updated IaC or paper design, updated architecture diagram, and revised cost view.
- **Required to move on:** Reopen affected owners, refresh dependent evidence, rerun required reviews, renew relevant approvals, parameterize the design, and document whether you deployed it or designed it on paper.
- **Decisions now:** Single-region HA vs multi-region DR vs active-active, what must replicate, how failover works, and what fits inside the extra budget.
- **Next:** C5 validates the revised platform or documents the intended test target if you stayed on paper.

This challenge tests whether your team can adapt without losing the architectural
thread. The right answer is the option you can justify and deliver credibly under time
pressure.

## The Business Challenge

Midway through the workshop, Nordic Fresh Foods signs a major Danish contract and the
board raises the budget ceiling to about €700 per month. The platform now needs a
secondary region in `germanywestcentral`, an RTO of 1 hour, and an RPO of 15 minutes.
You must recommend a resilient path quickly, then show how it changes the design.

## Your Tasks

Use `01-Orchestrator` in the VS Code Copilot harness to delegate bounded work to
the affected owners, or select those owners directly. Required reviews use the shared
independent `challenger-review-subagent` and actual recorded results. If a delegated
owner cannot launch the reviewer, Orchestrator can relay it as an independent sibling.
`10-Challenger` is an optional manual wrapper, not a required step.

1. Record the changed budget, region, and recovery targets as material changes. Use the owner workflow and recall to reopen affected work, supersede dependent stale evidence and approvals, and preserve earlier findings, review attempts, and artifact history.
2. Have `02-Requirements` revise the requirements and recovery targets. Resolve blocking findings from its automatically invoked independent review, verify the recorded result is current, and approve the revised Requirements before Architecture.
3. Have `03-Architect` revise the architecture, SKU evidence, and source-backed cost for `swedencentral` and `germanywestcentral`. For `practical-v1`, check current authorized-target feasibility evidence against the revised regions before Architecture approval; return stale or incomplete evidence to Governance. Compare the current registered `COMPLETE` estimate, currency, usage, and any conversion assumptions with €700 per month; a verified versioned result does not need a second alias. Resolve blocking findings from the automatically invoked separate architecture and cost reviews, verify their actual recorded results are current, and approve the revised Architecture.
4. Have `04-Design` write the ADR as `agent-output/freshconnect/03-des-adr-NNNN-ha-dr-strategy.md` (next ADR number) with context, decision, consequences, and rejected alternatives. Return any change to an approved architecture decision to the Architect.
5. Reconcile affected governance and renew its required review and approval. Have `05-IaC Planner` revise the plan and contracts, invoke its independent review, and approve the revised code-generation contract after resolving blocking findings and verifying the recorded review is current. Reuse unchanged evidence only when it is still current for the changed inputs.
6. Have the selected CodeGen owner update the IaC track, or document the parameterized paper design. For changed code, retain a current `05-iac-handoff.json` and validate it before any deployment request; do not invent a handoff for a paper design.
7. Update the diagram and cost view in both cases. Before any revised deployment, review the new exact preview and current policy precheck; if checks permit apply, separately authorize the actual tenant, subscription, environment, operation, phase, budget, code, parameters, and scope. Otherwise state that the result remains a paper exercise.

| Challenge 3 outcome | What you do now |
| --- | --- |
| Deployment succeeded | Revise affected artifacts and approvals; extend the platform only with fresh scoped authorization and capture the actual result. If deployment is blocked, record the blocker and paper design |
| Partial deployment | Preserve partial results, document gaps, and show the intended end state without calling it deployed |
| Deployment failed | Develop the paper path without claiming deployment evidence; record any unresolved review or approval blockers |

## Key Decisions

- Which services truly need redundancy to meet the new RTO and RPO, and which can be
  recovered more simply?
- Is active-passive good enough for the business, or are you paying for active-active
  complexity you cannot defend?
- Which failover steps are automatic, which are manual, and how will the team know the
  difference during an incident?
- What proof will convince a stakeholder that this DR plan is credible within the new
  budget?

## Deliverables

- `agent-output/freshconnect/03-des-adr-NNNN-ha-dr-strategy.md`
- Updated IaC with HA/DR parameters, or a written parameterized design if you are on
  the paper path.
- Updated architecture diagram showing regions, replication paths, and failover flow.
- Current revised requirements, architecture, cost, and applicable governance/plan review evidence and approvals.
- Revised source-backed cost estimate and usage/currency assumptions for the chosen approach, or an explicitly unpriced blocker on the paper path.
- Deployment evidence if you applied the DR change.

## Success Criteria

| Focus | What good looks like | Evidence |
| --- | --- | --- |
| Decision quality | The team chooses an HA/DR path with clear business reasoning | ADR states the trigger, chosen option, trade-offs, and rejected alternatives |
| DR design clarity | The resilience design is concrete instead of hand-wavy | Parameters, regional changes, and failover behavior are explicit |
| Delivery path | The team is honest about what was deployed versus designed | Deployment evidence exists, or the paper path is documented cleanly |
| Architecture communication | Others can understand the updated design quickly | Updated diagram and ADR tell the same before/after story |

## Tips / Hints

<details>
<summary>Useful reference points for the curveball</summary>

Use [Hints & Tips](../../guides/hints-and-tips/#multi-region-dr)
for DR design prompts, [Quick Reference Card](../../guides/quick-reference-card/#budget-guide)
for the post-curveball budget guardrail, and
[Quick Reference Card](../../guides/quick-reference-card/#paper-exercise-rules)
if your team is documenting the fallback path.

ADR skeleton:

```text
Context -> what changed and why it matters
Decision -> which HA/DR option you chose
Consequences -> cost, complexity, risks, operational impact
Alternatives -> what you rejected and why
```

</details>

## Watch Out

- A paper exercise can still score well, but only if you separate design
  intent from actual deployment evidence.
- The paper path can still prove your C4 design thinking, but it does not replace
  missing C3 deployment evidence. Be explicit about what you designed versus what
  ran.
- Do not treat stale reviews, failed pricing or policy discovery, a policy precheck `BLOCK`, or a generic prior approval as approval of the revised design or deployment.
- If an affected gate is blocked, stop that work and label any paper design provisional until the required evidence and approvals exist.
- Preserve review and approval history; do not edit state or reset review attempts to force progress.
- Do not patch downstream code while approved requirements, architecture, or plans still describe the old recovery targets.
- Do not pick active-active unless you can explain consistency, failover, and cost.
- Do not update the diagram without updating the ADR, or vice versa.
- Keep the €700 ceiling visible; the extra budget is not a license to duplicate
  everything blindly.

## Artifact Handoff

| Item | Value |
| --- | --- |
| **Input from** | C3 templates where available, deployment outcome, implementation plan, and any architecture diagram |
| **Your output** | `agent-output/freshconnect/03-des-adr-NNNN-ha-dr-strategy.md`, updated IaC or paper design, updated diagram |
| **Next challenge uses** | C5 validates the revised platform if you have an endpoint, or uses your documented target state to define the intended test plan |

## Next Step

Challenge 5 treats this DR-aware platform as the system under test. If you deployed the
change, you will validate it under load; if you stayed on paper, you will document the
test plan and expected thresholds against the design you proposed in C4.
