---
title: Hints & Tips
description: Practical hints, tips, and role-specific guidance for each challenge
sidebar:
  order: 2
---

> **Coaching approach**: These hints use questions to guide your thinking.
> Useful workshop solutions come from understanding _why_, not copying _what_.

## Something Broken?

If you're stuck on an error rather than a design question, go to [Troubleshooting](../../reference/troubleshooting/) first. The Quick Diagnosis table at the top will route you to the right fix.

## Prompt Pattern

Use this shared structure before you ask any challenge agent for help:

```text
Goal:
[What artifact or decision you need right now]

Context:
[FreshConnect business facts, constraints, and prior artifact path]

Decisions I need to make:
- [decision 1]
- [decision 2]

Return:
[format, artifact name, and evidence you need back]
```

This keeps prompts short while still giving the agent enough context to produce
usable workshop artifacts.

## WAF Decision Prompts

Use these when you need sharper architecture trade-offs in Challenges 2-4 or a better
defense in Challenge 8:

- **Reliability:** What fails first, and how quickly does the business need to recover?
- **Security:** What data or access path creates the highest risk if we simplify too far?
- **Cost:** What does this SKU or feature buy us that a cheaper option does not?
- **Performance:** Where will peak-season load actually land: app tier, database, storage, or network?
- **Operations:** Can the current team run this service without creating a hidden support burden?

## Understanding Agent Output Templates

<details>
<summary>📄 How Agent Outputs Work (click to reveal)</summary>

### Templatized Agent Outputs

The agents in this microhack use **templates** to generate consistent, structured documentation.
These templates are located in `.github/skills/apex-azure-artifacts/templates/` and include:

```
.github/skills/apex-azure-artifacts/templates/
├── 01-requirements.template.md
├── 02-architecture-assessment.template.md
├── 03-des-cost-estimate.template.md
├── 04-implementation-plan.template.md
├── 06-deployment-summary.template.md
├── 07-operations-runbook.template.md
└── ... (and more)
```

### Why Templates Matter

1. **Deterministic Behavior**: Templates make agent outputs more predictable and consistent.
   The agent fills in the template structure with your specific requirements.

2. **Quality Assurance**: Templates ensure all critical sections are covered — the agent
   won't forget important aspects like security considerations or cost breakdowns.

3. **Documentation Standards**: The output follows consistent documentation
   format and content organization.

### What This Means for You

- **Expect structured output**: Agent responses follow a predictable format
- **Focus on content, not format**: The template handles structure; you focus on requirements
- **Understand the patterns**: Reviewing templates helps you understand what the agent will produce

### Exploring Templates

Browse `.github/skills/apex-azure-artifacts/templates/` to understand:

- What sections each template includes
- What information the agent needs from you to fill them in
- How your prompts influence the content (not the structure)

💡 **Key insight**: GenAI with templates is more predictable than open-ended generation.
This is intentional — infrastructure documentation needs consistency!

</details>

## Architecture Hints

### Service Selection

<details>
<summary>💡 Service Selection (click to reveal)</summary>

Before asking the `03-Architect` agent, consider these questions:

**Understanding the Requirements:**

- What are the key capabilities FreshConnect needs? (web portal, API, database, file storage, secrets, monitoring)
- How many concurrent users need to be supported at peak?
- What's the growth trajectory? (seasonal spikes, planned expansion)

**Evaluating Service Options:**

- For the web portal: What Azure compute services support web hosting?
  - What are the trade-offs between App Service, Container Apps, and AKS for this workload?
  - Does the team have container expertise, or would PaaS be more appropriate?
- For the database: What data characteristics matter most?
  - Relational vs. NoSQL — what does the order/customer/inventory data structure suggest?
  - What availability SLA is required?
  - How can you optimize costs for dev/test vs. production?

- For cost optimization: What resources could share infrastructure?
  - Could web and API run on the same App Service Plan?
  - What's the cost difference between separate plans vs. deployment slots?

**Prompt the architect agent with business context:**

```
"Design Azure architecture for FreshConnect: farm-to-table delivery platform
serving 500 concurrent users, with order management, inventory tracking,
and delivery scheduling. Budget: €500/month. GDPR compliant (EU region).
Small team needs managed services."
```

