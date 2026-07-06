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
 * Read raw secret-key bytes from a JSON keypair file. Supports:
 * - "~/path/to/file.json" - home directory path (~ expanded)
 * - "path/to/file.json"   - relative (from cwd) or absolute path
 * Defaults to the WALLET_KEYPAIR env var.
 */
export function readSecretKeyBytes(walletPath = requireEnv("WALLET_KEYPAIR")): Uint8Array {
  const resolved = walletPath.startsWith("~") ? homedir() + walletPath.slice(1) : walletPath;
  return Uint8Array.from(JSON.parse(readFileSync(resolved, "utf8")));
}

/** Read the wallet keypair from a JSON secret-key file (see readSecretKeyBytes for path rules). */
export function getWalletKeypair(walletPath?: string): Keypair {
  return Keypair.fromSecretKey(readSecretKeyBytes(walletPath));
}

/** Connect to the RPC_URL endpoint at confirmed commitment. */
export function getConnection(): Connection {
  return new Connection(requireEnv("RPC_URL"), { commitment: "confirmed" });
}
