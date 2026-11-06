import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, BN, Program, Wallet } from "@coral-xyz/anchor";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";

import type { Staker } from "../../idl/staker";
import * as constants from "../../utils/constants";
import { decodeValidatorListAccount } from "../../utils/decodeValidatorListAccount";
import { findEphemeralStakeAccount } from "../../utils/findEphemeralStakeAccount";
import { findTransientStakeAccount } from "../../utils/findTransientStakeAccount";
import { findValidatorStakeAccount } from "../../utils/findValidatorStakeAccount";
import { formatSol } from "../../utils/format";
import { getConnection } from "../../utils/getConnection";
import { randomStakeSeed, transientStakeSeedFor } from "../../utils/stakeSeeds";
import { getOrCreateTruSOLAssociatedTokenAccountInstruction } from "../shared";

/**
 * Deposits SOL into a stake account of a specific validator.
 * If the user does not have a TruSOL associated token account, it will be created.
 *
 * @param userKeypair - The keypair of the user making the deposit
 * @param validatorVoteAccount - The vote account of the validator to deposit to
 * @param amount - The amount of SOL to deposit in lamports (1 SOL = 1e9 lamports)
 * @returns The transaction hash of the deposit
 */
export async function depositToSpecificValidator(
  userKeypair: Keypair,
  validatorVoteAccount: PublicKey,
  amount: BN
): Promise<string> {
  console.log(
    `User ${userKeypair.publicKey} depositing ${formatSol(Number(amount))} SOL to validator ${validatorVoteAccount}`
  );

  // Get the Solana connection
  const connection = getConnection();

  // Configure the Solana connection and Anchor provider
  const provider = new AnchorProvider(connection, new Wallet(userKeypair), { commitment: "confirmed" });
  anchor.setProvider(provider);

  // Load the program deployed at the specified address
  const program = await Program.at<Staker>(constants.STAKER_PROGRAM_ID, provider);

  // Check if the user has a TruSOL associated token account, if not, create one
  const { userPoolTokenATA, tokenAccount, createAccountIx } = await getOrCreateTruSOLAssociatedTokenAccountInstruction(
    connection,
    userKeypair.publicKey,
    constants.POOL_MINT
  );

  // Look up the validator in the stake pool's validator list to get its stake account seeds
  const validatorList = await decodeValidatorListAccount();
  const validator = validatorList.validators.find((v) => v.vote_account_address?.equals(validatorVoteAccount));
  if (!validator) {
    throw new Error(`Validator ${validatorVoteAccount} is not in the stake pool's validator list`);
  }

  // Derive the validator stake account PDA
  const validatorStakeAccount = findValidatorStakeAccount(validatorVoteAccount, validator.validator_seed_suffix);

  // Pick the transient stake seed: the recorded one while transient stake is in flight, a random one otherwise
  const transientSeed = transientStakeSeedFor(validator);
  const transientStakeAccount = findTransientStakeAccount(validatorVoteAccount, transientSeed);

  // Pick a fresh random ephemeral stake seed for every deposit
  const ephemeralSeed = randomStakeSeed();
  const ephemeralStakeAccount = findEphemeralStakeAccount(ephemeralSeed);

  const ix = await program.methods
    .depositToSpecificValidator(amount, transientSeed, ephemeralSeed)
    .accounts({
      // === User Accounts ===
      user: userKeypair.publicKey,
      userPoolTokenAccount: userPoolTokenATA,

      // === Stake Accounts ===
      ephemeralStakeAccount: ephemeralStakeAccount,
      transientStakeAccount: transientStakeAccount,
      validatorStakeAccount: validatorStakeAccount,

      // === Validator Accounts ===
      validatorVoteAccount: validatorVoteAccount,
      validatorList: constants.STAKE_POOL_VALIDATOR_LIST,

      // === Pool Accounts ===
      stakePool: constants.STAKE_POOL_ACCOUNT,
      poolReserve: constants.POOL_RESERVE,
      poolMint: constants.POOL_MINT,

      // === Authority Accounts ===
      depositAuthority: constants.DEPOSIT_AUTHORITY,
      withdrawAuthority: constants.WITHDRAW_AUTHORITY,

      // === Fee Accounts ===
      feeTokenAccount: constants.MANAGER_FEE_ACCOUNT,
      referralFeeTokenAccount: constants.MANAGER_FEE_ACCOUNT,

      // === Program Accounts ===
      program: constants.STAKER_PROGRAM_ID,
    })
    .instruction();

  const transaction = new Transaction();

  // Build the transaction with the create account instruction if needed
  if (!tokenAccount && createAccountIx) {
    console.log("Adding instruction to create the associated token account");
    transaction.add(createAccountIx);
  }

  transaction.add(ix);

  const txHash = await provider.sendAndConfirm(transaction, [userKeypair]);
  return txHash;
}
