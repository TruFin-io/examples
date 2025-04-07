# Withdraw Stake

This guide shows how to withdraw your stake from the Stake Pool Program.

By the end, you'll:

- Understand the withdrawal process and requirements
- Know how to calculate the expected SOL amount
- Understand the stake account creation and splitting process
- Be able to construct and send a withdrawal transaction

## TL;DR

- **Purpose:** Withdraw staked SOL from the Stake Pool.
- **Key Steps:**
  - Calculate share price and expected SOL amount.
  - Validate minimum withdrawal amount.
  - Find a stake account to split.
  - Create a new stake account.
  - Execute the withdrawal instruction.

## Table of Contents

1. [Understanding TruStake Withdrawals](#understanding-trustake-withdrawals)
   - [System Overview](#system-overview)
     - [Share Price Calculation](#1-share-price-calculation)
     - [Stake Account Splitting](#2-stake-account-splitting)
     - [Withdrawal Fees](#3-withdrawal-fees)
   - [Account Structure](#account-structure)
     - [User Accounts](#1-user-accounts)
     - [Pool Accounts](#2-pool-accounts)
     - [Authority Accounts](#3-authority-accounts)
     - [System Accounts](#4-system-accounts)
2. [Integration Guide](#integration-guide)
   - [Prerequisites](#prerequisites)
   - [Code Example](#code-example)
   - [Implementation Details](#implementation-details)

## Understanding TruStake Withdrawals

### System Overview

#### 1. Share Price Calculation

- The share price determines how much SOL you receive for your TruSOL tokens
- Share price = Total lamports in pool / Total TruSOL supply
- Expected SOL = TruSOL amount × Share price

#### 2. Stake Account Splitting

- Withdrawals create a new stake account by splitting an existing one
- The system finds the most suitable stake account to split
- The new stake account is owned by the user and can be deactivated later

#### 3. Withdrawal Fees

- A withdrawal fee is applied to cover operational costs
- The fee is deducted from the withdrawn amount

### Account Structure

Required accounts for withdrawals:

#### 1. User Accounts

- Wallet Account (pays for transaction and signs the transaction)
- TruSOL Token Account (tokens to burn)
- New Stake Account (receives withdrawn stake, created during the transaction)

#### 2. Pool Accounts

- Stake Pool (main contract, tracks pool state)
- Stake Pool Validator List (tracks validators and their stake accounts)
- Pool Mint (TruSOL token mint, used for burning tokens)
- Stake Account to Split (the existing stake account that will be split)

#### 3. Authority Accounts

- Withdraw Authority (authorizes withdrawals, PDA derived from stake pool)
- Stake Pool Manager Fee Account (receives fees from withdrawals)

#### 4. System Accounts

- Token Program (handles token operations like burning TruSOL)
- Stake Program (manages stake accounts)
- Clock Sysvar (provides timestamp for fee calculations)

## Integration Guide

This section explains how to integrate the withdrawal functionality into your application.

### Prerequisites

First, set up your development environment:

```bash
# Install dependencies
# `@coral-xyz/anchor` works with only V1 of `@solana/web3.js`

bun add @coral-xyz/anchor@0.28.0 @solana/web3.js@1.87.6 @solana/spl-token@0.3.9
```

Before withdrawing, ensure you have:

- A Solana wallet with sufficient SOL for transaction fees
- TruSOL tokens in your associated token account
- The withdrawal amount is above the minimum required

### Code Example

Here's a simplified example of how to withdraw SOL:

```typescript
import { Keypair, PublicKey } from "@solana/web3.js";
import { withdrawStake } from "src/scripts/native/withdraw-stake.ts";
import { parseSol } from "src/utils/format";
import { BN } from "@coral-xyz/anchor";

// Example usage
async function withdrawTruSol(userKeypair: Keypair, validatorVoteAccount: PublicKey, amountInTruSol: number) {
  try {
    // Convert SOL to lamports (1 TruSOL = 1e9 lamports)
    const amountInLamports = new BN(parseSol(amountInTruSol));

    // Execute withdraw transaction
    const txHash = await withdrawStake(userKeypair, validatorVoteAccount, amountInLamports);
    console.log("Withdraw successful! Transaction hash:", txHash);
    return txHash;
  } catch (error) {
    console.error("Withdraw failed:", error);
    throw error;
  }
}

// Call the withdraw function
const keypair = // load your whitelisted keypair here.
const validatorVote = new PublicKey("Ak5BJzQe2R8qFuyYmaAFPjXuD7XPux3ZNTv52D7rfiqR");
const txHash = await withdrawTruSol(keypair, validatorVote, 0.1);
console.log("Example withdraw completed:", txHash);
```

### Implementation Details

The withdrawal process involves several steps:

1. **Calculate Share Price and Expected SOL**:

   ```typescript
   const stakePool = await getStakePool(connection, STAKE_POOL_ACCOUNT);
   const totalLamports = new BN(stakePool.totalLamports.toString()).toNumber();
   const poolTokenSupply = new BN(stakePool.poolTokenSupply.toString()).toNumber();
   const sharePrice = Math.floor((totalLamports * 1e9) / poolTokenSupply) / 1e9;
   const expectedSOL = Math.round(amount.toNumber() * sharePrice);
   ```

2. **Validate Minimum Withdrawal Amount**:

   ```typescript
   const minLamportsOnStakeAccount = await getMinLamportsOnStakeAccount();
   const stakeWithdrawalFee =
     (BigInt(100) * stakePool.stakeWithdrawalFee.numerator) / stakePool.stakeWithdrawalFee.denominator;
   const minSolWithdrawalBeforeFees = Math.round(minLamportsOnStakeAccount / (1 - Number(stakeWithdrawalFee) / 100));

   if (expectedSOL < minSolWithdrawalBeforeFees) {
     throw new Error("Withdraw amount too low");
   }
   ```

3. **Find Stake Account to Split**:

   ```typescript
   const stakeAccountToSplit = await getStakeAccountToSplit(stakePool, validatorVoteAccount, expectedSOL, sharePrice);
   if (!stakeAccountToSplit) {
     throw new Error("No stake account to split found.");
   }
   ```

4. **Create New Stake Account**:

   ```typescript
   const newStakeAccount = web3.Keypair.generate();
   const stakeAccountRent = await connection.getMinimumBalanceForRentExemption(STAKE_PROGRAM_SPACE);
   const createAccountIx = SystemProgram.createAccount({
     fromPubkey: userKeypair.publicKey,
     newAccountPubkey: newStakeAccount.publicKey,
     lamports: stakeAccountRent,
     space: STAKE_PROGRAM_SPACE,
     programId: STAKE_PROGRAM_ID,
   });
   ```

5. **Get User's TruSOL ATA**:

   ```typescript
   const userPoolTokenATA = await getAssociatedTokenAddress(POOL_MINT, userKeypair.publicKey);
   ```

6. **Create Withdrawal Instruction**:

   ```typescript
   const withdrawStakeIx = new TransactionInstruction({
     programId: constants.STAKE_POOL_PROGRAM_ID,
     keys: [
       { pubkey: constants.STAKE_POOL_ACCOUNT, isSigner: false, isWritable: true },
       { pubkey: constants.STAKE_POOL_VALIDATOR_LIST, isSigner: false, isWritable: true },
       { pubkey: constants.WITHDRAW_AUTHORITY, isSigner: false, isWritable: false },
       { pubkey: stakeAccountToSplit, isSigner: false, isWritable: true },
       { pubkey: newStakeAccount.publicKey, isSigner: false, isWritable: true },
       { pubkey: userKeypair.publicKey, isSigner: false, isWritable: false },
       { pubkey: userKeypair.publicKey, isSigner: true, isWritable: false },
       { pubkey: userPoolTokenATA, isSigner: false, isWritable: true },
       { pubkey: constants.STAKE_POOL_MANAGER_FEE_ACCOUNT, isSigner: false, isWritable: true },
       { pubkey: constants.POOL_MINT, isSigner: false, isWritable: true },
       { pubkey: constants.CLOCK_SYSVAR, isSigner: false, isWritable: false },
       { pubkey: constants.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
       { pubkey: constants.STAKE_PROGRAM_ID, isSigner: false, isWritable: false },
     ],
     data: new WithdrawStakeInstruction(amount).toBuffer(),
   });
   ```

7. **Send Transaction**:

```typescript
const transaction = new Transaction().add(createAccountIx).add(withdrawStakeIx);
const tx = await provider.sendAndConfirm(transaction, [userKeypair, newStakeAccount]);
```

## Important Notes

- The amount of SOL received may vary slightly from the TruSOL amount due to:
  - Pool fees (withdrawal fee percentage)
  - Validator performance
  - Network conditions
- Minimum withdrawal amount is required to cover the rent exemption for the new stake account
- Maximum withdrawal amount is limited by the pool's available liquidity
- After withdrawal, you'll need to deactivate the new stake account to receive your SOL
