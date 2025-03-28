import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, type BN, Program, Wallet } from "@coral-xyz/anchor";
import {
  type Account,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { type Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";

import { getStakePoolAccount, getStakePoolProgramId, getStakerProgramId } from "../utils/env";
import { formatSol } from "../utils/format";
import { getConnection } from "../utils/getConnection";
import { getStakePool } from "../utils/stake-pool/getStakePool";

/**
 * Deposits SOL into the pool reserve account.
 * If the user does not have a TruSOL associated token account, it will be created.
 *
 * @param userKeypair - The keypair of the user making the deposit
 * @param amount - The amount of SOL to deposit in lamports (1 SOL = 1e9 lamports)
 * @returns The transaction hash of the deposit
 */
export async function deposit(userKeypair: Keypair, amount: BN): Promise<string> {
  // Get the Solana connection
  const connection = getConnection();

  // get all the program ids and accounts
  const stakePoolProgramId = new PublicKey(getStakePoolProgramId());
  const stakerProgramId = new PublicKey(getStakerProgramId());
  const stakePoolAccount = new PublicKey(getStakePoolAccount());

  // Configure the Solana connection and Anchor provider
  const provider = new AnchorProvider(connection, new Wallet(userKeypair), { commitment: "confirmed" });
  anchor.setProvider(provider);

  console.log(`User ${userKeypair.publicKey} depositing ${formatSol(amount)} SOL...`);

  // Load the program deployed at the specified address
  const program = await Program.at(stakerProgramId, provider);
  const stakePool = await getStakePool(connection, stakePoolAccount);

  // derive accounts
  const [poolWithdrawAuthority] = PublicKey.findProgramAddressSync(
    [stakePoolAccount.toBuffer(), Buffer.from("withdraw")],
    stakePoolProgramId,
  );
  const [userWhitelistPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), userKeypair.publicKey.toBuffer()],
    program.programId,
  );

  let userPoolTokenATA = getAssociatedTokenAddressSync(stakePool.poolMint, userKeypair.publicKey);

  let createAccountIx: TransactionInstruction | undefined;
  let tokenAccount: Account | undefined;

  try {
    console.log("TruSOL associated token account: ", userPoolTokenATA.toBase58());
    tokenAccount = await getAccount(connection, userPoolTokenATA);
    console.log("Found associated token account. Balance: ", Number(tokenAccount.amount) / 1e9, "TruSOL");
  } catch (error) {
    console.log("TruSOL associated token account not found");
    console.log("Creating TruSOL associated token account at address", userPoolTokenATA.toBase58());

    createAccountIx = createAssociatedTokenAccountInstruction(
      userKeypair.publicKey,
      userPoolTokenATA,
      userKeypair.publicKey,
      stakePool.poolMint,
    );
  }

  // deposit instruction
  const depositIx = await program.methods
    .deposit(amount)
    .accounts({
      user: userKeypair.publicKey,
      userWhitelistAccount: userWhitelistPDA,
      stakePool: stakePoolAccount,
      depositAuthority: stakePool.stakeDepositAuthority,
      withdrawAuthority: poolWithdrawAuthority,
      poolReserve: stakePool.reserveStake,
      userPoolTokenAccount: userPoolTokenATA,
      feeTokenAccount: stakePool.managerFeeAccount,
      poolMint: stakePool.poolMint,
      referralFeeTokenAccount: stakePool.managerFeeAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      stakerProgram: program.programId,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  const transaction = new Transaction();

  // build the transaction with the create account instruction if needed
  if (!tokenAccount && createAccountIx) {
    console.log("adding instruction to create the associated token account");
    transaction.add(createAccountIx);
  }

  transaction.add(depositIx);

  const txHash = await provider.sendAndConfirm(transaction, [userKeypair]);
  console.log("Deposit tx hash:", txHash);
  return txHash;
}
