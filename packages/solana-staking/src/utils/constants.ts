export const GLOBAL_NAMESPACE = "global" as const;

export const RPC_URI_MAINNET = "https://api.mainnet-beta.solana.com";

/// Note: All the addresses below are for the mainnet. Also listed in `src/docs/addresses.md` ///

export const STAKE_POOL_PROGRAM_ID = "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy";

// === Pool Accounts ===

// The stake pool account that holds the staked SOL.
export const STAKE_POOL_ACCOUNT = "EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM";

// Account that holds the actual staked SOL.
export const POOL_RESERVE = "EDKjf7YhYZyZriHrepRZEXNjwAen9aJwqToiWWqKf9yU";

// The TruSOL token mint account.
export const POOL_MINT = "6umRHtiuBd1PC6HQhfH9ioNsqY4ihZncZXNPiGu3d3rN";

// === Authority Accounts ===

// PDA that has authority to deposit SOL into the pool.
export const DEPOSIT_AUTHORITY = "BLTSuAqaoaUUjLRVdanFXGBi2fef5pwhKN23kCMVgX2T";

// PDA that has authority to withdraw SOL from the pool.
export const WITHDRAW_AUTHORITY = "Gq5an4FHyTght92zUF1RjNoZ8Pms7md7hRfGVHeswZku";

// PDA that has authority to emit events.
export const EVENT_AUTHORITY = "7HUhwJvRThjcbBme9fhdvbqyvfZ5MhZGuxm5hEkZFLhY";

// === Fee Accounts ===

// Account that receives protocol fees from deposits.
export const FEE_TOKEN_ACCOUNT = "5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod";

// Account that receives referral fees from deposits.
// Can be the same as the fee token account.
export const REFERRAL_FEE_TOKEN_ACCOUNT = "5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod";

// === System Accounts ===

// PDA that has access to the stake pool account.
export const ACCESS_PDA = "EXcdEB4Sy1ikfsXDdLRK9h8ZjgT6pyhq1o98RM7eeYr";

// Required for token operations (minting, transfers).
export const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

// The Staker program that's executing this instruction.
export const STAKER_PROGRAM_ID = "6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM";

// Required for account creation and rent exemption.
export const SYSTEM_PROGRAM_ID = "11111111111111111111111111111111";
