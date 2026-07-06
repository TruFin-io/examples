import { fileURLToPath } from "node:url";
import { BN, type Program } from "@coral-xyz/anchor";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { USDC_MINT } from "../common/addresses";
import { type TrubillVault } from "../common/idls/trubill_vault";
import { getWalletKeypair } from "../common/web3/env";
import * as pda from "../common/web3/pda";
import { deriveATAAddress } from "../common/web3/token";
import { buildSignAndProcessTxV0 } from "../common/web3/tx";
import { getProvider, getTrubillVaultProgram } from "./program";

/** Build a claim-withdrawal instruction: pay out a settled redeem request's USDC and close it. */
export async function claimWithdrawalIx(params: {
  program: Program<TrubillVault>;
  user: PublicKey;
  redeemRequestId: BN;
}) {
  const { program, user, redeemRequestId } = params;
  const vaultAuthority = pda.getPdaVaultAuthority();
  const usdcMint = new PublicKey(USDC_MINT);

  return program.methods
    .claimWithdrawal(redeemRequestId)
    .accountsStrict({
      user,
      userWhitelist: pda.getPdaStakerUserStatus(user),
      vaultConfig: pda.getPdaVaultConfig(),
      usdcAccounting: pda.getPdaUsdcAccounting(),
      vaultAuthority,
      usdcMint,
      vaultUsdcAta: deriveATAAddress(usdcMint, vaultAuthority),
      userUsdcAta: deriveATAAddress(usdcMint, user),
      redeemRequest: pda.getPdaRedeemRequest(user, BigInt(redeemRequestId.toString())),
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      eventAuthority: pda.getPdaEventAuthority(),
      program: program.programId,
    })
    .instruction();
}

async function main() {
  const [idStr, keypairPath] = process.argv.slice(2);
  if (!idStr) {
    console.error("Usage: bun run anchor/claim-withdrawal.ts <redeemRequestId> [keypairPath]");
    process.exit(1);
  }

  const user = getWalletKeypair(keypairPath);
  const provider = getProvider(user);
  const program = getTrubillVaultProgram(provider);

  const ix = await claimWithdrawalIx({ program, user: user.publicKey, redeemRequestId: new BN(idStr) });
  const signature = await buildSignAndProcessTxV0(provider.connection, [ix], user);
  console.log(`Claim-withdrawal tx: ${signature}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
