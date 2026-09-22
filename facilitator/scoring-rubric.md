# Scoring Rubric

> [!IMPORTANT]
> This file is the **single source of truth** for all scoring values.
> Challenge files, facilitator tooling, and all other docs MUST derive their
> point values and grading rules from this rubric. If another file conflicts
> with this rubric, this file wins.

> **105-point base + 25 bonus** | WAF-aligned | Scored by facilitators using the rubric

> **Note**: Challenge 8 (Team Showcase) is scored by facilitators using the rubric on a 0-10 scale.

## Recommended Scoring Workflow

> [!TIP]
> All scoring is manual. Score directly from this rubric by reviewing team artifacts and verifying deployments.
> If your event package includes HackerBoard or other facilitator tooling, enter the same rubric-based totals
> there after review. The tooling records scores; it does not calculate them.

1. Review each team's deliverables under `agent-output/{team}/` and `infra/bicep/{team}/` or `infra/terraform/{team}/`.
2. Validate deployment and bonus criteria in the Azure portal or CLI where needed.
3. Record the Team Showcase score during the presentation.
4. Keep the final totals in your chosen leaderboard tool or facilitator worksheet.

---

## Scoring Overview

| Category                | Points  | Review Method |
| ----------------------- | ------- | ------------- |
| Requirements & Planning | 20      | Manual: review artifact |
| Architecture Design     | 25      | Manual: review artifact |
| Implementation Quality  | 25      | Manual: review IaC files |
| Deployment Success      | 10      | Manual: verify in Azure Portal/CLI |
| Load Testing            | 5       | Manual: review artifact |
| Documentation           | 5       | Manual: review artifact |
| Diagnostics             | 5       | Manual: review artifact |
| Team Showcase           | 10      | Manual: facilitator scores live |
| **Base Total**          | **105** |               |
| **Bonus Points**        | +25     | Manual: verify in Azure Portal/CLI |
| **Max Total**           | **130** |               |

> [!NOTE]
> Facilitators score manually using this rubric. If your event package includes optional tooling (e.g., HackerBoard), use it to _record_ rubric-based totals; it does not calculate scores automatically.

---

> [!NOTE]
> Current APEX alignment evidence is part of facilitator review. Check required Challenger findings, approvals, governance artifacts, plan contracts, validation, and deployment authorization before accepting a team's workflow claims. These checks do not change the published point totals.

## Detailed Criteria

### 1. Requirements (20 pts)

**Evidence**: `01-requirements.md`, SKU manifest, requirements review findings, and team approval

| Criterion                | Points |
| ------------------------ | ------ |
| Project context complete | 4      |
| Functional requirements  | 4      |
| NFRs (SLA, RTO, RPO)     | 4      |
| Compliance identified    | 4      |
| Budget stated            | 4      |

### 2. Architecture (25 pts)

**Evidence**: architecture assessment, cost estimate, separate architecture and cost review findings, and team approval

| Criterion            | Points |
| -------------------- | ------ |
| Cost estimation      | 5      |
| Reliability patterns | 5      |
| Security controls    | 5      |
| Scalability approach | 5      |
| Service selection    | 5      |

### 3. Implementation (25 pts)

**Evidence**: governance constraints, approved plan and contracts, selected IaC folder, handoff, and validation output

| Criterion          | Points |
| ------------------ | ------ |
| IaC compiles       | 5      |
| IaC lints clean    | 5      |
| Naming conventions | 5      |
| Security hardened  | 5      |
| Modular structure  | 5      |

### 4. Deployment (10 pts)

**Verification**: Azure Portal / CLI

| Criterion              | Points | Notes |
| ---------------------- | ------ | ----- |
| What-If executed       | 2      | Paper-exercise teams: score 0 for deployment criteria |
| Deployment succeeded   | 4      | Paper-exercise teams: score 0 |
| Core resources running | 2      | Paper-exercise teams: score 0 |
| Summary documented     | 2      | Paper-exercise teams: can earn this for documenting what they _would_ deploy |

