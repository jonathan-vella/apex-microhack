---
name: microhack-unslop
user-invocable: true
disable-model-invocation: true
argument-hint: "document path, audience, and review or edit scope"
description: "Manually polish authorized APEX MicroHack prose for clear, concrete language while preserving verified APEX facts, workshop scoring, timings, commands, links, and participant/facilitator boundaries."
license: MIT
metadata:
  author: jonathan-vella
  version: "1.0"
  upstream: cursor/plugins/pstack/skills/unslop
  based_on: jonathan-vella/apex/.github/skills/apex-unslop
---

# MicroHack prose cleanup

Use this skill only when the user explicitly requests a prose review or cleanup. It is an editorial pass, not a technical validator, an AI-authorship detector, or an automatic workflow step.

## Before editing

- Confirm the file, audience, tone, and whether the request authorizes review or edits.
- Read the applicable repository instructions and the current APEX alignment source.
- Verify technical claims before polishing them. Style changes cannot make an unverified claim correct.
- Preserve unrelated user changes.

## Protected workshop content

Preserve verified facts, commands, identifiers, source URLs, citations, uncertainty, requirement strength, model or tool names, dates, numbers, units, currencies, regions, and SKU names.

Preserve the Nordic Fresh Foods scenario, challenge order, timings, points, bonus rules, scoring totals, rubric criteria, required challenge headings, frontmatter, anchors, tables, code fences, Mermaid blocks, navigation, and participant/facilitator boundaries unless the authorized task explicitly changes them.

Do not expose facilitator-only solutions or detailed scoring guidance in participant content. Do not rewrite generated files, historical evidence, approved artifacts, or quoted output as ordinary prose.

## APEX contract safeguards

- Keep main agents, skills, helper subagents, and human handoffs distinct.
- Preserve human approval gates and deployment authorization language.
- Do not imply that the Orchestrator autonomously executes the main-agent sequence.
- Do not remove Challenger findings, evidence limits, unresolved risks, or accepted-risk qualifications.
- Do not change an estimate into a guarantee or a workshop adaptation into a product contract.
- Preserve exact artifact names and commands after verifying them against the reviewed APEX revision.

## Workflow

1. Establish the authorized scope and protected content.
2. Identify specific clarity problems. Leave clear text alone.
3. Make the smallest edits that improve comprehension without changing meaning.
4. Prefer direct instructions, named actors, concrete mechanisms, and observable outcomes.
5. Compare the result with the original for factual drift, lost caveats, broken structure, or leaked facilitator content.
6. Run the repository checks relevant to the changed files.

## Editing guidance

- Remove filler, flattery, generic conclusions, conversational boilerplate, and unsupported promotional claims.
- Replace vague attribution with a named source or remove the claim.
- Prefer familiar words and consistent APEX terminology.
- Split dense sentences when it helps participants act without rereading.
- Prefer active voice when the actor is known and relevant. Do not invent an actor.
- Reduce gratuitous bold text, decorative emojis, repeated colons, and em dashes when the file contract does not require them.
- Keep useful lists, labels, parentheses, callouts, and tables. Treat style patterns as review cues, not absolute bans.
- State what a command changes before commands that create cloud identities, permissions, deployments, or repository configuration.
- If a sentence could describe any workshop unchanged, replace it with MicroHack-specific guidance or remove it.

## Output

For a review, return concrete findings without changing files. For authorized edits, name the changed files and summarize meaningful factual and editorial changes separately. Report unverified requirements instead of claiming correctness. Do not provide an AI score or claim that prose is human-authored.

## Attribution

Adapted from the APEX `apex-unslop` skill, which adapts Lauren Tan's [Unslop skill](https://github.com/cursor/plugins/tree/main/pstack/skills/unslop) under the MIT License. The MicroHack adaptation adds workshop-contract, participant/facilitator-boundary, and current-APEX workflow safeguards.
