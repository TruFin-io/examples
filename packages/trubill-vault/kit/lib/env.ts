import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { createKeyPairSignerFromBytes, type KeyPairSigner } from "@solana/kit";
import * as dotenv from "dotenv";

// Load environment variables from .env file.
dotenv.config();

/** Require an environment variable or throw. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env ${name}`);
  return value;
}

/**
 * Load a signer from a JSON secret-key file. Supports:
 * - "~/path/to/file.json" - home directory path (~ expanded)
 * - "path/to/file.json"   - relative (from cwd) or absolute path
 * Defaults to the WALLET_KEYPAIR env var.
 */
export async function getWalletSigner(walletPath = requireEnv("WALLET_KEYPAIR")): Promise<KeyPairSigner> {
  const resolved = walletPath.startsWith("~") ? homedir() + walletPath.slice(1) : walletPath;
  return createKeyPairSignerFromBytes(Uint8Array.from(JSON.parse(readFileSync(resolved, "utf8"))));
}
