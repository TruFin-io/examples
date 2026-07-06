import { address } from "@solana/kit";
import { ASSET_CONTROLLER } from "../../common/addresses";
import { calcDMEffectiveEpoch } from "../../common/web3/helpers";
import { fetchAssetController } from "../generated/delta_manager/src/generated";
import { getRpc } from "../lib/rpc";

/** Print the latest completed and current (effective) Delta Manager epochs via the generated decoder. */
async function main() {
  const { rpc } = getRpc();
  const { currentEpoch, epochDuration, currentEpochStartTimestamp } = (
    await fetchAssetController(rpc, address(ASSET_CONTROLLER))
  ).data;

  const slot = await rpc.getSlot({ commitment: "confirmed" }).send();
  const blockTime = await rpc.getBlockTime(slot).send();
  const effective = calcDMEffectiveEpoch(currentEpoch, epochDuration, currentEpochStartTimestamp, BigInt(blockTime));
  const completed = effective > 0n ? effective - 1n : 0n;

  console.log("Latest completed epoch:", completed.toString());
  console.log("Effective (current) epoch:", effective.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
