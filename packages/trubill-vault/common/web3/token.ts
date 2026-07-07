import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from "@solana/spl-token";
import { type Connection, type PublicKey } from "@solana/web3.js";

/** Derive the associated token account for a mint and owner (allows PDA owners). */
export function deriveATAAddress(mint: PublicKey, owner: PublicKey, tokenProgram = TOKEN_PROGRAM_ID): PublicKey {
  return getAssociatedTokenAddressSync(mint, owner, true, tokenProgram, ASSOCIATED_TOKEN_PROGRAM_ID);
}

/** Read a token account balance as a bigint, returning 0 if the account does not exist. */
export async function getTokenBalance(
  connection: Connection,
  ata: PublicKey,
  tokenProgram = TOKEN_PROGRAM_ID,
): Promise<bigint> {
  try {
    return (await getAccount(connection, ata, "confirmed", tokenProgram)).amount;
  } catch (error) {
    // A missing (or not-yet-created) ATA reads as a zero balance; surface everything else.
    if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) return 0n;
    throw error;
  }
}
