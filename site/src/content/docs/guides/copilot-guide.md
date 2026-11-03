---
title: Copilot and APEX workflow guide
description: Use Copilot agents, skills, handoffs, reviews, and MCP servers during the workshop
sidebar:
  order: 1
---

## What APEX adds to Copilot

GitHub Copilot Chat is the interface. APEX adds repository-defined agents, skills, workflow state, and validation tools. In VS Code, choose the **Copilot** session target and an organization-permitted model. The session target is the harness; selecting a model does not change it.

Start with `01-Orchestrator` to coordinate FreshConnect, or directly select a domain owner for a bounded task. The Orchestrator can delegate authorized work to named owners through native tasks, collect missing decisions, and continue to the next approved stage.

The team remains in control:

1. Provide the project, current evidence, and authorized scope.
2. Inspect the artifacts and recorded independent review findings.
3. Resolve blocking findings and decide whether to approve the stage.
4. Separately approve the current deployment preview and exact Azure scope before any deployment.

:::caution

Selecting an agent, passing a preflight or validation, or reaching a workflow edge does not authorize deployment. Approval must cover the actual tenant, subscription, target, operation, and current preview before a Deploy agent applies changes.

:::

## VS Code basics

| Feature | Shortcut | Use during the workshop |
|---|---|---|
| Command Palette | `Ctrl+Shift+P` | Run VS Code and Dev Container commands |
| Integrated Terminal | `` Ctrl+` `` | Run validation, Azure CLI, Bicep, Terraform, k6, and Git commands |
| Explorer | `Ctrl+Shift+E` | Inspect agent output, IaC, and configuration |
| Search | `Ctrl+Shift+F` | Find artifacts, identifiers, and old assumptions |
| Copilot Chat | `Ctrl+Alt+I` | Select the Copilot session target and APEX agents, and review results |
| Inline Chat | `Ctrl+I` | Make a small, local edit when a main workflow agent is not required |

Open the repository created from the [APEX Accelerator](https://github.com/jonathan-vella/apex-accelerator) in its Dev Container. The container supplies the toolchain expected by the agents.

## Agents, skills, and helper subagents

Use these terms consistently:

| Term | Meaning |
|---|---|
| Main agent or owner | A workflow role, such as `03-Architect`, selected directly or delegated by the Orchestrator |
| Skill | Task-specific instructions loaded by an agent or invoked for a declared purpose |
| Native delegated task | A bounded assignment with named inputs, permitted outputs, and scope |
| Helper subagent | A bounded worker an owner may invoke for validation, independent review, or specialist evidence |
| Recovery summary | `00-handoff.md`, which records current evidence, decisions, and blockers |
| Approval gate | A human decision on the current stage and proposed next scope |

A main agent is not a skill or helper subagent. UI handoff buttons are no longer required, but the CodeGen-to-Deploy contract `05-iac-handoff.json` remains a required artifact. Neither it nor `00-handoff.md` is an approval token.

## APEX agent inventory

The current Accelerator agent files are the source of truth. Do not copy a fixed count or model list into workshop notes. The Context Optimizer is a reference capability, not a participant challenge-path step.

| Workflow step | Main agent | Responsibility |
|---|---|---|
| Coordinate the workflow | `01-Orchestrator` | Bounded owner delegation, decisions, gates, and recovery |
| Requirements | `02-Requirements` | `01-requirements.md` and initial SKU manifest |
| Architecture | `03-Architect` | Architecture assessment and cost evidence |
| Design, optional | `04-Design` | Diagrams and architecture decision records |
| Governance, Step 3.5 | `04g-Governance` | Effective policy constraints in Markdown and JSON |
| IaC planning | `05-IaC Planner` | Implementation plan and machine-readable contracts |
| Bicep generation | `06b-Bicep CodeGen` | Bicep code and `05-iac-handoff.json` |
| Terraform generation | `06t-Terraform CodeGen` | Terraform code and `05-iac-handoff.json` |
| Bicep deployment | `07b-Bicep Deploy` | Deployment and policy-precheck evidence |
| Terraform deployment | `07t-Terraform Deploy` | Deployment and policy-precheck evidence |
| As-built documentation | `08-As-Built` | Requested documents grounded in observed state |
| Diagnostics, optional in C7 | `09-Diagnose` | Scoped diagnostic analysis and authorized health report |
| Interactive adversarial review, optional | `10-Challenger` | Coordinates an explicitly requested review and any separately authorized fixes |
| Context audit, reference-only | `11-Context Optimizer` | Context-window recommendations; does not change agents or own a challenge step |

The reviewed agent definitions do not pin models. Confirm the selected runtime can use an organization-permitted model and access the declared agents and tools. A model label or configuration entry alone does not prove that a task, review, or permission will work.

## Challenger reviews

Workflow owners request the shared, independent `challenger-review-subagent` through native tasks. The authorized parent records the actual attributed result and checks its schema, provenance, and freshness. If an owner reports `REVIEW_REQUIRED` because nested tasks are unavailable, the Orchestrator relays the same reviewer as an independent sibling task; an unavailable or failed reviewer remains a blocker.

`10-Challenger` is an optional interactive wrapper for an explicitly requested review or authorized fixes; selecting it is not the normal prerequisite for each stage. A preflight is not a review result. Missing, invalid, unrecorded, or stale findings block the affected gate; report the actual failure rather than substituting a self-review.

| Stage | Default review expectation |
|---|---|
| Requirements | One comprehensive review |
| Architecture | One architecture review and a separate cost-feasibility review |
| Optional design | No review by default; explicit opt-in |
| Governance | Reconciliation review when required by the current constraints and workflow |
| IaC plan | One comprehensive review |
| Generated code | Deterministic validation; adversarial review is opt-in |
| Deployment | No Challenger review by default; explicit authorization and current validation evidence are still required |

Preserve actual review attempts and findings, resolve blocking issues, and verify any required fresh review before approval. The architecture and cost lenses remain separate even when their tasks run concurrently.

## Approval gates during the workshop

Pause for team approval after:

- Requirements and their recorded independent findings.
- Architecture, current cost evidence, and both required reviews.
- Governance reconciliation when required.
- The IaC plan and its review findings.
- Code validation and the current preview, before separately authorizing deployment.
- Deployment evidence, before treating the environment as verified.

At a stage gate, **approve and continue** completes the step and dispatches the next named owner in the same chat. **Approve and pause** completes the step, transitions, updates the recovery summary, and stops with a resume command. Neither choice grants deployment permission.

New projects default to `practical-v1`, which batches routine work within the approved scope while retaining independent reviews and human gates. Each required artifact and lens has one initial review and, if needed, one ordinary closure review within its allowed scope. Existing projects remain on their legacy workflow until explicitly adopted with owner approval; do not edit state by hand or reset review history.

For `practical-v1`, Governance may collect preliminary policy feasibility after approved requirements and within an authorized read scope, before final Architecture approval. This does not complete formal Governance or authorize Azure changes. Missing policy evidence leaves compatibility unverified.

Challenge 4 changes material requirements. Reopen affected owners, invalidate stale dependent evidence, preserve review history, and obtain the required fresh reviews and approvals.

## Pricing evidence

The Architect uses the pricing worker's Azure MCP `pricing_get` retail evidence. The worker targets `02-cost-estimate.json` initially; a current registered, validated `COMPLETE` versioned estimate is also valid without an unversioned alias. Keep that JSON alongside `03-des-cost-estimate.md` and the separate cost review.

Check source, currency, usage, and any conversion assumptions when comparing the estimate with the EUR budget. A documented, labeled Retail Prices API fallback is available to the worker in eligible cases; failed or missing prices are not guessed or treated as zero. Actual historical spend and forecasts use authenticated Azure Cost Management REST APIs, not retail estimates.

## Prompting main agents

Name the current project, the approved input artifacts, the requested scope, and what the agent must not do.

```text
Review the approved FreshConnect requirements in agent-output/freshconnect/01-requirements.md.
Assess the architecture and cost feasibility for Sweden Central.
Do not deploy resources.
Return the architecture assessment and cost artifacts for team review.
```

To check the required review, name the artifact and lens:

```text
Show the recorded independent comprehensive requirements review for
agent-output/freshconnect/01-requirements.md.
Identify stale evidence or blockers, and preserve the existing review attempts.
```

For deployment, authorization must be explicit and scoped:

```text
Use the approved Bicep handoff and current validation evidence for FreshConnect.
Show the what-if result and stop for approval before applying changes.
```

## Skills and instructions

Skills live under `.github/skills/`. Current APEX repository skills use one `apex-` prefix. Representative examples include:

| Skill | Purpose |
|---|---|
| `apex-workflow-engine` | Workflow entry, dependencies, handoffs, state, and recovery |
| `apex-azure-defaults` | Azure naming, security, tags, regions, and AVM guidance |
| `apex-azure-artifacts` | Required artifact structures |
| `apex-azure-adr` | Architecture decision records |
| `apex-python-diagrams` | Python-based architecture diagrams |
| `apex-github-operations` | GitHub branches, commits, pull requests, and Actions |
| `apex-unslop` | Manual prose cleanup that preserves technical contracts |

Instructions under `.github/instructions/` apply repository rules to matching files. Skills and instructions do not grant deployment permission or bypass the owning agent's workflow contract.

## MCP servers

Use the root `.mcp.json` in your Accelerator-derived repository. The [reviewed Accelerator configuration](https://github.com/jonathan-vella/apex-accelerator/blob/68c15fc006b960f0266c28f6fda9f676b9aebbbe/.mcp.json) declares:

| Server | Workshop use |
|---|---|
| `github` | Repository context and permitted GitHub tools |
| `azure-mcp` | Azure tools, including retail pricing and policy context |

The portable file uses a top-level `mcpServers` object. Check the configuration and authentication in your actual workspace; the server list may change. This docs repository's Astro-only `.vscode/mcp.json` is separate from the participant configuration.

## Secrets and sensitive output

- Never paste credentials, access keys, connection strings, or tokens into chat.
- Use placeholders and managed identities where the workflow supports them.
- Review generated files and terminal output before committing.
- Rotate a credential immediately if it appears in chat, output, or Git history.
- A model response is not evidence that a secret was protected or that a deployment succeeded.

## Workshop workflow mapping

| MicroHack challenge | APEX workflow use |
|---|---|
| 1. Requirements | Requirements artifact, Challenger review, and approval |
| 2. Architecture | Architecture and cost evidence, separate reviews, and approval |
| 3. Implementation | Optional design, governance, plan review, code generation, validation, deployment authorization, and deployment |
| 4. DR curveball | Controlled change to affected requirements, architecture, governance, plan, code, reviews, and approvals |
| 5. Load testing | Workshop validation evidence for the deployed workload |
| 6. Documentation | Two requested documents from observed state, or planned-only drafts if deployment is missing, failed, or unaccepted |
| 7. Diagnostics | Workshop quick card from current evidence; optional scoped `09-Diagnose` health report |
| 8. Team showcase | Decisions, findings, approvals, evidence, results, and unresolved risks |

Challenges 5, 7, and 8 are workshop stages rather than numbered APEX workflow steps.

## Recovery and blockers

1. Preserve the error and current artifacts.
2. Confirm that the correct template-derived repository is open in the Dev Container.
3. Check the Copilot session target, permitted model, owner, required inputs, task capability, and MCP authentication.
4. Inspect the actual review result and recording error; do not treat an unrecorded response as a receipt.
5. Recover current state and evidence rather than reinitializing the project or editing state JSON:

   ```text
   /apex-workflow-start resume freshconnect
   ```

   The read-only `apex-recall handoff freshconnect --json` and `apex-recall show freshconnect --json` commands can help inspect the recovery context. `00-handoff.md` summarizes evidence and blockers, not permission.

6. Ask the facilitator when a required tool, review, approval, or deployment scope remains blocked.

## Quick reference

| Item | Location |
|---|---|
| Main agents | `.github/agents/*.agent.md` |
| Skills | `.github/skills/*/SKILL.md` |
| Instructions | `.github/instructions/*.instructions.md` |
| Repository-wide Copilot rules | `.github/copilot-instructions.md` |
| Participant MCP configuration | `.mcp.json` |
| Workflow artifacts | `agent-output/{project}/` |
| Bicep projects | `infra/bicep/{project}/` |
| Terraform projects | `infra/terraform/{project}/` |

## See also

- [Setup Guide](../../getting-started/setup/)
- [Quick Reference Card](../quick-reference-card/)
- [Hints and Tips](../hints-and-tips/)
- [Troubleshooting](../../reference/troubleshooting/)
- [Current APEX workflow](https://apexops.pro/concepts/workflow/)