💡 **Coaching tip**: Services aren't "recommended" — they're _chosen_ based on requirements.
What requirements drive your service selection?

</details>

### Cost Optimization

<details>
<summary>💰 Cost Optimization (click to reveal)</summary>

**Guiding Questions:**

Before asking for cost estimates, ask yourself:

1. **Resource Sharing**: What services could share infrastructure?
   - Can web and API applications run on the same App Service Plan?
   - What's the cost impact of deployment slots vs. separate App Services?
   - Could you use serverless for intermittent workloads?

2. **Right-Sizing**: How do you match SKU to requirements?
   - What SLA do you need? (99.9% vs. 99.95% cost difference?)
   - What's the minimum tier for zone redundancy?
   - Could dev/test environments use lower SKUs or serverless?

3. **Cost Discovery**: How would you get actual pricing data?
   - What information do the Azure Resource Manager pricing tools need?
   - How do you compare SKU costs within a service family?
   - What region affects pricing?

**Example Prompt for Azure Resource Manager pricing tools:**

```
"Compare costs for App Service plans in swedencentral:
- P1v3 (production)
- S1 (staging)
What features justify the price difference?"
```

💡 **Coaching tip**: Cost optimization isn't about picking the cheapest option —
it's about matching cost to value. What does each €10/month buy you?

**Estimated Budget Breakdown to Discuss:**

Consider these categories for your €500/month budget:

- Compute (App Service): What percentage?
- Data (SQL, Storage): What percentage?
- Networking (if any): What percentage?
- Observability (App Insights, Log Analytics): What percentage?
- Security (Key Vault): What percentage?

Where is most of your budget going? Does that align with business priorities?

</details>

### Security & Compliance

<details>
<summary>🔒 Security & Compliance (click to reveal)</summary>

**Discovery Questions:**

**GDPR Compliance:**

- How would you discover what GDPR requires for customer PII?
  - What Azure documentation or tools help identify GDPR requirements?
  - Which Azure regions qualify as "EU data residency"?
  - What logging is required for audit trails?

- What technical controls implement GDPR principles?
  - How do you ensure data stays in EU region? (service configuration?)
  - What authentication method protects customer data access?
  - How do you enable audit trails for compliance teams?

**Security Architecture:**

- What security defaults should _every_ Azure resource have?
  - HTTPS enforcement? TLS version? Public access settings?
  - How do you avoid storing secrets in code or templates?
  - What's the difference between connection strings and managed identities?

**Prompt Engineering for Security:**

Instead of asking "make it secure," try:

```
"Review my architecture for GDPR compliance. Data residency must be EU.
Customer PII includes: names, emails, delivery addresses, order history.
Identify gaps and recommend controls."
```

💡 **Coaching tip**: Security isn't a checklist — it's about understanding _what_
you're protecting and _why_. What data does FreshConnect store?
What's the impact if it's compromised?

**Example Bicep Security Pattern:**

```bicep
// Storage Account - what does each setting protect against?
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  properties: {
    supportsHttpsTrafficOnly: true    // Why is HTTP blocked?
    minimumTlsVersion: 'TLS1_2'       // What vulnerability does this mitigate?
    allowBlobPublicAccess: false      // When would you ever want this true?
  }
  identity: {
    type: 'SystemAssigned'            // How does this improve security?
  }
}
```

Ask yourself: What attack does each setting prevent?

</details>

### Governance Policy Errors

<details>
<summary>🔒 Governance Policy Errors (click to reveal)</summary>

**Common Policy Errors & Fixes:**

If Azure Policies are enabled, you may see deployment errors like:

