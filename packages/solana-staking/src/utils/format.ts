import { LAMPORTS_PER_SOL } from "@solana/web3.js";

/**
 * Formats a BN amount of lamports to SOL
 * @param amount - The amount of lamports to format
 * @returns The amount in SOL
 */
export function formatSol(amount: number): string {
  return (amount / LAMPORTS_PER_SOL).toString();
}

/**
 * Parses a SOL amount to lamports
 * @param amount - The amount of SOL to parse
 * @returns The amount in lamports
 * @throws If amount is negative or NaN
 */
export function parseSol(amount: number | string): number {
  const value = Number(amount);

  if (isNaN(value)) throw new Error("Amount must be a valid number");
  if (value < 0) throw new Error("Amount must be non-negative");
  if (value === 0) return 0;

  return value * LAMPORTS_PER_SOL;
}
