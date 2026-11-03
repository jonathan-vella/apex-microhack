---
title: Beginner Setup (Windows)
description: Step-by-step Windows guide to set up WSL, clone the accelerator template via GitHub Desktop, and open it in VS Code
sidebar:
  order: 3
---

<!-- markdownlint-disable MD033 -->

This page walks you through setting up your machine from scratch on **Windows 11** using GitHub Desktop and WSL. If you already have Git, Docker, and VS Code working, skip straight to the [Setup Guide](../setup/) for the canonical pre-event checklist.

:::note

**macOS / Linux users** — this walkthrough is Windows-specific. Follow the cross-platform instructions in the [Setup Guide](../setup/) instead.

:::

---

## Step 1 — Install the required software

Install the tools below before continuing. Each link opens the official installer or documentation.

| Software | Install link | Notes |
|---|---|---|
| **Windows 11** | Already installed | Build 22000 or later required for WSL2 |
| **WSL2 + Ubuntu LTS** | [Install WSL](https://learn.microsoft.com/windows/wsl/install) | Run `wsl --install` in an elevated PowerShell terminal |
| **Docker Desktop** | [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) | Enable the WSL2 backend during setup |
| **Visual Studio Code** | [Download VS Code](https://code.visualstudio.com/) | Use a current stable release and check the event's tested build |
| **VS Code — WSL extension** | [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) | Required to open projects stored in WSL |
| **VS Code — Dev Containers extension** | [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) | Required to open the workshop Dev Container |
| **VS Code — GitHub Copilot Chat extension** | [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=github.copilot-chat) | Required for Copilot Chat, custom agents, and model selection |
| **GitHub Desktop** | [Download GitHub Desktop](https://desktop.github.com/) | Sign in with the same GitHub account that has Copilot |
| **Azure CLI** | [Install Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows) | Optional locally — it is pre-installed inside the Dev Container |

Install the VS Code extensions from the command line if you prefer:

```bash
code --install-extension ms-vscode-remote.remote-wsl
code --install-extension ms-vscode-remote.remote-containers
code --install-extension github.copilot-chat
```

:::note

On current Windows 11, `wsl --install` should install Ubuntu automatically. If Ubuntu is not installed or does not appear in the Start menu or when you run `wsl`, follow the [Microsoft WSL installation guidance](https://learn.microsoft.com/en-us/windows/wsl/install).

:::

:::caution

Installing software is not enough for this MicroHack. Before event day, verify the Copilot harness, selected model, custom agents, native task and reviewer, and MCP servers using the [Setup Guide](../setup/#participation-gate).

:::

---

## Step 2 — Create a project folder in WSL

Open **Ubuntu** from the Start menu (or run `wsl` in a terminal) and create a folder for your repositories:

```bash
mkdir -p ~/repos
```

From Windows Explorer you can reach this folder at:

```text
\\wsl.localhost\Ubuntu\home\<your-username>\repos
```

:::tip

Replace `<your-username>` with your Ubuntu username. You can check it by running `whoami` in the Ubuntu terminal.

:::

---

## Step 3 — Create your repository from the template

1. Open the [APEX Accelerator template](https://github.com/jonathan-vella/apex-accelerator) in your browser.
2. Click **Use this template** → **Create a new repository**.

![Use this template button on the accelerator repo](../../../assets/images/getting-started/01-accelerator-use-this-template.png)

3. Choose an owner (your GitHub user or organization) and give the repository a name.
4. Click **Create repository**.

:::caution

Create your repository from the **accelerator template**, not from the documentation repository you are reading now. If you cloned this docs repo, you have the wrong starting point.

:::

---

## Step 4 — Open your new repo in GitHub Desktop

Once GitHub finishes creating the repository, you will be on **your new repository's** page (not the template).

1. Click the green **Code** button.
2. Select **Open with GitHub Desktop**.

![Code dropdown showing Open with GitHub Desktop on your repository](../../../assets/images/getting-started/02-your-repo-open-github-desktop.png)

GitHub Desktop will open and ask where to clone the repository.

---

## Step 5 — Clone to the WSL path

In the GitHub Desktop clone dialog, set the **Local Path** to your WSL repos folder:

```text
\\wsl.localhost\Ubuntu\home\<your-username>\repos
```

:::tip

Paste the path directly into the path field — do not use the Browse button, as it may not display WSL network paths by default. Replace `<your-username>` with your Ubuntu username.

:::

Click **Clone** and wait for the download to finish.

---

## Step 6 — Open in Visual Studio Code

Choose your organization's launch path **before** opening VS Code or building the container:

1. **Microsoft employees:** connect to the approved corporate network or VPN as required and fully close existing VS Code windows. From an Ubuntu/WSL host terminal, replace `YOUR-REPOSITORY` with your repository folder and run:

   ```bash
   cd ~/repos/YOUR-REPOSITORY
   bash .devcontainer/open-microsoft.sh
   ```

   This opens VS Code with the Microsoft package feeds. Run it again for each fresh VS Code process; do not use a VS Code terminal or run it inside the container. The [Setup Guide](../setup/#setup-steps) also shows the Windows PowerShell launcher.
2. **Everyone else:** skip the Microsoft launcher. Configure any [organization-approved package sources](https://github.com/jonathan-vella/apex-accelerator/blob/68c15fc006b960f0266c28f6fda9f676b9aebbbe/.devcontainer/README.md#package-sources) on the host first, then click **Open in Visual Studio Code** in GitHub Desktop.

![GitHub Desktop Open in Visual Studio Code button](../../../assets/images/getting-started/03-github-desktop-open-vscode.png)

VS Code opens the project through the **WSL extension**. Ubuntu is the host environment; the Accelerator's digest-pinned participant container uses Azure Linux 4 preview. Do not bypass TLS checks or switch to unapproved feeds if the build fails.

---

## Step 7 — Continue to the Dev Container

Your code is now cloned into WSL and open in VS Code. From here, follow the [Setup Guide — Setup Steps](../setup/#setup-steps) starting at **step 2** to:

- Pull and build the Dev Container; rebuild it after changing build-time feeds
- Initialize your repository with `npm install` and `npm run init`; `npm run sync:workflows` previews consumer workflow changes by default
- Run `npm run setup` from the exact Accelerator-derived repository and working directory with your team. One named participant owns each setup mutation while teammates observe and verify. Before running it, confirm authorization and prerequisites; the command can overwrite GitHub secrets such as `AZURE_CLIENT_ID` and OIDC credentials.
- Sign in to Azure for workshop deployments
- Confirm the current custom agents
- Verify the Copilot harness, model policy, native task and reviewer, MCP tools, and your toolchain

:::tip

Do not skip the Dev Container step. All challenge work happens inside it; wait for setup to finish and verify the required tools.

:::

---

## What to do next

Once the Dev Container is running and you have completed the [Setup Guide](../setup/) checks, including agent, model, and MCP access, head to [Workshop Prep](../workshop-prep/) to read the scenario brief and team roles before event day.
