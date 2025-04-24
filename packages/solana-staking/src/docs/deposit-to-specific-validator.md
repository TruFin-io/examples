# Deposit SOL to a Specific Validator

This guide shows how to deposit SOL into the TruStake liquid staking vault for a specific validator.

By the end, you'll:

- Understand the whitelist and deposit logic
- Create or reuse an associated TruSOL token account
- Construct and send a Solana transaction to a specific validator

## TL;DR

- **Purpose:** Quickly deposit SOL into the TruStake liquid staking vault for a specific validator.
- **Key Steps:**
  - Verify whitelist eligibility.
  - Create or reuse your TruSOL Associated Token Account.
  - Build and execute a deposit instruction for a specific validator.

## Table of Contents

1. [Understanding TruStake Deposits](#understanding-trustake-deposits)
   - [System Overview](#system-overview)
     - [Whitelist](#1-whitelist)
     - [Token Flow](#2-token-flow)
     - [Associated Token Account](#3-associated-token-account)
   - [Account Structure](#account-structure)
     - [User Accounts](#1-user-accounts)
     - [Pool Accounts](#2-pool-accounts)
     - [Authority Accounts](#3-authority-accounts)
     - [Validator Accounts](#4-validator-accounts)
2. [Integration Guide](#integration-guide)
   - [Prerequisites](#prerequisites)
   - [Code Example](#code-example)
   - [Implementation Options](#implementation-options)
     - [Anchor Implementation](#anchor-implementation)
     - [Native Implementation](#native-implementation)
   - [Complete Implementation](#complete-implementation)

## Understanding TruStake Deposits

### System Overview

#### 1. Whitelist

⚠️ Only whitelisted Users will be able to deposit

#### 2. Token Flow

- Users deposit SOL → Receive TruSOL tokens
- TruSOL represents your stake pool share
- The amount of TruSOL minted depends on the share price of the pool

#### 3. Associated Token Account

- Each user needs a TruSOL Associated Token Account (ATA)
- If the ATA doesn't exist, it will be created automatically
- This account holds the user's TruSOL tokens

### Account Structure

Required accounts for deposits to a specific validator:

#### 1. User Accounts

- Wallet Account (holds SOL)
- Whitelist PDA (verifies eligibility)
- TruSOL Token Account (receives stake shares)

#### 2. Pool Accounts

- Stake Pool (main contract)
- Pool Reserve (holds staked SOL)
- Pool Mint (TruSOL token mint)

#### 3. Authority Accounts

- Deposit Authority
- Withdraw Authority
- Fee Accounts

#### 4. Validator Accounts

- Validator Vote Account (the validator to deposit to)
- Validator Stake Account (PDA derived from validator vote account)
- Transient Stake Account (PDA derived from validator vote account)
- Ephemeral Stake Account (for temporary stake operations)

## Integration Guide

This section explains how to integrate the deposit-to-specific-validator functionality into your application using
either the Anchor or Native implementation.

### Prerequisites

First, set up your development environment:

```bash
# Install dependencies
# `@coral-xyz/anchor` works with only V1 of `@solana/web3.js`

bun add @coral-xyz/anchor@0.28.0 @solana/web3.js@1.87.6 @solana/spl-token@0.3.9
```

Before depositing, ensure you have:

- A Solana wallet with sufficient SOL
- Whitelist approval for your wallet address
- The validator vote account address you want to deposit to

### Code Example

Here's a simple implementation using anchor:

```typescript
import { Keypair, PublicKey } from "@solana/web3.js";
import { depositToSpecificValidator } from "src/scripts/anchor/deposit-to-specific-validator";
import { parseSol } from "src/utils/format";

// Example usage
async function depositSolToValidator(
  userKeypair: Keypair,
  validatorVoteAccount: PublicKey,
  amountInSol: number
) {
  try {
    // Convert SOL to lamports (1 SOL = 1e9 lamports)
    const amountInLamports = parseSol(amountInSol);

    // Execute deposit transaction
    const txHash = await depositToSpecificValidator(
      userKeypair,
      validatorVoteAccount,
      amountInLamports
    );
    console.log("Deposit successful! Transaction hash:", txHash);
    return txHash;
  } catch (error) {
    console.error("Deposit failed:", error);
    throw error;
  }
}

// Call the deposit function
const keypair = // load your whitelisted keypair here
const validatorVoteAccount = new PublicKey("validator_vote_account_address_here");
const txHash = await depositSolToValidator(keypair, validatorVoteAccount, 1.5);
console.log("Example deposit completed:", txHash);
```

### Implementation Options

You can implement the deposit-to-specific-validator functionality using either:

1. [Anchor Implementation](#anchor-implementation) - Recommended for simpler integration
2. [Native Implementation](#native-implementation) - For more control and direct Solana interaction

**Note:** A complete list of addresses for mainnet is available at [addresses.md](./addresses.md).

### Anchor Implementation

The Anchor implementation provides a higher-level abstraction that simplifies the integration process.

#### Step 1: Create/Check TruSOL Token Account

If the user doesn't have a TruSOL Associated Token Account (ATA), create one using the following instruction. If they
already have an ATA, you can **skip** this step and proceed to `Step 2`.

```typescript
// Load the keypair for a whitelisted account
const userKeypair = ...
const poolMint = new PublicKey("6umRHtiuBd1PC6HQhfH9ioNsqY4ihZncZXNPiGu3d3rN");
const userPoolTokenATA = getAssociatedTokenAddressSync(poolMint, userKeypair.publicKey);

// If the ATA doesn't exist then create one
const createAccountIx = createAssociatedTokenAccountInstruction(
  userKeypair.publicKey, // payer
  userPoolTokenATA,
  userKeypair.publicKey, // owner
  poolMint,
);
```

#### Step 2: Derive the Transient Stake Account PDA

Derive the transient stake account PDA:

```typescript
// Derive the transient stake account PDA
const [transientStakeAccount] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("transient"),
    validatorVoteAccount.toBuffer(),
    new PublicKey("EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM").toBuffer(),
    new BN(0).toArrayLike(Buffer, "le", 8),
  ],
  new PublicKey("SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy")
);
```

#### Step 3: Derive the Validator Stake Account PDA

Derive the validator stake account PDA:

```typescript
// Derive the validator stake account PDA
const [validatorStakeAccount] = PublicKey.findProgramAddressSync(
  [validatorVoteAccount.toBuffer(), new PublicKey("EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM").toBuffer()],
  new PublicKey("SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy")
);
```

#### Step 4: Build Anchor Deposit to Specific Validator Instruction

The `deposit_to_specific_validator` instruction requires these accounts:

```typescript
const depositIx = await program.methods
  .depositToSpecificValidator(amount)
  .accounts({
    // === User Accounts ===
    user: userKeypair.publicKey,
    userPoolTokenAccount: userPoolTokenATA,

    // === Stake Accounts ===
    ephemeralStakeAccount: new PublicKey("H9chZiuQ5FjhTg1hUJ2V61VQWqTG5jYHfMcCDJrfRurK"),
    transientStakeAccount: transientStakeAccount,
    validatorStakeAccount: validatorStakeAccount,

    // === Validator Accounts ===
    validatorVoteAccount: validatorVoteAccount,
    validatorList: new PublicKey("8M7ZbLikHJdeU6iKzZxWJ8zHy1ozX65Zk2GBVcmFVnXe"),

    // === Pool Accounts ===
    stakePool: new PublicKey("EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM"),
    poolReserve: new PublicKey("EDKjf7YhYZyZriHrepRZEXNjwAen9aJwqToiWWqKf9yU"),
    poolMint: new PublicKey("6umRHtiuBd1PC6HQhfH9ioNsqY4ihZncZXNPiGu3d3rN"),

    // === Authority Accounts ===
    depositAuthority: new PublicKey("BLTSuAqaoaUUjLRVdanFXGBi2fef5pwhKN23kCMVgX2T"),
    withdrawAuthority: new PublicKey("Gq5an4FHyTght92zUF1RjNoZ8Pms7md7hRfGVHeswZku"),

    // === Fee Accounts ===
    feeTokenAccount: new PublicKey("5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod"),
    referralFeeTokenAccount: new PublicKey("5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod"),

    // === Program Accounts ===
    program: new PublicKey("3Gu6VvL43rRGUodheyitHuYGqsT7qLkuYjwjwC9V2mTU"),
  })
  .instruction();
```

### Native Implementation

The Native implementation provides direct control over the Solana transaction structure and is useful when you need more
fine-grained control.

#### Step 1: Create Whitelist PDA

To interact with the deposit functionality, first create a user whitelist PDA:

```typescript
const stakerProgramId = new PublicKey("6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM");

// Load the keypair for a whitelisted account
const userKeypair = ...

// Generate the whitelist PDA for the user
const [userWhitelistPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("user"), userKeypair.publicKey.toBuffer()],
  stakerProgramId,
);
```

#### Step 2: Derive the Transient Stake Account PDA

Derive the transient stake account PDA:

```typescript
// Derive the transient stake account PDA
const [transientStakeAccount] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("transient"),
    validatorVoteAccount.toBuffer(),
    new PublicKey("EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM").toBuffer(),
    new BN(0).toArrayLike(Buffer, "le", 8),
  ],
  new PublicKey("SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy")
);
```

#### Step 3: Derive the Validator Stake Account PDA

Derive the validator stake account PDA:

```typescript
// Derive the validator stake account PDA
const [validatorStakeAccount] = PublicKey.findProgramAddressSync(
  [validatorVoteAccount.toBuffer(), new PublicKey("EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM").toBuffer()],
  new PublicKey("SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy")
);
```

#### Step 4: Create/Check TruSOL Token Account

If the user doesn't have a TruSOL Associated Token Account (ATA), create one using the following instruction. If they
already have an ATA, you can **skip** this step and proceed to `Step 5`.

```typescript
// Load the keypair for a whitelisted account
const userKeypair = ...
const poolMint = new PublicKey("6umRHtiuBd1PC6HQhfH9ioNsqY4ihZncZXNPiGu3d3rN");
const userPoolTokenATA = getAssociatedTokenAddressSync(poolMint, userKeypair.publicKey);

// If the ATA doesn't exist then create one
const createAccountIx = createAssociatedTokenAccountInstruction(
  userKeypair.publicKey, // payer
  userPoolTokenATA,
  userKeypair.publicKey, // owner
  poolMint,
);
```

#### Step 5: Build Native Deposit to Specific Validator Instruction

The native implementation requires more explicit account definitions:

```typescript
const depositIx = new TransactionInstruction({
  keys: [
    {
      pubkey: userKeypair.publicKey, // The user
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: userWhitelistPDA, // Generated per user
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("EXcdEB4Sy1ikfsXDdLRK9h8ZjgT6pyhq1o98RM7eeYr"), // ACCESS_PDA
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("3Gu6VvL43rRGUodheyitHuYGqsT7qLkuYjwjwC9V2mTU"), // STAKER_AUTHORITY
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM"), // STAKE_POOL_ACCOUNT
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("BLTSuAqaoaUUjLRVdanFXGBi2fef5pwhKN23kCMVgX2T"), // DEPOSIT_AUTHORITY
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("Gq5an4FHyTght92zUF1RjNoZ8Pms7md7hRfGVHeswZku"), // WITHDRAW_AUTHORITY
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("EDKjf7YhYZyZriHrepRZEXNjwAen9aJwqToiWWqKf9yU"), // POOL_RESERVE
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: userPoolTokenATA, // Generated per user
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod"), // MANAGER_FEE_ACCOUNT
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("6umRHtiuBd1PC6HQhfH9ioNsqY4ihZncZXNPiGu3d3rN"), // POOL_MINT
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod"), // MANAGER_FEE_ACCOUNT
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), // TOKEN_PROGRAM_ID
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("8M7ZbLikHJdeU6iKzZxWJ8zHy1ozX65Zk2GBVcmFVnXe"), // STAKE_POOL_VALIDATOR_LIST
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("H9chZiuQ5FjhTg1hUJ2V61VQWqTG5jYHfMcCDJrfRurK"), // EPHEMERAL_STAKE_ACCOUNT
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: transientStakeAccount, // Generated per validator vote account
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: validatorStakeAccount, // Generated per validator vote account
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: validatorVoteAccount, // The validator vote account
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("SysvarC1ock11111111111111111111111111111111"), // CLOCK_SYSVAR
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("SysvarStakeHistory1111111111111111111111111"), // STAKE_HISTORY_SYSVAR
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("StakeConfig11111111111111111111111111111111"), // STAKE_CONFIG_SYSVAR
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("Stake11111111111111111111111111111111111111"), // STAKE_PROGRAM_ID
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy"), // STAKE_POOL_PROGRAM_ID
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("11111111111111111111111111111111"), // SYSTEM_PROGRAM_ID
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("7HUhwJvRThjcbBme9fhdvbqyvfZ5MhZGuxm5hEkZFLhY"), // EVENT_AUTHORITY
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: new PublicKey("6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM"), // STAKER_PROGRAM_ID
      isWritable: false,
      isSigner: false,
    },
  ],
  programId: new PublicKey("6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM"), // STAKER_PROGRAM_ID
  data: new DepositToSpecificValidatorInstruction(amount).toBuffer(),
});
```

### Complete Implementation

For complete implementations including error handling, ATA creation, and transaction building, see:

- Anchor implementation: [deposit-to-specific-validator.ts](../scripts/anchor/deposit-to-specific-validator.ts)
- Native implementation: [deposit-to-specific-validator.ts](../scripts/native/deposit-to-specific-validator.ts)
