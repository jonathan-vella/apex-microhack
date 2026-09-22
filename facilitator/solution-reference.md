# Solution Reference

> **For facilitators only** — Expected outputs and patterns.

## Expected Artifacts

```
agent-output/freshconnect/
├── 01-requirements.md
├── 02-architecture-assessment.md
├── sku-manifest.json and sku-manifest.md
├── challenge-findings-requirements.json
├── 03-des-cost-estimate.md
├── architecture and cost review findings
├── 03-des-architecture-diagram.md (optional)
├── 03-des-deployment-workflow.md (Challenge 3 Mermaid workflow)
├── 04-adr-ha-dr-strategy.md (Challenge 4)
├── 04-governance-constraints.md and .json
├── governance reconciliation findings when required
├── 04-implementation-plan.md and machine-readable contracts
├── plan review findings
├── 05-iac-handoff.json
├── 05-load-test-results.md
├── 06-deployment-summary.md (Challenge 3 deployment summary)
├── 07-operations-runbook.md (Challenge 6)
├── 07-design-document.md (Challenge 6)
├── 07-diagnostics-quick-card.md (Challenge 7 required)
└── 07-ab-diagnostics-runbook.md (Challenge 7 optional bonus depth)

# Bicep path
infra/bicep/freshconnect/
├── main.bicep
├── main.bicepparam
├── deploy.ps1
└── modules/
    ├── app-service.bicep
    ├── sql-database.bicep
    ├── storage.bicep
    ├── key-vault.bicep
    └── monitoring.bicep

# Terraform path (alternative)
infra/terraform/freshconnect/
├── main.tf
├── variables.tf
├── outputs.tf
├── providers.tf
├── deploy.ps1
└── modules/
    ├── app-service/
    ├── sql-database/
    ├── storage/
    ├── key-vault/
    └── monitoring/
```

---

## Challenge 3→4 Fallback: Paper Exercise

Teams that fail Challenge 3 deployment pivot to a paper exercise for Challenge 4:

- **Required output**: `agent-output/freshconnect/04-adr-ha-dr-strategy.md` (same ADR as deployed teams)
- **Required output**: Updated architecture diagram showing primary + secondary region
- **No deployment required**: Teams describe what they _would_ deploy and why
- **Scoring**: ADR quality and architectural reasoning are scored; deployment points are not available for paper-exercise teams. Implementation quality can still be scored only against any IaC artifacts the team actually produced before pivoting.
- **No pre-built reference deployment is provided**

The paper exercise preserves the core learning objective: making informed DR architecture decisions under time pressure.

---

## Expected Requirements

**Functional:**

- Web portal for order entry (React/Vue on App Service)
- RESTful API backend (.NET/Node on App Service)
- Order, customer, inventory database (Azure SQL)
- File storage for images/invoices (Blob Storage)
- Secret management (Key Vault)

**Non-Functional:**

- SLA: 99.9%
- RTO: 4 hours (1 hour after Challenge 4)
- RPO: 1 hour (15 min after Challenge 4)
- Peak: 500 concurrent users
- Seasonal: 3x traffic spikes

**Constraints:**

- Budget: ~€500/month (€700 after Challenge 4)
- Region: swedencentral (+germanywestcentral after Challenge 4)
- Compliance: GDPR

---

## Expected Architecture

| Resource             | SKU          | Cost         |
| -------------------- | ------------ | ------------ |
| App Service Plan     | P1v3 (Linux) | ~€75/mo      |
| App Service (Web)    | —            | Included     |
| App Service (API)    | —            | Included     |
| Azure SQL            | S2 (50 DTU)  | ~€60/mo      |
| Storage Account      | Standard LRS | ~€5/mo       |
| Key Vault            | Standard     | ~€1/mo       |
| Application Insights | —            | ~€5/mo       |
| Log Analytics        | —            | ~€10/mo      |
| **Total**            |              | **~€156/mo** |

After Challenge 4 (DR):

| Additional Resource        | Cost         |
| -------------------------- | ------------ |
| Secondary App Service Plan | ~€75/mo      |
| SQL Geo-Replica            | ~€60/mo      |
| Traffic Manager            | ~€5/mo       |
| **New Total**              | **~€300/mo** |

---

## Expected Bicep Patterns

### main.bicep

```bicep
targetScope = 'resourceGroup'

@description('Environment name')
param environment string = 'dev'

@description('Project name')
param projectName string = 'freshconnect'

@description('Primary location')
param location string = 'swedencentral'

@description('Owner for tagging')
param owner string = 'microhack-team'

// Generate unique suffix ONCE
var uniqueSuffix = uniqueString(resourceGroup().id)

// Required tags
var tags = {
  Environment: environment
  ManagedBy: 'Bicep'
  Project: projectName
  Owner: owner
}

// Modules
module monitoring 'modules/monitoring.bicep' = {
  name: 'monitoring'
  params: {
    location: location
    projectName: projectName
    environment: environment
    tags: tags
  }
}

module keyVault 'modules/key-vault.bicep' = {
  name: 'keyVault'
  params: {
    location: location
    projectName: projectName
    environment: environment
    uniqueSuffix: uniqueSuffix
    tags: tags
  }
}

module storage 'modules/storage.bicep' = {
  name: 'storage'
  params: {
    location: location
    projectName: projectName
    environment: environment
    uniqueSuffix: uniqueSuffix
    tags: tags
  }
}

module sqlDatabase 'modules/sql-database.bicep' = {
  name: 'sqlDatabase'
  params: {
    location: location
    projectName: projectName
    environment: environment
    uniqueSuffix: uniqueSuffix
    tags: tags
  }
}

module appService 'modules/app-service.bicep' = {
  name: 'appService'
  params: {
    location: location
    projectName: projectName
    environment: environment
    tags: tags
    appInsightsInstrumentationKey: monitoring.outputs.appInsightsInstrumentationKey
  }
}
```