> [!NOTE]
> **Paper-exercise variant (Challenge 3 deployment failed)**: Teams that pivoted to the paper exercise cannot earn What-If, deployment, or running-resources points. They can still earn the Summary documented point by describing their intended deployment. Implementation quality is still scored against any IaC artifacts they actually produced in Challenge 3; if there is no submitted evidence for an implementation criterion, score that criterion 0. All other categories are scored normally using the artifacts the team did submit.

### 5. Load Testing (5 pts)

**File**: `agent-output/{team}/05-load-test-results.md`

| Criterion          | Points |
| ------------------ | ------ |
| Test executed      | 2      |
| Targets documented | 1      |
| Results analyzed   | 2      |

### 6. Documentation (5 pts)

**Files**: `agent-output/{team}/07-operations-runbook.md` and at least one additional `07-*.md` document generated by `08-As-Built`

| Criterion                 | Points |
| ------------------------- | ------ |
| Operations guide complete | 2      |
| Architecture documented   | 2      |
| Clear formatting          | 1      |

### 7. Diagnostics (5 pts)

**File**: `agent-output/{team}/07-diagnostics-quick-card.md` (primary)
or `agent-output/{team}/07-ab-diagnostics-runbook.md` (bonus depth)

| Criterion                    | Points |
| ---------------------------- | ------ |
| Troubleshooting steps clear  | 2      |
| Monitoring queries included  | 2      |
| Incident response documented | 1      |

### 8. Team Showcase (10 pts)

**Scoring method**: Facilitators score this criterion using the rubric on a 0-10 scale

| Criterion               | Points |
| ----------------------- | ------ |
| Technical communication | 3      |
| Stakeholder engagement  | 2      |
| Solution justification  | 2      |
| Team collaboration      | 2      |
| Active listening        | 1      |

---

## Bonus Points (+25 max)

| Enhancement        | Points | Verification                          |
| ------------------ | ------ | ------------------------------------- |
| Zone Redundancy    | +5     | P1v3+ SKU, `zoneRedundant: true` (or Terraform equivalent) |
| Private Endpoints  | +5     | PE resources in Bicep                 |
| Multi-Region DR    | +10    | Resources in 2+ regions               |
| Managed Identities | +5     | SystemAssigned, no connection strings |

---

## Score Sheet

| Team | Req | Arch | Impl | Deploy | Load | Docs | Diag | Show | Bonus | Total |
| ---- | --- | ---- | ---- | ------ | ---- | ---- | ---- | ---- | ----- | ----- |
| 1    | /20 | /25  | /25  | /10    | /5   | /5   | /5   | /10  |       | /105  |
| 2    | /20 | /25  | /25  | /10    | /5   | /5   | /5   | /10  |       | /105  |
| 3    | /20 | /25  | /25  | /10    | /5   | /5   | /5   | /10  |       | /105  |
| 4    | /20 | /25  | /25  | /10    | /5   | /5   | /5   | /10  |       | /105  |

---

## Grading Scale

Percentage is calculated from the 105-point base score.
Bonus points are additive to the total but do not affect the grade tier.

| Percentage | Grade                |
| ---------- | -------------------- |
| ≥90%       | 🏆 OUTSTANDING       |
| ≥80%       | 🥇 EXCELLENT         |
| ≥70%       | 🥈 GOOD              |
| ≥60%       | 🥉 SATISFACTORY      |
| <60%       | 📚 NEEDS IMPROVEMENT |

---

## Award Categories (Optional)

| Award                | Criteria         |
| -------------------- | ---------------- |
| 🏆 Best Overall      | Highest total    |
| 🛡️ Security Champion | Best security    |
| 💰 Cost Optimizer    | Best efficiency  |
| 📐 Best Architecture | Most WAF-aligned |
| 🚀 Speed Demon       | First to deploy  |
