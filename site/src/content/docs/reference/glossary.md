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
This workshop requires working GitHub Copilot Chat access in VS Code. Your account or organization must permit the custom agents and current models declared by the APEX Accelerator. Check current plan entitlements and organization policy rather than relying on a fixed plan list.
:::

---

[A](#a) · [B](#b) · [C](#c) · [D](#d) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [L](#l) · [M](#m) · [P](#p) · [S](#s) · [V](#v) · [W](#w)

---

## A

**ADR** — Architecture Decision Record. A structured document capturing a
design decision, its context, and consequences. Generated with the `apex-azure-adr` skill.

**Admin** — A Leaderboard App role (`admin` in SWA). Admins can review and
validate team submissions, manually override published scores, assign awards,
manage teams, and upload JSON score files. Compare with **Member**.

**Agent** — A specialized AI assistant with a defined role, model, and set of
tools. Agents are defined in `.github/agents/*.agent.md`.

**Approval Gate** — A mandatory pause where the human reviews the current artifact, findings, and proposed next scope before selecting the next main agent or authorizing deployment.

**AVM** — Azure Verified Modules. Microsoft's official library of pre-tested
Bicep modules published to `mcr.microsoft.com/bicep`.

## B

**Bicep** — Azure's domain-specific language for deploying Azure resources
declaratively. Files use the `.bicep` extension.

## C

**Challenge** — A time-boxed task in the microhack aligned to one or more
workflow steps. There are 8 challenges progressing from requirements through
deployment, documentation, diagnostics, and a final showcase.

**Conductor** — Historical persona label for `01-Orchestrator`. Current guidance uses **Orchestrator** and does not imply autonomous execution of other main agents.

**Conventional Commits** — A commit message format (`type: description`) used
for automated versioning. Enforced by commitlint and lefthook.

**Curveball** — A surprise requirement change announced mid-microhack
(Challenge 4). Simulates real-world scope changes by introducing multi-region
disaster recovery requirements.

## D

**Dev Container** — A Docker-based development environment defined in
`.devcontainer/devcontainer.json`. Provides consistent tooling for all contributors.

## F

**Facilitator** — The event organizer who runs the microhack: manages the schedule,
announces the curveball, coaches teams, and runs the scoring scripts.

**FreshConnect** — The project codename for the Nordic Fresh Foods delivery
platform used as the microhack scenario. All agent output goes to
`agent-output/freshconnect/`.

## G

**Governance Constraints** — Azure Policy assignments that restrict resource
configurations. Discovered during Governance Step 3.5 and saved to
`04-governance-constraints.md`.

## H

**Handoff** — A proposal that tells the human which main agent should own the next step, what evidence it needs, and what scope it will receive. The human selects and approves the target agent.


## I

**Instruction File** — A `.instructions.md` file in `.github/instructions/` that
provides file-type-specific coding standards to Copilot.

## L

**Leaderboard App** — An optional browser-based HackerBoard web application
built on Azure Static Web Apps. Some workshop packages use it for score
submission and review, but it is not included in this repository.

## M

**MCP** — Model Context Protocol. The participant workflow uses the GitHub and Azure servers declared in the current Accelerator `.vscode/mcp.json`. This docs repo also configures an Astro Docs MCP server for website maintenance.

**Member** — A Leaderboard App role (`member` in SWA). Members can view the
leaderboard, see their own team's score breakdown, register their attendee
profile, and submit scores for their own team. Compare with **Admin**.

## P

**Persona** — A historical display name or icon associated with an agent. Use the exact agent identifier, such as `02-Requirements`, for workflow instructions.

**Platform Engineering** — The discipline of designing and building
standardized, self-service toolchains and workflows that enable infrastructure
delivery at scale. In this MicroHack, teams apply platform engineering practices
— IaC templates, governance policies, and Well-Architected patterns — accelerated
by GitHub Copilot.

## S

**Scoring** — WAF-aligned evaluation of microhack submissions. Base score is
105 points across eight scored categories plus up to 25 bonus points for advanced features
like zone redundancy and private endpoints.

**Skill** — Reusable instructions under `.github/skills/*/SKILL.md`. Invocation flags determine whether a skill can load automatically or requires explicit invocation.

**Submission** — A score payload submitted by a team member through the
Leaderboard App. Submissions enter a `Pending` state and must be approved
by an admin before they affect the published leaderboard.

**Subagent** — A bounded helper used by an owning agent for a permitted task such as validation or preview. Main agents such as `10-Challenger` are human-selected and are not helper subagents.


## V

**Validation** — In the Leaderboard App context, the admin review step where
a pending submission is approved or rejected before scores are published.
In the infrastructure context, the `az deployment group validate` or
`bicep build` step that checks template correctness.

## W

**WAF** — Well-Architected Framework. Microsoft's design framework with five
pillars: Security, Reliability, Performance Efficiency, Cost Optimization,
and Operational Excellence.

**What-if** — An Azure deployment preview that shows what resources would be
created, modified, or deleted without actually making changes.
Run via `az deployment group what-if`.