| Error Message                             | Cause                            | Fix                                         |
| ----------------------------------------- | -------------------------------- | ------------------------------------------- |
| `RequestDisallowedByPolicy` (location)    | Resource outside allowed regions | Use `swedencentral` or `germanywestcentral` |
| `RequestDisallowedByPolicy` (tag)         | Missing required tag             | Add `Environment` and `Project` tags        |
| `RequestDisallowedByPolicy` (SQL auth)    | SQL password auth attempted      | Set `azureADOnlyAuthentication: true`       |
| `RequestDisallowedByPolicy` (HTTPS)       | HTTPS not enabled                | Set `supportsHttpsTrafficOnly: true`        |
| `RequestDisallowedByPolicy` (TLS)         | TLS version too low              | Set `minimumTlsVersion: 'TLS1_2'`           |
| `RequestDisallowedByPolicy` (public blob) | Public blob access enabled       | Set `allowBlobPublicAccess: false`          |

**Required Bicep Settings:**

```bicep
// Storage Account - all required for policy compliance
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  tags: tags  // Must include Environment and Project!
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
  }
}

// SQL Server - Azure AD only
resource sqlServer 'Microsoft.Sql/servers@2023-05-01-preview' = {
  name: sqlServerName
  location: location
  tags: tags
  properties: {
    azureADOnlyAuthentication: true
    administrators: {
      administratorType: 'ActiveDirectory'
      // ... AD admin config
    }
  }
}

// App Service - HTTPS only
resource webApp 'Microsoft.Web/sites@2023-01-01' = {
  name: appName
  location: location
  tags: tags
  properties: {
    httpsOnly: true
    siteConfig: {
      minTlsVersion: '1.2'
    }
  }
}
```

</details>

<details>
<summary>🏗️ Bicep Patterns (click to reveal)</summary>

**UniqueString Pattern:**

```bicep
// main.bicep - Generate ONCE, pass everywhere
var uniqueSuffix = uniqueString(resourceGroup().id)

// In modules, receive as parameter
param uniqueSuffix string

// Use in resource names
var kvName = 'kv-${take(projectName, 8)}-${environment}-${take(uniqueSuffix, 6)}'
```

**Naming Constraints:**

| Resource        | Max Length | Allowed Chars               |
| --------------- | ---------- | --------------------------- |
| Key Vault       | 24         | alphanumeric, hyphens       |
| Storage Account | 24         | lowercase, numbers only     |
| SQL Server      | 63         | lowercase, numbers, hyphens |

**Required Tags:**

```bicep
var tags = {
  Environment: environment      // dev, staging, prod
  ManagedBy: 'Bicep'
  Project: projectName
  Owner: owner
}
```

</details>

### Multi-Region DR

<details>
<summary>🌍 Multi-Region DR (Challenge 4)</summary>

**Discovery Questions:**

When the DR curveball hits, instead of looking for "the answer," ask:

1. **Business Impact**: What does "disaster recovery" mean for FreshConnect?
   - If swedencentral goes down, what business operations must continue?
   - What's the cost of 1 hour of downtime? 4 hours? 24 hours?
   - Which data can you afford to lose? (RPO question)
2. **Technical Options**: What Azure services support multi-region?
   - Can App Services fail over automatically, or do you need Traffic Manager?
   - What's the difference between SQL geo-replication and failover groups?
   - Does storage need to be in both regions, or can you use GRS?
   - How do secrets (Key Vault) work across regions?

3. **Cost Trade-offs**: What does HA/DR cost?
   - Budget increases from €500 → €700. What does that extra €200 buy?
   - Which components are most expensive to replicate?
   - Could you do active-passive instead of active-active?

4. **Architecture Documentation**: How do you communicate the change?
   - What format best shows before/after architecture?
   - Should you document this as an ADR (Architecture Decision Record)?
   - What context does your team need to understand _why_ you chose this approach?

**Prompt Engineering for DR:**

```
"Update FreshConnect architecture for disaster recovery:
- Primary: swedencentral
- Secondary: germanywestcentral
- RTO: 4 hours, RPO: 1 hour
- Budget increased to €700/month
Recommend services and configuration changes.
Create ADR documenting decision."
```

💡 **Coaching tip**: DR isn't about copying everything twice —
it's about identifying what _must_ survive and what recovery time the business can accept.

</details>

### Load Testing

<details>
<summary>🔥 Load Testing (Challenge 5)</summary>

**Understanding Load Testing:**

Before running tests, ask:

1. **What are you testing?**
   - Endpoint availability? Response time? Error rate under load?
   - Are you testing a single API endpoint or the whole application flow?

