# Deposit

Deposit USDC into the TruBILL vault and receive TruBILL shares, priced against an epoch's NAV snapshot.

## TL;DR

Swap USDC for TruBILL shares. You pass the `amount` of USDC and the pricing `epoch` (the latest completed
epoch, resolved for you in anchor and kit, passed explicitly in native). The USDC leaves your account and
TruBILL shares (Token-2022) are minted to your ATA. Your wallet must be whitelisted (see
[Concepts](./README.md#concepts)).

## Table of contents

1. [Understanding deposit](#understanding-deposit)
2. [Integration guide](#integration-guide)
   - [Prerequisites](#prerequisites)
   - [Anchor](#anchor)
   - [Native](#native)
   - [Kit](#kit)

## Understanding deposit

The instruction transfers `amount` USDC from your ATA into the vault's collateral account and mints TruBILL
shares back to you. How many shares you get depends on the share price at the given epoch's
[NAV snapshot](./README.md#epoch-and-nav-pricing), so the epoch is part of the instruction data.

The share mint is Token-2022, so your TruBILL ATA is derived under the Token-2022 program. If it does not exist
yet, the instruction creates it, which is why the associated-token and system programs appear in the account
list. All PDAs (vault config, USDC accounting, the [whitelist](./README.md#whitelist-gate), vault authority,
and the epoch snapshot) are derived, never hardcoded.

## Integration guide

### Prerequisites

A whitelisted wallet with USDC, and `.env` configured (see [Setup](../README.md#setup)). Find the current epoch
with `bun run <variant>/view/latest-epoch.ts`.

### Anchor

The typed builder derives every account; you pass the epoch and amount. See
[`anchor/instructions/deposit.ts`](../anchor/instructions/deposit.ts).

```sh
bun run anchor/instructions/deposit.ts <amount> [epoch]
```

### Native

You build the `TransactionInstruction` by hand: an 8-byte discriminator plus little-endian `u64` args, then the
account metas in the exact order the program expects, each flagged `isSigner` and `isWritable` and annotated
with its role. See [`native/instructions/deposit.ts`](../native/instructions/deposit.ts).

```sh
# native takes the epoch explicitly
bun run native/instructions/deposit.ts <amount> <epoch>
```

### Kit

The Codama async builder auto-derives every PDA and ATA; you pass the signer, your USDC ATA, the program, the
epoch, and the amount. See [`kit/instructions/deposit.ts`](../kit/instructions/deposit.ts).

```sh
bun run kit/instructions/deposit.ts <amount> [epoch]
```

> Every runner sends to mainnet. Prefix with `SIMULATE=true` to dry-run.
