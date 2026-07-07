# Instant redeem

Burn TruBILL shares and receive USDC immediately from the vault reserve, minus an instant-redeem fee. This is
the immediate path; for the queued path see [request-redeem](./request-redeem.md).

## TL;DR

Redeem shares for USDC in one transaction. You pass the `amount` of USDC to receive, the pricing `epoch`, and
the fee `treasury`. The shares are burned, USDC is paid to you from the reserve, and a fee goes to the
treasury. The payout is bounded by the reserve, so large redemptions may not fit (check `view/vault.ts`). Your
wallet must be whitelisted (see [Concepts](./README.md#concepts)).

## Table of contents

1. [Understanding instant redeem](#understanding-instant-redeem)
2. [Integration guide](#integration-guide)
   - [Prerequisites](#prerequisites)
   - [Anchor](#anchor)
   - [Native](#native)
   - [Kit](#kit)

## Understanding instant redeem

The instruction burns shares and pays USDC straight from the vault's collateral reserve, priced against the
epoch's [NAV snapshot](./README.md#epoch-and-nav-pricing). An instant-redeem fee goes to the vault's treasury,
which is read from `vault_config` (the anchor and kit runners do this for you; the native runner takes it as an
argument so the account stays visible). Because it pays from the reserve, the redeemable amount is capped by
what the reserve holds.

## Integration guide

### Prerequisites

A whitelisted wallet holding TruBILL, and `.env` configured (see [Setup](../README.md#setup)). Find the treasury
and reserve with `bun run anchor/view/vault.ts`.

### Anchor

The typed builder derives every account and the runner reads `vault_config.treasury` for you. See
[`anchor/instructions/instant-redeem.ts`](../anchor/instructions/instant-redeem.ts).

```sh
bun run anchor/instructions/instant-redeem.ts <amount> [epoch]
```

### Native

An 8-byte discriminator plus little-endian `u64` args, then the ordered account metas (including the treasury
and its USDC ATA). See [`native/instructions/instant-redeem.ts`](../native/instructions/instant-redeem.ts).

```sh
# native takes the epoch and treasury explicitly
bun run native/instructions/instant-redeem.ts <amount> <epoch> <treasury>
```

### Kit

The runner reads the treasury from `vault_config`, then the async builder derives the rest. See
[`kit/instructions/instant-redeem.ts`](../kit/instructions/instant-redeem.ts).

```sh
bun run kit/instructions/instant-redeem.ts <amount> [epoch]
```

> Every runner sends to mainnet. Prefix with `SIMULATE=true` to dry-run.
