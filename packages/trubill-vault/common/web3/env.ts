import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { Connection, Keypair } from "@solana/web3.js";
import * as dotenv from "dotenv";

// Load environment variables from .env file without noisy stdout logs.
dotenv.config();

/** Require an environment variable or throw. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env ${name}`);
  return value;
}

/**
 * Read the wallet keypair from a JSON secret-key file. Supports:
 * - "~/path/to/file.json" - home directory path (~ expanded)
 * - "path/to/file.json"   - relative (from cwd) or absolute path
 * Defaults to the WALLET_KEYPAIR env var.
 */
export function getWalletKeypair(walletPath = requireEnv("WALLET_KEYPAIR")): Keypair {
  const resolved = walletPath.startsWith("~") ? homedir() + walletPath.slice(1) : walletPath;
  return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(readFileSync(resolved, "utf8"))));
}

/** Connect to the RPC_URL endpoint at confirmed commitment. */
export function getConnection(): Connection {
  return new Connection(requireEnv("RPC_URL"), { commitment: "confirmed" });
}
