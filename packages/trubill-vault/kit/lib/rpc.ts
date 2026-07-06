import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";
import { requireEnv } from "./env";

/** RPC + subscription clients. The websocket URL is derived from RPC_URL by swapping the scheme. */
export function getRpc() {
  const httpUrl = requireEnv("RPC_URL");
  const wsUrl = httpUrl.replace(/^http/, "ws");
  return {
    rpc: createSolanaRpc(httpUrl),
    rpcSubscriptions: createSolanaRpcSubscriptions(wsUrl),
  };
}
