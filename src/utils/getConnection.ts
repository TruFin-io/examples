import { getRpcUri } from "./env";
import { type Commitment, Connection, type ConnectionConfig } from "@solana/web3.js";

export function getConnection(commitmentOrConfig: Commitment | ConnectionConfig = "confirmed"): Connection {
  const rpcUri = getRpcUri();
  return new Connection(rpcUri, commitmentOrConfig);
}
