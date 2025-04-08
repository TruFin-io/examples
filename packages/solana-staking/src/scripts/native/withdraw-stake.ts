import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, BN, Wallet, web3 } from "@coral-xyz/anchor";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import { WithdrawStakeInstruction } from "../../types";
import * as constants from "../../utils/constants";
import { formatSol } from "../../utils/format";
import { getConnection } from "../../utils/getConnection";
import { getMinLamportsOnStakeAccount } from "../../utils/getMinLamportsOnStakeAccount";
import { getStakeAccountToSplit } from "../../utils/getStakeAccountToSplit";
import { getStakePool } from "../../utils/stake-pool";

/**
 * Withdraws stake from the validator.
 * This function allows users to withdraw their staked SOL by burning their TruSOL tokens.
 * The process involves:
 * 1. Calculating the share price and expected SOL amount
 * 2. Validating the minimum withdrawal amount
 * 3. Finding a stake account to split
 * 4. Creating a new stake account
 * 5. Executing the withdrawal instruction
 *
 * @param userKeypair - The keypair of the user making the withdrawal
 * @param validatorVoteAccount - The validator to withdraw from
 * @param amount - The amount of TruSOL to withdraw in lamports (1 SOL = 1e9 lamports)
 * @returns The transaction hash of the withdrawal
 */
