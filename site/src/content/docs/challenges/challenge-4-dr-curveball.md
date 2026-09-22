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
⏱️ **45 min** · 🏆 **10 pts** · 🤖 affected workflow agents, `10-Challenger`, and the selected CodeGen/Deploy track · 📄 `agent-output/freshconnect/03-des-adr-NNNN-ha-dr-strategy.md`, updated IaC or paper design, updated diagram

:::

## Objective

- **Do now:** Respond to the DR curveball with an ADR, updated design, and revised delivery path.
- **Input:** C3 templates, deployment outcome, implementation plan, and architecture diagram.
- **Output:** `agent-output/freshconnect/03-des-adr-NNNN-ha-dr-strategy.md`, updated IaC or paper design, updated architecture diagram, and revised cost view.
- **Required to move on:** Revise affected artifacts, rerun required reviews, approve the new path, parameterize the design, and document whether you deployed it or designed it on paper.
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

1. Record the changed business requirement and identify which approved artifacts it invalidates.
2. Return to `02-Requirements` and `03-Architect` as needed. Update requirements, recovery targets, architecture, cost, and SKU evidence.
3. Select `10-Challenger` for the required revised requirements, architecture, and cost reviews. Resolve blocking findings and approve the updated design.
4. Reconcile governance, revise the IaC plan with `05-IaC Planner`, complete the plan review, and approve the revised code-generation contract.
5. Select `04-Design` to write the ADR as `agent-output/freshconnect/03-des-adr-NNNN-ha-dr-strategy.md` (next ADR number) with context, decision, consequences, and rejected alternatives.
6. Update the selected IaC track or document the parameterized paper design. Validate it before any deployment request.
7. Explicitly authorize the revised deployment scope, or state that the result remains a paper exercise. Update the diagram and cost view in both cases.

| Challenge 3 outcome | What you do now |
| --- | --- |
| Deployment succeeded | Revise affected upstream artifacts and approvals, then extend the deployed platform and capture evidence |
| Partial deployment | Revise and validate what works, document gaps, and show the approved intended end state |
| Deployment failed | Complete the reviewed paper path without claiming deployment evidence |

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
- Revised cost estimate or cost assumptions for the chosen approach.
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
- Do not patch downstream code while approved requirements, architecture, or plans still describe the old recovery targets.
- Do not pick active-active unless you can explain consistency, failover, and cost.
- Do not update the diagram without updating the ADR, or vice versa.
- Keep the €700 ceiling visible; the extra budget is not a license to duplicate
  everything blindly.

## Artifact Handoff

| Item | Value |
| --- | --- |
| **Input from** | C3 templates, deployment outcome, implementation plan, architecture diagram |
| **Your output** | `agent-output/freshconnect/03-des-adr-NNNN-ha-dr-strategy.md`, updated IaC or paper design, updated diagram |
| **Next challenge uses** | C5 validates the revised platform if you have an endpoint, or uses your documented target state to define the intended test plan |

## Next Step

Challenge 5 treats this DR-aware platform as the system under test. If you deployed the
change, you will validate it under load; if you stayed on paper, you will document the
test plan and expected thresholds against the design you proposed in C4.
