import { fileURLToPath } from "node:url";
import { BN } from "@coral-xyz/anchor";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { TRUBILL_VAULT_PROGRAM_ID, USDC_MINT } from "../../common/addresses";
import { getConnection, getWalletKeypair } from "../../common/web3/env";
import * as pda from "../../common/web3/pda";
import { deriveATAAddress } from "../../common/web3/token";
import { buildSignAndProcessTxV0 } from "../../common/web3/tx";

// Anchor discriminator for `claim_withdrawal`, taken from the IDL.
const CLAIM_WITHDRAWAL_DISCRIMINATOR = Buffer.from([118, 206, 173, 38, 239, 165, 65, 30]);

/** Serialize claim-withdrawal args: discriminator, then the redeem request id as a little-endian u64. */
function encodeClaimWithdrawalData(redeemRequestId: BN): Buffer {
  return Buffer.concat([CLAIM_WITHDRAWAL_DISCRIMINATOR, redeemRequestId.toArrayLike(Buffer, "le", 8)]);
}

/** Build the raw claim-withdrawal instruction: pay out a settled redeem request and close it. */
export function buildClaimWithdrawalIx(params: { user: PublicKey; redeemRequestId: BN }): TransactionInstruction {
  const { user, redeemRequestId } = params;
  const programId = new PublicKey(TRUBILL_VAULT_PROGRAM_ID);
  const usdcMint = new PublicKey(USDC_MINT);
  const vaultAuthority = pda.getPdaVaultAuthorityAddress();
  const vaultUsdcAta = deriveATAAddress(usdcMint, vaultAuthority);
  const userUsdcAta = deriveATAAddress(usdcMint, user);

  // Order is fixed by the program. Each row: isSigner, isWritable, and the account's role.
  const keys = [
    { pubkey: user, isSigner: true, isWritable: true }, // user: signs and receives the USDC
    { pubkey: pda.getPdaStakerUserStatusAddress(user), isSigner: false, isWritable: false }, // user_whitelist: must be Whitelisted
    { pubkey: pda.getPdaVaultConfigAddress(), isSigner: false, isWritable: false }, // vault_config: params and epoch state
    { pubkey: pda.getPdaUsdcAccountingAddress(), isSigner: false, isWritable: true }, // usdc_accounting: owed-to-users ledger
    { pubkey: vaultAuthority, isSigner: false, isWritable: false }, // vault_authority: transfer signer PDA
    { pubkey: usdcMint, isSigner: false, isWritable: false }, // usdc_mint: payout asset
    { pubkey: vaultUsdcAta, isSigner: false, isWritable: true }, // vault_usdc_ata: vault USDC source
    { pubkey: userUsdcAta, isSigner: false, isWritable: true }, // user_usdc_ata: USDC paid out here
    { pubkey: pda.getPdaRedeemRequestAddress(user, redeemRequestId), isSigner: false, isWritable: true }, // redeem_request: closed
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // token_program: SPL Token, for USDC
    { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // associated_token_program: ATA creation
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }, // system_program
    { pubkey: pda.getPdaEventAuthorityAddress(), isSigner: false, isWritable: false }, // event_authority: Anchor event CPI
    { pubkey: programId, isSigner: false, isWritable: false }, // program: self, for the event CPI
  ];

  return new TransactionInstruction({ programId, keys, data: encodeClaimWithdrawalData(redeemRequestId) });
}

async function main() {
  const [idStr, keypairPath] = process.argv.slice(2);
  if (!idStr) {
    console.error("Usage: bun run native/instructions/claim-withdrawal.ts <redeemRequestId> [keypairPath]");
    process.exit(1);
  }

  const user = getWalletKeypair(keypairPath);
  const ix = buildClaimWithdrawalIx({ user: user.publicKey, redeemRequestId: new BN(idStr) });
  const signature = await buildSignAndProcessTxV0(getConnection(), [ix], user);
  console.log(`Claim-withdrawal tx: ${signature}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
