import {
  Account,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";

import { formatSol } from "../utils/format";

export async function getOrCreateTruSOLAssociatedTokenAccountInstruction(
  connection: Connection,
  userPublicKey: PublicKey,
  poolMint: PublicKey,
): Promise<{ userPoolTokenATA: PublicKey; tokenAccount?: Account; createAccountIx?: TransactionInstruction }> {
  let tokenAccount: Account | undefined;
  let createAccountIx: TransactionInstruction | undefined;

  // Get the user's TruSOL ATA
  const userPoolTokenATA = getAssociatedTokenAddressSync(poolMint, userPublicKey);

  try {
    console.log("TruSOL associated token account: ", userPoolTokenATA.toBase58());
    tokenAccount = await getAccount(connection, userPoolTokenATA);
    console.log("Found associated token account. Balance: ", formatSol(Number(tokenAccount.amount)), "TruSOL");
  } catch (error) {
    console.log("TruSOL associated token account not found");
    console.log("Creating TruSOL associated token account at address", userPoolTokenATA.toBase58());

    createAccountIx = createAssociatedTokenAccountInstruction(userPublicKey, userPoolTokenATA, userPublicKey, poolMint);
  }

  return { userPoolTokenATA, tokenAccount, createAccountIx };
}
