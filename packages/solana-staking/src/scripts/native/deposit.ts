import { Keypair, PublicKey, Transaction, TransactionInstruction, sendAndConfirmTransaction } from "@solana/web3.js";

import { DepositInstruction } from "../../types";
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
export async function deposit(userKeypair: Keypair, amount: bigint): Promise<string> {
  console.log(`User ${userKeypair.publicKey} depositing ${formatSol(Number(amount))} SOL`);

  // Get the Solana connection
  const connection = getConnection();
  const recentBlockhash = await connection.getLatestBlockhash();

  // Get the user's whitelist PDA
  const [userWhitelistPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), userKeypair.publicKey.toBuffer()],
    constants.STAKER_PROGRAM_ID
  );

  // Check if the user has a TruSOL associated token account, if not, return the instruction to create one
  const { userPoolTokenATA, tokenAccount, createAccountIx } = await getOrCreateTruSOLAssociatedTokenAccountInstruction(
    connection,
    userKeypair.publicKey,
    constants.POOL_MINT
  );

  const depositIx = new TransactionInstruction({
    keys: [
      {
        pubkey: userKeypair.publicKey,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: userWhitelistPDA,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.ACCESS_PDA,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.STAKE_POOL_ACCOUNT,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.DEPOSIT_AUTHORITY,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.WITHDRAW_AUTHORITY,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.POOL_RESERVE,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: userPoolTokenATA,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.FEE_TOKEN_ACCOUNT,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.POOL_MINT,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.REFERRAL_FEE_TOKEN_ACCOUNT,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: constants.TOKEN_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: constants.STAKE_POOL_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: constants.SYSTEM_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: constants.EVENT_AUTHORITY,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: constants.STAKER_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
    ],
    programId: constants.STAKER_PROGRAM_ID,
    data: new DepositInstruction(amount).toBuffer(),
  });

  const transaction = new Transaction();
  transaction.recentBlockhash = recentBlockhash.blockhash;

  // Build the transaction with the create account instruction if needed
  if (!tokenAccount && createAccountIx) {
    console.log("Adding instruction to create the associated token account");
    transaction.add(createAccountIx);
  }

  transaction.add(depositIx).sign(userKeypair);

  const txHash = await sendAndConfirmTransaction(connection, transaction, [userKeypair]);
  return txHash;
}
