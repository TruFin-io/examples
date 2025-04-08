import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, BN, Program, Wallet } from "@coral-xyz/anchor";
import { Keypair, Transaction } from "@solana/web3.js";

import type { Staker } from "../../idl/staker";
import * as constants from "../../utils/constants";
import { formatSol } from "../../utils/format";
import { getConnection } from "../../utils/getConnection";
import { getOrCreateTruSOLAssociatedTokenAccountInstruction } from "../shared";

/**
 * Deposits SOL into the pool reserve account.
 * If the user does not have a TruSOL associated token account, it will be created.
 *
 * @param userKeypair - The keypair of the user making the deposit
 * @param amount - The amount of SOL to deposit in lamports (1 SOL = 1e9 lamports)
 * @returns The transaction hash of the deposit
 */
export async function deposit(userKeypair: Keypair, amount: BN): Promise<string> {
  console.log(`User ${userKeypair.publicKey} depositing ${formatSol(Number(amount))} SOL`);

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

  // Deposit Instruction
  const depositIx = await program.methods
    .deposit(amount)
    .accounts({
      // === User Accounts ===
      user: userKeypair.publicKey,
      userPoolTokenAccount: userPoolTokenATA,

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
    console.log("adding instruction to create the associated token account");
    transaction.add(createAccountIx);
  }

  transaction.add(depositIx);

  const txHash = await provider.sendAndConfirm(transaction, [userKeypair]);
  return txHash;
}
