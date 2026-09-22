---
title: Workshop Prep & Scenario
description: Scenario brief, mission, journey, and team roles for Nordic Fresh Foods
sidebar:
   order: 4
---

> **Read before the microhack** | Scenario brief and team role cards

---

## The Scenario: Nordic Fresh Foods

> **Your Challenge**: Design and deploy Azure infrastructure for a farm-to-table delivery platform.

### The Business

**Nordic Fresh Foods** is a growing farm-to-table delivery company based in Stockholm, Sweden.
They connect local organic farmers with restaurants and consumers across Scandinavia.

| Fact                | Details                                   |
| ------------------- | ----------------------------------------- |
| Founded             | 2022                                      |
| Partner Restaurants | 500+                                      |
| Active Consumers    | 10,000                                    |
| Current Tech        | Spreadsheets, WordPress, manual processes |
| Funding             | €2M Series A (just secured)               |

### The Problem

The CEO has secured €2M in Series A funding and needs to modernize operations before peak
season (3 months away). Current pain points:

1. **Order chaos**: Staff manually enters orders from phone, email, and web forms into
   spreadsheets. They lose ~8% of orders to errors.

2. **No real-time inventory**: Farmers update stock levels via WhatsApp. The team often
   oversells products that are no longer available.

3. **Delivery scheduling**: Routes are planned manually. Drivers often arrive at farms when
   produce isn't ready, wasting time and fuel.

4. **Customer visibility**: Restaurants have no way to track orders or see estimated
   delivery times. They call constantly for updates.

5. **Seasonal scaling**: During summer and December, order volume triples. They currently
   hire temp staff and work overtime — it's unsustainable.

### The Vision

The CTO (newly hired) has outlined a vision for **"FreshConnect"** — a cloud-based platform
that will:

- Accept orders from a web portal and mobile app
- Show real-time inventory from connected farms
- Automatically schedule and optimize delivery routes
- Provide order tracking for restaurants and consumers
- Scale seamlessly during peak periods
- Generate analytics for business decisions

### Your Mission

Design and deploy the Azure infrastructure for the **FreshConnect MVP** (Minimum Viable Product).

> ⚠️ You are NOT building application code. You are designing and deploying
> the **cloud infrastructure** that the development team will use.

### MVP Requirements

**Functional:**

| Capability             | Description                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| **Web Portal**         | Restaurant and consumer order entry (expect 500 concurrent users at peak) |
| **API Backend**        | RESTful APIs for mobile apps and integrations                             |
| **Database**           | Store orders, customers, inventory, delivery schedules                    |
| **File Storage**       | Product images, invoices, delivery receipts                               |
| **Secrets Management** | API keys, connection strings, certificates                                |
| **Monitoring**         | Application health, performance metrics, alerts                           |

**Constraints:**

| Constraint     | Value            | Notes                                                     |
| -------------- | ---------------- | --------------------------------------------------------- |
| **Budget**     | ~€500/month      | Infrastructure only (increases to €700 after Challenge 4) |
| **Compliance** | GDPR             | Customer PII must stay in EU                              |
| **Region**     | `swedencentral`  | Primary region (Stockholm proximity)                      |
| **Timeline**   | 3 months         | MVP for peak season                                       |
| **Team**       | 3 devs, 1 DevOps | Small team, needs managed services                        |

**Out of scope (MVP):**

- Mobile app infrastructure (Phase 2)
- AI/ML for route optimization (Phase 2)
- Multi-region disaster recovery _(initially — see Challenge 4!)_
- Real-time IoT from delivery vehicles (Phase 3)

**Non-functional:**

| Requirement    | Target                                       |
| -------------- | -------------------------------------------- |
| SLA            | 99.9%                                        |
| RTO            | 4 hours (initially)                          |
| RPO            | 1 hour (initially)                           |
| Peak Load      | 500 concurrent users                         |
| Seasonal Spike | 3x normal volume                             |
| Authentication | Azure AD (internal), Azure AD B2C (external) |
| Network        | Public endpoints acceptable for MVP          |

**Key stakeholders:**

| Role           | Priorities                       |
| -------------- | -------------------------------- |
| **CEO**        | On-time delivery, budget control |
| **CTO**        | Scalability, modern architecture |
| **CFO**        | Cost optimization, ROI           |
| **Operations** | Reliability, easy maintenance    |

### The MicroHack Journey

8 challenges across a 1-day hackathon:

