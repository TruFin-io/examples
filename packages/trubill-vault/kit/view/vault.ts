import { type Address, getProgramDerivedAddress } from "@solana/kit";
import { Decimals, formatUnits } from "../../common/amounts";
import { SHARE_PRICE, VAULT_ACCESS } from "../../common/seeds";
import {
  fetchSharePrice,
  fetchUltraAccounting,
  fetchUsdcAccounting,
  fetchVaultAccess,
  fetchVaultConfig,
  findUltraAccountingPda,
  findUsdcAccountingPda,
  findVaultConfigPda,
  TRUBILL_VAULT_PROGRAM_ADDRESS,
} from "../generated/trubill_vault/src/generated";
import { getRpc } from "../lib/rpc";

/** Derive a vault PDA from a single string seed (codama emits no finder for VaultAccess/SharePrice). */
async function derivePda(seed: string): Promise<Address> {
  const [pda] = await getProgramDerivedAddress({
    programAddress: TRUBILL_VAULT_PROGRAM_ADDRESS,
    seeds: [new TextEncoder().encode(seed)],
  });
  return pda;
}

/** Print the vault's config, USDC/ULTRA accounting, roles and current share price. */
async function main() {
  const { rpc } = getRpc();
  const [vaultConfigPda] = await findVaultConfigPda();
  const [usdcPda] = await findUsdcAccountingPda();
  const [ultraPda] = await findUltraAccountingPda();

  const config = (await fetchVaultConfig(rpc, vaultConfigPda)).data;
  const usdc = (await fetchUsdcAccounting(rpc, usdcPda)).data;
  const ultra = (await fetchUltraAccounting(rpc, ultraPda)).data;
  const access = (await fetchVaultAccess(rpc, await derivePda(VAULT_ACCESS))).data;
  const sharePrice = (await fetchSharePrice(rpc, await derivePda(SHARE_PRICE))).data;

  console.log("Config:");
  console.log("  paused:", config.isPaused);
  console.log("  reserveRatioBps:", config.reserveRatioBps);
  console.log("  feeBps:", config.feeBps);
  console.log("  instantRedeemFeeBps:", config.instantRedeemFee);
  console.log("  minDeposit:", formatUnits(config.minDepositAmount, Decimals.USDC), "USDC");
  console.log("  treasury:", config.treasury);
  console.log("  lastSnapshotEpoch:", config.lastSnapshotEpoch.toString());

  console.log("USDC accounting:");
  console.log("  reserve:", formatUnits(usdc.reserve, Decimals.USDC));
  console.log("  pendingDeposits:", formatUnits(usdc.pendingDeposits, Decimals.USDC));
  console.log("  sentForMinting:", formatUnits(usdc.sentForMinting, Decimals.USDC));
  console.log("  owedToUsers:", formatUnits(usdc.owedToUsers, Decimals.USDC));

  console.log("ULTRA accounting:");
  console.log("  totalSettled:", formatUnits(ultra.totalSettled, Decimals.ULTRA));
  console.log("  pendingRedemptions:", formatUnits(ultra.pendingRedemptions, Decimals.ULTRA));

  console.log("Roles:");
  console.log("  owner:", access.owner);
  console.log("  operator:", access.operator);

  console.log("Share price:");
  console.log("  price:", formatUnits(sharePrice.price, Decimals.USDC), "USDC per TruBILL");
  console.log("  lastUpdateEpoch:", sharePrice.lastUpdateEpoch.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
