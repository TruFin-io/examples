declare namespace NodeJS {
  interface ProcessEnv {
    // Environment
    ENV: "devnet" | "testnet" | "mainnet";

    // RPC URIs
    RPC_URI_DEVNET: string;
    RPC_URI_TESTNET: string;
    RPC_URI_MAINNET: string;

    // Program IDs and Accounts
    STAKER_PROGRAM_ID: string;
    STAKE_POOL_PROGRAM_ID: string;
    STAKE_POOL_ACCOUNT: string;
  }
}
