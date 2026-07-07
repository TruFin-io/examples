# Claim withdrawal

Pay out a settled [request-redeem](./request-redeem.md) and close it. This is the final step of the queued
redeem path.

## TL;DR

Collect the USDC from a settled redeem request. You pass the `redeemRequestId` from your request-redeem run.
The USDC is transferred to you and the `redeem_request` account is closed. Your wallet must be whitelisted and
the request must have settled (see [Concepts](./README.md#concepts)).

## Table of contents

1. [Understanding claim withdrawal](#understanding-claim-withdrawal)
2. [Integration guide](#integration-guide)
   - [Prerequisites](#prerequisites)
   - [Anchor](#anchor)
   - [Native](#native)
   - [Kit](#kit)

## Understanding claim withdrawal

The instruction transfers the USDC owed by a settled `redeem_request` from the vault to your USDC ATA, then
closes the request and reclaims its rent. It takes only the request `id`, since the request PDA is derived from
`["redeem_request", wallet, id]`. There is no epoch argument, because the amount was fixed when the request was
created. If the request has not settled yet, the instruction fails, so check first or retry later. See the
[redeem lifecycle](./README.md#redeem-lifecycle).

## Integration guide

### Prerequisites

A whitelisted wallet with a settled redeem request, and `.env` configured (see [Setup](../README.md#setup)). Use
the `redeemRequestId` printed by your [request-redeem](./request-redeem.md) run.

### Anchor

The typed builder derives every account; you pass the request id. See
[`anchor/instructions/claim-withdrawal.ts`](../anchor/instructions/claim-withdrawal.ts).

```sh
bun run anchor/instructions/claim-withdrawal.ts <redeemRequestId>
```

### Native

An 8-byte discriminator plus the little-endian `u64` id, then the ordered account metas. See
[`native/instructions/claim-withdrawal.ts`](../native/instructions/claim-withdrawal.ts).

```sh
bun run native/instructions/claim-withdrawal.ts <redeemRequestId>
```

### Kit

The async builder derives the request PDA from the id. See
[`kit/instructions/claim-withdrawal.ts`](../kit/instructions/claim-withdrawal.ts).

```sh
bun run kit/instructions/claim-withdrawal.ts <redeemRequestId>
```

> Every runner sends to mainnet. Prefix with `SIMULATE=true` to dry-run.
