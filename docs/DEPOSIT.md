# Deposit SOL

This guide shows how to deposit SOL into the TruStake liquid staking vault. It covers both programmatic integration and
CLI usage.

By the end, you'll:

- Understand the whitelist and deposit logic
- Create or reuse an associated TruSOL token account
- Construct and send a Solana transaction using Anchor
- Interact securely with the Stake Pool Program via the Staker Program

## Overview

1. **Whitelist Requirement**

   - User must be whitelisted before they can deposit
   - Whitelist is managed by the Staker Program
   - Each user has a whitelist PDA (Program Derived Address)

2. **Token Flow**

   - SOL is deposited into the stake pool
   - In return, the user gets TruSOL, a token that represents their share
   - The amount of TruSOL minted depends on the share price of the pool
   - Deposits can only be made through the Staker program — no direct pool deposits are allowed

3. **Associated Token Account**
   - Each user needs a TruSOL Associated Token Account (ATA)
   - If the ATA doesn't exist, it will be created automatically
   - This account holds the user's TruSOL tokens

## Integration Guide

This section explains how to integrate the deposit functionality into your application.

### Prerequisites

1. Install required dependencies with specific versions:

```bash
  bun add @coral-xyz/anchor@0.28.0 @solana/web3.js@1.87.6 @solana/spl-token@0.3.9
```

2. Configure your environment variables in `.env`, refer to [env.example](../.env.example)

### Code Example

The deposit functionality is implemented in [deposit.ts](../src/scripts/deposit.ts). Here's how to use it:

```typescript
import { deposit } from "./scripts/deposit";
import { parseSol } from "./utils/format";
import { BN } from "@coral-xyz/anchor";
import { Keypair } from "@solana/web3.js";

// Example usage
async function depositSol(userKeypair: Keypair, amountInSol: number) {
  // Convert SOL to lamports
  const amountInLamports = parseSol(amountInSol);

  try {
    const txHash = await deposit(userKeypair, amountInLamports);
    console.log("Deposit successful! Transaction hash:", txHash);
    return txHash;
  } catch (error) {
    console.error("Deposit failed:", error);
    throw error;
  }
}
```

### Deposit Instruction

The deposit instruction in [deposit.ts](../src/scripts/deposit.ts) requires these accounts:

```typescript
const depositIx = await program.methods
  .deposit(amount)
  .accounts({
    // The user making the deposit. Must be a signer.
    user: userKeypair.publicKey,

    // User's whitelist account. Must be initialized if it doesn't exist.
    // Verifies the user is whitelisted before allowing deposit.
    userWhitelistAccount: userWhitelistPDA,

    // The stake pool account that holds the staked SOL.
    stakePool: stakePoolAccount,

    // PDA that has authority to deposit SOL into the pool.
    depositAuthority: stakePool.stakeDepositAuthority,

    // PDA that has authority to withdraw SOL from the pool.
    withdrawAuthority: poolWithdrawAuthority,

    // Account that holds the actual staked SOL.
    poolReserve: stakePool.reserveStake,

    // User's TruSOL token account where they'll receive their share tokens.
    userPoolTokenAccount: userPoolTokenATA,

    // Account that receives protocol fees from deposits.
    feeTokenAccount: stakePool.managerFeeAccount,

    // The TruSOL token mint account.
    poolMint: stakePool.poolMint,

    // Account that receives referral fees from deposits.
    // Can be the same as the fee token account.
    referralFeeTokenAccount: stakePool.managerFeeAccount,

    // Required for token operations (minting, transfers).
    tokenProgram: TOKEN_PROGRAM_ID,

    // The Staker program that's executing this instruction.
    stakerProgram: program.programId,

    // Required for account creation and rent exemption.
    systemProgram: SystemProgram.programId,
  })
  .instruction();
```

## CLI Usage

This section explains how to use the CLI tool for depositing SOL.

### Quick Start

```bash
  npx tru-sol deposit <user> <amount>

  # Examples
  npx tru-sol deposit alice 1.5  # Deposit 1.5 SOL using alice's keypair
  npx tru-sol deposit bob 2     # Deposit 2 SOL using bob's keypair
```

### Arguments

- `user`: Name of your keypair file (without the .json extension) located in `~/.config/solana/`
- `amount`: Amount of SOL to deposit (can be a decimal number)

### Example Output

```bash
  User G6sfnEjLSD3X8sGzR4LRoEf7VPb9eBCdufWvkGvtik1m depositing 0.1 SOL...
  TruSOL associated token account: 2uazXTrUaHC4DTxBFH5qM2DXgvb45rPGeegJ3yzLjvAZ
  Found associated token account. Balance: 0.685849831 TruSOL
  Deposit tx hash: 5oanfLzWtV4HfGiBrattYXwR95vQL884jVVmbbZUR9EQTwh2cFTyBrggGnAbhouXoRtFDpoBMcQWzfHb4w7Fp4tQ
```

### CLI Error Handling

The CLI will fail if:

- The keypair file is not found
- The amount is not a positive number
- You don't have enough SOL
- The user is not whitelisted
- The transaction fails
