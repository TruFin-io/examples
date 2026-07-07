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
   - [Complete implementation](#complete-implementation)

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

The runner fetches `vault_config.treasury` for you. Full file:
[`anchor/instructions/instant-redeem.ts`](../anchor/instructions/instant-redeem.ts).

```typescript
return program.methods
  .instantRedeem(epoch, redeemAmount)
  .accountsStrict({
    payer: user,
    vaultConfig: Pda.getPdaVaultConfigAddress(),
    usdcAccounting: Pda.getPdaUsdcAccountingAddress(),
    ultraAccounting: Pda.getPdaUltraAccountingAddress(),
    userWhitelist: Pda.getPdaStakerUserStatusAddress(user),
    vaultAuthority,
    userVaultTokenAccount: deriveATAAddress(
      trubillMint,
      user,
      TOKEN_2022_PROGRAM_ID,
    ),
    userUsdcAta: deriveATAAddress(usdcMint, user),
    vaultCollateralAta: deriveATAAddress(usdcMint, vaultAuthority),
    treasuryUsdcAta: deriveATAAddress(usdcMint, treasury),
    treasury,
    usdcMint,
    trubillMint,
    epochSnapshot: Pda.getPdaEpochSnapshotAddress(epoch),
    tokenProgram: TOKEN_PROGRAM_ID,
    tokenProgram2022: TOKEN_2022_PROGRAM_ID,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    systemProgram: SystemProgram.programId,
    eventAuthority: Pda.getPdaEventAuthorityAddress(),
    program: program.programId,
  })
  .instruction();
```

```sh
bun run anchor/instructions/instant-redeem.ts <amount> [epoch]
```

### Native

Discriminator plus little-endian `u64` args, then the ordered account metas (including the treasury and its
USDC ATA). The full ordered list with role comments is in
[`native/instructions/instant-redeem.ts`](../native/instructions/instant-redeem.ts). The
[deposit guide](./deposit.md#native) shows the meta pattern in full.

```typescript
// Anchor discriminator for `instant_redeem`, taken from the IDL.
const INSTANT_REDEEM_DISCRIMINATOR = Buffer.from([
  187, 107, 208, 125, 224, 237, 40, 93,
]);

function encodeInstantRedeemData(epoch: BN, redeemAmount: BN): Buffer {
  return Buffer.concat([
    INSTANT_REDEEM_DISCRIMINATOR,
    epoch.toArrayLike(Buffer, "le", 8),
    redeemAmount.toArrayLike(Buffer, "le", 8),
  ]);
}
```

```sh
# native takes the epoch and treasury explicitly
bun run native/instructions/instant-redeem.ts <amount> <epoch> <treasury>
```

### Kit

The runner reads the treasury from `vault_config`, then the async builder derives the rest. Full file:
[`kit/instructions/instant-redeem.ts`](../kit/instructions/instant-redeem.ts).

```typescript
const [vaultConfig] = await findVaultConfigPda();
const { treasury } = (await fetchVaultConfig(rpc, vaultConfig)).data;

const instruction = await getInstantRedeemInstructionAsync({
  payer,
  treasury,
  program: TRUBILL_VAULT_PROGRAM_ADDRESS,
  epoch,
  redeemAmount: usdc(amountStr),
});
```

```sh
bun run kit/instructions/instant-redeem.ts <amount> [epoch]
```

### Complete implementation

- Anchor: [`anchor/instructions/instant-redeem.ts`](../anchor/instructions/instant-redeem.ts)
- Native: [`native/instructions/instant-redeem.ts`](../native/instructions/instant-redeem.ts)
- Kit: [`kit/instructions/instant-redeem.ts`](../kit/instructions/instant-redeem.ts)

> Every runner sends to mainnet. Prefix with `SIMULATE=1` to dry-run.
