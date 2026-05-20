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

Your working repository must be created from the [azure-agentic-infraops-accelerator template](https://github.com/jonathan-vella/azure-agentic-infraops-accelerator), not from this documentation repository. If you cloned this repo directly, you have the wrong starting point.

:::

---

## Critical Blockers at a Glance

If any item below fails, your team is not ready to participate:

- No GitHub Copilot Business or Enterprise license.
- Required Copilot models are unavailable in the model picker.
- GitHub MCP server access is restricted instead of set to **Allow all**.
- No Azure subscription with the required access.
- More than one team trying to share the same subscription.
- Not enough quota in `swedencentral`.
- A Dev Container that does not open successfully.

Resolve blockers before event day. Do not treat them as day-of issues.

---

## Prerequisites

### GitHub Copilot Business or Enterprise

:::caution

APEX requires a **GitHub Copilot Business or Enterprise** license. Other SKUs do not include the required functionality. Required model access and unrestricted MCP server access are also mandatory. See [GitHub Copilot Plans](https://github.com/features/copilot/plans).

:::

| Plan | Custom agents | Compatible |
|---|---|---|
| Copilot Free | No | No |
| Copilot Pro | No | No |
| **Copilot Business** | **Yes** | **Yes** |
| Copilot Pro+ | No | No |
| **Copilot Enterprise** | **Yes** | **Yes** |

Compare plans: [GitHub Copilot Plans](https://github.com/features/copilot/plans)

:::tip

GitHub Copilot can be billed directly through your Azure subscription.
See [GitHub Copilot billing](https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-copilot) for setup instructions.
:::

1. Go to [github.com/settings/copilot](https://github.com/settings/copilot)
2. Confirm your subscription shows **Business** or **Enterprise**.
3. Ensure "Copilot Chat in the IDE" is enabled.
4. Confirm the required models are available in the VS Code Copilot Chat model picker.

Setup guide: [VS Code Copilot Setup](https://code.visualstudio.com/docs/copilot/setup)

#### Required model access

The workshop agents expect access to the following model families and versions:

| Model family | Required access |
|---|---|
| Claude Haiku | Claude Haiku 4.5 or newer |
| Claude Sonnet | Claude Sonnet 4.6 or newer |
| Claude Opus | Claude Opus 4.6 or newer |
| GPT Codex | GPT Codex 5.3 |
| GPT | GPT 5.4 and GPT 5.5 |

If your GitHub organization or enterprise restricts model availability, ask an owner to confirm these models are enabled before the event.

### MCP server access

:::caution

This MicroHack requires GitHub Copilot MCP server access with **Allow all: No restrictions. All MCP servers can be used.** Restricted MCP access blocks the agent workflow.

:::

Organization or enterprise owners should verify the GitHub MCP policy before participants arrive:

1. Open the GitHub Copilot MCP policy settings for the organization or enterprise.
2. Ensure **MCP servers in Copilot** is enabled.
3. Set **Restrict MCP access to registry servers** to **Allow all: No restrictions. All MCP servers can be used.**

GitHub reference: [Configure MCP server access](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-server-access)

This MicroHack uses the MCP servers documented in the
[APEX MCP Server Integration](https://jonathan-vella.github.io/azure-agentic-infraops/concepts/how-it-works/mcp-integration/):

| MCP server | Purpose |
|---|---|
| Azure MCP | RBAC-aware Azure resource, deployment, and policy context |
| Azure Pricing MCP | Cost estimates, SKU discovery, and FinOps data |
| Draw.io MCP | Azure architecture diagrams as `.drawio` files |
| GitHub MCP | Repository operations, issues, pull requests, and code search |
| MS Learn MCP | Official Microsoft and Azure documentation lookup |
| Terraform MCP | Terraform provider and registry lookup for the Terraform track |

The `astro-docs` MCP server configured in this docs repo is only for maintaining this website. Participant work uses the MCP configuration in the accelerator template repo.

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

GitHub Copilot custom agents run inside a Dev Container, so you need a local container runtime.

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

Install [VS Code](https://code.visualstudio.com/) version 1.100 or newer, then install the host extensions below before opening the container:

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
| Microsoft Learn MCP | `learn.microsoft.com` |
| Azure Pricing MCP | `prices.azure.com` |
| Terraform MCP | `registry.terraform.io` |
| Docker | `docker.io`, `registry-1.docker.io` |

---

## Participation Gate

:::tip

Run this gate before the event starts. Every item below is a true blocker.

:::

| # | Check | How to verify | Why it blocks |
|---|---|---|---|
| 1 | **GitHub Copilot Business or Enterprise license** | [github.com/settings/copilot](https://github.com/settings/copilot) shows Business or Enterprise | Custom agents require a GitHub Copilot Business or Enterprise license; other SKUs do not include the required functionality ([plans](https://github.com/features/copilot/plans)) |
| 2 | **Required model access** | VS Code Copilot Chat model picker includes the required Claude and GPT models | Agent prompts depend on the approved model set |
| 3 | **GitHub MCP access set to Allow all** | GitHub Copilot MCP policy allows all MCP servers, and MCP tools appear in agent chat | The MicroHack workflow relies on MCP tools for Azure, GitHub, docs, diagrams, pricing, and Terraform context |
| 4 | **Azure subscription with required access** | `az login && az account show` works | You cannot deploy or validate infrastructure without it |
| 5 | **One subscription per team** | Confirm with your facilitator or team lead | Shared subscriptions are not supported |
| 6 | **Quota in `swedencentral`** | `az vm list-usage -l swedencentral -o table` | Insufficient quota blocks deployment |
| 7 | **Dev Container opens successfully** | `F1` -> `Dev Containers: Reopen in Container` | All challenge work happens inside the container |

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

1. Go to the [azure-agentic-infraops-accelerator template](https://github.com/jonathan-vella/azure-agentic-infraops-accelerator)
2. Click **Use this template** -> **Create a new repository**
3. Choose an owner, give the repository a name, select **Private**, and click **Create repository**
4. Clone your new repository and open it in VS Code:

```bash
git clone https://github.com/<your-org-or-user>/<your-new-repo>.git
cd <your-new-repo>
code .
```

When VS Code opens, accept the **"Reopen in Container"** prompt.

</details>

### Dev Container

<details>
<summary>2. Pull and build the Dev Container</summary>

:::caution

Do this before the event. The initial image pull and build takes several minutes and requires a reliable network connection.

:::

1. Press `F1` → run `Dev Containers: Reopen in Container`
2. Wait for the container to build (watch progress in the terminal)
3. Once complete, verify the core tools:

```bash
az version
bicep --version
pwsh --version
```

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
| `npm run sync:workflows` | Fetches the latest GitHub Actions workflows from the upstream APEX project into `.github/workflows/`. |

:::note

Python dependencies for diagrams, Azure Pricing MCP, and related tools are installed automatically by the Dev Container post-create script. No manual `pip install` is needed.

:::

Review and commit the initialization changes:

```bash
git --no-pager diff
git add -A && git commit -m "chore: initialize from template"
git push
```

:::note[Expected diff]
You will see changes to `AGENTS.md`, `CONTRIBUTING.md`, and one or more `.github/workflows/` files.
You may also see formatting-only changes to `.vscode/mcp.json` — the dev container normalizes its JSON arrays on first start. This is expected and safe to commit.

Use `git --no-pager diff` to avoid the `less` pager. If you see a `:` prompt, press `q` to exit or `Space` to scroll.
:::

</details>

<details>
<summary>4. Set up Azure automation</summary>

Run the setup wizard to configure Azure OIDC authentication, RBAC roles, and GitHub secrets and variables:

```bash
az login
npm run setup
```

The wizard creates an Entra ID app registration, OIDC federated credentials for `main`, `dev`, `staging`, and `prod`, assigns Reader at the management group and Contributor at the subscription, and configures the GitHub secrets and variables. It is idempotent and safe to rerun.

See the [Azure Setup documentation](https://jonathan-vella.github.io/azure-agentic-infraops/getting-started/azure-setup/) for headless mode, manual setup steps, and troubleshooting.

</details>

<details>
<summary>5. Run the maintenance workflows</summary>

After Azure setup completes, trigger the two scheduled maintenance workflows once so your repository has a fresh baseline before the event. Both run weekly on Mondays after this initial seed.

```bash
gh workflow run "Weekly Maintenance"
gh workflow run "Governance Policy Baseline"
```

| Workflow | Purpose | Schedule |
|---|---|---|
| **Weekly Maintenance** | Refreshes the AVM module index, tracks Azure service deprecations, runs the quarterly docs/orphan audit, validates Draw.io tooling, and link-checks docs. | Mondays 06:00 UTC |
| **Governance Policy Baseline** | Collects effective Azure Policy assignments (including management-group inheritance) from your subscription so the IaC planner consumes real governance constraints. Requires step 4 to be complete. | Mondays 05:00 UTC |

Verify both runs succeeded:

```bash
gh run list --workflow "Weekly Maintenance" --limit 1
gh run list --workflow "Governance Policy Baseline" --limit 1
```

Each run may open a pull request when it detects drift (new AVM module versions, policy changes, deprecated services). Review and merge those PRs as they appear — they are never auto-merged.

</details>

<details>
<summary>6. Sign in to Azure for workshop deployments</summary>

```bash
az login
az account set --subscription "<your-subscription-id>"
az account show --query "{Name:name, SubscriptionId:id, TenantId:tenantId}" -o table
```

</details>

<details>
<summary>7. Enable custom agents</summary>

Open VS Code Settings (`Ctrl+,`) and add:

```json
{
  "github.copilot.chat": {
    "customAgentInSubagent": {
      "enabled": true
    }
  }
}
```

</details>

<details>
<summary>8. Verify model and MCP access</summary>

In VS Code Copilot Chat:

1. Open the model picker and confirm the required Claude and GPT models are available.
2. Open any workshop agent, such as `01-Orchestrator`.
3. Confirm the agent tool list includes MCP tools from the accelerator template.
4. If the accelerator repo provides MCP validation, run it from the repo root:

```bash
npm run lint:mcp-config
```

If MCP tools are missing, confirm the GitHub MCP policy is set to **Allow all**, reload VS Code, and check the accelerator repo's `.vscode/mcp.json`.

</details>

<details>
<summary>9. Verify your toolchain</summary>

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
<summary>10. Start the workflow</summary>

Open Copilot Chat (`Ctrl+Alt+I`) and choose the entry point that matches your
working repo:

- If your repository created from the accelerator template includes
  **01-Orchestrator**, you can start there.
- If not, go straight to the specific agent named on each challenge page.

To start with the orchestrator, select **01-Orchestrator** and prompt it with:

```text
Describe the Azure infrastructure project you want to build.
```

The accelerator workflow uses 7 steps with approval gates:

1. **Requirements** — capture what you need
2. **Architecture** — WAF assessment and cost estimate
3. **Design** — diagrams and ADRs (optional)
4. **Planning** — Bicep implementation plan with governance
5. **Code** — AVM-first Bicep templates
6. **Deploy** — Azure provisioning with what-if preview
7. **Documentation** — as-built suite

The microhack scores that same work as 8 challenges. Challenge 4 is the DR
curveball that revisits the delivery path midway through the event, so always
follow the agent and artifact guidance on the active challenge page.

Explore complete sample artifacts in the `agent-output/_sample/` directory (created during the workshop).

</details>

---

## Ready-to-Start Check

Use this quick check after you finish setup steps:

- [ ] My repository was created from the template repo, not from the docs repo.
- [ ] The Dev Container opens and the terminal tools load correctly.
- [ ] Repository initialization commands (`npm install`, `npm run init`, `npm run sync:workflows`) have been completed.
- [ ] Azure automation setup (`npm run setup`) has been completed.
- [ ] The **Weekly Maintenance** and **Governance Policy Baseline** workflows have been triggered at least once and completed successfully.
- [ ] `az account show` works inside the container.
- [ ] The agent dropdown appears in Copilot Chat.
- [ ] The required Claude and GPT models appear in the Copilot Chat model picker.
- [ ] GitHub MCP access is set to **Allow all**, and MCP tools appear for workshop agents.
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