2. **What's "success"?**
   - What P95 response time is acceptable for users? (2 seconds? 5 seconds?)
   - What error rate is tolerable? (1%? 0.1%?)
   - How many concurrent users represent "peak load"?

3. **What does failure tell you?**
   - If response time degrades, what's the bottleneck? (database? compute? network?)
   - If errors spike, what's failing? (connections? timeouts? application logic?)
   - What would you change in the architecture to handle more load?

**k6 Tool (Installed in Dev Container):**

k6 is a modern load testing tool. Basic structure:

```javascript
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 100 }, // What does this stage test?
    { duration: "2m", target: 500 }, // What does this stage test?
    { duration: "1m", target: 0 }, // Why ramp down?
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // Why P95? Why 2000ms?
    http_req_failed: ["rate<0.01"], // Why 1%?
  },
};

export default function () {
  const res = http.get("https://your-app.azurewebsites.net/api/health");
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}
```

**Analyzing Results:**

After running k6, ask:

- Did you meet your thresholds? If not, why not?
- What Azure Monitor metrics correlate with load test results?
- Would scaling up (bigger SKU) or out (more instances) help?

💡 **Coaching tip**: Load testing isn't pass/fail — it's discovering your system's limits so you can make informed decisions.

</details>

### Documentation

<details>
<summary>📚 Documentation (Challenge 6)</summary>

**The Documentation Question:**

The infrastructure works today. Will your team understand it tomorrow?

**Discovery Questions:**

1. **Who's the audience?**
   - Operations team troubleshooting at 2 AM?
   - New developer joining the team?
   - Compliance auditor asking for DR procedures?
   - CFO asking why costs increased?

2. **What questions does documentation answer?**
   - "How do I fix it?" → Operational runbook
   - "How does it work?" → Architecture overview
   - "What does it cost?" → Cost breakdown
   - "Is it compliant?" → Security/compliance docs
   - "How do I deploy changes?" → Deployment guide

3. **What makes documentation useful?**
   - Step-by-step procedures vs. conceptual overviews?
   - Diagrams vs. text descriptions?
   - Troubleshooting decision trees?
   - Links to Azure Portal resources?

**Prompt Engineering for Documentation:**

```
"Generate operational runbook for FreshConnect targeted at on-call engineers.

Context:
- Deployed in swedencentral with DR in germanywestcentral
- Using App Service, Azure SQL, Storage Account, Key Vault
- Common scenarios: high latency, connection errors, storage throttling

Include:
- Initial assessment checklist (first 60 seconds)
- Diagnostic steps for common scenarios
- Azure CLI commands for health checks
- Escalation criteria"
```

💡 **Coaching tip**: The `08-As-Built` agent generates the as-built documentation suite from approved artifacts and observed results.
Which documents provide the most value for FreshConnect's specific needs?

**Document Types to Consider:**

- Operations runbook (troubleshooting)
- Architecture documentation (system understanding)
- Cost estimate with optimization guide
- Disaster recovery procedures
- Deployment guide with rollback steps
- Security and compliance documentation

</details>

### Diagnostics

<details>
<summary>🔍 Diagnostics (Challenge 7)</summary>

**The 2 AM Question:**

Your pager goes off. FreshConnect API is slow. Error rate climbing. You have 10 minutes before customers notice.

What do you check first?

**Building a Diagnostic Strategy:**

1. **What are the likely failure modes?**
   - Database connection pool exhausted?
   - App Service out of memory?
   - Storage account throttling?
   - Network connectivity to dependencies?
   - External API timeout (payment gateway?)?

2. **What's the diagnostic sequence?**
   - Start with application health endpoint or infrastructure metrics?
   - Check current state or compare to historical baseline?
   - Look at logs or metrics first?

3. **What tools exist in Azure?**
   - Azure Portal health dashboards
   - Application Insights queries (Kusto/KQL)
   - Azure Monitor metrics and alerts
   - Kudu console for App Service diagnostics
   - Azure CLI diagnostic commands

4. **Quick fix vs. escalation?**
   - What can on-call engineer safely restart?
   - When do you wake up the architect?
   - What changes need approval vs. immediate action?