### Security Settings (Required)

```bicep
// Storage Account
properties: {
  supportsHttpsTrafficOnly: true
  minimumTlsVersion: 'TLS1_2'
  allowBlobPublicAccess: false
}

// SQL Server
properties: {
  azureADOnlyAuthentication: true
  minimalTlsVersion: '1.2'
}

// App Service
properties: {
  httpsOnly: true
  minTlsVersion: '1.2'
}
```

### Naming Convention

```bicep
// Key Vault (max 24 chars)
var kvName = 'kv-${take(projectName, 8)}-${environment}-${take(uniqueSuffix, 6)}'

// Storage Account (max 24 chars, no hyphens)
var stName = 'st${take(replace(projectName, '-', ''), 10)}${environment}${take(uniqueSuffix, 6)}'

// SQL Server
var sqlName = 'sql-${projectName}-${environment}-${take(uniqueSuffix, 8)}'
```

---

## DR Solution (Challenge 4)

### Additional Parameters

```bicep
param enableDR bool = true
param secondaryLocation string = 'germanywestcentral'
```

### SQL Geo-Replication

```bicep
resource sqlServerSecondary 'Microsoft.Sql/servers@2023-05-01-preview' = if (enableDR) {
  name: 'sql-${projectName}-${environment}-gwc'
  location: secondaryLocation
  properties: {
    azureADOnlyAuthentication: true
  }
}

resource dbReplica 'Microsoft.Sql/servers/databases@2023-05-01-preview' = if (enableDR) {
  parent: sqlServerSecondary
  name: databaseName
  location: secondaryLocation
  properties: {
    createMode: 'OnlineSecondary'
    sourceDatabaseId: sqlDatabase.id
  }
}
```

### Traffic Manager

```bicep
resource trafficManager 'Microsoft.Network/trafficManagerProfiles@2022-04-01' = {
  name: 'tm-${projectName}'
  location: 'global'
  properties: {
    profileStatus: 'Enabled'
    trafficRoutingMethod: 'Priority'
    dnsConfig: {
      relativeName: 'tm-${projectName}'
      ttl: 60
    }
    monitorConfig: {
      protocol: 'HTTPS'
      port: 443
      path: '/health'
    }
    endpoints: [
      {
        name: 'primary'
        type: 'Microsoft.Network/trafficManagerProfiles/azureEndpoints'
        properties: {
          targetResourceId: primaryApp.id
          priority: 1
        }
      }
      {
        name: 'secondary'
        type: 'Microsoft.Network/trafficManagerProfiles/azureEndpoints'
        properties: {
          targetResourceId: secondaryApp.id
          priority: 2
        }
      }
    ]
  }
}
```

---

## Challenge 6: Documentation (Example Outputs)

### Operations Guide

**File**: `agent-output/freshconnect/07-operations-runbook.md`

**Generated by**: `08-As-Built` agent

````markdown
# FreshConnect Operations Guide

## Deployment Procedures

### Initial Deployment

1. Authenticate to Azure: `az login`
2. Create resource group: `az group create --name rg-freshconnect-dev-swc --location
swedencentral`
3. Run What-If: `./infra/bicep/freshconnect/deploy.ps1 -WhatIf`
4. Deploy: `./infra/bicep/freshconnect/deploy.ps1`

### Update Deployment

1. Modify Bicep templates in `infra/bicep/freshconnect/`
2. Run `bicep build main.bicep` to validate syntax
3. Execute What-If to preview changes
4. Deploy updated template

## Monitoring

### Key Metrics

| Metric               | Threshold | Alert |
| -------------------- | --------- | ----- |
| App Service Response | >2000ms   | Yes   |
| SQL DTU %            | >80%      | Yes   |
| Storage Availability | <99.9%    | Yes   |

### Log Analytics Queries

**Top 10 slowest requests:**

```kql
requests
| where timestamp > ago(1h)
| summarize avg(duration) by name
| top 10 by avg_duration desc
```
````

## Backup & Recovery

- SQL: Automated backups, 7-day retention
- Geo-replica: `germanywestcentral`
- RTO: 1 hour | RPO: 15 minutes

````

### Architecture Documentation

**File**: `agent-output/freshconnect/07-design-document.md`

