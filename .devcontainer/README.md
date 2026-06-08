# DevContainer — APEX MicroHack

This devcontainer provides the complete environment for both running the MicroHack workshop and building the documentation site.

## What's Included

| Tool | Source | Purpose |
|---|---|---|
| Node.js + npm | 22.x | Astro Starlight site + markdownlint-cli2 |
| Azure CLI (az) | Latest | Azure resource management |
| Bicep CLI | Latest | Infrastructure as Code |
| GitHub CLI (gh) | Latest | Repository and PR management |
| Python 3 + pip | 3.12 | Scripting utilities |
| PowerShell (pwsh) | 7.x | Workshop automation scripts |
| k6 | Latest | Load testing (challenge 5) |

VS Code extensions — Azure Bicep, Azure CLI Tools, PowerShell, Azure Resource Groups, Markdown linting, YAML support, Mermaid preview, Astro.

## Getting Started

### 1. Open in DevContainer

In VS Code: `Ctrl+Shift+P` → **Dev Containers: Reopen in Container**

### 2. Start the Astro Dev Server

```sh
cd site
npm install
npm run dev
```

### 3. Preview the Site

Open <http://localhost:4321/> in your browser (port 4321 is auto-forwarded).

## Useful Commands

| Command | Purpose |
|---|---|
| `cd site && npm run dev` | Start dev server with live reload |
| `cd site && npm run build` | Build site for production |
| `cd site && npm run lint:md` | Lint all Markdown files |
| `cd site && npm run preview` | Preview production build locally |
