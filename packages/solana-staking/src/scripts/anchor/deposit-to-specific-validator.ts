import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, BN, Program, Wallet } from "@coral-xyz/anchor";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";

import type { Staker } from "../../idl/staker";
import * as constants from "../../utils/constants";
import { formatSol } from "../../utils/format";
import { getConnection } from "../../utils/getConnection";
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
  amount: BN,
): Promise<string> {
  console.log(
    `User ${userKeypair.publicKey} depositing ${formatSol(Number(amount))} SOL to validator ${validatorVoteAccount}`,
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
    constants.POOL_MINT,
  );

  // Derive the transient stake account PDA
  const [transientStakeAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("transient"),
      validatorVoteAccount.toBuffer(),
      constants.STAKE_POOL_ACCOUNT.toBuffer(),
      new BN(constants.TRANSIENT_STAKE_SEED).toArrayLike(Buffer, "le", 8),
    ],
    constants.STAKE_POOL_PROGRAM_ID,
  );

  // Derive the validator stake account PDA
  const [validatorStakeAccount] = PublicKey.findProgramAddressSync(
    [validatorVoteAccount.toBuffer(), constants.STAKE_POOL_ACCOUNT.toBuffer()],
    constants.STAKE_POOL_PROGRAM_ID,
  );

  const ix = await program.methods
    .depositToSpecificValidator(amount)
    .accounts({
      // === User Accounts ===
      user: userKeypair.publicKey,
      userPoolTokenAccount: userPoolTokenATA,

      // === Stake Accounts ===
      ephemeralStakeAccount: constants.EPHEMERAL_STAKE_ACCOUNT,
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
      feeTokenAccount: constants.FEE_TOKEN_ACCOUNT,
      referralFeeTokenAccount: constants.REFERRAL_FEE_TOKEN_ACCOUNT,

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
