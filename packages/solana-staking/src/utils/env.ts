import { config as dotenvConfig } from "dotenv";
import { resolve } from "node:path";

// Load environment variables from .env file
dotenvConfig({ path: resolve(__dirname, "../../.env") });

// Environment types
export type Environment = "devnet" | "testnet" | "mainnet";

// Environment variable names
const ENV_VARS = {
  ENV: "ENV",
  RPC_URI_DEVNET: "RPC_URI_DEVNET",
  RPC_URI_TESTNET: "RPC_URI_TESTNET",
  RPC_URI_MAINNET: "RPC_URI_MAINNET",
  STAKER_PROGRAM_ID: "STAKER_PROGRAM_ID",
  STAKE_POOL_PROGRAM_ID: "STAKE_POOL_PROGRAM_ID",
  STAKE_POOL_ACCOUNT: "STAKE_POOL_ACCOUNT",
} as const;

// Helper function to get environment variable
function getEnvVar(name: keyof typeof ENV_VARS): string {
  const value = process.env[ENV_VARS[name]];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/// Environment getters ///

export function getEnvironment(): Environment {
  const env = getEnvVar("ENV") as Environment;
  if (!["devnet", "testnet", "mainnet"].includes(env)) {
    throw new Error(`Invalid environment: ${env}`);
  }
  return env;
}

export function getRpcUri(): string {
  const env = getEnvironment();
  switch (env) {
    case "devnet":
      return getEnvVar("RPC_URI_DEVNET");
    case "testnet":
      return getEnvVar("RPC_URI_TESTNET");
    case "mainnet":
      return getEnvVar("RPC_URI_MAINNET");
  }
}

export function getStakerProgramId(): string {
  return getEnvVar("STAKER_PROGRAM_ID");
}

export function getStakePoolProgramId(): string {
  return getEnvVar("STAKE_POOL_PROGRAM_ID");
}

export function getStakePoolAccount(): string {
  return getEnvVar("STAKE_POOL_ACCOUNT");
}

// Export all environment variables in a single object for convenience
export const env = {
  environment: getEnvironment(),
  rpcUri: getRpcUri(),
  stakerProgramId: getStakerProgramId(),
  stakePoolProgramId: getStakePoolProgramId(),
  stakePoolAccount: getStakePoolAccount(),
} as const;
