---
title: Copilot and APEX workflow guide
description: Use Copilot agents, skills, handoffs, reviews, and MCP servers during the workshop
sidebar:
  order: 1
---

## What APEX adds to Copilot

GitHub Copilot Chat is the interface. APEX adds repository-defined main agents, helper subagents, skills, instructions, workflow state, and validation tools.

The human remains in control:

1. Select a main agent for the current workflow step.
2. Review the proposed scope and the evidence it will use.
3. Inspect the produced artifact and any Challenger findings.
4. Resolve required findings.
5. Approve the handoff to the next main agent.

`01-Orchestrator` helps you identify the next step and proposes a handoff. It does not autonomously execute the main-agent sequence.

:::caution

Selecting an agent, completing a validation, or reaching a graph edge does not authorize deployment. The team must explicitly approve the proposed Azure changes before a Deploy agent applies them.

:::

## VS Code basics

| Feature | Shortcut | Use during the workshop |
|---|---|---|
| Command Palette | `Ctrl+Shift+P` | Run VS Code and Dev Container commands |
| Integrated Terminal | `` Ctrl+` `` | Run validation, Azure CLI, Bicep, Terraform, k6, and Git commands |
| Explorer | `Ctrl+Shift+E` | Inspect agent output, IaC, and configuration |
| Search | `Ctrl+Shift+F` | Find artifacts, identifiers, and old assumptions |
| Copilot Chat | `Ctrl+Alt+I` | Select APEX agents and review handoffs |
| Inline Chat | `Ctrl+I` | Make a small, local edit when a main workflow agent is not required |

Open the repository created from the [APEX Accelerator](https://github.com/jonathan-vella/apex-accelerator) in its Dev Container. The container supplies the toolchain expected by the agents.

## Agents, skills, and helper subagents

Use these terms consistently:

| Term | Meaning |
|---|---|
| Main agent | A human-selected owner for a workflow step, such as `03-Architect` |
| Skill | Task-specific instructions loaded by an agent or invoked for a declared purpose |
| Helper subagent | A bounded worker that an owning agent may use for validation or specialist evidence |
| Handoff | A proposal asking the human to select another main agent |
| Approval gate | A human decision that permits the workflow to move to the next stage |

A main agent is not a skill or helper subagent. The Orchestrator cannot replace human selection of the next main agent.

## Main workflow agents

The current Accelerator agent files are the source of truth. Do not copy a fixed count or model list into workshop notes.

| Workflow step | Main agent | Result |
|---|---|---|
| Route the workflow | `01-Orchestrator` | Proposed next step, required evidence, and human handoff |
| Requirements | `02-Requirements` | `01-requirements.md` and initial SKU manifest |
| Architecture | `03-Architect` | Architecture assessment and cost evidence |
| Design, optional | `04-Design` | Diagrams and architecture decision records |
| Governance, Step 3.5 | `04g-Governance` | Effective policy constraints in Markdown and JSON |
| IaC planning | `05-IaC Planner` | Implementation plan and machine-readable contracts |
| Bicep generation | `06b-Bicep CodeGen` | Bicep code and `05-iac-handoff.json` |
| Terraform generation | `06t-Terraform CodeGen` | Terraform code and `05-iac-handoff.json` |
| Bicep deployment | `07b-Bicep Deploy` | Deployment and policy-precheck evidence |
| Terraform deployment | `07t-Terraform Deploy` | Deployment and policy-precheck evidence |
| As-built documentation | `08-As-Built` | Evidence-based documentation suite |
| Diagnostics | `09-Diagnose` | Diagnostic analysis for the selected scope |
| Adversarial review | `10-Challenger` | Findings for the specified artifact and review lens |

Model selections may change. Check the `model` field in the current `.github/agents/*.agent.md` files and confirm your account or organization permits those selections.

## Challenger reviews

The Challenger is a human-selected main reviewer, not an automatic helper. Preserve its findings and resolve blocking issues before approval.

| Stage | Default review expectation |
|---|---|
| Requirements | One comprehensive review |
| Architecture | One architecture review and a separate cost-feasibility review |
| Optional design | No review by default; explicit opt-in |
| Governance | One reconciliation review when effective constraints exist |
| IaC plan | One comprehensive review |
| Generated code | Deterministic validation; adversarial review is opt-in |
| Deployment | No Challenger review by default; explicit authorization and current validation evidence are still required |

The workshop may compress discussion time, but it must not describe a required review as completed when the review evidence is missing or has unresolved blocking findings.

## Approval gates during the workshop

Pause for team approval after:

- Requirements and their Challenger findings.
- Architecture, cost evidence, and both required reviews.
- Governance reconciliation when constraints exist.
- The IaC plan and its review findings.
- Code validation, before selecting a Deploy agent.
- Deployment evidence, before treating the environment as verified.

Challenge 4 changes approved requirements. Return to the affected upstream steps, update the evidence, rerun the required reviews, and approve the revised path.

## Prompting main agents

Name the current project, the approved input artifacts, the requested scope, and what the agent must not do.

```text
Review the approved FreshConnect requirements in agent-output/freshconnect/01-requirements.md.
Assess the architecture and cost feasibility for Sweden Central.
Do not deploy resources.
Return the architecture assessment and cost artifacts for team review.
```

For a Challenger review, identify the artifact and lens:

```text
Review agent-output/freshconnect/01-requirements.md using the comprehensive requirements lens.
Return findings only. Do not edit the requirements artifact.
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

Use the MCP configuration in the current template-derived repository. The reviewed Accelerator revision declares:

| Server | Workshop use |
|---|---|
| GitHub MCP | Repository content and GitHub operations |
| Azure Resource Manager MCP | Cost Management and Pricing tools |
| Azure MCP | Azure resources, subscriptions, deployments, and policy context |

The exact server list can change. Check `.vscode/mcp.json`, preserve authentication errors, and compare your repository with the current Accelerator when a server is missing.

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
| 6. Documentation | As-built documentation from approved artifacts and observed state |
| 7. Diagnostics | Standalone diagnosis from current evidence |
| 8. Team showcase | Decisions, findings, approvals, evidence, results, and unresolved risks |

Challenges 5, 7, and 8 are workshop stages rather than numbered APEX workflow steps.

## If an agent or handoff fails

1. Preserve the error and current artifacts.
2. Confirm that the correct template-derived repository is open in the Dev Container.
3. Check the selected main agent, required inputs, and unresolved review findings.
4. Check the current agent model and MCP authentication.
5. Use the APEX session recovery guidance instead of editing workflow state by hand.
6. Ask the facilitator before bypassing a review or changing deployment scope.

## Quick reference

| Item | Location |
|---|---|
| Main agents | `.github/agents/*.agent.md` |
| Skills | `.github/skills/*/SKILL.md` |
| Instructions | `.github/instructions/*.instructions.md` |
| Repository-wide Copilot rules | `.github/copilot-instructions.md` |
| MCP configuration | `.vscode/mcp.json` |
| Workflow artifacts | `agent-output/{project}/` |
| Bicep projects | `infra/bicep/{project}/` |
| Terraform projects | `infra/terraform/{project}/` |

## See also

- [Setup Guide](../../getting-started/setup/)
- [Quick Reference Card](../quick-reference-card/)
- [Hints and Tips](../hints-and-tips/)
- [Troubleshooting](../../reference/troubleshooting/)
- [Current APEX workflow](https://apexops.pro/concepts/workflow/)
