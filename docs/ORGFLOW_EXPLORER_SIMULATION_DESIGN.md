# ORGFLOW — BEFORE / AFTER SIMULATION ENGINE DESIGN
**Version:** 2.0.0  
**Phase:** Phase 2 Technical Architecture Design  

---

## 1. SIMULATION ARCHITECTURE & WORKFLOW

```mermaid
sequenceDiagram
    participant HR as HR Specialist
    participant Wizard as Change Wizard UI
    participant SimEngine as Simulation Engine (Memory)
    participant Validator as Integrity Validator
    participant App793 as App 793 API

    HR->>Wizard: Selects Target Org & Position
    Wizard->>SimEngine: Passes (Current App 792, Proposed App 793)
    SimEngine->>SimEngine: Clones Active In-Memory Hierarchy
    SimEngine->>SimEngine: Applies Delta (Move Node, Update Headcount)
    SimEngine->>Validator: Validates Delta
    Validator-->>SimEngine: Returns (0 Errors, Impact Metrics)
    SimEngine-->>Wizard: Renders Side-by-Side BEFORE vs AFTER
    HR->>Wizard: Clicks "Submit Request"
    Wizard->>App793: POST /k/v1/record.json (ZERO Writes to App 792)
    App793-->>Wizard: Request Created (CR-YYYYMM-XXXX)
```

---

## 2. IMPACT ANALYSIS METRICS CALCULATED IN-MEMORY

1. **Position Delta:** Old Position Title & Code vs New Position Title & Code.
2. **Organization Delta:** Source Org Node vs Destination Org Node.
3. **Reporting Line Delta:** Previous Manager vs New Manager.
4. **Headcount Rebalancing:** Source Org Count \(-1\), Destination Org Count \(+1\).
5. **Vacancy Impact:** Source Org Vacancy \(+1\), Destination Org Vacancy \(-1\).
6. **Integrity Rule Validation:**
   - Detect circular manager reporting.
   - Detect self-reporting.
   - Validate proposed organization code exists in App 791.
   - Validate proposed position code exists in canonical dictionary.
