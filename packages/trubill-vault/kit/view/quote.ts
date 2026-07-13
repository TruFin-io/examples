import { BPS_PRECISION, Decimals, formatUnits, mulDiv, mulDivCeil, trubill, usdc } from "../../common/amounts";
import {
  fetchEpochSnapshot,
  fetchUsdcAccounting,
  fetchVaultConfig,
  findEpochSnapshotPda,
  findUsdcAccountingPda,
  findVaultConfigPda,
} from "../generated/trubill_vault/src/generated";
import { getRpc } from "../lib/rpc";

/**
 * Quote how much you would receive, priced against the vault's latest snapshot.
 * This mirrors the on-chain math exactly, but the real amount can differ if the
 * snapshot changes before your transaction lands.
 */
async function main() {
  const [direction, amountStr] = process.argv.slice(2);
  if ((direction !== "deposit" && direction !== "redeem") || !amountStr) {
    console.error("Usage: bun run kit/view/quote.ts <deposit|redeem> <amount>");
    console.error("  deposit <usdc>     TruBILL shares you would receive for that USDC");
    console.error("  redeem  <trubill>  USDC you would receive for that TruBILL (request vs instant)");
    process.exit(1);
  }

  const { rpc } = getRpc();
  const [vaultConfigPda] = await findVaultConfigPda();
  const config = (await fetchVaultConfig(rpc, vaultConfigPda)).data;
  const [snapshotPda] = await findEpochSnapshotPda({ epoch: config.lastSnapshotEpoch });
  const { totalAssets, totalShares } = (await fetchEpochSnapshot(rpc, snapshotPda)).data;

  if (direction === "deposit") {
    const usdcIn = usdc(amountStr);
    // First deposit (no shares yet) mints 1:1; otherwise shares = usdc * totalShares / totalAssets (floor).
    const shares = totalShares === 0n ? usdcIn : mulDiv(usdcIn, totalShares, totalAssets);
    console.log(`Deposit ${amountStr} USDC -> ${formatUnits(shares, Decimals.TRUBILL)} TruBILL`);
    return;
  }

  const trubillIn = trubill(amountStr);
  // usdc = trubill * totalAssets / totalShares (floor); 1:1 if the vault has no shares yet.
  const usdcGross = totalShares === 0n ? trubillIn : mulDiv(trubillIn, totalAssets, totalShares);
  const fee = mulDivCeil(usdcGross, BigInt(config.instantRedeemFee), BPS_PRECISION);
  const usdcInstant = usdcGross - fee;

  // Instant redeem pays from the USDC reserve; the program requires the gross USDC to fit within it.
  const [usdcAccountingPda] = await findUsdcAccountingPda();
  const { reserve } = (await fetchUsdcAccounting(rpc, usdcAccountingPda)).data;

  console.log(`Redeem ${amountStr} TruBILL:`);
  console.log(`  request-redeem -> ${formatUnits(usdcGross, Decimals.USDC)} USDC (no fee, paid after settlement)`);
  if (usdcGross <= reserve) {
    console.log(
      `  instant-redeem -> ${formatUnits(usdcInstant, Decimals.USDC)} USDC ` +
        `(after ${formatUnits(fee, Decimals.USDC)} USDC fee)`,
    );
  } else {
    console.log(
      `  instant-redeem -> not available: needs ${formatUnits(usdcGross, Decimals.USDC)} USDC but the reserve ` +
        `holds ${formatUnits(reserve, Decimals.USDC)} USDC. Use request-redeem.`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
