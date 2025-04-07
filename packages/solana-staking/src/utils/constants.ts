import { PublicKey } from "@solana/web3.js";

export const GLOBAL_NAMESPACE = "global" as const;

export const RPC_URI_MAINNET = "https://api.mainnet-beta.solana.com";

export const WITHDRAW_STAKE_INSTRUCTION_INDEX = 10;

export const TRANSIENT_STAKE_SEED = 0;

/// Note: All the addresses below are for the mainnet. Also listed in `src/docs/addresses.md` ///

// The stake pool program ID.
export const STAKE_POOL_PROGRAM_ID = new PublicKey("SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy");

// PDA that holds the validator list.
export const STAKE_POOL_VALIDATOR_LIST = new PublicKey("8M7ZbLikHJdeU6iKzZxWJ8zHy1ozX65Zk2GBVcmFVnXe");

// PDA that holds the stake pool manager fee account.
export const STAKE_POOL_MANAGER_FEE_ACCOUNT = new PublicKey("5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod");

// === Pool Accounts ===

// The stake pool account that holds the staked SOL.
export const STAKE_POOL_ACCOUNT = new PublicKey("EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM");

// Account that holds the actual staked SOL.
export const POOL_RESERVE = new PublicKey("EDKjf7YhYZyZriHrepRZEXNjwAen9aJwqToiWWqKf9yU");

// The TruSOL token mint account.
export const POOL_MINT = new PublicKey("6umRHtiuBd1PC6HQhfH9ioNsqY4ihZncZXNPiGu3d3rN");

// === Authority Accounts ===

// PDA that has authority to deposit SOL into the pool.
export const DEPOSIT_AUTHORITY = new PublicKey("BLTSuAqaoaUUjLRVdanFXGBi2fef5pwhKN23kCMVgX2T");

// PDA that has authority to withdraw SOL from the pool.
export const WITHDRAW_AUTHORITY = new PublicKey("Gq5an4FHyTght92zUF1RjNoZ8Pms7md7hRfGVHeswZku");

// PDA that has authority to emit events.
export const EVENT_AUTHORITY = new PublicKey("7HUhwJvRThjcbBme9fhdvbqyvfZ5MhZGuxm5hEkZFLhY");

// === Fee Accounts ===

// Account that receives protocol fees from deposits.
export const FEE_TOKEN_ACCOUNT = new PublicKey("5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod");

// Account that receives referral fees from deposits.
// Can be the same as the fee token account.
export const REFERRAL_FEE_TOKEN_ACCOUNT = new PublicKey("5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod");

// === System Accounts ===

// PDA that holds information on whether the Staker program is paused or not and other staker program state.
export const ACCESS_PDA = new PublicKey("EXcdEB4Sy1ikfsXDdLRK9h8ZjgT6pyhq1o98RM7eeYr");

// Required for token operations (minting, transfers).
export const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

// The Staker program that's executing this instruction.
export const STAKER_PROGRAM_ID = new PublicKey("6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM");

// Required for account creation and rent exemption.
export const SYSTEM_PROGRAM_ID = new PublicKey("11111111111111111111111111111111");

// === Sysvars ===

export const CLOCK_SYSVAR = new PublicKey("SysvarC1ock11111111111111111111111111111111");

// === Stake Program ===

export const STAKE_PROGRAM_ID = new PublicKey("Stake11111111111111111111111111111111111111");

export const STAKE_PROGRAM_SPACE = 200;
