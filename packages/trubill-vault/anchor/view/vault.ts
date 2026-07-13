import { Decimals, formatUnits } from "../../common/amounts";
import * as Pda from "../../common/web3/pda";
import { getProvider, getTrubillVaultProgram } from "../program";

/** Print the vault's config and current share price. */
async function main() {
  const program = getTrubillVaultProgram(getProvider(undefined, true));
  const config = await program.account.vaultConfig.fetch(Pda.getPdaVaultConfigAddress());

  console.log("Config:");
  console.log("  paused:", config.isPaused);
  console.log("  instantRedeemFeeBps:", config.instantRedeemFee);
  console.log("  minDeposit:", formatUnits(BigInt(config.minDepositAmount.toString()), Decimals.USDC), "USDC");
  console.log("  treasury:", config.treasury.toBase58());

  const sharePrice = await program.account.sharePrice.fetch(Pda.getPdaSharePriceAddress());
  console.log("Share price:");
  console.log("  price:", formatUnits(BigInt(sharePrice.price.toString()), Decimals.USDC), "USDC per TruBILL");
  console.log("  lastUpdateEpoch:", sharePrice.lastUpdateEpoch.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
