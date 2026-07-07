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
   - [Complete implementation](#complete-implementation)

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

Full file: [`anchor/instructions/claim-withdrawal.ts`](../anchor/instructions/claim-withdrawal.ts).

```typescript
return program.methods
  .claimWithdrawal(redeemRequestId)
  .accountsStrict({
    user,
    userWhitelist: Pda.getPdaStakerUserStatusAddress(user),
    vaultConfig: Pda.getPdaVaultConfigAddress(),
    usdcAccounting: Pda.getPdaUsdcAccountingAddress(),
    vaultAuthority,
    usdcMint,
    vaultUsdcAta: deriveATAAddress(usdcMint, vaultAuthority),
    userUsdcAta: deriveATAAddress(usdcMint, user),
    redeemRequest: Pda.getPdaRedeemRequestAddress(user, redeemRequestId),
    tokenProgram: TOKEN_PROGRAM_ID,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    systemProgram: SystemProgram.programId,
    eventAuthority: Pda.getPdaEventAuthorityAddress(),
    program: program.programId,
  })
  .instruction();
```

```sh
bun run anchor/instructions/claim-withdrawal.ts <redeemRequestId>
```

### Native

Discriminator plus the little-endian `u64` id, then the ordered account metas. The full ordered list with role
comments is in [`native/instructions/claim-withdrawal.ts`](../native/instructions/claim-withdrawal.ts). The
[deposit guide](./deposit.md#native) shows the meta pattern in full.

```typescript
// Anchor discriminator for `claim_withdrawal`, taken from the IDL.
const CLAIM_WITHDRAWAL_DISCRIMINATOR = Buffer.from([
  118, 206, 173, 38, 239, 165, 65, 30,
]);

function encodeClaimWithdrawalData(redeemRequestId: BN): Buffer {
  return Buffer.concat([
    CLAIM_WITHDRAWAL_DISCRIMINATOR,
    redeemRequestId.toArrayLike(Buffer, "le", 8),
  ]);
}
```

```sh
bun run native/instructions/claim-withdrawal.ts <redeemRequestId>
```

### Kit

The async builder derives the request PDA from the id. Full file:
[`kit/instructions/claim-withdrawal.ts`](../kit/instructions/claim-withdrawal.ts).

```typescript
const instruction = await getClaimWithdrawalInstructionAsync({
  user,
  program: TRUBILL_VAULT_PROGRAM_ADDRESS,
  redeemRequestId: BigInt(idStr),
});
```

```sh
bun run kit/instructions/claim-withdrawal.ts <redeemRequestId>
```

### Complete implementation

- Anchor: [`anchor/instructions/claim-withdrawal.ts`](../anchor/instructions/claim-withdrawal.ts)
- Native: [`native/instructions/claim-withdrawal.ts`](../native/instructions/claim-withdrawal.ts)
- Kit: [`kit/instructions/claim-withdrawal.ts`](../kit/instructions/claim-withdrawal.ts)

> Every runner sends to mainnet. Prefix with `SIMULATE=true` to dry-run.