1. **Requirements** — Capture requirements, review Challenger findings, and approve the architecture handoff
2. **Architecture** — Assess architecture and cost evidence, resolve review findings, and approve the design
3. **Implementation** — Discover governance, approve the IaC plan, generate and validate code, then authorize deployment
4. **DR Curveball** — Revise affected requirements, design, plan, code, and approvals for disaster recovery
5. **Load Testing** — Validate performance under stress
6. **Documentation** — Create evidence-based as-built guides and runbooks
7. **Diagnostics** — Build troubleshooting procedures
8. **Team Showcase** — Present your solution to stakeholders

Not all teams will complete all challenges — the goal is mastering the platform engineering workflow.

---

## Team Role Cards

> **Print and distribute** to each team member (up to 5 per team).

### Team Structure

| Aspect          | Details                  |
| --------------- | ------------------------ |
| Team Size       | Up to 5 members per team |
| Number of Teams | Maximum 4 teams          |

> **Note**: With 5 members, one person can float across roles or two can share the Architect
> role (one on security, one on cost).

---

### 🚗 Driver

**Primary Responsibility**: Hands on the keyboard

**You Will:**

- Type all commands and code
- Navigate VS Code and Azure Portal
- Execute agent prompts when team agrees
- Run deployments and tests

**Tips:**

- Share your screen so the team can follow
- Verbalize what you're doing: "I'm about to invoke the Architect agent..."
- Pause before executing — wait for team consensus
- Ask "Should I run this?" before deployments

**Collaboration is Key:**

- Don't make decisions alone — this is team-based discovery
- Embrace pauses for discussion — silence means thinking!
- When stuck, ask: "What question should I ask the agent?"

---

### 🧭 Navigator

**Primary Responsibility**: Guide strategy and next steps

**You Will:**

- Read challenge instructions aloud
- Guide Driver on what to type/click next
- Watch for errors and typos
- Keep team focused and on time

**Tips:**

- Have the challenge doc open on your device
- Call out the next step before Driver finishes the current one
- Track time per challenge — 8 challenges in one day means the pace stays tight
- In **Challenge 4** (DR Curveball): Help the team pivot quickly

**Coaching Mindset:**

- When the team is stuck, ask questions: "What are we trying to achieve?"
- Guide exploration: "Have we considered...?"

---

### 🏗️ Architect

**Primary Responsibility**: Technical decisions and quality

**You Will:**

- Review agent suggestions before team approves
- Validate architecture against WAF pillars
- Make SKU and service choices
- Ensure security best practices

**Tips:**

- Have the quick reference card handy
- Question each agent recommendation: "Why this service?"
- Check: "Does this meet our NFRs?"
- Watch the budget! (€500 → €700 after Challenge 4)

**Critical Questions to Ask:**

- "Is this the right SKU for our SLA?"
- "Are we using managed identities?"
- "Does this handle the DR requirement?"
- "What's the cost impact of this choice?"

---

### 📝 Documenter

**Primary Responsibility**: Capture decisions and prepare showcase

**You Will:**

- Note key decisions and rationale
- Track which challenges are complete
- Document blockers and solutions
- Prepare for **Challenge 8: Team Showcase**

**Tips:**

- Keep a running log in a text file or notepad
- Screenshot interesting outputs and architectures
- Prepare 2-minute summary for final presentation
- In **Challenge 4**: Document ADR (Architecture Decision Record) reasoning
- In **Challenges 6-7**: Lead documentation agent interactions

**Capture These Details:**

- "We chose X because..." (business justification)
- "The agent suggested Y but we changed to Z because..."
- "We got stuck on... and solved it by..."

---

### Role Rotation (Optional)

For **8 challenges**, consider rotating every 2 challenges:

| Challenges | Driver | Navigator | Architect | Documenter |
| ---------- | ------ | --------- | --------- | ---------- |
| 1-2        | A      | B         | C         | D          |
| 3-4        | B      | C         | D         | A          |
| 5-6        | C      | D         | A         | B          |
| 7-8        | D      | A         | B         | C          |

**Suggested Leads:**

- **Challenge 6 (Documentation)**: Documenter leads
- **Challenge 7 (Diagnostics)**: Architect leads
- **Challenge 8 (Showcase)**: Documenter presents, everyone supports

---

## Team Agreement

Before starting, agree on:

- [ ] Who plays which role initially
- [ ] Will we rotate roles? After which challenges?
- [ ] How do we make decisions when we disagree? (Vote? Discuss? Architect decides?)
- [ ] Break strategy (together or staggered? Lunch 12:00-12:45, Break 15:00-15:15)
- [ ] How do we support each other when stuck?

---

**Team Name**: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

| Role              | Name |
| ----------------- | ---- |
| 🚗 Driver         |      |
| 🧭 Navigator      |      |
| 🏗️ Architect      |      |
| 📝 Documenter     |      |
| 🔄 Floater (opt.) |      |

**Coaching Philosophy**: We discover solutions together through questions, not by following
prescriptive steps!