**Prompt for Diagnostic Runbook:**

```
"Create troubleshooting runbook for FreshConnect production incidents.

Scenarios:
- High API latency (P95 > 5 seconds)
- Database connection errors
- Storage 503 errors (throttling)

For each scenario provide:
1. Likely root causes
2. Diagnostic commands (Azure CLI, KQL queries)
3. Remediation steps
4. Escalation criteria"
```

💡 **Coaching tip**: Good diagnostic documentation includes the _why_ not just the _what_.
Why check database DTU before App Service CPU? What's the reasoning?

**Example Diagnostic Flow:**

```
1. Initial Assessment (60 seconds)
   → Check Azure Status page (is it a platform issue?)
   → Check Application Insights overview (which component is failing?)
   → Check recent deployments (did something change?)

2. If High Latency Detected
   → Query: What's the P95 latency by dependency?
   → Check: Database DTU utilization
   → Check: App Service CPU/Memory
   → Decision: Scale up, scale out, or investigate query?

3. If Connection Errors
   → Check: Connection string configuration
   → Check: Managed identity permissions
   → Check: Network security groups / firewall rules
```

</details>

## Common Mistakes to Avoid

| Mistake                      | Solution                                            |
| ---------------------------- | --------------------------------------------------- |
| Key Vault name too long      | Use `kv-${take(name, 8)}-${env}-${take(suffix, 6)}` |
| Storage account with hyphens | Use lowercase letters and numbers only              |
| Missing uniqueSuffix         | Generate once in main.bicep, pass to all modules    |
| Hardcoded secrets            | Use Key Vault references or managed identity        |
| Over-engineering MVP         | Keep it simple — you have one day.                  |
| Forgetting to deploy         | Run `bicep build` often, deploy incrementally       |

## Agent-Specific Tips

### 02-Requirements (Challenge 1)

**Instead of asking "what should I do?"**, ask:

- "What NFRs should I capture for a farm-to-table delivery platform?"
- "How do I translate 'peak season = 3x volume' into technical requirements?"
- "What questions help uncover hidden requirements?"

💡 Be specific about business context, not just technical features.

### 03-Architect (Challenge 2)

**Instead of "design my architecture"**, try:

- "What are the trade-offs between App Service and Container Apps for this workload?"
- "How does the €500/month budget constraint affect service selection?"
- "What WAF pillar is most at risk with this approach?"

💡 Question recommendations — ask "why this service?" not just "what service?"

### 05-IaC Planner (Challenge 3)

**Instead of "write Bicep"**, ask:

- "What's the dependency order for deploying these resources?"
- "Should Key Vault be in a separate module or main.bicep?"
- "How do I structure modules for reusability?"

💡 Review the module structure before generating code.

### 06b-Bicep CodeGen (Challenge 3)

**Instead of "generate all the code"**, try:

- "Generate Key Vault module with name validation and uniqueSuffix parameter"
- Start with one module, validate it works, then expand
- Run `bicep build` after each major change

💡 Iterate incrementally — don't generate everything at once.

### 08-As-Built and 09-Diagnose (Challenges 6-7)

**For `08-As-Built`, instead of "document everything"**, ask:

- "Who is the audience for this documentation?"
- "What specific problem does this document solve?"
- "Generate [document type] for [audience] covering [scenarios]"

For Challenge 7, select `09-Diagnose` and request a one-page triage card grounded in the current architecture, load-test evidence, and observed state.

## Paper Exercise Fallback

If deployment is blocked in Challenge 3 or 4, the fallback is not a free pass. Keep the
same artifact contract and make the design evidence explicit.

- State what you were trying to deploy.
- Capture the exact blocker.
- Show what you would change next.
- Update the ADR or diagram to reflect the intended end state.
- Avoid language that implies the change was deployed when it was not.

---

## Still Stuck?

Ask yourself: "What question would help me discover the answer?"

If you are still blocked, raise your hand. Facilitators are there to coach, not solve.

This microhack has 8 challenges total; not every team will complete all of them.
Focus on learning the workflow and prompt-engineering skills.
