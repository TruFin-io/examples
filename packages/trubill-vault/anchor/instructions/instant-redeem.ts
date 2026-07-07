import { fileURLToPath } from "node:url";
import { BN, type Program } from "@coral-xyz/anchor";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { USDC_MINT } from "../../common/addresses";
import { toBN, usdc } from "../../common/amounts";
import { type TrubillVault } from "../../common/idls/trubill_vault";
import { getWalletKeypair } from "../../common/web3/env";
import * as Pda from "../../common/web3/pda";
import { deriveATAAddress } from "../../common/web3/token";
import { buildSignAndProcessTxV0 } from "../../common/web3/tx";
import { getLatestCompletedEpoch } from "../epoch";
import { getProvider, getTrubillVaultProgram } from "../program";

/** Build an instant-redeem instruction: burn shares and pay USDC immediately from the reserve. */
export async function instantRedeemIx(params: {
  program: Program<TrubillVault>;
  user: PublicKey;
  epoch: BN;
  redeemAmount: BN;
  treasury: PublicKey;
}) {
  const { program, user, epoch, redeemAmount, treasury } = params;
  const vaultAuthority = Pda.getPdaVaultAuthorityAddress();
  const trubillMint = Pda.getPdaTrubillMintAddress();
  const usdcMint = new PublicKey(USDC_MINT);

  return program.methods
    .instantRedeem(epoch, redeemAmount)
    .accountsStrict({
      payer: user,
      vaultConfig: Pda.getPdaVaultConfigAddress(),
      usdcAccounting: Pda.getPdaUsdcAccountingAddress(),
      ultraAccounting: Pda.getPdaUltraAccountingAddress(),
      userWhitelist: Pda.getPdaStakerUserStatusAddress(user),
      vaultAuthority,
      userVaultTokenAccount: deriveATAAddress(trubillMint, user, TOKEN_2022_PROGRAM_ID),
      userUsdcAta: deriveATAAddress(usdcMint, user),
      vaultCollateralAta: deriveATAAddress(usdcMint, vaultAuthority),
      treasuryUsdcAta: deriveATAAddress(usdcMint, treasury),
      treasury,
      usdcMint,
      trubillMint,
      epochSnapshot: Pda.getPdaEpochSnapshotAddress(epoch),
      tokenProgram: TOKEN_PROGRAM_ID,
      tokenProgram2022: TOKEN_2022_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      eventAuthority: Pda.getPdaEventAuthorityAddress(),
      program: program.programId,
    })
    .instruction();
}

async function main() {
  const [amountStr, epochStr, keypairPath] = process.argv.slice(2);
  if (!amountStr) {
    console.error("Usage: bun run anchor/instructions/instant-redeem.ts <amount> [epoch] [keypairPath]");
    console.error("  <amount>       USDC to receive, as a decimal (e.g. 10.5)");
    console.error("  [epoch]        pricing epoch; defaults to the latest completed epoch");
    console.error("  [keypairPath]  wallet keypair JSON; defaults to WALLET_KEYPAIR");
    console.error("  SIMULATE=true  dry-run only: build and simulate, never send");
    process.exit(1);
  }

  const user = getWalletKeypair(keypairPath);
  const provider = getProvider(user);
  const program = getTrubillVaultProgram(provider);
  const epoch = epochStr ? new BN(epochStr) : await getLatestCompletedEpoch(provider);
  const config = await program.account.vaultConfig.fetch(Pda.getPdaVaultConfigAddress());

  const redeemAmount = toBN(usdc(amountStr));
  const ix = await instantRedeemIx({ program, user: user.publicKey, epoch, redeemAmount, treasury: config.treasury });
  const signature = await buildSignAndProcessTxV0(provider.connection, [ix], user);
  console.log(`Instant-redeem tx: ${signature}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
