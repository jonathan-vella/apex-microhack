# Challenge Guide Styler Skill

## Purpose

Apply the canonical challenge template and visual style standards to workshop challenge guides.

## When to Use

- Creating a new challenge guide from scratch
- Refactoring an existing challenge for consistency
- Reviewing challenge files for style compliance

## Challenge Template Structure

Every challenge file should follow this section order:

1. **Frontmatter** — title, description, sidebar (order, badge), prev/next navigation
2. **Challenge Info aside** — `:::note[Challenge Info]` with duration, points, agents, outputs
3. **Objective** — one-paragraph goal statement
4. **The Business Challenge** — scenario context connecting to Nordic Fresh Foods
5. **Your Challenge** / **Your Tasks** — what participants must do
6. **Success Criteria** — points table with criteria and scoring
7. **Tips / Hints** — optional collapsible hints
8. **Watch Out** — common pitfalls
9. **Next Step** — link to next challenge

## Constraints

- Do not change point allocations without updating `facilitator/scoring-rubric.md`
- Sidebar badge text should match challenge duration
- Use `prev`/`next` frontmatter for sequential challenge navigation
- Apply `microhack-unslop` only after the challenge's APEX facts, artifacts, approvals, scoring, and structure are verified
