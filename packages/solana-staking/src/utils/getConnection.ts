import { Connection } from "@solana/web3.js";

import { RPC_URI_MAINNET } from "./constants";

export function getConnection(): Connection {
  return new Connection(RPC_URI_MAINNET, "confirmed");
}
