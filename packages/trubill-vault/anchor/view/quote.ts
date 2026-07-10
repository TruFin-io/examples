import { BPS_PRECISION, Decimals, formatUnits, mulDiv, mulDivCeil, trubill, usdc } from "../../common/amounts";
import * as Pda from "../../common/web3/pda";
import { getProvider, getTrubillVaultProgram } from "../program";

/**
 * Quote how much you would receive, priced against the vault's latest snapshot.
 * This mirrors the on-chain math exactly, but the real amount can differ if the
 * snapshot changes before your transaction lands.
 */
async function main() {
  const [direction, amountStr] = process.argv.slice(2);
  if ((direction !== "deposit" && direction !== "redeem") || !amountStr) {
    console.error("Usage: bun run anchor/view/quote.ts <deposit|redeem> <amount>");
    console.error("  deposit <usdc>     TruBILL shares you would receive for that USDC");
    console.error("  redeem  <trubill>  USDC you would receive for that TruBILL (request vs instant)");
    process.exit(1);
  }

  const program = getTrubillVaultProgram(getProvider(undefined, true));
  const config = await program.account.vaultConfig.fetch(Pda.getPdaVaultConfigAddress());
  const snapshot = await program.account.epochSnapshot.fetch(Pda.getPdaEpochSnapshotAddress(config.lastSnapshotEpoch));

  const totalAssets = BigInt(snapshot.totalAssets.toString());
  const totalShares = BigInt(snapshot.totalShares.toString());

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

  console.log(`Redeem ${amountStr} TruBILL:`);
  console.log(`  request-redeem -> ${formatUnits(usdcGross, Decimals.USDC)} USDC (no fee, paid after settlement)`);
  console.log(
    `  instant-redeem -> ${formatUnits(usdcInstant, Decimals.USDC)} USDC ` +
      `(after ${formatUnits(fee, Decimals.USDC)} USDC fee)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
