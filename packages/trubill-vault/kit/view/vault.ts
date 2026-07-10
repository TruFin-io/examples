import { type Address, getProgramDerivedAddress } from "@solana/kit";
import { Decimals, formatUnits } from "../../common/amounts";
import { SHARE_PRICE } from "../../common/seeds";
import {
  fetchSharePrice,
  fetchVaultConfig,
  findVaultConfigPda,
  TRUBILL_VAULT_PROGRAM_ADDRESS,
} from "../generated/trubill_vault/src/generated";
import { getRpc } from "../lib/rpc";

/** Derive a vault PDA from a single string seed (codama emits no finder for SharePrice). */
async function derivePda(seed: string): Promise<Address> {
  const [pda] = await getProgramDerivedAddress({
    programAddress: TRUBILL_VAULT_PROGRAM_ADDRESS,
    seeds: [new TextEncoder().encode(seed)],
  });
  return pda;
}

/** Print the vault's public config and current share price. */
async function main() {
  const { rpc } = getRpc();
  const [vaultConfigPda] = await findVaultConfigPda();

  const config = (await fetchVaultConfig(rpc, vaultConfigPda)).data;
  const sharePrice = (await fetchSharePrice(rpc, await derivePda(SHARE_PRICE))).data;

  console.log("Config:");
  console.log("  paused:", config.isPaused);
  console.log("  instantRedeemFeeBps:", config.instantRedeemFee);
  console.log("  minDeposit:", formatUnits(config.minDepositAmount, Decimals.USDC), "USDC");
  console.log("  treasury:", config.treasury);

  console.log("Share price:");
  console.log("  price:", formatUnits(sharePrice.price, Decimals.USDC), "USDC per TruBILL");
  console.log("  lastUpdateEpoch:", sharePrice.lastUpdateEpoch.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
