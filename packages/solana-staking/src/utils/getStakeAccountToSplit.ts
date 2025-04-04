import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import * as constants from "./constants";
import { decodeValidatorListAccount } from "./decodeValidatorListAccount";
import { getConnection } from "./getConnection";
import { getMinLamportsOnStakeAccount } from "./getMinLamportsOnStakeAccount";
import { StakePool } from "./stake-pool/types";

/*
 * Given a validatorVoteAccount, determines what stake account should be used in the WithdrawStake instruction to split the stake.
 * Returns the stake account to split, or undefined if no suitable account is found.
 * Depending on the balance of the stake accounts in the pool, the account returned can be an active stake account, a transient stake account, or the pool reserve account.
 * The user can withdraw from a transient account only if the active stake accounts for all validators are at minimum balance.
 * The user can withdraw from the reserve account only if all active stake accounts and transient accounts are at minimum balance.
 */
export async function getStakeAccountToSplit(
  stakePool: StakePool,
  validatorVoteAccount: PublicKey,
  expectedSOL: number,
  sharePrice: number,
): Promise<PublicKey | undefined> {
  const connection = getConnection();

  // Derive the validator stake account
  const [validatorStakeAccount] = PublicKey.findProgramAddressSync(
    [validatorVoteAccount.toBuffer(), constants.STAKE_POOL_ACCOUNT.toBuffer()],
    constants.STAKE_POOL_PROGRAM_ID,
  );
  console.log("Validator stake account:", validatorStakeAccount.toBase58());

  // Derive the transient stake account
  const [transientStakeAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("transient"),
      validatorVoteAccount.toBuffer(),
      constants.STAKE_POOL_ACCOUNT.toBuffer(),
      new BN(constants.TRANSIENT_STAKE_SEED).toArrayLike(Buffer, "le", 8),
    ],
    constants.STAKER_PROGRAM_ID,
  );
  console.log("Transient stake account:", transientStakeAccount.toBase58());

  // Get the balance of the validator stake account
  const stakeAccountBalance = await connection.getBalance(validatorStakeAccount);
  const minLamportsOnStakeAccount = await getMinLamportsOnStakeAccount();

  // If the validator stake account has sufficient balance to withdraw return it
  if (expectedSOL <= stakeAccountBalance - minLamportsOnStakeAccount) {
    console.log("Withdrawing from validator stake account:", validatorStakeAccount.toBase58());
    console.log(
      `Validator stake account has sufficient balance to withdraw. expectedSOL: ${expectedSOL} stakeAccountBalance: ${stakeAccountBalance} minLamportsOnStakeAccount: ${minLamportsOnStakeAccount}`,
    );
    return validatorStakeAccount;
  }

  // If the validator stake account has active stake, return it
  if (stakeAccountBalance > minLamportsOnStakeAccount) {
    const availableToWithdraw = stakeAccountBalance - minLamportsOnStakeAccount;
    const withdrawFee =
      Number(stakePool.stakeWithdrawalFee.numerator) / Number(stakePool.stakeWithdrawalFee.denominator);
    const maxTruSol = Math.round((availableToWithdraw * (1 + withdrawFee)) / sharePrice);

    // Log some withdrawal information about from this validator
    console.log("Selected validator stake account has active balance that needs to be withdrawn first.");
    console.log(
      `stakeAccountBalance: ${stakeAccountBalance} availableToWithdraw: ${availableToWithdraw} expectedSOL: ${expectedSOL} minLamportsOnStakeAccount: ${minLamportsOnStakeAccount}`,
    );
    console.log(`Uer max Withdraw: ${maxTruSol} TruSOL (${availableToWithdraw} SOL + ${withdrawFee}% withdraw fee)`);
    return validatorStakeAccount;
  }

  // Find validators with active stake above min stake account balance
  const validators = await decodeValidatorListAccount();
  const validatorsWithStake = validators.validators.filter((validator) => {
    return Number(validator.active_stake_lamports) > minLamportsOnStakeAccount;
  });

  // If any validators have active stake to withdraw return no account to split
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

  // Check if the transient account has sufficient balance and if so return it
  const transientAccountBalance = await connection.getBalance(transientStakeAccount);
  if (expectedSOL <= transientAccountBalance - minLamportsOnStakeAccount) {
    console.log("Withdrawing from transient stake account:", transientStakeAccount.toBase58());
    return transientStakeAccount;
  }

  // Find validators with transient stake
  const validatorsWithTransientStake = validators.validators.filter((validator) => {
    return Number(validator.transient_stake_lamports) > minLamportsOnStakeAccount;
  });

  // If there are validators with transient stake, log the validators and return undefined
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

  // If all stake and transient accounts are at min balance try to withdraw from the reserve account
  console.log("Trying to withdraw from the reserve account.", stakePool.reserveStake.toBase58());
  return stakePool.reserveStake;
}
