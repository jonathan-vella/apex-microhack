---
title: Glossary
description: Definitions of key terms used throughout the workshop
sidebar:
  order: 1
---

Key terms and definitions for APEX.

:::note

**Canonical vocabulary**: The terms below are the agreed names used throughout all participant-facing docs, facilitator guides, and scripts. Use these exact terms when writing or updating workshop content.

:::

## Naming Conventions

| Concept | Canonical term | Do not use |
|---|---|---|
| APEX expansion | **Agentic Platform Engineering eXperience for Azure** | alternative expansions, reworded acronym definitions |
| The event | **MicroHack** or **microhack** | hackathon, workshop (except in general descriptions) |
| Event organizer | **Facilitator** | coach, instructor, proctor |
| Event participant | **Participant** | attendee, student, user (in workshop context) |
| Challenge tasks | **Challenge 1**, **Challenge 2**, etc. | Task, Exercise, Lab |
| The surprise DR requirement | **Curveball** (Challenge 4) | twist, surprise, pivot |
| The fictional company | **Nordic Fresh Foods** | NFF, the customer (reserve "customer" for the C8 role) |
| The platform being built | **FreshConnect** | the app, the project (when referring to the scenario) |
| Azure deployment language | **Bicep** or **Terraform** | ARM templates (unless comparing) |
| AI assistant | **GitHub Copilot** | Copilot (alone is acceptable), AI, the agent (when referring to the product) |
| Specific AI persona | **Agent** (e.g., `02-Requirements`) | bot, assistant |
| Scoring document | **Scoring rubric** | rubric, scorecard |
| Working repository | **APEX Accelerator** (`apex-accelerator`) | starter repo, base repo |
| This documentation repo | **Docs repo** (`apex-microhack`) | main repo, source repo |
| Team subscription model | **One subscription per team** | shared subscription (prohibited) |
| MCP server access | **Accelerator MCP configuration** | retired fixed server lists or one policy setting presented as universal |
| Post-event resource deletion | **Cleanup** | teardown, decommission |

## Azure Product Names

Use the full product name on first reference, then the short form:

| Full name | Acceptable short form |
|---|---|
| Azure App Service | App Service |
| Azure SQL Database | SQL Database |
| Azure Blob Storage | Blob Storage, Storage Account |
| Azure Key Vault | Key Vault |
| Azure Policy | Policy |
| Azure Monitor / Application Insights | App Insights |
| Azure Resource Manager | ARM |
| GitHub Copilot Enterprise | Copilot Enterprise |
| Azure Well-Architected Framework | WAF |

:::note[Supported Copilot plans]
This workshop requires working GitHub Copilot Chat access in VS Code. Your account or organization must permit the selected model, custom agents, and required tools. Check current plan entitlements and organization policy rather than relying on a fixed plan list or agent model pins.
:::

---

