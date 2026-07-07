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
   - [Complete implementation](#complete-implementation)

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

A whitelisted wallet with USDC, and `.env` configured (see [Setup](./README.md#setup)). Find the current epoch
with `bun run <variant>/view/latest-epoch.ts`.

### Anchor

The typed builder derives every account; you pass the epoch and amount. Full file:
[`anchor/instructions/deposit.ts`](../anchor/instructions/deposit.ts).

```typescript
return program.methods
  .deposit(epoch, amount)
  .accountsStrict({
    payer: user,
    vaultConfig: Pda.getPdaVaultConfigAddress(),
    usdcAccounting: Pda.getPdaUsdcAccountingAddress(),
    userWhitelist: Pda.getPdaStakerUserStatusAddress(user),
    vaultAuthority,
    userVaultTokenAccount: deriveATAAddress(trubillMint, user, TOKEN_2022_PROGRAM_ID),
    userUsdcAta: deriveATAAddress(usdcMint, user),
    vaultCollateralAta: deriveATAAddress(usdcMint, vaultAuthority),
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
bun run anchor/instructions/deposit.ts <amount> [epoch]
```

### Native

You build the `TransactionInstruction` by hand: an 8-byte discriminator plus little-endian `u64` args, then the
account metas in the exact order the program expects, each flagged `isSigner` and `isWritable`. Full file:
[`native/instructions/deposit.ts`](../native/instructions/deposit.ts).

```typescript
// Anchor discriminator for `deposit`, taken from the IDL.
const DEPOSIT_DISCRIMINATOR = Buffer.from([242, 35, 198, 137, 82, 225, 242, 182]);

function encodeDepositData(epoch: BN, amount: BN): Buffer {
  return Buffer.concat([
    DEPOSIT_DISCRIMINATOR,
    epoch.toArrayLike(Buffer, "le", 8),
    amount.toArrayLike(Buffer, "le", 8),
  ]);
}

// Order is fixed by the program. Each row: isSigner, isWritable, and the account's role.
const keys = [
  { pubkey: user, isSigner: true, isWritable: true }, // payer: signs and funds, source of the USDC
  { pubkey: Pda.getPdaVaultConfigAddress(), isSigner: false, isWritable: false }, // vault_config: params and epoch state
  { pubkey: Pda.getPdaUsdcAccountingAddress(), isSigner: false, isWritable: true }, // usdc_accounting: reserve/pending ledger
  { pubkey: Pda.getPdaStakerUserStatusAddress(user), isSigner: false, isWritable: false }, // user_whitelist: must be Whitelisted
  { pubkey: vaultAuthority, isSigner: false, isWritable: false }, // vault_authority: mint and CPI signer PDA
  { pubkey: userTrubillAta, isSigner: false, isWritable: true }, // user_vault_token_account: TruBILL shares minted here
  { pubkey: userUsdcAta, isSigner: false, isWritable: true }, // user_usdc_ata: user's USDC source
  { pubkey: vaultCollateralAta, isSigner: false, isWritable: true }, // vault_collateral_ata: vault USDC sink
  { pubkey: usdcMint, isSigner: false, isWritable: false }, // usdc_mint: the deposit asset
  { pubkey: trubillMint, isSigner: false, isWritable: true }, // trubill_mint: share mint (Token-2022)
  { pubkey: Pda.getPdaEpochSnapshotAddress(epoch), isSigner: false, isWritable: false }, // epoch_snapshot: NAV for pricing
  { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // token_program: SPL Token, for USDC
  { pubkey: TOKEN_2022_PROGRAM_ID, isSigner: false, isWritable: false }, // token_program_2022: for the share mint
  { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // associated_token_program: ATA creation
  { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }, // system_program
  { pubkey: Pda.getPdaEventAuthorityAddress(), isSigner: false, isWritable: false }, // event_authority: Anchor event CPI
  { pubkey: programId, isSigner: false, isWritable: false }, // program: self, for the event CPI
];
```

```sh
# native takes the epoch explicitly
bun run native/instructions/deposit.ts <amount> <epoch>
```

### Kit

The Codama async builder auto-derives every PDA and ATA; you pass the signer, your USDC ATA, the program, the
epoch, and the amount. Full file: [`kit/instructions/deposit.ts`](../kit/instructions/deposit.ts).

```typescript
const instruction = await getDepositInstructionAsync({
  payer,
  userUsdcAta: await deriveAta(payer.address, address(USDC_MINT)),
  program: TRUBILL_VAULT_PROGRAM_ADDRESS,
  epoch,
  amount: usdc(amountStr),
});
```

```sh
bun run kit/instructions/deposit.ts <amount> [epoch]
```

### Complete implementation

- Anchor: [`anchor/instructions/deposit.ts`](../anchor/instructions/deposit.ts)
- Native: [`native/instructions/deposit.ts`](../native/instructions/deposit.ts)
- Kit: [`kit/instructions/deposit.ts`](../kit/instructions/deposit.ts)

> Every runner sends to mainnet. Prefix with `SIMULATE=1` to dry-run.
