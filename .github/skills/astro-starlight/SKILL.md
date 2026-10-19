---
name: astro-starlight
description: "Guide changes to the Astro Starlight documentation site in `site/`: docs pages, astro.config.mjs, components, and custom CSS."
---

# Astro Starlight Skill

## Purpose

Guide changes to the Astro Starlight documentation site in `site/`.

## When to Use

- Adding or editing pages in `site/src/content/docs/`
- Modifying `site/astro.config.mjs` or Starlight configuration
- Creating or updating Astro components in `site/src/components/`
- Adjusting custom CSS in `site/src/styles/`

## Key References

- Use the **Astro Docs MCP server** (configured in `.vscode/mcp.json`) to verify current APIs
- Starlight sidebar uses `autogenerate` — page order is controlled via frontmatter `sidebar.order`
- Content lives in `site/src/content/docs/` as `.md` or `.mdx` files
- Files using Starlight components (`<Card>`, `<CardGrid>`, `<LinkCard>`) must have `.mdx` extension
- Mermaid support is provided by `rehype-mermaid-lite` + custom `Footer.astro` component

## Constraints

- Do not modify `site/src/content.config.ts` unless adding new collections
- Preserve Azure brand accent color (`#0078d4`) in theme customizations
- Keep `trailingSlash: "always"` in Astro config for URL consistency
- Admonitions use Starlight syntax: `:::note`, `:::tip`, `:::caution`, `:::danger`