[A](#a) · [B](#b) · [C](#c) · [D](#d) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [L](#l) · [M](#m) · [N](#n) · [P](#p) · [R](#r) · [S](#s) · [V](#v) · [W](#w)

---

## A

**ADR** — Architecture Decision Record. A structured document capturing a
design decision, its context, and consequences. Generated with the `apex-azure-adr` skill.

**Admin** — A Leaderboard App role (`admin` in SWA). Admins can review and
validate team submissions, manually override published scores, assign awards,
manage teams, and upload JSON score files. Compare with **Member**.

**Agent** — A specialized role with declared tools and responsibilities. Agents are defined in `.github/agents/*.agent.md`; the reviewed definitions do not pin a model.

**Approval Gate** — A human decision after reviewing current artifacts, findings, and proposed next scope. The team can approve and continue or approve and pause; deployment needs separate approval of its current preview and exact scope.

**AVM** — Azure Verified Modules. Microsoft's official library of pre-tested
Bicep modules published to `mcr.microsoft.com/bicep`.

## B

**Bicep** — Azure's domain-specific language for deploying Azure resources
declaratively. Files use the `.bicep` extension.

## C

**Challenge** — A time-boxed task in the microhack aligned to one or more
workflow steps. There are 8 challenges progressing from requirements through
deployment, documentation, diagnostics, and a final showcase.

**Conductor** — Historical persona label for `01-Orchestrator`. The Orchestrator can delegate bounded work to domain owners, while retaining human gates and separate authorization for consequential actions.

**Context Optimizer** — `11-Context Optimizer`, a reference capability that audits Copilot context use and recommends improvements. It does not edit agents or own a participant challenge-path handoff.

**Conventional Commits** — A commit message format (`type: description`) used
for automated versioning. Enforced by commitlint and lefthook.

**Curveball** — A surprise requirement change announced mid-microhack
(Challenge 4). Simulates real-world scope changes by introducing multi-region
disaster recovery requirements.

## D

**Dev Container** — A Docker-based development environment defined in
`.devcontainer/devcontainer.json`. Provides consistent tooling for all contributors.

**Diagram** — A Mermaid workflow diagram explains delegation, decisions, and return paths. An optional rendered Azure architecture diagram uses `apex-python-diagrams` and has Python source, editable SVG, and PNG outputs.

## F

**Facilitator** — The event organizer who runs the microhack: manages the schedule,
announces the curveball, coaches teams, and scores submissions using the rubric.

**FreshConnect** — The project codename for the Nordic Fresh Foods delivery
platform used as the microhack scenario. All agent output goes to
`agent-output/freshconnect/`.

## G

**Governance Constraints** — Effective Azure Policy restrictions reconciled during Governance Step 3.5 and saved in `04-governance-constraints.md` and `04-governance-constraints.json`. Preliminary feasibility can be collected earlier within an authorized read scope; incomplete discovery does not mean there are no constraints.

## H

**Handoff** — Transfer of evidence or responsibility between workflow steps. The retired UI handoff controls are distinct from `00-handoff.md`, a recovery summary, and `05-iac-handoff.json`, the CodeGen-to-Deploy contract. Neither artifact is an approval token.

**Harness** — The session runtime coordinating models, context, tools, and tasks. APEX uses the **Copilot** session target in VS Code; choosing a model is a separate decision and does not change the harness.

## I

**Instruction File** — A `.instructions.md` file in `.github/instructions/` that
provides file-type-specific coding standards to Copilot.

## L

**Leaderboard App** — An optional browser-based HackerBoard web application
built on Azure Static Web Apps. Some workshop packages use it for score
submission and review, but it is not included in this repository.

## M

**MCP** — Model Context Protocol. The reviewed participant Accelerator's root `.mcp.json` declares `github` and `azure-mcp` under `mcpServers`. This docs repo's Astro-only `.vscode/mcp.json` serves website maintenance and is separate.

**Member** — A Leaderboard App role (`member` in SWA). Members can view the
leaderboard, see their own team's score breakdown, register their attendee
profile, and submit scores for their own team. Compare with **Admin**.

**Model** — The AI model selected for a session, subject to account and organization policy. A model choice does not select the Copilot harness, prove tool availability, or grant permission.

## N

**Native Task** — A bounded delegation to a named owner or helper, with explicit inputs, scope, and permitted outputs. The Orchestrator can dispatch owners; owners can invoke declared helpers when supported. A task result is not a human approval.

## P

**Persona** — A historical display name or icon associated with an agent. Use the exact agent identifier, such as `02-Requirements`, for workflow instructions.

**Platform Engineering** — The discipline of designing and building
standardized, self-service toolchains and workflows that enable infrastructure
delivery at scale. In this MicroHack, teams apply platform engineering practices
— IaC templates, governance policies, and Well-Architected patterns — accelerated
by GitHub Copilot.

**Practical Workflow (`practical-v1`)** — The default contract for new projects, which batches routine work within authorized scope while retaining independent reviews and human gates. Existing projects remain legacy until explicitly adopted with owner approval; adoption preserves their history and does not grant permission.

## R

**Recovery** — Restoring current decisions, evidence, and blockers using `apex-recall` and `00-handoff.md`. Resume FreshConnect with `/apex-workflow-start resume freshconnect`; do not reinitialize existing work or edit state JSON to force progress.

**Retail Cost Estimate** — Pricing-worker evidence for planned or deployed SKUs, primarily from Azure MCP `pricing_get`, with a labeled direct-API fallback in eligible cases. A current registered `COMPLETE` estimate includes source, currency, and usage; it is not an actual-spend bill.

**Review** — Independent assessment by `challenger-review-subagent`, with actual attributed findings recorded and checked for freshness and provenance. Architecture and cost use separate lenses. `10-Challenger` is an optional interactive wrapper, not a required manual step; missing or stale review evidence is not approval.

## S

**Scoring** — WAF-aligned evaluation of microhack submissions. Base score is
105 points across eight scored categories plus up to 25 bonus points for advanced features
like zone redundancy and private endpoints.

**Skill** — Reusable instructions under `.github/skills/*/SKILL.md`. Invocation flags determine whether a skill can load automatically or requires explicit invocation.

**Submission** — A score payload submitted by a team member through the
Leaderboard App. Submissions enter a `Pending` state and must be approved
by an admin before they affect the published leaderboard.

**Subagent** — A bounded helper used by an owning agent for a permitted task such as validation, pricing, preview, or independent review. `challenger-review-subagent` is the shared reviewer; the main agent `10-Challenger` is an optional interactive wrapper.

## V

**Validation** — In the Leaderboard App context, the admin review step where
a pending submission is approved or rejected before scores are published.
In the infrastructure context, the `az deployment group validate` or
`bicep build` step that checks template correctness. A successful preflight or validation does not authorize deployment.

## W

**WAF** — Well-Architected Framework. Microsoft's design framework with five
pillars: Security, Reliability, Performance Efficiency, Cost Optimization,
and Operational Excellence.

**What-if** — An Azure deployment preview that shows what resources would be
created, modified, or deleted without making changes.
Participants receive this evidence from the selected Deploy agent; facilitators
may run `az deployment group what-if` as a diagnostic. A preview is not permission to apply changes.
