---
name: azure-diagrams
description: "Create and maintain Mermaid infrastructure diagrams for workshop materials, such as architectures, data flows, and DR topologies."
---

# Azure Diagrams Skill

## Purpose

Create and maintain infrastructure diagrams for workshop materials.

## When to Use

- Creating Mermaid architecture diagrams for challenges or facilitator guides
- Documenting Azure resource relationships and data flows
- Visualizing deployment topologies or DR strategies

## Guidelines

- Use Mermaid syntax for all diagrams (rendered via `rehype-mermaid-lite`)
- Include `%%{init: {'theme':'neutral'}}%%` at the top for consistent rendering
- Use Azure-branded colors: `#0078d4` (blue), `#50e6ff` (light blue), `#F25022` (red), `#7FBA00` (green)
- Label nodes with Azure service names (e.g., "App Service", "Azure SQL", "Front Door")
- Keep diagrams simple enough to render on mobile screens

## Constraints

- Diagrams must use parser-safe Mermaid syntax (test with `npm run build`)
- Provide a text alternative in `<details>` for accessibility
- Do not embed real subscription IDs, resource names, or secrets in diagrams
