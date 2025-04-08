import { PublicKey } from "@solana/web3.js";

export const GLOBAL_NAMESPACE = "global" as const;

export const RPC_URI_MAINNET = "https://api.devnet.solana.com";

export const TRANSIENT_STAKE_SEED = 0;

export const EPHEMERAL_STAKE_SEED = 0;

/// Note: All the addresses below are for the mainnet. Also listed in `src/docs/addresses.md` ///

// The stake pool program ID.
export const STAKE_POOL_PROGRAM_ID = new PublicKey("5d33x6gSAps926kRDBuM4DwXXZq3sJrVU9tsH5ReTXpE");

// PDA that holds the validator list.
export const STAKE_POOL_VALIDATOR_LIST = new PublicKey("8M7ZbLikHJdeU6iKzZxWJ8zHy1ozX65Zk2GBVcmFVnXe");

// === Stake Accounts ===

// PDA that holds the ephemeral stake account.
export const EPHEMERAL_STAKE_ACCOUNT = new PublicKey("7eJqx2aAV5ZEVBHjM3HHmQLcDqQPqcgiz2audV2yoFz9");

// === Pool Accounts ===

// The stake pool account that holds the staked SOL.
export const STAKE_POOL_ACCOUNT = new PublicKey("EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM");

// Account that holds the actual staked SOL.
export const POOL_RESERVE = new PublicKey("EDKjf7YhYZyZriHrepRZEXNjwAen9aJwqToiWWqKf9yU");

// The TruSOL token mint account.
export const POOL_MINT = new PublicKey("Eui9jWw5oqC7PwmJscHr7tDGEgZjA1zng9QW5FSciGr5");

// === Authority Accounts ===

// PDA that has authority to manage the staker program.
export const STAKER_AUTHORITY = new PublicKey("3Gu6VvL43rRGUodheyitHuYGqsT7qLkuYjwjwC9V2mTU");

// PDA that has authority to deposit SOL into the pool.
export const DEPOSIT_AUTHORITY = new PublicKey("BLTSuAqaoaUUjLRVdanFXGBi2fef5pwhKN23kCMVgX2T");

// PDA that has authority to withdraw SOL from the pool.
export const WITHDRAW_AUTHORITY = new PublicKey("68iLP87i7dh6YmjpJuH7gP5dim8QmYxajCBeA8QTKZdG");

// PDA that has authority to emit events.
export const EVENT_AUTHORITY = new PublicKey("7HUhwJvRThjcbBme9fhdvbqyvfZ5MhZGuxm5hEkZFLhY");

// === Fee Accounts ===

// Account that receives protocol fees from deposits.
export const MANAGER_FEE_ACCOUNT = new PublicKey("Cgori6oay5WQauFNkctyRcX5musmVhgu3fwxeGPrGwod");

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

export const STAKE_PROGRAM_SPACE = 200;

export const STAKE_PROGRAM_ID = new PublicKey("Stake11111111111111111111111111111111111111");

export const STAKE_HISTORY_SYSVAR = new PublicKey("SysvarStakeHistory1111111111111111111111111");

export const STAKE_CONFIG_SYSVAR = new PublicKey("StakeConfig11111111111111111111111111111111");
