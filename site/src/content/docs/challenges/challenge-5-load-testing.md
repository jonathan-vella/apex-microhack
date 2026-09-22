---
title: 'C5: Load Testing'
description: Validate that your deployed FreshConnect infrastructure meets performance
  targets using k6 or Azure Load Testing.
sidebar:
  order: 5
  badge:
    text: 30 min
    variant: note
prev:
  link: ../challenge-4-dr-curveball/
  label: 'C4: DR Curveball'
next:
  link: ../challenge-6-documentation/
  label: 'C6: Documentation'
---

:::note[Challenge Info]
⏱️ **30 min** · 🏆 **5 pts** · 🤖 no additional workflow agent required · 📄 `agent-output/freshconnect/05-load-test-results.md`

:::

## Objective

- **Do now:** Validate that the revised FreshConnect platform can handle realistic peak load.
- **Input:** Deployed endpoint from C3/C4, or a documented fallback plan if deployment is blocked.
- **Output:** `agent-output/freshconnect/05-load-test-results.md`.
- **Required to move on:** Test scenario, targets, observed results, and a recommendation.
- **Decisions now:** Which endpoint matters most, how to ramp to 500 users, what counts as pass or fail, and what to change next if results miss target.
- **Next:** C6 uses the results to create audience-specific operational documents.

This challenge is about decision-quality, not just running a tool. The report should
tell the next reader what you tested, what happened, and what it means for launch risk.

## The Business Challenge

Nordic Fresh Foods expects peak-season demand of about 500 concurrent users during the
summer and holiday rush. Before go-live, the team needs evidence that the platform can
stay responsive enough to protect conversion and customer trust.

| Metric | Target | Why it matters |
| --- | --- | --- |
| Concurrent users | 500 | Represents expected peak demand |
| P95 response time | `<= 2 seconds` | Slow pages drive abandonment |
| Error rate | `< 1%` | Frequent failures undermine trust |
| Sustained duration | 5 minutes | Short spikes do not prove steady performance |

## Your Tasks

1. Pick the endpoint or user journey that best represents real customer traffic.
2. Run a load test with `k6` as the default path; use Azure Load Testing only if your
   team already has time and confidence.
3. Compare the results to the target thresholds and decide whether the bottleneck is
   acceptable, fixable now, or a recommendation for phase 2.
4. Save a concise report at `agent-output/freshconnect/05-load-test-results.md`.

## Key Decisions

- Which endpoint gives the most honest picture of real user experience: homepage, API,
  or another critical flow?
- If results fail, is the likely bottleneck compute, data, networking, or poor test design?
- What scale or tuning change would you recommend first, and what is the likely cost impact?
- If you have no deployed endpoint, what is the minimum credible fallback test plan you
  can still document for later execution?

## Deliverables

- `agent-output/freshconnect/05-load-test-results.md`
- Test configuration: endpoint, stages or concurrency shape, duration, and thresholds.
- Results summary with pass or fail against the stated targets.
- Short interpretation of the main bottleneck, headroom, or risk.
- Recommendation for what to do next if performance misses target.

## Success Criteria

| Focus | What good looks like | Evidence |
| --- | --- | --- |
| Realistic test design | The scenario reflects a meaningful workload instead of a trivial ping | Endpoint, thresholds, and duration are documented clearly |
| Results capture | The team records enough data to support a decision | Summary includes P95, error rate, concurrency, and pass/fail status |
| Interpretation | The report explains what the numbers mean | Likely bottleneck or headroom is described in plain language |
| Recommendation | The next action is clear | Report states keep, tune, scale, or defer with rationale |

## Tips / Hints

<details>
<summary>Quick test pattern</summary>

`k6` is the fastest default path. A minimal run looks like this:

```bash
k6 run load-test.js
```

Keep the report focused on signal, not raw terminal output. Use
[Hints & Tips](../../guides/hints-and-tips/#load-testing) for deeper test ideas and
[Troubleshooting](../../reference/troubleshooting/) if the endpoint is unavailable.

</details>

## Watch Out

- A health endpoint alone is usually too shallow to represent customer experience.
- A failing test without interpretation is not useful evidence.
- Do not paste pages of raw output into the report without summarizing it.
- If no deployment exists, clearly label the fallback as an intended test plan rather
  than a completed execution.

## Artifact Handoff

| Item | Value |
| --- | --- |
| **Input from** | Deployed endpoint and platform design from C3/C4, or documented fallback plan |
| **Your output** | `agent-output/freshconnect/05-load-test-results.md` |
| **Next challenge uses** | C6 uses the results and recommendations to produce audience-specific documentation |

## Next Step

Challenge 6 turns your technical evidence into operational documents. A good load-test
report gives the documentation step concrete numbers, risks, and actions to explain.
