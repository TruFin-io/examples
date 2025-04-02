# Deposit SOL

This guide shows how to deposit SOL into the TruStake liquid staking vault. It covers both programmatic integration and
CLI usage.

By the end, you'll:

- Understand the whitelist and deposit logic
- Create or reuse an associated TruSOL token account
- Construct and send a Solana transaction using Anchor
- Interact securely with the Stake Pool Program via the Staker Program

## TL;DR

- **Purpose:** Quickly deposit SOL into the TruStake liquid staking vault.
- **Key Steps:**
  - Verify whitelist eligibility.
  - Create or reuse your TruSOL Associated Token Account.
  - Build and execute a deposit instruction using Anchor.
  - Use either programmatic integration or CLI commands.

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
     - [Environment Setup](#environment-setup)
     - [Required Accounts](#required-accounts)
   - [Implementation Steps](#implementation-steps)
     - [Step 1 Create Whitelist PDA](#step-1-create-whitelist-pda)
     - [Step 2 Create/Check TruSOL Token Account](#step-2-createcheck-trusol-token-account)
     - [Step 3 Build Deposit Instruction](#step-3-build-deposit-instruction)
   - [Code Example](#code-example)
     - [Complete Implementation](#complete-implementation)
3. [CLI Usage](#cli-usage)
   - [Quick Start](#quick-start)
   - [Command Arguments](#command-arguments)
   - [Example Output](#example-output)
   - [Troubleshooting](#cli-troubleshooting)
     - [Wallet Issues](#1-wallet-issues)
     - [Whitelist Issues](#2-whitelist-issues)
     - [Transaction Issues](#3-transaction-issues)

## Understanding TruStake Deposits

### System Overview

#### 1. Whitelist

⚠️ Only whitelisted Users will be able to deposit

#### 2. Token Flow

- Users deposit SOL → Receive TruSOL tokens
- TruSOL represents your stake pool share
- The amount of TruSOL minted depends on the share price of the pool
- Deposits can only be made through the Staker program — no direct pool deposits are allowed

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

#### Environment Setup

First, set up your development environment:

```bash
# 1. Install dependencies
bun add @coral-xyz/anchor@0.28.0 @solana/web3.js@1.87.6 @solana/spl-token@0.3.9

# 2. Configure environment
cp .env.example .env
# Edit .env with your settings
```

### Required Accounts

Before depositing, ensure you have:

- A Solana wallet with sufficient SOL
- Whitelist approval for your wallet address
- Access to the correct network (devnet/testnet/mainnet)

### Implementation Steps

#### Step 1: Create Whitelist PDA

To interact with the deposit functionality, first create a user whitelist PDA:

```typescript
import { type Keypair, PublicKey } from "@solana/web3.js";

const stakerProgramId = new PublicKey("6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM");

// Create or load a user keypair from `~/.config/solana/id.json`
const userKeypair = Keypair.generate();

// Generate the whitelist PDA for the user
const [userWhitelistPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("user"), userKeypair.publicKey.toBuffer()],
  stakerProgramId,
);
```

#### Step 2: Create/Check TruSOL Token Account

If the user doesn't have a TruSOL Associated Token Account (ATA), create one using the following instruction. If they
already have an ATA, you can skip this step and proceed to Step 1.

```typescript
const createAccountIx = createAssociatedTokenAccountInstruction(
  userKeypair.publicKey, // payer
  new PublicKey("2uazXTrUaHC4DTxBFH5qM2DXgvb45rPGeegJ3yzLjvAZ"), // associatedToken
  userKeypair.publicKey, // owner
  new PublicKey("Eui9jWw5oqC7PwmJscHr7tDGEgZjA1zng9QW5FSciGr5"), // mint
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
    userPoolTokenAccount: new PublicKey("2uazXTrUaHC4DTxBFH5qM2DXgvb45rPGeegJ3yzLjvAZ"),

    // === Pool Accounts ===

    // The stake pool account that holds the staked SOL.
    stakePool: new PublicKey("EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM"),

    // Account that holds the actual staked SOL.
    poolReserve: new PublicKey("EDKjf7YhYZyZriHrepRZEXNjwAen9aJwqToiWWqKf9yU"),

    // The TruSOL token mint account.
    poolMint: new PublicKey("Eui9jWw5oqC7PwmJscHr7tDGEgZjA1zng9QW5FSciGr5"),

    // === Authority Accounts ===

    // PDA that has authority to deposit SOL into the pool.
    depositAuthority: new PublicKey("BLTSuAqaoaUUjLRVdanFXGBi2fef5pwhKN23kCMVgX2T"),

    // PDA that has authority to withdraw SOL from the pool.
    withdrawAuthority: new PublicKey("68iLP87i7dh6YmjpJuH7gP5dim8QmYxajCBeA8QTKZdG"),

    // === Fee Accounts ===

    // Account that receives protocol fees from deposits.
    feeTokenAccount: new PublicKey("Cgori6oay5WQauFNkctyRcX5musmVhgu3fwxeGPrGwod"),

    // Account that receives referral fees from deposits.
    // Can be the same as the fee token account.
    referralFeeTokenAccount: new PublicKey("Cgori6oay5WQauFNkctyRcX5musmVhgu3fwxeGPrGwod"),

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

**Note:** The addresses shown above are for devnet. For other networks, refer to [addresses.md](./addresses.md).

### Code Example

Here's a simple implementation of the deposit functionality:

```typescript
import { deposit } from "./scripts/deposit";
import { parseSol } from "./utils/format";
import { Keypair } from "@solana/web3.js";

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

## CLI Usage

This section explains how to use the CLI tool for depositing SOL.

### Quick Start

```bash
npx tru-sol deposit <user> <amount>

# Examples
npx tru-sol deposit alice 1.5  # Deposit 1.5 SOL using alice's keypair
npx tru-sol deposit bob 2     # Deposit 2 SOL using bob's keypair
```

### Command Arguments

- `user`: Name of your keypair file (without the .json extension) located in `~/.config/solana/`
- `amount`: Amount of SOL to deposit (can be a decimal number e.g., 1.5)

### Example Output

```bash
User G6sfnEjLSD3X8sGzR4LRoEf7VPb9eBCdufWvkGvtik1m depositing 0.1 SOL...
TruSOL associated token account: 2uazXTrUaHC4DTxBFH5qM2DXgvb45rPGeegJ3yzLjvAZ
Found associated token account. Balance: 0.685849831 TruSOL
Deposit tx hash: 5oanfLzWtV4HfGiBrattYXwR95vQL884jVVmbbZUR9EQTwh2cFTyBrggGnAbhouXoRtFDpoBMcQWzfHb4w7Fp4tQ
```

### CLI Troubleshooting

Common errors and solutions:

#### 1. Wallet Issues

- Missing keypair file → Check file exists in `~/.config/solana/`
- Invalid format → Ensure keypair file is valid JSON
- Insufficient SOL → Fund wallet with more SOL

#### 2. Whitelist Issues

- Not whitelisted → Contact support to get whitelisted
- PDA not found → Verify wallet address is correct

#### 3. Transaction Issues

- Network errors → Check connection and retry
- Timeout → Increase transaction timeout
- Signature failure → Verify wallet permissions
