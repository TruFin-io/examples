import { PublicKey } from "@solana/web3.js";

import * as constants from "./constants";

/**
 * Derives the stake pool's active stake account PDA for a validator.
 *
 * The validator seed is the `validator_seed_suffix` stored for the validator in the stake pool's validator list.
 * It is a u32 where 0 means "no seed": a seed of 0 adds no bytes to the PDA seeds, and any other value is appended
 * as 4 little-endian bytes. This differs from the transient and ephemeral stake account seeds, which are u64 and
 * always appended as 8 bytes.
 *
 * @param validatorVoteAccount - The vote account of the validator
 * @param validatorSeed - The validator's `validator_seed_suffix` from the validator list
 * @returns The validator's active stake account PDA
 */
export function findValidatorStakeAccount(validatorVoteAccount: PublicKey, validatorSeed: number): PublicKey {
  const seeds = [validatorVoteAccount.toBuffer(), constants.STAKE_POOL_ACCOUNT.toBuffer()];
  if (validatorSeed !== 0) {
    const seedBytes = Buffer.alloc(4);
    seedBytes.writeUInt32LE(validatorSeed);
    seeds.push(seedBytes);
  }

  const [validatorStakeAccount] = PublicKey.findProgramAddressSync(seeds, constants.STAKE_POOL_PROGRAM_ID);
  return validatorStakeAccount;
}
