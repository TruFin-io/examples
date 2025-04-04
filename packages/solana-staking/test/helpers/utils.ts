import { Connection, Keypair } from "@solana/web3.js";
import fs from "node:fs/promises";

import { log } from "./logger";

export function getConnection(): Connection {
  return new Connection("https://api.devnet.solana.com", "confirmed");
}

// Helper function to load a keypair from a JSON file
export async function loadKeypairFromFile(filePath: string): Promise<Keypair> {
  const accountData = await fs.readFile(filePath, "utf-8");
  return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(accountData)));
}

// Helper function to check transaction status
export async function checkTransactionStatus(signature: string): Promise<string> {
  const connection = getConnection();
  const status = await connection.getSignatureStatus(signature);

  if (status.value?.confirmationStatus === "confirmed") {
    log("Transaction confirmed");
    return "confirmed";
  } else if (status.value?.err) {
    log("Transaction failed");
    return "failed";
  } else {
    log("Transaction not confirmed");
    return "pending";
  }
}
