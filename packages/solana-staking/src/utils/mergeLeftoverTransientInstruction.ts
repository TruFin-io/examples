import { BN } from "@coral-xyz/anchor";
import { StakePoolInstruction } from "@solana/spl-stake-pool";
import { AccountInfo, ParsedAccountData, PublicKey, TransactionInstruction } from "@solana/web3.js";

import * as constants from "./constants";
import { findTransientStakeAccount } from "./findTransientStakeAccount";
import { findValidatorStakeAccount } from "./findValidatorStakeAccount";
import { getConnection } from "./getConnection";
import { ValidatorList, ValidatorStakeInfo } from "./stake-pool/types";
import { recordedTransientStakeSeed } from "./stakeSeeds";

// The stake program's deactivation epoch for stake that is not deactivating (u64::MAX)
const NOT_DEACTIVATING = "18446744073709551615";

/**
 * Returns an instruction that merges a validator's leftover transient stake account, or `undefined` if there is none.
 *
 * Anyone can run the stake pool's `UpdateValidatorListBalance` with `no_merge` on a validator whose transient stake was
 * activated (or, after a decrease, deactivated) in an earlier epoch. The validator then counts as updated for the epoch
 * with its transient stake account unmerged, and the stake pool program refuses to add to a transient that is not
 * activating this epoch, so deposits to that validator fail for the rest of the epoch. The same permissionless
 * instruction with `no_merge` off, for just that validator, merges it: send it before the deposit, in the same
 * transaction.
 *
 * A validator whose own stake account is deactivating or inactive gets no merge: the stake program would refuse it,
 * and the Staker rejects the deposit with `ValidatorStakeNotActive` (6014).
 *
 * The merge empties the recorded transient seed's address, and a merged seed must never be reused: when this returns
 * an instruction, deposit with a fresh random transient seed (`randomStakeSeed`).
 *
 * @param validatorList - The stake pool's validator list
 * @param validator - The validator's entry in the stake pool's validator list
 * @returns The merge instruction, or `undefined` if the validator has no transient stake that can be merged now
 */
export async function mergeLeftoverTransientInstruction(
  validatorList: ValidatorList,
  validator: ValidatorStakeInfo
): Promise<TransactionInstruction | undefined> {
  if (new BN(validator.transient_stake_lamports.toString()).isZero()) {
    return undefined;
  }

  const connection = getConnection();
  const voteAccount = validator.vote_account_address as PublicKey;
  const validatorStakeAccount = findValidatorStakeAccount(voteAccount, validator.validator_seed_suffix);
  const transientStakeAccount = findTransientStakeAccount(voteAccount, recordedTransientStakeSeed(validator));
  const [{ value: transient }, { value: validatorStake }, { epoch }] = await Promise.all([
    connection.getParsedAccountInfo(transientStakeAccount),
    connection.getParsedAccountInfo(validatorStakeAccount),
    connection.getEpochInfo(),
  ]);
  const delegation = stakeDelegation(transient);
  if (!delegation) {
    return undefined;
  }

  // A transient activating or deactivating this epoch is still in flight: the deposit adds to it at the recorded seed
  const lastChangeEpoch =
    delegation.deactivationEpoch === NOT_DEACTIVATING ? delegation.activationEpoch : delegation.deactivationEpoch;
  if (Number(lastChangeEpoch) >= epoch) {
    return undefined;
  }

  // The stake program only merges into a validator stake that is delegated and not deactivating
  if (stakeDelegation(validatorStake)?.deactivationEpoch !== NOT_DEACTIVATING) {
    return undefined;
  }

  return StakePoolInstruction.updateValidatorListBalance({
    stakePool: constants.STAKE_POOL_ACCOUNT,
    withdrawAuthority: constants.WITHDRAW_AUTHORITY,
    validatorList: constants.STAKE_POOL_VALIDATOR_LIST,
    reserveStake: constants.POOL_RESERVE,
    validatorAndTransientStakePairs: [validatorStakeAccount, transientStakeAccount],
    startIndex: validatorList.validators.indexOf(validator),
    noMerge: false,
  });
}

// The delegation of a parsed stake account, or `undefined` if the account is missing or not delegated
function stakeDelegation(
  account: AccountInfo<Buffer | ParsedAccountData> | null
): { activationEpoch: string; deactivationEpoch: string } | undefined {
  const data = account?.data;
  return data && "parsed" in data ? data.parsed.info?.stake?.delegation : undefined;
}
