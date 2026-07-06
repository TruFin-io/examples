import { fileURLToPath } from "node:url";
import { BN, type Program } from "@coral-xyz/anchor";
import { TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { type PublicKey, SystemProgram } from "@solana/web3.js";
import { trubill } from "../../common/amounts";
import { type TrubillVault } from "../../common/idls/trubill_vault";
import { toBN } from "../../common/web3/bn";
import { getWalletKeypair } from "../../common/web3/env";
import * as Pda from "../../common/web3/pda";
import { deriveATAAddress } from "../../common/web3/token";
import { buildSignAndProcessTxV0 } from "../../common/web3/tx";
import { getLatestCompletedEpoch } from "../epoch";
import { getProvider, getTrubillVaultProgram } from "../program";

/** Build a request-redeem instruction: burn TruBILL now and record a claim payable after settlement. */
export async function requestRedeemIx(params: {
  program: Program<TrubillVault>;
  user: PublicKey;
  epoch: BN;
  redeemRequestId: BN;
  trubillAmount: BN;
}) {
  const { program, user, epoch, redeemRequestId, trubillAmount } = params;
  const trubillMint = Pda.getPdaTrubillMintAddress();

  return program.methods
    .requestRedeem(epoch, trubillAmount)
    .accountsStrict({
      user,
      vaultConfig: Pda.getPdaVaultConfigAddress(),
      usdcAccounting: Pda.getPdaUsdcAccountingAddress(),
      ultraAccounting: Pda.getPdaUltraAccountingAddress(),
      userWhitelist: Pda.getPdaStakerUserStatusAddress(user),
      vaultAuthority: Pda.getPdaVaultAuthorityAddress(),
      trubillMint,
      userTrubillAta: deriveATAAddress(trubillMint, user, TOKEN_2022_PROGRAM_ID),
      userRedeemState: Pda.getPdaUserRedeemStateAddress(user),
      redeemRequest: Pda.getPdaRedeemRequestAddress(user, redeemRequestId),
      epochSnapshot: Pda.getPdaEpochSnapshotAddress(epoch),
      tokenProgram2022: TOKEN_2022_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      eventAuthority: Pda.getPdaEventAuthorityAddress(),
      program: program.programId,
    })
    .instruction();
}

async function main() {
  const [amountStr, keypairPath] = process.argv.slice(2);
  if (!amountStr) {
    console.error("Usage: bun run anchor/request-redeem.ts <trubillAmount> [keypairPath]");
    process.exit(1);
  }

  const user = getWalletKeypair(keypairPath);
  const provider = getProvider(user);
  const program = getTrubillVaultProgram(provider);
  const epoch = await getLatestCompletedEpoch(provider);

  // The next redeem-request id comes from the user's counter (defaults to 0 before the first redeem).
  const state = await program.account.userRedeemState.fetchNullable(Pda.getPdaUserRedeemStateAddress(user.publicKey));
  const redeemRequestId = state ? state.nextRedeemRequestId : new BN(0);

  const trubillAmount = toBN(trubill(amountStr));
  const ix = await requestRedeemIx({ program, user: user.publicKey, epoch, redeemRequestId, trubillAmount });
  const signature = await buildSignAndProcessTxV0(provider.connection, [ix], user);
  console.log(`Request-redeem tx: ${signature} (redeem request id ${redeemRequestId.toString()})`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
