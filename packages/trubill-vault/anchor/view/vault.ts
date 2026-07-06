import { Decimals, formatUnits } from "../../common/amounts";
import { calcSharePrice } from "../../common/web3/helpers";
import * as pda from "../../common/web3/pda";
import { getProvider, getTrubillVaultProgram } from "../program";

/** Print the vault's config, USDC/ULTRA accounting, roles and current share price. */
async function main() {
  const program = getTrubillVaultProgram(getProvider(undefined, true));
  const config = await program.account.vaultConfig.fetch(pda.getPdaVaultConfigAddress());
  const usdc = await program.account.usdcAccounting.fetch(pda.getPdaUsdcAccountingAddress());
  const ultra = await program.account.ultraAccounting.fetch(pda.getPdaUltraAccountingAddress());
  const access = await program.account.vaultAccess.fetch(pda.getPdaVaultAccessAddress());

  console.log("Config:");
  console.log("  paused:", config.isPaused);
  console.log("  reserveRatioBps:", config.reserveRatioBps);
  console.log("  feeBps:", config.feeBps);
  console.log("  instantRedeemFeeBps:", config.instantRedeemFee);
  console.log("  minDeposit:", formatUnits(BigInt(config.minDepositAmount.toString()), Decimals.USDC), "USDC");
  console.log("  treasury:", config.treasury.toBase58());
  console.log("  lastSnapshotEpoch:", config.lastSnapshotEpoch.toString());

  console.log("USDC accounting:");
  console.log("  reserve:", formatUnits(BigInt(usdc.reserve.toString()), Decimals.USDC));
  console.log("  pendingDeposits:", formatUnits(BigInt(usdc.pendingDeposits.toString()), Decimals.USDC));
  console.log("  sentForMinting:", formatUnits(BigInt(usdc.sentForMinting.toString()), Decimals.USDC));
  console.log("  owedToUsers:", formatUnits(BigInt(usdc.owedToUsers.toString()), Decimals.USDC));

  console.log("ULTRA accounting:");
  console.log("  totalSettled:", formatUnits(BigInt(ultra.totalSettled.toString()), Decimals.ULTRA));
  console.log("  pendingRedemptions:", formatUnits(BigInt(ultra.pendingRedemptions.toString()), Decimals.ULTRA));

  console.log("Roles:");
  console.log("  owner:", access.owner.toBase58());
  console.log("  operator:", access.operator.toBase58());

  try {
    const snapshot = await program.account.epochSnapshot.fetch(
      pda.getPdaEpochSnapshotAddress(config.lastSnapshotEpoch),
    );
    const price = calcSharePrice(BigInt(snapshot.totalAssets.toString()), BigInt(snapshot.totalShares.toString()));
    console.log("Share price:", formatUnits(price, Decimals.USDC), "USDC per TruBILL");
  } catch {
    console.log("Share price: no epoch snapshot yet");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