```markdown
# FreshConnect Design Document

## System Overview

FreshConnect is a multi-tier order management system for Nordic Fresh Foods, supporting
web-based order entry with RESTful APIs backed by Azure SQL Database.

## Design Decisions

### Compute: Azure App Service (P1v3)

**Rationale**: Managed PaaS with built-in scaling, zone redundancy, and hybrid connection
support.

**Alternatives Considered**: AKS (too complex), VMs (high operational overhead)

### Database: Azure SQL (S2, 50 DTU)

**Rationale**: Relational data model, geo-replication for DR, Azure AD authentication.

**Alternatives Considered**: Cosmos DB (eventual consistency challenges)

### Storage: Blob Storage (LRS → GRS)

**Rationale**: Cost-effective blob storage for invoices/images. GRS for DR.

## Well-Architected Framework Alignment

| Pillar       | Implementation                        |
| ------------ | ------------------------------------- |
| Reliability  | Zone redundancy, geo-replication, ASR |
| Security     | Managed identities, private endpoints |
| Cost         | S2 SQL, P1v3 App Service (~€300/mo)   |
| Operations   | App Insights, Log Analytics           |
| Performance  | P1v3 compute, S2 database             |
````

---

## Challenge 7: Diagnostics (Example Runbook)

**File**: `agent-output/freshconnect/07-ab-diagnostics-runbook.md`

````markdown
# FreshConnect Diagnostics Runbook

## Incident Response

### High Response Time Alert

**Symptom**: P95 response time >2000ms

**Diagnostic Steps:**

1. Check Application Insights:

   ```kql
   requests
   | where timestamp > ago(15m)
   | summarize percentile(duration, 95)
   ```
````

2. Identify slow dependencies:

   ```kql
   dependencies
   | where timestamp > ago(15m)
   | summarize avg(duration) by name
   | order by avg_duration desc
   ```

3. Check SQL DTU utilization:

   ```kql
   AzureMetrics
   | where ResourceProvider == "MICROSOFT.SQL"
   | where MetricName == "dtu_consumption_percent"
   | summarize avg(Average) by bin(TimeGenerated, 5m)
   ```

**Resolution:**

- If SQL DTU >80%: Scale to S3 or P1
- If App Service CPU >80%: Scale out instances
- If dependency timeout: Check network/firewall rules

### Database Connectivity Issues

**Symptom**: `Cannot connect to SQL server` errors

**Diagnostic Steps:**

1. Verify App Service managed identity has SQL role:

   ```bash
   az sql server ad-admin list --server sql-freshconnect-dev-swc --resource-group
   rg-freshconnect-dev-swc
   ```

2. Check firewall rules (should allow Azure services)
3. Test connection from App Service Console (Kudu)

**Resolution:**

- Grant `db_datareader`, `db_datawriter` roles to managed identity
- Verify connection string uses managed identity authentication

### Failover to Secondary Region

**Trigger**: Primary region outage, RTO timer started

**Steps:**

1. Verify secondary health: Check `germanywestcentral` resources
2. Initiate SQL failover:

   ```bash
   az sql server-failover-group failover --resource-group rg-freshconnect-dev-swc --server
   sql-freshconnect-dev-swc
   ```

3. Update Traffic Manager endpoint priority (if manual)
4. Monitor RTO compliance
5. Document incident for post-mortem

````

**Coaching Note**: Encourage teams to include specific Azure CLI commands and KQL queries in
their diagnostics runbook.

---

## Load Test Results (Example)

```markdown
# Load Test Results

## Configuration
| Setting | Value |
|---------|-------|
| Tool | k6 |
| Target | https://app-freshconnect-dev-swc.azurewebsites.net/ |
| Duration | 4 minutes |
| Peak Users | 500 |

## Results
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Concurrent Users | 500 | 500 | ✅ PASS |
| P95 Response Time | ≤2000ms | 847ms | ✅ PASS |
| Error Rate | ≤1% | 0.1% | ✅ PASS |
| Total Requests | — | 48,231 | — |

## Observations
1. Stable response times under load
2. No errors during ramp-up
3. P95 well under threshold
````

---

## Deployment Commands

```powershell
# Create resource group
az group create --name rg-freshconnect-dev-swc --location swedencentral

# What-If
az deployment group what-if `
  --resource-group rg-freshconnect-dev-swc `
  --template-file main.bicep `
  --parameters main.bicepparam

# Deploy
az deployment group create `
  --resource-group rg-freshconnect-dev-swc `
  --template-file main.bicep `
  --parameters main.bicepparam
```

---

## Coaching Approach for New Challenges

### Challenge 6: Documentation

**Don't Say**: "Run `04-Design` with these parameters."

**Do Say**: "What information would a new operations engineer need? How would you prompt the
agent to generate that?"

**Goal**: Help teams understand documentation as a deliverable, not an afterthought.

### Challenge 7: Diagnostics

**Don't Say**: "Add these KQL queries to your runbook."

**Do Say**: "What's the first thing you'd check if response times spiked? How would you find
that in Application Insights?"

**Goal**: Develop troubleshooting mindset and observability skills.

### General Coaching

- Encourage teams to use agents as **collaborators**, not command executors
- Prompt: "How would you phrase that question to get a better response?"
- Celebrate when teams iterate on agent prompts to refine outputs
