# Deposit SOL

This guide shows how to deposit SOL into the TruStake liquid staking vault.

By the end, you'll:

- Understand the whitelist and deposit logic
- Create or reuse an associated TruSOL token account
- Construct and send a Solana transaction

## TL;DR

- **Purpose:** Quickly deposit SOL into the TruStake liquid staking vault.
- **Key Steps:**
  - Verify whitelist eligibility.
  - Create or reuse your TruSOL Associated Token Account.
  - Build and execute a deposit instruction.

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
2. [Integration Guide](#integration-guide)
   - [Prerequisites](#prerequisites)
   - [Implementation Steps](#implementation-steps)
     - [Step 1: Create Whitelist PDA](#step-1-create-whitelist-pda)
     - [Step 2: Create/Check TruSOL Token Account](#step-2-createcheck-trusol-token-account)
     - [Step 3: Build Deposit Instruction](#step-3-build-deposit-instruction)
   - [Code Example](#code-example)
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

Required accounts for deposits:

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

## Integration Guide

This section explains how to integrate the deposit functionality into your application.

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

### Implementation Steps

#### Step 1: Create Whitelist PDA

To interact with the deposit functionality, first create a user whitelist PDA:

```typescript
import { Keypair, PublicKey } from "@solana/web3.js";

const stakerProgramId = new PublicKey("6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM");

// Create or Load a user keypair from `~/.config/solana/id.json`
const userKeypair = Keypair.generate();

// Generate the whitelist PDA for the user
const [userWhitelistPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("user"), userKeypair.publicKey.toBuffer()],
  stakerProgramId,
);
```

#### Step 2: Create/Check TruSOL Token Account

If the user doesn't have a TruSOL Associated Token Account (ATA), create one using the following instruction. If they
already have an ATA, you can skip this step and proceed to [Step 3](#step-3-build-deposit-instruction).

```typescript
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

#### Step 3 Build Deposit Instruction

The deposit instruction in [deposit.ts](../src/scripts/deposit.ts) requires these accounts:

```typescript
const depositIx = await program.methods
  .deposit(amount)
  .accounts({
    // === User Accounts ===

    // The user making the deposit. Must be a signer.
    user: userKeypair.publicKey,

    // User's whitelist account. Must be initialized if it doesn't exist.
    // Verifies the user is whitelisted before allowing deposit.
    userWhitelistAccount: userWhitelistPDA,

    // User's TruSOL token account where they'll receive their share tokens.
    userPoolTokenAccount: userPoolTokenATA,

    // === Pool Accounts ===

    // The stake pool account that holds the staked SOL.
    stakePool: new PublicKey("EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM"),

    // Account that holds the actual staked SOL.
    poolReserve: new PublicKey("EDKjf7YhYZyZriHrepRZEXNjwAen9aJwqToiWWqKf9yU"),

    // The TruSOL token mint account.
    poolMint: new PublicKey("6umRHtiuBd1PC6HQhfH9ioNsqY4ihZncZXNPiGu3d3rN"),

    // === Authority Accounts ===

    // PDA that has authority to deposit SOL into the pool.
    depositAuthority: new PublicKey("BLTSuAqaoaUUjLRVdanFXGBi2fef5pwhKN23kCMVgX2T"),

    // PDA that has authority to withdraw SOL from the pool.
    withdrawAuthority: new PublicKey("Gq5an4FHyTght92zUF1RjNoZ8Pms7md7hRfGVHeswZku"),

    // === Fee Accounts ===

    // Account that receives protocol fees from deposits.
    feeTokenAccount: new PublicKey("5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod"),

    // Account that receives referral fees from deposits.
    // Can be the same as the fee token account.
    referralFeeTokenAccount: new PublicKey("5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod"),

    // === System Accounts ===

    // Required for token operations (minting, transfers).
    tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),

    // The Staker program that's executing this instruction.
    stakerProgram: new PublicKey("6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM"),

    // Required for account creation and rent exemption.
    systemProgram: new PublicKey("11111111111111111111111111111111"),
  })
  .instruction();
```

**Note:** The addresses shown above are for mainnet, refer to [addresses.md](./addresses.md).

### Code Example

Here's a simple implementation of the deposit functionality:

```typescript
import { Keypair } from "@solana/web3.js";
import { deposit } from "src/scripts/deposit";
import { parseSol } from "src/utils/format";

// Example usage
async function depositSol(userKeypair: Keypair, amountInSol: number) {
  try {
    // Convert SOL to lamports (1 SOL = 1e9 lamports)
    const amountInLamports = parseSol(amountInSol);

    // Execute deposit transaction
    const txHash = await deposit(userKeypair, amountInLamports);
    console.log("Deposit successful! Transaction hash:", txHash);
    return txHash;
  } catch (error) {
    console.error("Deposit failed:", error);
    throw error;
  }
}

// Call the deposit function
const txHash = await depositSol(Keypair.generate(), 1.5);
console.log("Example deposit completed:", txHash);
```

### Complete Implementation

For a complete implementation including error handling, ATA creation, and transaction building, see
[deposit.ts](../src/scripts/deposit.ts).
