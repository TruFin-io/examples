import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import * as constants from "./constants";
import { decodeValidatorListAccount } from "./decodeValidatorListAccount";
import { getConnection } from "./getConnection";
import { getMinLamportsOnStakeAccount } from "./getMinLamportsOnStakeAccount";
import { StakePool } from "./stake-pool/types";

/**
 * Determines the appropriate stake account to split for a withdrawal operation.
 *
 * This function implements a hierarchical withdrawal strategy that follows these rules:
 * 1. First, try to withdraw from the validator's active stake account if it has sufficient balance
 * 2. If the validator's active stake account has any stake above minimum, use it (even if not enough for full withdrawal)
 * 3. If no validator has active stake above minimum, check for transient stake accounts
 * 4. If no validator has transient stake above minimum, use the pool's reserve account
 *
 * The function ensures that withdrawals follow a consistent pattern to maintain the pool's structure:
 * - Active stake accounts are prioritized over transient accounts
 * - Transient accounts are prioritized over the reserve account
 * - The minimum balance required for each account type is respected
 *
 * @param stakePool - The stake pool account data
 * @param validatorVoteAccount - The validator vote account to withdraw from
 * @param expectedSOL - The amount of SOL expected to be withdrawn (in lamports)
 * @param sharePrice - The current share price of the pool (SOL per TruSOL)
 * @returns The PublicKey of the stake account to split, or undefined if no suitable account is found
 */
export async function getStakeAccountToSplit(
  stakePool: StakePool,
  validatorVoteAccount: PublicKey,
  expectedSOL: number,
  sharePrice: number,
): Promise<PublicKey | undefined> {
  // ===== SETUP AND INITIALIZATION =====
  const connection = getConnection();

  // ===== DERIVE STAKE ACCOUNTS =====

  // Derive the validator's active stake account PDA
  const [validatorStakeAccount] = PublicKey.findProgramAddressSync(
    [validatorVoteAccount.toBuffer(), constants.STAKE_POOL_ACCOUNT.toBuffer()],
    constants.STAKE_POOL_PROGRAM_ID,
  );
  console.log("Validator stake account:", validatorStakeAccount.toBase58());

  // Derive the validator's transient stake account PDA
  const [transientStakeAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("transient"),
      validatorVoteAccount.toBuffer(),
      constants.STAKE_POOL_ACCOUNT.toBuffer(),
      new BN(constants.TRANSIENT_STAKE_SEED).toArrayLike(Buffer, "le", 8),
    ],
    constants.STAKE_POOL_PROGRAM_ID,
  );
  console.log("Transient stake account:", transientStakeAccount.toBase58());

  // ===== CHECK VALIDATOR ACTIVE STAKE ACCOUNT ====

  // Get the balance of the validator's active stake account
  const stakeAccountBalance = await connection.getBalance(validatorStakeAccount);
  const minLamportsOnStakeAccount = await getMinLamportsOnStakeAccount();

  // Case 1: If the validator stake account has sufficient balance for the full withdrawal
  if (expectedSOL <= stakeAccountBalance - minLamportsOnStakeAccount) {
    console.log("Withdrawing from validator stake account:", validatorStakeAccount.toBase58());
    console.log(
      `Validator stake account has sufficient balance to withdraw. expectedSOL: ${expectedSOL} stakeAccountBalance: ${stakeAccountBalance} minLamportsOnStakeAccount: ${minLamportsOnStakeAccount}`,
    );
    return validatorStakeAccount;
  }

  // Case 2: If the validator stake account has any active stake above minimum
  if (stakeAccountBalance > minLamportsOnStakeAccount) {
    const availableToWithdraw = stakeAccountBalance - minLamportsOnStakeAccount;
    const withdrawFee =
      Number(stakePool.stakeWithdrawalFee.numerator) / Number(stakePool.stakeWithdrawalFee.denominator);
    const maxTruSol = Math.round((availableToWithdraw * (1 + withdrawFee)) / sharePrice);

    // Log withdrawal information for this validator
    console.log("Selected validator stake account has active balance that needs to be withdrawn first.");
    console.log(
      `stakeAccountBalance: ${stakeAccountBalance} availableToWithdraw: ${availableToWithdraw} expectedSOL: ${expectedSOL} minLamportsOnStakeAccount: ${minLamportsOnStakeAccount}`,
    );
    console.log(`Uer max Withdraw: ${maxTruSol} TruSOL (${availableToWithdraw} SOL + ${withdrawFee}% withdraw fee)`);
    return validatorStakeAccount;
  }

  // ===== CHECK OTHER VALIDATORS' ACTIVE STAKE =====

  // Find all validators with active stake above minimum balance
  const validators = await decodeValidatorListAccount();
  const validatorsWithStake = validators.validators.filter((validator) => {
    return Number(validator.active_stake_lamports) > minLamportsOnStakeAccount;
  });

  // Case 3: If any validators have active stake, prioritize withdrawing from those first
  if (validatorsWithStake.length > 0) {
    console.log("Found validators with active stake. Withdraw from these validators first.");
    validatorsWithStake.forEach((validator) => {
      console.log(
        `- validator: ${validator.vote_account_address?.toBase58()} stake account: ${
          validator.active_stake_lamports
        } lamports`,
      );
    });
    return undefined;
  }

  console.log("All stake accounts are at minimum balance.");

  // ===== CHECK TRANSIENT STAKE ACCOUNT =====

  // Check if the transient account has sufficient balance for the full withdrawal
  const transientAccountBalance = await connection.getBalance(transientStakeAccount);
  if (expectedSOL <= transientAccountBalance - minLamportsOnStakeAccount) {
    console.log("Withdrawing from transient stake account:", transientStakeAccount.toBase58());
    return transientStakeAccount;
  }

  // ===== CHECK OTHER VALIDATORS' TRANSIENT STAKE =====

  // Find all validators with transient stake above minimum balance
  const validatorsWithTransientStake = validators.validators.filter((validator) => {
    return Number(validator.transient_stake_lamports) > minLamportsOnStakeAccount;
  });

  // Case 4: If any validators have transient stake, prioritize withdrawing from those first
  if (validatorsWithTransientStake.length > 0) {
    console.log("Found validators with transient stake. Withdraw from these validators first.");
    validatorsWithTransientStake.forEach((validator) => {
      console.log(
        `- validator: ${validator.vote_account_address?.toBase58()} transient stake account: ${
          validator.transient_stake_lamports
        } lamports`,
      );
    });
    return undefined;
  }

  console.log("All transient accounts are at minimum balance.");

  // ===== USE RESERVE ACCOUNT AS LAST RESORT =====

  // If all stake and transient accounts are at minimum balance, use the reserve account
  console.log("Trying to withdraw from the reserve account.", stakePool.reserveStake.toBase58());
  return stakePool.reserveStake;
}
