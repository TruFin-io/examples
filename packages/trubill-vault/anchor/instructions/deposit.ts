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

/** Build a deposit instruction: transfer `amount` USDC and mint TruBILL shares priced at `epoch`'s snapshot. */
export async function depositIx(params: { program: Program<TrubillVault>; user: PublicKey; epoch: BN; amount: BN }) {
  const { program, user, epoch, amount } = params;
  const vaultAuthority = Pda.getPdaVaultAuthorityAddress();
  const trubillMint = Pda.getPdaTrubillMintAddress();
  const usdcMint = new PublicKey(USDC_MINT);

  return program.methods
    .deposit(epoch, amount)
    .accountsStrict({
      payer: user,
      vaultConfig: Pda.getPdaVaultConfigAddress(),
      usdcAccounting: Pda.getPdaUsdcAccountingAddress(),
      userWhitelist: Pda.getPdaStakerUserStatusAddress(user),
      vaultAuthority,
      userVaultTokenAccount: deriveATAAddress(trubillMint, user, TOKEN_2022_PROGRAM_ID),
      userUsdcAta: deriveATAAddress(usdcMint, user),
      vaultCollateralAta: deriveATAAddress(usdcMint, vaultAuthority),
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
    console.error("Usage: bun run anchor/deposit.ts <amount> [epoch] [keypairPath]");
    process.exit(1);
  }

  const user = getWalletKeypair(keypairPath);
  const provider = getProvider(user);
  const program = getTrubillVaultProgram(provider);
  const epoch = epochStr ? new BN(epochStr) : await getLatestCompletedEpoch(provider);

  const ix = await depositIx({ program, user: user.publicKey, epoch, amount: toBN(usdc(amountStr)) });
  const signature = await buildSignAndProcessTxV0(provider.connection, [ix], user);
  console.log(`Deposit tx: ${signature}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
