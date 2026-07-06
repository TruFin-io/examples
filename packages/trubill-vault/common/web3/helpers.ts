import type { Connection } from "@solana/web3.js";

/** Fixed-point scale for share price and Delta Manager exchange rates (1e6). */
export const PRICE_SCALE = 1_000_000n;

/** Current cluster unix time (seconds) from the latest confirmed block. */
export async function getClusterTime(connection: Connection): Promise<bigint> {
  const slot = await connection.getSlot("confirmed");
  const blockTime = await connection.getBlockTime(slot);
  if (blockTime === null) throw new Error(`Could not fetch block time for slot ${slot}`);
  return BigInt(blockTime);
}

/**
 * Effective Delta Manager epoch, mirroring the on-chain lazy epoch transition.
 * effective = storedEpoch + (now - epochStartTs) / epochDuration
 */
export function calcDMEffectiveEpoch(
  storedEpoch: bigint,
  epochDuration: bigint,
  epochStartTs: bigint,
  nowUnixTs: bigint,
): bigint {
  if (epochDuration > 0n && nowUnixTs >= epochStartTs) {
    return storedEpoch + (nowUnixTs - epochStartTs) / epochDuration;
  }
  return storedEpoch;
}

/** Off-chain share price (floored): totalAssets * PRICE_SCALE / totalShares, or PRICE_SCALE when no shares. */
export function calcSharePrice(totalAssets: bigint, totalShares: bigint): bigint {
  if (totalShares === 0n) return PRICE_SCALE;
  return (totalAssets * PRICE_SCALE) / totalShares;
}
