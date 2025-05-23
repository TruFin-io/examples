import * as anchor from "@coral-xyz/anchor";
import * as borsh from "borsh";

import { StakePool, StakePoolSchema } from "./types";

export async function getStakePool(
  connection: anchor.web3.Connection,
  stakePoolPubkey: anchor.web3.PublicKey
): Promise<StakePool> {
  const stakePoolAccountInfo = await connection.getAccountInfo(stakePoolPubkey);
  if (!stakePoolAccountInfo) {
    throw new Error("Stake pool account not found!");
  }
  const stakePool = borsh.deserializeUnchecked(StakePoolSchema, StakePool, stakePoolAccountInfo.data.subarray(0, 664));

  return stakePool;
}
