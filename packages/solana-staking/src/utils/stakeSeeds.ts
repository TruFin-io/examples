import { BN } from "@coral-xyz/anchor";
import { randomBytes } from "node:crypto";

import { ValidatorStakeInfo } from "./stake-pool/types";

/**
 * Returns a fresh random u64 seed for a transient or ephemeral stake account.
 *
 * The stake pool program creates these stake accounts at a PDA derived from the seed. If the seed is predictable
 * (always 0, or the last seed plus one), anyone can fund the address ahead of time ("poison" it) so that the stake
 * pool program can no longer create its stake account there, and the deposit is blocked. A random seed cannot be
 * guessed in advance, so use a new one on every call.
 *
 * @returns A random 64-bit seed
 */
export function randomStakeSeed(): BN {
  return new BN(randomBytes(8));
}

/**
 * Returns the transient stake seed recorded for a validator in the stake pool's validator list
 * (`transient_seed_suffix`). It is the seed of the validator's transient stake account that is in flight, or of the
 * last one if none is in flight.
 *
 * The seed is a random 64-bit value, so it is kept as a BN: a JS number would lose precision.
 *
 * @param validator - The validator's entry in the stake pool's validator list
 * @returns The recorded transient stake seed
 */
export function recordedTransientStakeSeed(validator: ValidatorStakeInfo): BN {
  // borsh returns a BN at runtime although the field is typed bigint; a string round-trip works for both
  return new BN(validator.transient_seed_suffix.toString());
}

/**
 * Returns the transient stake seed to pass when depositing to a specific validator.
 *
 * - While the validator has transient stake in flight (`transient_stake_lamports` is not 0), the stake pool program
 *   only accepts the seed recorded in the validator list, so that seed is returned.
 * - Otherwise a fresh random seed is returned (see `randomStakeSeed` for why it must not be predictable).
 *
 * The validator list must be current: if a transient stake account is created or merged before the transaction lands,
 * the stake pool program rejects it with `InvalidSeeds`, and the transaction should be rebuilt from a fresh list.
 *
 * @param validator - The validator's entry in the stake pool's validator list
 * @returns The transient stake seed to use
 */
export function transientStakeSeedFor(validator: ValidatorStakeInfo): BN {
  const hasTransientStake = !new BN(validator.transient_stake_lamports.toString()).isZero();
  return hasTransientStake ? recordedTransientStakeSeed(validator) : randomStakeSeed();
}
