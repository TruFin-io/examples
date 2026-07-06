import { fileURLToPath } from "node:url";
import { trubill } from "../../common/amounts";
import {
  fetchMaybeUserRedeemState,
  findRedeemRequestPda,
  findUserRedeemStatePda,
  getRequestRedeemInstructionAsync,
  TRUBILL_VAULT_PROGRAM_ADDRESS,
} from "../generated/trubill_vault/src/generated";
import { getWalletSigner } from "../lib/env";
import { getLatestCompletedEpoch } from "../lib/epoch";
import { getRpc } from "../lib/rpc";
import { sendInstruction } from "../lib/send";

async function main() {
  const [amountStr, keypairPath] = process.argv.slice(2);
  if (!amountStr) {
    console.error("Usage: bun run kit/instructions/request-redeem.ts <trubillAmount> [keypairPath]");
    process.exit(1);
  }

  const { rpc } = getRpc();
  const user = await getWalletSigner(keypairPath);
  const epoch = await getLatestCompletedEpoch();

  // The next redeem-request id comes from the user's redeem state (0 for a first-time redeemer).
  const [userRedeemState] = await findUserRedeemStatePda({ user: user.address });
  const state = await fetchMaybeUserRedeemState(rpc, userRedeemState);
  const redeemRequestId = state.exists ? state.data.nextRedeemRequestId : 0n;
  const [redeemRequest] = await findRedeemRequestPda({ user: user.address, redeemRequestId });

  const instruction = await getRequestRedeemInstructionAsync({
    user,
    redeemRequest,
    program: TRUBILL_VAULT_PROGRAM_ADDRESS,
    epoch,
    trubillAmount: trubill(amountStr),
  });

  const signature = await sendInstruction(instruction, user);
  console.log(`Request-redeem tx: ${signature} (request id ${redeemRequestId})`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
