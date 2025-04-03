import { BN } from "@coral-xyz/anchor";
import {
  type Account,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { Keypair, PublicKey, Transaction, TransactionInstruction, sendAndConfirmTransaction } from "@solana/web3.js";

import { DepositInstruction } from "../../types";
import * as constants from "../../utils/constants";
import { formatSol } from "../../utils/format";
import { getConnection } from "../../utils/getConnection";

/**
 * Deposits SOL into the pool reserve account.
 * If the user does not have a TruSOL associated token account, it will be created.
 *
 * @param userKeypair - The keypair of the user making the deposit
 * @param amount - The amount of SOL to deposit in lamports (1 SOL = 1e9 lamports)
 * @returns The transaction hash of the deposit
 */
export async function deposit(userKeypair: Keypair, amount: BN): Promise<string> {
  console.log(`User ${userKeypair.publicKey} depositing ${formatSol(amount)} SOL`);

  // Get the Solana connection
  const connection = getConnection();
  const recentBlockhash = await connection.getLatestBlockhash();

  // These accounts will stay the same
  const stakerProgramId = new PublicKey(constants.STAKER_PROGRAM_ID);
  const stakePoolAccount = new PublicKey(constants.STAKE_POOL_ACCOUNT);
  const withdrawAuthority = new PublicKey(constants.WITHDRAW_AUTHORITY);
  const depositAuthority = new PublicKey(constants.DEPOSIT_AUTHORITY);
  const poolReserve = new PublicKey(constants.POOL_RESERVE);
  const feeTokenAccount = new PublicKey(constants.FEE_TOKEN_ACCOUNT);
  const referralFeeTokenAccount = new PublicKey(constants.REFERRAL_FEE_TOKEN_ACCOUNT);
  const poolMint = new PublicKey(constants.POOL_MINT);
  const accessPda = new PublicKey(constants.ACCESS_PDA);
  const eventAuthority = new PublicKey(constants.EVENT_AUTHORITY);
  const systemProgramId = new PublicKey(constants.SYSTEM_PROGRAM_ID);
  const tokenProgramId = new PublicKey(constants.TOKEN_PROGRAM_ID);
  const stakePoolProgramId = new PublicKey(constants.STAKE_POOL_PROGRAM_ID);

  // Get the user's TruSOL ATA
  const userPoolTokenATA = getAssociatedTokenAddressSync(poolMint, userKeypair.publicKey);

  // Get the user's whitelist PDA
  const [userWhitelistPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), userKeypair.publicKey.toBuffer()],
    stakerProgramId,
  );

  let createAccountIx: TransactionInstruction | undefined;
  let tokenAccount: Account | undefined;

  // Check if the user has a TruSOL associated token account, if not, create one
  try {
    console.log("TruSOL associated token account: ", userPoolTokenATA.toBase58());
    tokenAccount = await getAccount(connection, userPoolTokenATA);
    console.log("Found associated token account. Balance: ", formatSol(new BN(Number(tokenAccount.amount))), "TruSOL");
  } catch (error) {
    console.log("TruSOL associated token account not found");
    console.log("Creating TruSOL associated token account at address", userPoolTokenATA.toBase58());

    createAccountIx = createAssociatedTokenAccountInstruction(
      userKeypair.publicKey,
      userPoolTokenATA,
      userKeypair.publicKey,
      poolMint,
    );
  }

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
        pubkey: accessPda,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: stakePoolAccount,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: depositAuthority,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: withdrawAuthority,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: poolReserve,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: userPoolTokenATA,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: feeTokenAccount,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: poolMint,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: referralFeeTokenAccount,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: tokenProgramId,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: stakePoolProgramId,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: systemProgramId,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: eventAuthority,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: stakerProgramId,
        isSigner: false,
        isWritable: false,
      },
    ],
    programId: stakerProgramId,
    data: new DepositInstruction(BigInt(amount.toString())).toBuffer(),
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
