---
title: Setup Guide
description: Canonical pre-event readiness guide for setup, quota, costs, and cleanup
sidebar:
  order: 2
---

<!-- markdownlint-disable MD033 -->

> Canonical pre-event readiness page for APEX MicroHack participants.

---

## Who This Is For

- **Participants**: Complete this page before event day so your team can start on time.
- **Team leads**: Use it to confirm your team's subscription, quota, and cleanup ownership.
- **Self-guided learners**: Follow the same steps if you are exploring the workshop outside a live event.

:::caution

Your working repository must be created from the [APEX Accelerator template](https://github.com/jonathan-vella/apex-accelerator), not from this documentation repository. If you cloned this repo directly, you have the wrong starting point.

:::

---

## Critical Blockers at a Glance

If any item below fails, your team is not ready to participate:

- The VS Code Copilot harness, an allowed model, or the Accelerator custom agents are unavailable.
- A required native task or independent review cannot run, or its actual result cannot be recorded.
- The Accelerator's GitHub or Azure MCP server does not load or authenticate where required.
- No Azure subscription with the required access is assigned.
- More than one team is trying to share the same subscription.
- Not enough quota in `swedencentral`.
- A Dev Container that does not open successfully.

Resolve blockers before event day. Do not treat them as day-of issues.

---

## Prerequisites

### GitHub Copilot access and model policy

:::caution

APEX requires GitHub Copilot Chat in VS Code, an organization-permitted model, and access to the Accelerator's custom agents and tools. Copilot plans and organization policies change, so do not assume that only Business or Enterprise plans are compatible. Check the current [GitHub Copilot plan entitlements](https://docs.github.com/en/copilot/get-started/plans) and your organization's model policy.

:::

Before the event:

1. Sign in to GitHub in VS Code with the account you will use during the workshop.
2. Open a new Copilot Chat and select **Copilot** in the **Session Target** control before your first prompt. The model you select is separate from the [agent harness](https://code.visualstudio.com/docs/agents/run/agent-harnesses).
3. Open an Accelerator-derived repository and confirm its interactive custom agents appear.
4. Confirm your account and organization allow the selected model and the required agent and native task tools. Complete the bounded task and review check in setup step 9.

Current agent definitions do not pin models. Leave per-role model, effort, and context overrides unset unless an explicitly requested, supported choice is needed.

### MCP server access

:::caution

The workshop uses the MCP configuration in the current APEX Accelerator. Confirm that your GitHub and Azure policies allow those declared servers and that each server can authenticate. Do not rely on an old fixed server list or assume that an organization-wide **Allow all** policy is the only valid configuration.

:::

The [reviewed Accelerator configuration](https://github.com/jonathan-vella/apex-accelerator/blob/68c15fc006b960f0266c28f6fda9f676b9aebbbe/.mcp.json) declares:

| MCP server | Purpose |
|---|---|
| `github` | Repository context and permitted GitHub tools |
| `azure-mcp` | Azure tools, including retail pricing and resource context |

Inspect the root `.mcp.json` in your template-derived repository; its portable format uses `mcpServers`. The `astro-docs` server in this documentation repository is only for maintaining the site and is not part of the participant toolchain.

Azure MCP provides retail pricing for estimates. Actual historical spend and forecasts use authenticated Azure Cost Management REST calls through `az rest`, not a separate hosted MCP prerequisite.

Current APEX reference: [MCP server integration](https://apexops.pro/concepts/how-it-works/mcp-integration/).

### Azure subscription and access

:::caution

This is a bring-your-own-subscription event. Azure is required because teams deploy real infrastructure, validate quota, apply governance constraints, and clean up real resources.

:::

| Subscription type | Compatible |
|---|---|
| Azure in CSP | Yes |
| Enterprise Agreement (EA) | Yes |
| Pay As You Go | Yes |
| Visual Studio subscription | Yes |
| Azure Free Account (with credit card) | Yes |
| **Azure Pass** | **No** |

- **One Azure subscription per team** is the only supported model. Shared subscriptions are not supported.
- **Owner** is the preferred role because facilitators may need to deploy Azure Policy assignments for governance challenges.
- If your organization restricts Owner, confirm with your facilitator whether **Contributor** plus **Resource Policy Contributor** is accepted for your event.
- Your subscription must have enough quota in `swedencentral`. See [Quota and Estimated Costs](#quota-and-estimated-costs).

Verify with:

```bash
az login
az account show --output table
```

### Core tools

:::caution

Before installing WSL or Docker, confirm the partition where they will be installed has at least **150GB of free disk space**. Insufficient space can cause installation failures or interrupt the workshop Dev Container build.

:::

<details>
<summary>Docker-compatible container runtime</summary>

Use a local container runtime for the workshop Dev Container.

- **Windows or macOS**: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Linux**: [Docker Engine](https://docs.docker.com/engine/install/)
- Alternatives if Docker Desktop is not an option: [Rancher Desktop](https://rancherdesktop.io/), [Podman Desktop](https://podman-desktop.io/), or [Colima](https://github.com/abiosoft/colima)

Verify with:

```bash
docker --version
```

</details>

<details>
<summary>Visual Studio Code on the host</summary>

Install a current stable [VS Code](https://code.visualstudio.com/) release. Check the build tested for your event with your facilitator, or record the build you test for self-guided work. Confirm the capabilities in the participation gate; no numerical minimum is established here. Install the host extensions below before opening the container:

| Extension | ID | Why it matters |
|---|---|---|
| Dev Containers | `ms-vscode-remote.remote-containers` | Required to open any Dev Container |
| GitHub Copilot Chat | `github.copilot-chat` | Handles host-side sign-in and licensing |

Install both at once:

```bash
code --install-extension ms-vscode-remote.remote-containers
code --install-extension github.copilot-chat
```

Extensions such as Bicep, Azure CLI Tools, PowerShell, and Azure Resource Groups are installed automatically from the Dev Container definition.

</details>

<details>
<summary>Azure CLI, PowerShell 7, and Git</summary>

These tools are preinstalled inside the Dev Container. Install them locally only if you plan to work outside the container.

- Azure CLI: [install instructions](https://learn.microsoft.com/cli/azure/install-azure-cli)
- PowerShell 7: [install instructions](https://learn.microsoft.com/powershell/scripting/install/installing-powershell)
- Git: [git-scm.com](https://git-scm.com/)

Recommended checks:

```bash
az version
pwsh --version
git --version
```

</details>

### Network access

Ensure your network allows outbound HTTPS to the following services:

| Service | Domains |
|---|---|
| GitHub | `github.com`, `api.github.com` |
| GitHub Copilot and GitHub MCP | `copilot.github.com`, `api.githubcopilot.com`, `*.githubusercontent.com` |
| Azure | `*.azure.com`, `*.microsoft.com`, `login.microsoftonline.com` |
| Microsoft Learn documentation | `learn.microsoft.com` |
| Azure resource and retail pricing tools | Azure management and pricing endpoints permitted by your organization |
| Terraform registry | `registry.terraform.io` |
| Docker | `docker.io`, `registry-1.docker.io` |

---

## Event Baseline

Before the event, the facilitator or self-guided owner should record the reviewed Accelerator source revision, the team repository revision, tested VS Code build and Copilot harness, host/container path, model and MCP access, and the IaC tracks offered. Compare each team repository with that baseline: creating a repository from a template does not pin it to the earlier reviewed source revision. The source reviewed for this guide is [Accelerator `68c15fc`](https://github.com/jonathan-vella/apex-accelerator/tree/68c15fc006b960f0266c28f6fda9f676b9aebbbe).

## Participation Gate

:::tip

Run this gate before the event starts. Every item below is a true blocker.

:::

| # | Check | How to verify | Why it blocks |
|---|---|---|---|
| 1 | **Copilot harness** | Copilot Chat opens with the **Copilot** session target selected | A model choice alone does not establish the required harness |
| 2 | **Agents and model access** | Required interactive agents appear and the selected model is allowed by account and organization policy | A blocked agent or model stops its workflow step |
| 3 | **Native task and reviewer** | Complete the bounded rehearsal in step 9 and inspect the actual task and recorded independent review result | An agent appearing in the picker does not prove delegation or review works |
| 4 | **Configured MCP servers** | `github` and `azure-mcp` in root `.mcp.json` load and authenticate where required | Workflow steps need repository and Azure tools |
| 5 | **Azure subscription with required access** | `az login && az account show` works and the target permissions are confirmed | You cannot deploy or validate infrastructure without it |
| 6 | **One subscription per team** | Confirm with your facilitator or team lead | Shared subscriptions are not supported |
| 7 | **Quota in `swedencentral`** | `az vm list-usage -l swedencentral -o table` | Insufficient quota blocks deployment |
| 8 | **Dev Container opens successfully** | `F1` -> `Dev Containers: Reopen in Container` | All challenge work happens inside the container |

:::caution

If any gate item fails, resolve it before the event or contact your facilitator immediately.

:::

---

## Setup Steps

:::tip

Complete all steps below before event day. Steps 1-3 create, build, and initialize the repository and should not be left until the morning of the workshop.

:::

<details>
<summary>1. Create your working repository</summary>

:::tip

**New to GitHub or WSL?** Follow the [Beginner Setup (Windows)](../beginner-setup/) walkthrough for a step-by-step guide with screenshots. The instructions below are the CLI-based path.

:::

1. Go to the [APEX Accelerator template](https://github.com/jonathan-vella/apex-accelerator)
2. Click **Use this template** -> **Create a new repository**
3. Choose an owner, give the repository a name, select **Private**, and click **Create repository**
4. Clone your new repository. Replace the example owner and repository name:

```bash
git clone https://github.com/YOUR-OWNER/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

5. **Before opening VS Code or starting the container**, choose the appropriate host launch path:

   - **Microsoft employees:** connect to the approved corporate network or VPN as required, fully close existing VS Code windows, and run the launcher from the repository root on the host. On Windows PowerShell:

     ```powershell
     .\.devcontainer\open-microsoft.ps1
     ```

     On Linux, macOS, or WSL:

     ```bash
     bash .devcontainer/open-microsoft.sh
     ```

     Use the launcher again for each fresh VS Code process. Do not run it inside a container or VS Code terminal.
   - **Everyone else:** skip the Microsoft launcher. Configure any [organization-approved package sources](https://github.com/jonathan-vella/apex-accelerator/blob/68c15fc006b960f0266c28f6fda9f676b9aebbbe/.devcontainer/README.md#package-sources) on the host before opening VS Code, then run `code .`.

When VS Code opens, accept the **"Reopen in Container"** prompt. Do not disable TLS checks or bypass an approved feed if a package is unavailable; resolve the feed issue with your organization.

</details>

### Dev Container

<details>
<summary>2. Pull and build the Dev Container</summary>

:::caution

Do this before the event. The initial image pull and build takes several minutes and requires a reliable network connection.

:::

The reviewed participant container uses digest-pinned **Azure Linux 4 preview**. On Windows, Ubuntu in WSL is the host environment; it does not change the container's operating system.

1. Press `F1` → run `Dev Containers: Reopen in Container`
2. Wait for the container to build (watch progress in the terminal)
3. Once complete, verify the core tools:

```bash
az version
bicep --version
pwsh --version
```

If you first adopt a host launcher or change build-time package feeds, fully close VS Code, relaunch with the approved settings, and run `Dev Containers: Rebuild Container`. Reopening or restarting alone does not apply those build settings. Check the package-source labels in the startup output.

:::note[Codespaces]

The local Dev Container is the primary path. Codespaces has not been separately validated for the reviewed template; an event must verify it independently before offering it as an alternative.

:::

</details>

<details>
<summary>3. Initialize your repository</summary>

After the Dev Container starts, run the initialization commands from the repository root:

```bash
npm install
npm run init
npm run sync:workflows
```

| Command | Purpose |
|---|---|
| `npm install` | Installs Node.js dependencies for validation scripts and linting. |
| `npm run init` | Replaces accelerator-template references with your repository URL. Run `npm run init -- --dry-run` first if you want to preview changes. |
| `npm run sync:workflows` | Previews the upstream APEX consumer GitHub Actions workflow changes; it does not apply them by default. |

If the event owner has reviewed an APEX commit and workflow updates are needed, replace the placeholder below with that commit and review its preview before applying:

```bash
npm run sync:workflows -- --dry-run --ref "<reviewed-apex-commit>"
npm run sync:workflows -- --apply --ref "<reviewed-apex-commit>"
```

This command updates consumer workflows, not the agents or root MCP configuration. Update those separately through a reviewed template or upstream change; do not assume workflow sync brings an older repository to the event baseline.

:::note

Dependencies declared by the current Accelerator are installed by its Dev Container setup. Do not install packages from an older MCP configuration unless the checked-out template requires them.

:::

Review and commit the initialization changes:

```bash
git --no-pager diff
git add -A && git commit -m "chore: initialize from template"
git push
```

:::note[Expected diff]
Initialization may change `AGENTS.md` and `CONTRIBUTING.md`. An explicitly applied workflow update may also change files in `.github/workflows/`; the default sync preview does not. Review all changes before committing.

Use `git --no-pager diff` to avoid the `less` pager. If you see a `:` prompt, press `q` to exit or `Space` to scroll.
:::

</details>

<details>
<summary>4. Set up Azure automation</summary>

Review the [Azure Setup documentation](https://apexops.pro/getting-started/azure-setup/) before running this command. The setup workflow can create an Entra ID application, federated credentials, role assignments, GitHub secrets, and repository variables. Confirm the target tenant, subscription, management group, repository, and required permissions first.

Everyone on the team participates in setup, but mutations must be serialized. From the
exact repository created from the APEX Accelerator template and its working directory,
name one participant as the current setup owner. Teammates observe the run, verify the
target tenant, subscription, management group, repository, and permissions, and record
the output before another participant takes ownership.

`npm run setup` can overwrite GitHub secrets and OIDC-related values, including
`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_SUBSCRIPTION_ID`. Do not run it
concurrently from multiple clones or accounts. If the target or permissions are unclear,
stop and escalate to the facilitator.

When your team and facilitator have authorized those changes, run:

```bash
az login
npm run setup
```

The workflow reports the cloud and repository configuration it creates. Review its output and resulting repository changes. Idempotent behavior does not make the command a harmless prerequisite check. Preserve
the command output and resulting repository changes as evidence.

Use the same Azure Setup page for headless mode, manual setup steps, and troubleshooting.

</details>

:::caution

The event-specific subscription model and governance policies below are MicroHack
constraints, not generic APEX prerequisites. Participants use one Azure subscription
per team, with Sweden Central quota and facilitator-managed policy assignments.

:::

<details>
<summary>5. Allow GitHub Actions to create pull requests</summary>

The maintenance workflows open pull requests automatically when they detect drift.
This requires one permission change in your repository settings before you trigger them.

1. Open your repository on GitHub.
2. Go to **Settings → Actions → General**.
3. Scroll to **Workflow permissions**.
4. Check **Allow GitHub Actions to create and approve pull requests**.
5. Click **Save**.

:::caution[Required before running workflows]
GitHub disables this by default on all new repositories. Without it, any workflow
that opens a PR will fail with:
`GitHub Actions is not permitted to create or approve pull requests`
:::

</details>

<details>
<summary>6. Run the maintenance workflows</summary>

After Azure setup completes, trigger the two scheduled maintenance workflows once so your repository has a fresh baseline before the event. Both run weekly on Mondays after this initial seed.

```bash
gh workflow run "Weekly Maintenance"
gh workflow run "Governance Policy Baseline"
```

| Workflow | Purpose | Schedule |
|---|---|---|
| **Weekly Maintenance** | Checks the pinned Azure MCP release, refreshes the AVM module index, and tracks Azure service deprecations. | Mondays 06:00 UTC |
| **Governance Policy Baseline** | Collects effective Azure Policy assignments (including management-group inheritance) from your subscription so the IaC planner consumes real governance constraints. Requires step 4 to be complete. | Mondays 05:00 UTC |

The [reviewed workflow](https://github.com/jonathan-vella/apex-accelerator/blob/68c15fc006b960f0266c28f6fda9f676b9aebbbe/.github/workflows/weekly-maintenance.yml) contains those three maintenance jobs. The template README also mentions documentation/orphan audits and link checks, but they are not jobs in that reviewed workflow; inspect your event revision before relying on them.

Verify both runs succeeded:

```bash
gh run list --workflow "Weekly Maintenance" --limit 1
gh run list --workflow "Governance Policy Baseline" --limit 1
```

Each run may open a pull request when it detects drift (new AVM module versions, policy changes, deprecated services). Review and merge those PRs as they appear — they are never auto-merged.

</details>

<details>
<summary>7. Sign in to Azure for workshop deployments</summary>

```bash
az login
az account set --subscription "<your-subscription-id>"
az account show --query "{Name:name, SubscriptionId:id, TenantId:tenantId}" -o table
```

</details>

<details>
<summary>8. Confirm custom agents</summary>

The current Accelerator includes the custom agent files and workspace configuration. In VS Code Copilot Chat:

1. Confirm agents such as `01-Orchestrator`, `02-Requirements`, and `03-Architect` appear in the agent picker.
2. If they are missing, confirm that you opened the template-derived repository in its Dev Container and reload the window.
3. Do not enable legacy discovery settings as a substitute for loading the current repository configuration.

</details>

<details>
<summary>9. Verify harness, model, tools, and review</summary>

1. In VS Code Copilot Chat, choose the **Copilot** session target and an organization-permitted model. Confirm `01-Orchestrator` and a directly selectable domain agent are available.
2. From the Accelerator repository root, run its static configuration checks:

   ```bash
   npm run lint:mcp-config
   npm run validate:agent-registry
   ```

3. In Chat, open **Open Customizations → MCP Servers** and check or start `github` and `azure-mcp` from root `.mcp.json`. Review trust and authenticate where needed, then exercise the required tools. See [managing MCP servers](https://code.visualstudio.com/docs/agents/run/manage-mcp-servers). Static checks do not prove that the servers or native tools work.
4. With your facilitator or as a self-guided owner, run a small, bounded Requirements rehearsal in a separate project without deploying or changing Azure resources. Ask `01-Orchestrator` to delegate the task; confirm the actual native task result and the independent review result are recorded. Do not treat a greeting or an agent-picker entry as proof of delegation.
5. Stop before approving later stages or any deployment. If a capability fails, preserve the error and follow [native task and review troubleshooting](../../reference/troubleshooting/#native-task-or-independent-review-fails).

These are pre-event instructions for your own environment, not a claim that the rehearsal has already been run.

</details>
<details>
<summary>10. Verify your toolchain</summary>

Verify the core tools manually:

```powershell
az version
bicep --version
node --version
npm --version
gh --version
```

</details>

<details>
<summary>11. Start the workflow</summary>

Open Copilot Chat (`Ctrl+Alt+I`), select the **Copilot** session target, and choose `01-Orchestrator` to coordinate the workflow. You can also select a domain agent directly for a bounded task. To start with the Orchestrator, prompt it with:

```text
Start a new project named freshconnect using the Nordic Fresh Foods scenario.
Coordinate the Requirements task and ask us for any missing decisions. Do not deploy.
```

The Orchestrator delegates bounded work to the owning agents using native tasks. Required reviews use the shared independent reviewer; the owner or authorized parent records its actual findings. If a delegated owner cannot launch a nested review, the Orchestrator can relay it as an independent sibling task. `10-Challenger` remains an optional interactive wrapper. Review the evidence and decide each human stage gate. Approval can continue to the next owner in the same chat or pause with a resume command; it does not authorize deployment.

1. **Requirements** — `02-Requirements` creates requirements and the initial SKU manifest for independent review before approval.
2. **Architecture** — `03-Architect` creates architecture and cost evidence. Architecture and cost feasibility receive separate reviews before approval.
3. **Design (optional)** — `04-Design` creates diagrams or decision records when they help explain the architecture.
4. **Governance (Step 3.5)** — `04g-Governance` discovers effective policy constraints and reconciles them before planning.
5. **IaC planning** — `05-IaC Planner` creates the implementation plan and machine-readable contracts. Resolve blocking independent review findings before approval.
6. **Code generation** — the selected `06b-Bicep CodeGen` or `06t-Terraform CodeGen` owner produces code, validation evidence, and `05-iac-handoff.json`.
7. **Deployment** — separately authorize `07b-Bicep Deploy` or `07t-Terraform Deploy` for the current preview and exact Azure scope.
8. **As-built documentation** — `08-As-Built` records observed results, verification limits, and unresolved issues.

The MicroHack scores this work as eight workshop challenges. Challenges 5, 7, and 8 are workshop stages rather than numbered APEX workflow steps, and Challenge 4 deliberately sends the team back through affected decisions and approvals.
Workflow artifacts are written to `agent-output/{project}/` as you complete each step.

After an approved pause or interruption, enter `/apex-workflow-start resume freshconnect` in Copilot Chat. `00-handoff.md` is a recovery summary, not an approval; preserve existing review history and never hand-edit session state to force progress.

</details>

---

## Ready-to-Start Check

Use this quick check after you finish setup steps:

- [ ] My repository was created from the current APEX Accelerator, not from the docs repo.
- [ ] The Dev Container opens and the terminal tools load correctly.
- [ ] Repository initialization is complete and any workflow updates were previewed and reviewed.
- [ ] The team reviewed the side effects of `npm run setup` and completed only the authorized Azure and GitHub configuration.
- [ ] The **Weekly Maintenance** and **Governance Policy Baseline** workflows have been triggered at least once and completed successfully.
- [ ] `az account show` works inside the container.
- [ ] The **Copilot** session target, required agents, and an organization-permitted model are available.
- [ ] A bounded native task and its independent review produced actual recorded results in the readiness rehearsal.
- [ ] `github` and `azure-mcp` in root `.mcp.json` load and authenticate where required.
- [ ] My team has exactly one Azure subscription assigned.
- [ ] My team knows who will own cleanup at the end of the event.

---

## Quota and Estimated Costs

:::caution

Verify subscription quota before the microhack. Quota issues are one of the most common reasons teams lose time.

:::

<details>
<summary>Per-team resource profile</summary>

| Resource type | Quantity | SKU or tier | Region |
|---|---|---|---|
| Resource groups | 1-2 | N/A | Sweden Central |
| App Service plan | 1 | P1v4 or S1 | Sweden Central |
| App Services | 1-2 | N/A | Sweden Central |
| Azure SQL server | 1 | N/A | Sweden Central |
| Azure SQL database | 1 | S0 or Basic | Sweden Central |
| Storage accounts | 1-2 | Standard_LRS | Sweden Central |
| Key Vault | 1 | Standard | Sweden Central |
| Application Insights | 1 | N/A | Sweden Central |
| Log Analytics workspace | 1 | Per-GB | Sweden Central |

</details>

<details>
<summary>Optional Challenge 4 disaster recovery resources</summary>

| Resource type | Quantity | SKU or tier | Region |
|---|---|---|---|
| Resource groups | 1 | N/A | Germany West Central |
| App Service plan | 1 | P1v4 or S1 | Germany West Central |
| App Services | 1 | N/A | Germany West Central |
| Azure SQL database replica | 1 | S0 or Basic | Germany West Central |
| Storage account | 1 | Standard_GRS | Sweden Central |

Optional advanced services such as Front Door, Application Gateway, WAF, or Traffic Manager may increase quota and spend if your team chooses them.

</details>

<details>
<summary>Check quota and request increases</summary>

Use the Azure portal search for **Quotas**, filter by region, and review the resource families your team expects to deploy.

Useful CLI checks:

```bash
az vm list-usage --location swedencentral --output table
az storage account list --query "length(@)"
```

Common issues:

| Issue | Response |
|---|---|
| "Subscription not registered" | `az provider register --namespace Microsoft.Web` |
| "Quota exceeded" | Request an increase in Azure portal → Quotas |
| "Region not available" | Confirm with your facilitator before changing regions |
| "SKU not available in region" | Pick an approved alternative SKU |

:::caution

Request quota increases at least one week before the event when possible.

:::

</details>

<details>
<summary>Estimated event cost</summary>

| Configuration | Estimated cost for ~8 hours |
|---|---|
| Single team, core path | €5-10 |
| Single team with Challenge 4 DR work | €10-20 |

Delete all event resources immediately after the workshop to avoid unnecessary spend.

</details>

<details>
<summary>Optional pre-event quota smoke test</summary>

```powershell
az login
az account set --subscription "<your-subscription-id>"
az group create --name rg-quota-test --location swedencentral
az group delete --name rg-quota-test --yes --no-wait
```

</details>

---

## Cleanup

:::caution

The team lead is responsible for cleanup. Before leaving the event, delete team resources and confirm cleanup is complete. Do not leave workshop resources running overnight.

:::

Cleanup steps:

1. Delete all resource groups created during the microhack:

   ```bash
   az group delete -n rg-freshconnect-dev-swc --yes --no-wait
   # Repeat for any additional resource groups (e.g., secondary region)
   az group delete -n rg-freshconnect-dev-gwc --yes --no-wait
   ```

2. Ask your facilitator to remove governance policies from the team subscription.
  If you are running the workshop as a facilitator or self-guided owner, use the
  [Governance Scripts](../../reference/governance-scripts/) reference in this docs repo.

3. Verify cleanup is complete:

   ```bash
   az group list --query "[?starts_with(name, 'rg-freshconnect')]" -o table
   # Expected: empty result
   ```

Cleanup must be confirmed before the team leaves the event venue.

---

## Need Help?

- Ask your facilitator if you are blocked on subscription access, policy permissions, or quota approval.
- Use the [Copilot Guide](../../guides/copilot-guide/) for agent and prompt usage during the workshop.
- Use [Troubleshooting](../../reference/troubleshooting/) if your container, Azure auth, or tooling fails.
- Review [Workshop Prep](../workshop-prep/) after setup if you still need the scenario and team-role context.
