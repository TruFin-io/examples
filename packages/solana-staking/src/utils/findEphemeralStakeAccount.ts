import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import * as constants from "./constants";

/**
 * Derives the stake pool's ephemeral stake account PDA.
 *
 * The ephemeral stake account is a short-lived account the stake pool program uses while moving stake to a validator.
 * It is shared by the whole pool (not per validator) and its address depends on a u64 seed, always appended as
 * 8 little-endian bytes. Use a fresh `randomStakeSeed` on every call so the address is never fixed.
 *
 * @param ephemeralSeed - The ephemeral stake seed (u64)
 * @returns The pool's ephemeral stake account PDA for that seed
 */
export function findEphemeralStakeAccount(ephemeralSeed: BN): PublicKey {
  const [ephemeralStakeAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("ephemeral"), constants.STAKE_POOL_ACCOUNT.toBuffer(), ephemeralSeed.toArrayLike(Buffer, "le", 8)],
    constants.STAKE_POOL_PROGRAM_ID
  );
  return ephemeralStakeAccount;
}
