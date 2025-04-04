import { StakeProgram } from "@solana/web3.js";

import { getConnection } from "./getConnection";

/**
 * Returns the minimum amount of lamports required in a stake account.
 * This is calculated as the maximum of:
 * - The stake minimum delegation (1 SOL on testnet, 1 lamport on devnet/mainnet)
 * - The minimum active stake required for merges (1 SOL)
 * Plus the rent-exempt amount required for the stake account.
 *
 * @returns The minimum amount of lamports required in a stake account
 */
export async function getMinLamportsOnStakeAccount(): Promise<number> {
  const connection = getConnection();

  // Minimum amount of staked lamports required in a validator stake account to allow for merges
  // without a mismatch on credits observed
  const MINIMUM_ACTIVE_STAKE = 1_000_000;

  // Stake minimum delegation, currently 1 SOL in testnet, 1 lamport in devnet and mainnet
  const stakeMinDelegation = await connection.getStakeMinimumDelegation();

  // The minimum delegation must be at least the minimum active stake
  const minDelegation = Math.max(stakeMinDelegation.value, MINIMUM_ACTIVE_STAKE);
  const stakeAccountRent = await connection.getMinimumBalanceForRentExemption(StakeProgram.space);

  // The minimum balance required in a stake account is the minimum delegation plus rent
  return minDelegation + stakeAccountRent;
}
