import { address } from "@solana/kit";
import { ASSET_CONTROLLER } from "../../common/addresses";
import { calcDMEffectiveEpoch } from "../../common/web3/helpers";
import { fetchAssetController } from "../generated/delta_manager/src/generated";
import { getRpc } from "./rpc";

/** Effective (current) Delta Manager epoch, mirroring the on-chain lazy transition. */
export async function getEffectiveEpoch(): Promise<bigint> {
  const { rpc } = getRpc();
  const controller = await fetchAssetController(rpc, address(ASSET_CONTROLLER));
  const { currentEpoch, epochDuration, currentEpochStartTimestamp } = controller.data;

  const slot = await rpc.getSlot({ commitment: "confirmed" }).send();
  const blockTime = await rpc.getBlockTime(slot).send();
  return calcDMEffectiveEpoch(currentEpoch, epochDuration, currentEpochStartTimestamp, BigInt(blockTime));
}

/** Latest completed Delta Manager epoch (effective - 1), which deposit and redeem price against. */
export async function getLatestCompletedEpoch(): Promise<bigint> {
  const effective = await getEffectiveEpoch();
  if (effective <= 0n) throw new Error("No Delta Manager epoch has completed yet");
  return effective - 1n;
}