export async function withdrawStake(
  userKeypair: Keypair,
  validatorVoteAccount: PublicKey,
  amount: BN
): Promise<string | undefined> {
  // Log the withdrawal request details
  console.log(
    `User ${userKeypair.publicKey} withdrawing ${formatSol(Number(amount))} SOL from validator ${validatorVoteAccount}`
  );

  // ===== SETUP CONNECTION AND PROVIDER =====

  // Get the Solana connection
  const connection = getConnection();

  // Configure the Solana connection and Anchor provider
  const provider = new AnchorProvider(connection, new Wallet(userKeypair), { commitment: "confirmed" });
  anchor.setProvider(provider);

  // ===== CALCULATE SHARE PRICE AND EXPECTED SOL =====

  // Fetch the stake pool and calculate the share price
  const stakePool = await getStakePool(connection, constants.STAKE_POOL_ACCOUNT);
  const totalLamports = new anchor.BN(stakePool.totalLamports.toString()).toNumber();
  const poolTokenSupply = new anchor.BN(stakePool.poolTokenSupply.toString()).toNumber();
  const sharePrice = Math.floor((totalLamports * 1e9) / poolTokenSupply) / 1e9;
  console.log("Share price:", sharePrice);

  // Calculate the expected SOL that will be withdrawn
  const expectedSOL = Math.round(amount.toNumber() * sharePrice);
  console.log(`Withdrawing ${amount} TruSOL. Expecting to withdraw ${expectedSOL} staked SOL`);

  // ===== VALIDATE MINIMUM WITHDRAWAL AMOUNT =====

  // Check that the expected SOL is above the minimum withdrawal amount required by the new stake account
  // that will be created to receive the withdrawn stake
  const minLamportsOnStakeAccount = await getMinLamportsOnStakeAccount();

  // Withdrawal fees as a percentage
  const stakeWithdrawalFee =
    Number(
      (BigInt(constants.FEE_PRECISION) * stakePool.stakeWithdrawalFee.numerator) /
        stakePool.stakeWithdrawalFee.denominator
    ) / constants.FEE_PRECISION;
  console.log(`Stake Withdrawal Fee percentage: ${Number(stakeWithdrawalFee * 100)}%`);

  // Add the expected fees to the `minLamportsOnStakeAccount` to ensure the min lamports requirement in the stake account is fulfilled
  // after the fees are deducted by the pool from the amount withdrawn.
  const minSolWithdrawalBeforeFees = Math.round(
    minLamportsOnStakeAccount + stakeWithdrawalFee * minLamportsOnStakeAccount
  );
  console.log("Expected fee:", Math.round(expectedSOL * stakeWithdrawalFee), "lamports");
  console.log("Min SOL to leave on stake account:", minLamportsOnStakeAccount);
  console.log("Min SOL to withdraw (before fees):", minSolWithdrawalBeforeFees);

  // Validate that the withdrawal amount is sufficient
  if (expectedSOL < minSolWithdrawalBeforeFees) {
    const minTruSOLBeforeFees = Math.round(minSolWithdrawalBeforeFees / sharePrice);

    console.error("Withdraw amount too low");
    console.error("Expected SOL: ", expectedSOL, `${expectedSOL / LAMPORTS_PER_SOL} SOL`);
    console.error(
      "Min SOL withdrawal (before fees):",
      minSolWithdrawalBeforeFees,
      `${minSolWithdrawalBeforeFees / LAMPORTS_PER_SOL} SOL`
    );
    console.error(
      "Min TruSOL withdrawal (before fees):",
      minTruSOLBeforeFees,
      `${Math.round(minTruSOLBeforeFees) / LAMPORTS_PER_SOL} TruSOL`
    );
    throw new Error("Withdraw amount too low");
  }

  // ===== FIND STAKE ACCOUNT TO SPLIT =====

  // Find the stake account to withdraw from
  const stakeAccountToSplit = await getStakeAccountToSplit(stakePool, validatorVoteAccount, expectedSOL, sharePrice);

  if (!stakeAccountToSplit) {
    throw new Error("No stake account to split found.");
  }

  // ===== CREATE NEW STAKE ACCOUNT =====

  // Generate a new stake account to receive the withdrawn stake
  const newStakeAccount = web3.Keypair.generate();

  // Instruction to create the new stake account
  const stakeAccountRent = await provider.connection.getMinimumBalanceForRentExemption(constants.STAKE_PROGRAM_SPACE);
  const createAccountIx = SystemProgram.createAccount({
    fromPubkey: userKeypair.publicKey,
    newAccountPubkey: newStakeAccount.publicKey,
    lamports: stakeAccountRent,
    space: constants.STAKE_PROGRAM_SPACE,
    programId: constants.STAKE_PROGRAM_ID,
  });

  // ===== PREPARE WITHDRAWAL INSTRUCTION =====

  // Derive the user's TruSOL ATA (Associated Token Account)
  const userPoolTokenATA = await getAssociatedTokenAddress(
    constants.POOL_MINT,
    userKeypair.publicKey // Owner (user)
  );

  // Construct the WithdrawStake instruction
  const withdrawStakeIx = new TransactionInstruction({
    programId: constants.STAKE_POOL_PROGRAM_ID,
    keys: [
      {
        pubkey: constants.STAKE_POOL_ACCOUNT, // stake pool account
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.STAKE_POOL_VALIDATOR_LIST, // validator list
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.WITHDRAW_AUTHORITY, // withdraw authority
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: stakeAccountToSplit, // Validator stake, validator transient account, or pool reserve account to split
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: newStakeAccount.publicKey, // New stake account to receive the withdrawn stake
        isSigner: false,
        isWritable: true,
      },
      { pubkey: userKeypair.publicKey, isSigner: false, isWritable: false }, // User account to set as a new withdraw authority
      { pubkey: userKeypair.publicKey, isSigner: true, isWritable: false }, // User transfer authority, for pool token account
      { pubkey: userPoolTokenATA, isSigner: false, isWritable: true }, // User's TruSOL token account
      {
        pubkey: constants.STAKE_POOL_MANAGER_FEE_ACCOUNT, // Fee account to receive pool fee tokens
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.POOL_MINT, // TruSOL token mint
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.CLOCK_SYSVAR, // Clock sysvar for fee calculations
        isSigner: false,
        isWritable: false,
      },
      { pubkey: constants.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // Token program
      { pubkey: constants.STAKE_PROGRAM_ID, isSigner: false, isWritable: false }, // Stake program
    ],
    data: new WithdrawStakeInstruction(amount).toBuffer(), // Serialize the instruction data
  });

  // ===== SEND TRANSACTION =====
  console.log(
    `Withdrawing ${formatSol(
      Number(amount)
    )} TruSOL from ${validatorVoteAccount.toBase58()} to stake account ${newStakeAccount.publicKey.toBase58()}`
  );

  // Create and send the transaction with the instructions to create the stake account and WithdrawStake
  const transaction = new Transaction().add(createAccountIx).add(withdrawStakeIx);

  // Send and confirm the transaction
  const tx = await provider.sendAndConfirm(transaction, [userKeypair, newStakeAccount]);
  console.log("Tx hash:", tx);
  return tx;
}
