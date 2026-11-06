import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import * as constants from "./constants";

/**
 * Derives the stake pool's transient stake account PDA for a validator.
 *
 * The transient stake account holds a validator's stake while it activates or deactivates, until epoch maintenance
 * merges it into the validator's stake account. Its address depends on a u64 seed, always appended as 8 little-endian
 * bytes. Use `transientStakeSeedFor` to pick the seed for a deposit, and `recordedTransientStakeSeed` to find the
 * transient stake account currently in flight.
 *
 * @param validatorVoteAccount - The vote account of the validator
 * @param transientSeed - The transient stake seed (u64)
 * @returns The validator's transient stake account PDA for that seed
 */
export function findTransientStakeAccount(validatorVoteAccount: PublicKey, transientSeed: BN): PublicKey {
  const [transientStakeAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("transient"),
      validatorVoteAccount.toBuffer(),
      constants.STAKE_POOL_ACCOUNT.toBuffer(),
      transientSeed.toArrayLike(Buffer, "le", 8),
    ],
    constants.STAKE_POOL_PROGRAM_ID
  );
  return transientStakeAccount;
}
