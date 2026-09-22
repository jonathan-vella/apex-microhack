# Current APEX alignment review

> Review baseline: 2026-09-22. This report compares APEX MicroHack with the current APEX product, published documentation, and Accelerator template. It protects the workshop scenario, eight challenges, timings, points, and scoring.

## Reviewed sources

| Source | Revision | Role |
| --- | --- | --- |
| `jonathan-vella/apex` | `a656e66d83cfae8d525ce0d2012b124599b37252` | Runtime contracts, workflow graph, agents, skills, artifacts, and approval rules |
| `jonathan-vella/apex-docs` | `4bcbb379b9a36d88b896acda75b7c07d71280ab9` | Published guidance and writing conventions for `https://apexops.pro/` |
| `jonathan-vella/apex-accelerator` | `24ce2711b8640d29b0ba3cf0c7f1a94957acec76` | Participant starting template, setup, current agents, models, and MCP configuration |

The pre-refresh MicroHack working-tree diff is preserved in the session artifact `pre-refresh-working-tree.patch`.

## Protected workshop contract

The refresh must preserve the Nordic Fresh Foods scenario, the eight challenge sequence, published durations, point allocations, bonus rules, and scoring totals unless a verified contradiction makes a specific item impossible. Technical guidance may change to represent current APEX accurately.

## Source-backed workflow mapping

| MicroHack stage | Current APEX contract | Required content action |
| --- | --- | --- |
| Setup | Create from `jonathan-vella/apex-accelerator`; open through WSL and the dev container; review initialization and Azure setup side effects | Replace the retired template name and old docs URLs. Explain that `npm run setup` can create identities, role assignments, federated credentials, and GitHub configuration. |
| Challenge 1 | `02-Requirements` produces `01-requirements.md` and the SKU manifest; `10-Challenger` performs the required comprehensive review; the participant approves the handoff | Add Challenger review and an explicit requirements approval checkpoint. |
| Challenge 2 | `03-Architect` produces architecture and cost artifacts; architecture and cost-feasibility reviews are separate; the participant approves architecture | Add independent review evidence and approval language without changing the challenge duration or score. |
| Challenge 3 | Optional `04-Design`; `04g-Governance`; governance reconciliation; `05-IaC Planner`; plan review and approval; track-specific CodeGen; deterministic validation; explicit deployment authorization; track-specific Deploy | Reframe the existing implementation challenge as a compressed workshop path through the current lifecycle. Do not imply that one agent autonomously runs all main agents. |
| Challenge 4 | Requirement change returns to affected upstream steps and requires revised evidence, reviews, and approvals | Present the DR curveball as controlled change and revalidation, not an out-of-band patch. |
| Challenge 5 | Load-test evidence is workshop-specific validation that must retain observed results and limits | Keep the challenge, connect its evidence to later as-built documentation, and avoid claiming that infrastructure deployment proves application health. |
| Challenge 6 | `08-As-Built` documents observed deployment state, verification, unresolved issues, and drift | Update artifact names and require evidence from the deployed environment. |
| Challenge 7 | `09-Diagnose` is a standalone diagnostic agent and does not replace workflow approvals | Keep diagnostics focused on evidence and current state. |
| Challenge 8 | Team presentation | Require teams to explain decisions, review findings, approvals, evidence, deployment results, and unresolved risks. |

## High-priority findings

