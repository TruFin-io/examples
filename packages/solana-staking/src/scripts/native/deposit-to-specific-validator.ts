import { Keypair, PublicKey, Transaction, TransactionInstruction, sendAndConfirmTransaction } from "@solana/web3.js";
import { BN } from "bn.js";

import { DepositToSpecificValidatorInstruction } from "../../types";
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
  amount: bigint
): Promise<string> {
  console.log(
    `User ${userKeypair.publicKey} depositing ${formatSol(Number(amount))} SOL to validator ${validatorVoteAccount}`
  );

  // Get the Solana connection
  const connection = getConnection();
  const recentBlockhash = await connection.getLatestBlockhash();

  // Get the user's whitelist PDA
  const [userWhitelistPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), userKeypair.publicKey.toBuffer()],
    constants.STAKER_PROGRAM_ID
  );

  // Derive the transient stake account PDA
  const [transientStakeAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("transient"),
      validatorVoteAccount.toBuffer(),
      constants.STAKE_POOL_ACCOUNT.toBuffer(),
      new BN(constants.TRANSIENT_STAKE_SEED).toArrayLike(Buffer, "le", 8),
    ],
    constants.STAKE_POOL_PROGRAM_ID
  );

  // Derive the validator stake account PDA
  const [validatorStakeAccount] = PublicKey.findProgramAddressSync(
    [validatorVoteAccount.toBuffer(), constants.STAKE_POOL_ACCOUNT.toBuffer()],
    constants.STAKE_POOL_PROGRAM_ID
  );

  // Check if the user has a TruSOL associated token account, if not, return the instruction to create one
  const { userPoolTokenATA, tokenAccount, createAccountIx } = await getOrCreateTruSOLAssociatedTokenAccountInstruction(
    connection,
    userKeypair.publicKey,
    constants.POOL_MINT
  );

  const ix = new TransactionInstruction({
    keys: [
      {
        pubkey: userKeypair.publicKey,
        isWritable: true,
        isSigner: true,
      },
      {
        pubkey: userWhitelistPDA,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: constants.ACCESS_PDA,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: constants.STAKER_AUTHORITY,
        isWritable: false,
        isSigner: false,
      },
      {
        pubkey: constants.STAKE_POOL_ACCOUNT,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: constants.DEPOSIT_AUTHORITY,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: constants.WITHDRAW_AUTHORITY,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: constants.POOL_RESERVE,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: userPoolTokenATA,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: constants.FEE_TOKEN_ACCOUNT,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: constants.POOL_MINT,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: constants.REFERRAL_FEE_TOKEN_ACCOUNT,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: constants.TOKEN_PROGRAM_ID,
        isWritable: false,
        isSigner: false,
      },
      {
        pubkey: constants.STAKE_POOL_VALIDATOR_LIST,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: constants.EPHEMERAL_STAKE_ACCOUNT,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: transientStakeAccount,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: validatorStakeAccount,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: validatorVoteAccount,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: constants.CLOCK_SYSVAR,
        isWritable: false,
        isSigner: false,
      },
      {
        pubkey: constants.STAKE_HISTORY_SYSVAR,
        isWritable: false,
        isSigner: false,
      },
      {
        pubkey: constants.STAKE_CONFIG_SYSVAR,
        isWritable: false,
        isSigner: false,
      },
      {
        pubkey: constants.STAKE_SYSVAR,
        isWritable: false,
        isSigner: false,
      },
      {
        pubkey: constants.STAKE_POOL_PROGRAM_ID,
        isWritable: false,
        isSigner: false,
      },
      {
        pubkey: constants.SYSTEM_PROGRAM_ID,
        isWritable: false,
        isSigner: false,
      },
      {
        pubkey: constants.EVENT_AUTHORITY,
        isWritable: false,
        isSigner: false,
      },
      {
        pubkey: constants.STAKER_PROGRAM_ID,
        isWritable: false,
        isSigner: false,
      },
    ],
    programId: constants.STAKER_PROGRAM_ID,
    data: new DepositToSpecificValidatorInstruction(amount).toBuffer(),
  });

  const transaction = new Transaction();
  transaction.recentBlockhash = recentBlockhash.blockhash;

  // Build the transaction with the create account instruction if needed
  if (!tokenAccount && createAccountIx) {
    console.log("Adding instruction to create the associated token account");
    transaction.add(createAccountIx);
  }

  transaction.add(ix);

  const txHash = await sendAndConfirmTransaction(connection, transaction, [userKeypair]);
  return txHash;
}
