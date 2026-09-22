---
title: Quick Reference Card
description: At-a-glance reference card for challenges, scoring, agents, and key commands
sidebar:
  order: 3

---

> **Print this page** (Ctrl+P → Save as PDF or print double-sided). Optimized for A4 paper and narrow screens.

---

## Key Actions at a Glance

1. **Before the event** → Run the [Participation Gate](../../getting-started/setup/#participation-gate)
2. **First 10 minutes** → Open the Dev Container, sign in only where needed, and verify current agents, models, and MCP servers
3. **Each challenge** → Check inputs, use the owning main agent, resolve required reviews, approve the handoff, and preserve evidence
4. **End of day** → Team lead deletes resources and confirms cleanup

---

## Hackathon Schedule (1 Day)

| Time        | Challenge       | Duration | Points |
| ----------- | --------------- | -------- | ------ |
| 09:00-10:00 | Intro           | 60 min   | —      |
| 10:00-11:00 | **Challenge 1** | 60 min   | 20     |
| 11:00-12:00 | **Challenge 2** | 60 min   | 25     |
| 12:00-12:45 | 🍽️ Lunch        | 45 min   | —      |
| 12:45-13:30 | **Challenge 3** | 45 min   | 25     |
| 13:30-14:15 | **Challenge 4** | 45 min   | 10     |
| 14:15-14:30 | Checkpoint      | 15 min   | —      |
| 14:30-15:00 | **Challenge 5** | 30 min   | 5      |
| 15:00-15:15 | ☕ Break        | 15 min   | —      |
| 15:15-15:30 | **Challenge 6** | 15 min   | 5      |
| 15:30-15:35 | **Challenge 7** | 5 min    | 5      |
| 15:35-15:50 | Prep            | 15 min   | —      |
| 15:50-16:50 | **Challenge 8** | 60 min   | 10     |
| 16:50-17:00 | Wrap-up         | 10 min   | —      |

**Total Points**: 105 base + 25 bonus

## Scoring & Leaderboard

| Method              | How                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **Rubric scoring**  | All scoring is manual. Facilitators review artifacts and verify deployments against the rubric.   |
| **Leaderboard**     | Use your facilitator worksheet or HackerBoard instance if your event package includes one         |
| **Tooling**         | Optional: record rubric-based totals in HackerBoard when that tooling is available (it does not calculate scores automatically) |
| **Rubric**          | Scoring Rubric (available from facilitator) — single source of truth for points |

---

## Keyboard Shortcuts

| Shortcut       | Action                        |
| -------------- | ----------------------------- |
| `Ctrl+Alt+I`   | Open Chat view                |
| `Ctrl+Shift+I` | Switch to Agent mode          |
| `Ctrl+I`       | Inline chat (editor/terminal) |
| `Ctrl+N`       | New chat session              |
| `Ctrl+Alt+.`   | Model picker                  |
| `Tab`          | Accept suggestion             |
| `Escape`       | Dismiss suggestion            |

---

## Custom Agents

Select main agents from the agent dropdown. The human selects and approves each main-agent handoff.

| Agent | Purpose | Challenges |
| --- | --- | --- |
| **01-Orchestrator** | Identify the next step and propose a human handoff | All, optional entry point |
| **02-Requirements** | Capture requirements and initial SKU evidence | 1, 4 revision |
| **03-Architect** | Assess architecture and cost feasibility | 2, 4 revision |
| **04-Design** | Create optional diagrams and ADRs | 2, 4 |
| **04g-Governance** | Discover and reconcile effective Azure Policy constraints | 3, 4 revision |
| **05-IaC Planner** | Create the implementation plan and contracts | 3, 4 revision |
| **06b-Bicep CodeGen** | Generate the approved Bicep track | 3, 4 |
| **06t-Terraform CodeGen** | Generate the approved Terraform track | 3, 4 |
| **07b-Bicep Deploy** | Deploy the authorized Bicep scope | 3, 4 |
| **07t-Terraform Deploy** | Deploy the authorized Terraform scope | 3, 4 |
| **08-As-Built** | Generate evidence-based as-built documentation | 6 |
| **09-Diagnose** | Diagnose the selected scope from current evidence | 7 |
| **10-Challenger** | Review requirements, architecture, cost, governance, and plan artifacts | 1-4 |

Check the current `.github/agents/*.agent.md` files for model selections. Do not rely on a copied fixed model list.

**How to use**: `Ctrl+Alt+I` → select the owning agent → provide current artifacts and scope → review output → resolve findings → approve the next handoff.

---

## Chat Features

| Feature             | How to Use                                 |
| ------------------- | ------------------------------------------ |
| **Context**         | `#file`, `#folder`, `#symbol`, drag & drop |
| **Codebase search** | `#codebase` in prompt                      |
| **Fetch web page**  | `#fetch url`                               |
| **Workspace**       | `@workspace` for workspace questions       |
| **Terminal**        | `@terminal` for shell help                 |
| **Slash commands**  | `/fix`, `/explain`, `/tests`, `/doc`       |

---

## Essential CLI Commands

Participant deployment is agent-owned. Use only the approved `07b-Bicep Deploy` or
`07t-Terraform Deploy` agent after the team reviews current validation and explicitly
authorizes the proposed scope. Do not run Azure deployment commands directly as a
participant. The CLI examples below are facilitator diagnostic/evidence examples only.

```bash
az account show --query name -o tsv
bicep --version

# Create resource group
az group create -n rg-freshconnect-dev-swc -l swedencentral

# Validate Bicep
bicep build main.bicep
bicep lint main.bicep

# Facilitator diagnostic example: What-If
az deployment group what-if -g rg-freshconnect-dev-swc -f main.bicep

# Facilitator diagnostic example: direct deployment evidence
az deployment group create -g rg-freshconnect-dev-swc -f main.bicep

# Cleanup (END OF DAY — team lead is responsible!)
az group delete -n rg-freshconnect-dev-swc --yes --no-wait
az group delete -n rg-freshconnect-dev-gwc --yes --no-wait  # if secondary region was used
# Verify cleanup:
az group list --query "[?starts_with(name, 'rg-freshconnect')]" -o table
```

Ask your facilitator to remove governance policies from the team subscription.

---

## Bonus Targets (+25 max)

| Enhancement | Points | What to prove |
| ----------- | ------ | ------------- |
| Zone Redundancy | +5 | Supported SKU with zone redundancy enabled |
| Private Endpoints | +5 | Private connectivity for the relevant services |
| Multi-Region DR | +10 | Real DR design or deployment spanning 2+ regions |
| Managed Identities | +5 | Identity-based access with no hard-coded connection strings |

---

## Expected Outputs

| Challenge | Input evidence | Output evidence | Next action |
| --- | --- | --- | --- |
| 1 | Scenario brief | Requirements, SKU manifest, requirements review findings, approval | C2: Architecture |
| 2 | Approved C1 evidence | Architecture, cost evidence, separate reviews, approval, optional design artifacts | C3: Implementation |
| 3 | Approved C1-C2 evidence | Governance constraints, approved plan and contracts, IaC handoff, validation, deployment summary, workflow diagram | C4: DR curveball |
| 4 | C3 evidence and changed requirement | Revised affected artifacts, reviews and approvals, ADR, updated IaC or paper design, updated cost and diagram | C5: Load test |
| 5 | Deployed endpoint or fallback plan | `agent-output/freshconnect/05-load-test-results.md` | C6: Documentation |
| 6 | All prior artifacts and observed state | `agent-output/freshconnect/07-operations-runbook.md` plus one additional as-built document | C7: Diagnostics |
| 7 | Platform evidence and docs | `agent-output/freshconnect/07-diagnostics-quick-card.md` | C8: Showcase |
| 8 | All prior artifacts, reviews, approvals, and evidence | Live presentation and Q&A | Wrap-up |

## Artifact Handoff Contract

- Check the required input and current review evidence before selecting the owning main agent.
- Save each artifact at the expected path and keep machine-readable sidecars with their Markdown artifact.
- Resolve required Challenger findings before recording approval.
- Keep validation evidence separate from deployment authorization.
- Name assumptions, failures, and verification limits clearly.
- Leave the next challenge usable evidence, not only a successful-looking chat response.

## Prompt Recipe

Use this short recipe when a challenge page tells you to prompt an agent:

```text
Goal: [artifact or decision]
Context: [FreshConnect facts + prior artifact path]
Decisions now: [2-4 key trade-offs]
Return: [file name, format, and evidence required]
```

## Mermaid & ADR Conventions

- Mermaid diagrams should show the services, data flow, boundaries, and failure or
  handoff path that matters for the challenge.
- Workflow diagrams should show decisions and feedback loops, not just a straight line.
- ADRs should always cover `Context`, `Decision`, `Consequences`, and `Alternatives`.
- Keep diagrams readable enough to present in Challenge 8 without rework.

## Paper Exercise Rules

- Use the paper path only when deployment is genuinely blocked.
- Keep the same output artifact names where possible.
- Record the blocker, intended change, and expected outcome.
- Do not present design intent as deployed evidence.

---

## Pro Tips

**Challenge 3 — Mermaid Flowcharts:**

`````markdown
````mermaid
graph TD
    A[Start] --> B[Decision]
    B -->|Yes| C[Deploy]
    B -->|No| D[Refine]
\```
````
`````

**Challenge 4 — ADR Template:**

```markdown
# ADR: Multi-Region Disaster Recovery

## Context

[Why DR is needed now]

## Decision

[What approach we chose]

## Consequences

[Cost, complexity, benefits]
```

**Challenge 6 — Documentation Prompts:**

- "Generate ops runbook for [audience]"
- "Create cost breakdown with optimization tips"
- "Document DR procedures for compliance audit"

**Challenge 7 — Diagnostic Queries:**

```bash
# Quick health check
az webapp show --name <app-name> --resource-group <rg> --query state

# Application Insights query
az monitor app-insights query --app <app-id> \
  --analytics-query "requests | where timestamp > ago(1h) | summarize avg(duration)"
```

---

## Naming Conventions

| Resource    | Pattern                        | Max |
| ----------- | ------------------------------ | --- |
| Key Vault   | `kv-{project}-{env}-{suffix}`  | 24  |
| Storage     | `st{project}{env}{suffix}`     | 24  |
| SQL Server  | `sql-{project}-{env}-{suffix}` | 63  |
| App Service | `app-{project}-{env}-{region}` | 60  |

**Generate unique suffix**:

```bicep
var uniqueSuffix = uniqueString(resourceGroup().id)
```

---

## Security Checklist

- [ ] `supportsHttpsTrafficOnly: true`
- [ ] `minimumTlsVersion: 'TLS1_2'`
- [ ] `allowBlobPublicAccess: false`
- [ ] `azureADOnlyAuthentication: true`
- [ ] Managed Identity (no connection strings)

---

## Budget Guide

| Phase           | Budget     | Region               |
| --------------- | ---------- | -------------------- |
| Challenges 1-3  | €500/month | swedencentral        |
| After Curveball | €700/month | + germanywestcentral |

---

## Load Test Targets

| Metric           | Target      |
| ---------------- | ----------- |
| Concurrent Users | 500         |
| P95 Response     | ≤ 2 seconds |
| Error Rate       | ≤ 1%        |

---

## Help

| Problem               | Solution                   |
| --------------------- | -------------------------- |
| Agent not responding  | Reload VS Code window      |
| Bicep won't compile   | Check `bicep build` output |
| Name too long         | Use `take()` function      |
| Zone redundancy error | Use P1v3+ SKU              |

---

**Team**: **\*\*\*\***\_**\*\*\*\*** **Score**: **\_**/130
