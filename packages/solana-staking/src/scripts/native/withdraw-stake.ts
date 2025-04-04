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

import * as constants from "../../utils/constants";
import { formatSol } from "../../utils/format";
import { getConnection } from "../../utils/getConnection";
import { getMinLamportsOnStakeAccount } from "../../utils/getMinLamportsOnStakeAccount";
import { getStakeAccountToSplit } from "../../utils/getStakeAccountToSplit";
import { getStakePool } from "../../utils/stake-pool";

/**
 * Withdraws stake from the validator.
 * If the user does not have a TruSOL associated token account, it will be created.
 *
 * @param userKeypair - The keypair of the user making the deposit
 * @param validatorVoteAccount - The validator to withdraw from
 * @param amount - The amount of TruSOL to withdraw in lamports (1 SOL = 1e9 lamports)
 * @returns The transaction hash of the deposit
 */
export async function withdrawStake(
  userKeypair: Keypair,
  validatorVoteAccount: PublicKey,
  amount: BN,
): Promise<string | undefined> {
  console.log(
    `User ${userKeypair.publicKey} withdrawing ${formatSol(Number(amount))} SOL from validator ${validatorVoteAccount}`,
  );

  // Get the Solana connection
  const connection = getConnection();

  // Configure the Solana connection and Anchor provider
  const provider = new AnchorProvider(connection, new Wallet(userKeypair), { commitment: "confirmed" });
  anchor.setProvider(provider);

  // Fetch the stake pool and calculate the share price
  const stakePool = await getStakePool(connection, constants.STAKE_POOL_ACCOUNT);
  const totalLamports = new anchor.BN(stakePool.totalLamports.toString()).toNumber();
  const poolTokenSupply = new anchor.BN(stakePool.poolTokenSupply.toString()).toNumber();
  const sharePrice = Math.floor((totalLamports * 1e9) / poolTokenSupply) / 1e9;
  console.log("Share price:", sharePrice);

  // Calculate the expected SOL that will be withdrawn
  const expectedSOL = Math.round(amount.toNumber() * sharePrice);
  console.log(`Withdrawing ${amount} TruSOL. Expecting to withdraw ${expectedSOL} staked SOL`);

  // Check that the expected SOL is above the minimum withdrawal amount required by the new stake account
  // that will be created to receive the withdrawn stake
  const minLamportsOnStakeAccount = await getMinLamportsOnStakeAccount();
  const stakeWithdrawalFee =
    (BigInt(100) * stakePool.stakeWithdrawalFee.numerator) / stakePool.stakeWithdrawalFee.denominator;
  console.log(`withdraw fee: ${Number(stakeWithdrawalFee)}%`);

  const minSolWithdrawalBeforeFees = Math.round(minLamportsOnStakeAccount / (1 - Number(stakeWithdrawalFee) / 100));
  console.log("Min SOL to leave on stake account:", minLamportsOnStakeAccount);
  console.log("Min SOL to withdraw (before fees):", minSolWithdrawalBeforeFees);

  if (expectedSOL < minSolWithdrawalBeforeFees) {
    const minTruSOLBeforeFees = Math.round(minSolWithdrawalBeforeFees / sharePrice);

    console.error("Withdraw amount too low");
    console.error("Expected SOL: ", expectedSOL, `${expectedSOL / LAMPORTS_PER_SOL} SOL`);
    console.error(
      "Min SOL withdrawal (before fees):",
      minSolWithdrawalBeforeFees,
      `${minSolWithdrawalBeforeFees / LAMPORTS_PER_SOL} SOL`,
    );
    console.error(
      "Min TruSOL withdrawal (before fees):",
      minTruSOLBeforeFees,
      `${Math.round(minTruSOLBeforeFees) / LAMPORTS_PER_SOL} TruSOL`,
    );
    return;
  }

  // Find the stake account to withdraw from.
  const stakeAccountToSplit = await getStakeAccountToSplit(stakePool, validatorVoteAccount, expectedSOL, sharePrice);

  if (!stakeAccountToSplit) {
    console.error("No stake account to split found.");
    return;
  }

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

  // Derive the user's TruSOL ATA
  const userPoolTokenATA = await getAssociatedTokenAddress(
    constants.POOL_MINT,
    userKeypair.publicKey, // Owner (user)
  );

  // Construct the WithdrawSol instruction
  const withdrawStakeIx = new TransactionInstruction({
    programId: constants.STAKER_PROGRAM_ID,
    keys: [
      {
        pubkey: constants.STAKE_POOL_ACCOUNT,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.STAKE_POOL_VALIDATOR_LIST,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.STAKE_POOL_WITHDRAW_AUTHORITY, // Stake pool withdraw authority
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: stakeAccountToSplit, // Validator stake, validator transient account, or pool reserve account to split
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: newStakeAccount.publicKey,
        isSigner: false,
        isWritable: true,
      },
      { pubkey: userKeypair.publicKey, isSigner: false, isWritable: false },
      { pubkey: userKeypair.publicKey, isSigner: true, isWritable: false },
      { pubkey: userPoolTokenATA, isSigner: false, isWritable: true },
      {
        pubkey: stakePool.managerFeeAccount,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.POOL_MINT,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.CLOCK_SYSVAR,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: constants.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: constants.STAKE_PROGRAM_ID, isSigner: false, isWritable: false },
    ],
    data: Buffer.concat([
      Buffer.from(Uint8Array.of(10)), // Instruction index for WithdrawStake
      amount.toArrayLike(Buffer, "le", 8), // Withdraw amount of TruSOL (u64)
    ]),
  });

  // send the transaction with the instructions to create the stake account and WithdrawStake
  console.log(
    `Withdrawing ${Number(
      amount,
    )} TruSOL from ${validatorVoteAccount.toBase58()} to stake account ${newStakeAccount.publicKey.toBase58()}`,
  );
  const transaction = new Transaction().add(createAccountIx).add(withdrawStakeIx);

  const tx = await provider.sendAndConfirm(transaction, [userKeypair, newStakeAccount]);
  console.log("Tx hash:", tx);
}
