import { type AnchorProvider, BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { ASSET_CONTROLLER } from "../common/addresses";
import { calcDMEffectiveEpoch, getClusterTime } from "../common/web3/helpers";
import { getDeltaManagerProgram } from "./program";

/** Latest completed Delta Manager epoch (effective - 1), which deposit and redeem price against. */
export async function getLatestCompletedEpoch(provider: AnchorProvider): Promise<BN> {
  const dm = getDeltaManagerProgram(provider);
  const ac = await dm.account.assetController.fetch(new PublicKey(ASSET_CONTROLLER));
  const now = await getClusterTime(provider.connection);
  const effective = calcDMEffectiveEpoch(
    BigInt(ac.currentEpoch.toString()),
    BigInt(ac.epochDuration.toString()),
    BigInt(ac.currentEpochStartTimestamp.toString()),
    now,
  );
  if (effective <= 0n) throw new Error("No Delta Manager epoch has completed yet");
  return new BN((effective - 1n).toString());
}
