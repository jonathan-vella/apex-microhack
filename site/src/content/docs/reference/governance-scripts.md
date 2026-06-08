---
title: Governance Scripts
description: Azure Policy governance scripts for workshop environment setup
sidebar:
  order: 2
---


Three PowerShell scripts manage the Azure Policy lifecycle for the microhack event.
All require the **Azure CLI** (`az`) and **PowerShell 7+** (`pwsh`), both pre-installed in the dev container.

:::note

These scripts are **for facilitators only**. Participants do not need to run them.
The scripts live in this documentation repository, not in the participant template repo.

:::

---

## Prerequisites

```bash
pwsh --version
az --version

# Log in and select the target subscription
az login
az account set --subscription "<subscription-id>"

# Confirm the correct subscription is active
az account show --query "{Name:name, Id:id}" -o table
```

You need **Owner** or **Resource Policy Contributor** role on the subscription to create and delete policy assignments.

:::caution

**One subscription per team** is the only supported model. Do not share a subscription across teams — it causes naming collisions and cross-team policy interference.

:::

---

## Running the Scripts

Scripts are located in the [`scripts/`](https://github.com/jonathan-vella/apex-microhack/tree/main/scripts) folder of this repository.

Run from the **repository root**:

```bash
pwsh -File scripts/<script-name>.ps1 -Subscription "<subscription-name-or-id>"
```

Or navigate to the folder first:

```bash
cd scripts
pwsh -File ./Setup-GovernancePolicies.ps1 -Subscription "<subscription-name-or-id>"
```

---

## Script Reference

### 1. Setup-GovernancePolicies.ps1

[View source on GitHub](https://github.com/jonathan-vella/apex-microhack/blob/main/scripts/Setup-GovernancePolicies.ps1)

**When to use:** Before the event starts, to deploy governance constraints that teams must work around.

Deploys eight `Deny`-effect policy assignments at the subscription scope. Assignments use the `microhack-` prefix
and are idempotent — existing assignments are skipped automatically.

#### Setup Parameters

| Parameter       | Required | Description                               |
| --------------- | -------- | ----------------------------------------- |
| `-Subscription` | Yes      | Azure subscription name or ID             |
| `-WhatIf`       | No       | Preview assignments without creating them |
| `-Verbose`      | No       | Show detailed progress per assignment     |

#### Setup Usage

```bash
# Preview first (always recommended)
pwsh -File scripts/Setup-GovernancePolicies.ps1 \
  -Subscription "<subscription-name-or-id>" \
  -WhatIf

# Deploy policies
pwsh -File scripts/Setup-GovernancePolicies.ps1 \
  -Subscription "<subscription-name-or-id>"

# Deploy with verbose output
pwsh -File scripts/Setup-GovernancePolicies.ps1 \
  -Subscription "<subscription-name-or-id>" \
  -Verbose
```

#### Policies Deployed

| Assignment Name                     | Policy                   | Effect | Constraint                                           |
| ----------------------------------- | ------------------------ | ------ | ---------------------------------------------------- |
| `microhack-allowed-locations`       | Allowed locations        | Deny   | `swedencentral`, `germanywestcentral`, `global` only |
| `microhack-require-environment-tag` | Require tag: Environment | Deny   | All resources must have an `Environment` tag         |
| `microhack-require-project-tag`     | Require tag: Project     | Deny   | All resources must have a `Project` tag              |
| `microhack-sql-aad-only-auth`       | SQL Azure AD-only auth   | Deny   | No SQL password authentication                       |
| `microhack-storage-https-only`      | Storage HTTPS only       | Deny   | `supportsHttpsTrafficOnly: true`                     |
| `microhack-storage-min-tls`         | Storage min TLS 1.2      | Deny   | `minimumTlsVersion: 'TLS1_2'`                        |
| `microhack-storage-no-public-blob`  | Storage no public blob   | Deny   | `allowBlobPublicAccess: false`                       |
| `microhack-appservice-https`        | App Service HTTPS only   | Deny   | `httpsOnly: true`                                    |

#### Setup Output

```text
Subscription   : my-subscription-name
SubscriptionId : 00000000-0000-0000-0000-000000000000
Created        : 8
Skipped        : 0
Failed         : 0
TotalPolicies  : 8
```

:::caution

Policies take **5–15 minutes** to become effective after deployment. Teams may not see errors immediately.
Facilitators should deploy policies at least 30 minutes before Challenge 3 begins and verify activation
using `Get-GovernanceStatus.ps1 -Subscription "<subscription-name-or-id>" -MicrohackOnly`. If the `State` column shows `Unknown`, wait and re-run.

:::

---

### 2. Get-GovernanceStatus.ps1

[View source on GitHub](https://github.com/jonathan-vella/apex-microhack/blob/main/scripts/Get-GovernanceStatus.ps1)

**When to use:** Anytime — before, during, or after the event — to verify which policies are active
and their compliance state.

Lists policy assignments on the subscription and reports compliance counts from Azure Policy state.

#### Status Parameters

| Parameter       | Required | Description                              |
| --------------- | -------- | ---------------------------------------- |
| `-Subscription` | Yes      | Azure subscription name or ID            |
| `-MicrohackOnly`| No       | Filter to `microhack-*` assignments only |
| `-Verbose`      | No       | Show detailed progress                   |

#### Status Usage

```bash
# Check all policy assignments on the subscription
pwsh -File scripts/Get-GovernanceStatus.ps1 \
  -Subscription "<subscription-name-or-id>"

# Check only microhack policies
pwsh -File scripts/Get-GovernanceStatus.ps1 \
  -Subscription "<subscription-name-or-id>" \
  -MicrohackOnly
```

#### Status Output

```text
Name            DisplayName                        EnforcementMode State        Compliant NonCompliant
----            -----------                        --------------- -----        --------- ------------
microhack-al... Microhack: Allowed locations       Default         Compliant    12        0
microhack-re... Microhack: Require Environment tag Default         NonCompliant 8         4
...
```

:::tip

If `State` shows `Unknown`, compliance data is still being collected. Wait a few minutes and re-run.

:::

---

### 3. Remove-GovernancePolicies.ps1

[View source on GitHub](https://github.com/jonathan-vella/apex-microhack/blob/main/scripts/Remove-GovernancePolicies.ps1)

**When to use:** After the event ends, to restore the subscription to its pre-event state.

Finds and deletes all policy assignments with the `microhack-` prefix. Supports `-WhatIf` to preview removals before committing.

#### Removal Parameters

| Parameter       | Required | Description                                |
| --------------- | -------- | ------------------------------------------ |
| `-Subscription` | Yes      | Azure subscription name or ID              |
| `-WhatIf`       | No       | Preview removals without deleting anything |
| `-Verbose`      | No       | Show detailed progress per assignment      |

#### Removal Usage

```bash
# Preview what will be removed
pwsh -File scripts/Remove-GovernancePolicies.ps1 \
  -Subscription "<subscription-name-or-id>" \
  -WhatIf

# Remove all microhack policies
pwsh -File scripts/Remove-GovernancePolicies.ps1 \
  -Subscription "<subscription-name-or-id>"
```

#### Removal Output

```text
Subscription   : my-subscription-name
SubscriptionId : 00000000-0000-0000-0000-000000000000
Removed        : 8
Failed         : 0
TotalFound     : 8
```

---

## Recommended Event Sequence

```bash
SUB="<your-subscription-name-or-id>"

# 1. Before the event — deploy governance
pwsh -File scripts/Setup-GovernancePolicies.ps1 -Subscription $SUB -WhatIf
pwsh -File scripts/Setup-GovernancePolicies.ps1 -Subscription $SUB

# 2. Verify policies are active (run after 5–15 min)
pwsh -File scripts/Get-GovernanceStatus.ps1 -Subscription $SUB -MicrohackOnly

# 3. After the event — remove governance
pwsh -File scripts/Remove-GovernancePolicies.ps1 -Subscription $SUB -WhatIf
pwsh -File scripts/Remove-GovernancePolicies.ps1 -Subscription $SUB
```

---

## Troubleshooting

| Symptom                            | Cause                               | Solution                                                     |
| ---------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| `command not found: pwsh`          | PowerShell not installed            | Run `which pwsh`; it should be pre-installed in devcontainer |
| `az: command not found`            | Azure CLI not installed             | Azure CLI is pre-installed; try `az login`                   |
| `AuthorizationFailed`              | Insufficient role                   | Ensure Owner or Resource Policy Contributor on sub           |
| Assignment creation fails silently | Policy definition ID changed        | Check definition IDs via `az policy definition list`         |
| Policy not blocking deployments    | Propagation delay                   | Wait 5–15 minutes after `Setup-GovernancePolicies.ps1`       |
| `State: Unknown` in status output  | Compliance data not yet collected   | Wait a few minutes and re-run `Get-GovernanceStatus.ps1`     |
| Assignments remain after cleanup   | `Failed` count > 0 in Remove output | Re-run `Remove-GovernancePolicies.ps1`; check RBAC           |
