# Daml Integration

## Overview

The `daml/agent-wallet` package models the Canton Agent Wallet's business logic using Daml. It defines templates for spend policies, agent instructions, approvals, and execution receipts — all on a Daml ledger.

This is not a live deployed Daml ledger in the hackathon demo. The package exists to:
1. Formally model the rights and obligations between User and Agent parties
2. Provide a simulation of the full consent lifecycle (propose → approve/reject → execute → receipt)
3. Serve as the basis for future production Canton integration

## Package Structure

```
daml/agent-wallet/
  daml.yaml           — SDK config (sdk-version: 2.9.0)
  package.json        — Node project config
  model/
    Policy.daml       — UserPolicy template
    AuditLog.daml     — AuditEntry, AuditLogBundle templates
    Instruction.daml   — AgentInstruction, ExecutionApproval, ExecutionReceipt templates
  scripts/
    Setup.daml        — Daml Script: full lifecycle simulation
```

## Templates

### UserPolicy
Defines the user's spending rules. Fields: `maxPerTrade`, `approvalThreshold`, `maxDaily`, `whitelistEnabled`, `whitelistedStrategies`. Choices: `ApprovePolicy` (agent updates), `ArchivePolicy` (user archives).

### AgentInstruction
A proposed intent submitted by the agent for user consent. Contains action type, amount, provider, strategy ID, slippage. Choices: `ApproveInstruction` (user approves → creates ExecutionApproval), `RejectInstruction` (user rejects → creates ExecutionReceipt with Failed status), `MarkExecuted` (agent records result).

### ExecutionApproval
Created when user approves an instruction. Consumed by `ExerciseApproval` choice which produces an ExecutionReceipt.

### ExecutionReceipt
Immutable record of what happened — status, output amount, fees, tx hash, reason. No choices. Signatories: User + Agent.

### AuditEntry
Append-only log entry. Non-consuming `AddRelatedEntry` choice for chaining.

## Scripts

### `testAgentWalletFlow`
Full happy path: create policy → propose instruction (5 CC, simulation) → user approves → agent executes → receipt created → audit logged.

### `testAgentWalletFlowRejection`
Blocked path: create policy (max 5 CC) → propose instruction for 50 CC → user rejects → receipt with Failed status.

### `testSimulationAutoApproval`
Simulation path: propose simulation-only instruction → approve → execute → receipt.

## Relationship to TypeScript App

| Daml Concept | TypeScript Equivalent |
|---|---|
| UserPolicy | `Policy` type in domain.ts |
| AgentInstruction | `ParsedExecutionIntent` |
| ExecutionApproval | `PolicyEvaluationResult.decision === 'APPROVED'` |
| ExecutionReceipt | `ExecutionReceipt` type |
| Daml Script | `DemoExecutionAdapter` (local simulation) |
| Daml ledger | Future: Canton canton-ledger integration |

The TypeScript app uses Daml concepts as a **reference model**. The demo implementation simulates the same lifecycle using SQLite (for audit events) and in-memory state. When Daml ledger access is configured, the `DamlExecutionAdapter` would bridge to actual Daml contracts via the Canton HTTP API.

## Running Daml Scripts

```bash
cd daml/agent-wallet
daml start
# In another terminal:
daml script --dar .daml/dist/agent-wallet-0.1.0.dar --script-name Setup:testAgentWalletFlow --ledger-host localhost --ledger-port 6865
```