| ID | Severity | Finding | Evidence | Primary surfaces |
| --- | --- | --- | --- | --- |
| A-01 | Blocker | The MicroHack directs participants to the retired `azure-agentic-infraops-accelerator` repository. Current APEX uses `apex-accelerator`. | Current APEX README, APEX Docs quickstart, Accelerator README | README, setup, beginner setup, invitation, agenda, facilitator guide, glossary, issue templates |
| A-02 | Major | Three participant links still point to the retired GitHub Pages documentation path. | `setup.md` and `copilot-guide.md` | Setup and Copilot guide |
| A-03 | Major | The setup content says Copilot Business or Enterprise is mandatory and that other plans are incompatible. Current APEX guidance says to verify current plan entitlements and organization model policy instead of assuming those plans are always required. | APEX Docs quickstart; Accelerator prerequisites | Setup, getting started, invitation, Copilot guide, glossary, facilitator guide |
| A-04 | Major | The MicroHack lists old model families and versions. Current Accelerator agent frontmatter uses MAI-Code-1.1-Flash and GPT-5.6 Sol/Terra/Luna selections. Hard-coded model lists will drift. | Accelerator `.github/agents/**` | Setup, facilitator readiness checks |
| A-05 | Major | The Copilot guide says the workshop has eight agents but lists more than eight and omits current main agents such as `10-Challenger` and `11-Context Optimizer`. | Current Accelerator agent inventory | Copilot guide, quick reference, glossary |
| A-06 | Blocker | The guide describes the Orchestrator and agents as an autonomous chain and says agents invoke main workflow work automatically. Current APEX requires human selection of main agents and explicit approval of handoffs. | APEX workflow docs and `AGENTS.md` | Copilot guide, challenge transitions, facilitator guide |
| A-07 | Blocker | Required Challenger reviews are absent from MicroHack guidance. Current APEX requires reviews for Requirements, Architecture plus cost feasibility, Governance when constraints exist, and the IaC Plan. | Workflow graph and APEX workflow docs | Challenges 1-4, quick reference, facilitator rubric and checkpoints |
| A-08 | Major | Human approval gates are not consistently shown between requirements, architecture, governance, planning, code validation, and deployment. | Workflow graph | Challenge guides, workflow diagrams, facilitator guide |
| A-09 | Major | MCP documentation describes the old server set. The current Accelerator config contains GitHub, Azure Resource Manager with Cost Management/Pricing, and Azure MCP servers. | Accelerator `.vscode/mcp.json` | Setup, Copilot guide, facilitator readiness checks |
| A-10 | Major | Setup presents `npm run setup` as routine initialization without first explaining its cloud and repository side effects. | APEX Docs quickstart and Azure setup guidance | Setup and facilitator guide |
| A-11 | Major | The seven-step label is still usable, but current guidance must also represent optional Design, Governance Step 3.5, review gates, dual IaC tracks, and deployment authorization. | Workflow graph | Copilot guide, quick reference, glossary, agenda, facilitator guide |
| A-12 | Minor | Setup has duplicate step numbering for two Step 6 sections. | MicroHack setup | Setup |
| A-13 | Major | Skill names and explanations predate the current single `apex-` prefix and blur agents, skills, helper subagents, and human handoffs. | APEX skill catalog and style guide | Copilot guide, glossary, quick reference |
| A-14 | Major | Existing review artifacts claim clean validation against an older content baseline and must not be treated as evidence that current APEX alignment is complete. | `tmp/content-graph-and-review.md` and current source comparison | Review process and future validation notes |

## Editorial and implementation order

1. Fix entry blockers: template links, published documentation links, license/model claims, and setup side-effect language.
2. Teach the human-selected workflow, Challenger reviews, and approval gates before Challenge 1.
3. Align each challenge while preserving its workshop contract.
4. Reconcile guides, reference content, facilitator guidance, scoring, and governance documentation.
5. Apply the manually invoked MicroHack Unslop skill after technical verification.
6. Run link, build, scoring, workflow-name, artifact-name, and participant-journey checks.

## Known workshop adaptations

- The one-day event compresses a production workflow that may take longer in real projects.
- Challenges 5, 7, and 8 are workshop stages rather than numbered APEX workflow steps.
- The DR curveball is an instructional change event layered onto the APEX lifecycle.
- Timings and points measure workshop performance, not APEX product execution guarantees.

These adaptations should be stated plainly where participants could otherwise mistake them for product contracts.
