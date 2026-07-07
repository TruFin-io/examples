import { fileURLToPath } from "node:url";
import {
  getClaimWithdrawalInstructionAsync,
  TRUBILL_VAULT_PROGRAM_ADDRESS,
} from "../generated/trubill_vault/src/generated";
import { getWalletSigner } from "../lib/env";
import { sendInstruction } from "../lib/send";

async function main() {
  const [idStr, keypairPath] = process.argv.slice(2);
  if (!idStr) {
    console.error("Usage: bun run kit/instructions/claim-withdrawal.ts <redeemRequestId> [keypairPath]");
    console.error("  <redeemRequestId>  id printed by your request-redeem run");
    console.error("  [keypairPath]      wallet keypair JSON; defaults to WALLET_KEYPAIR");
    console.error("  SIMULATE=true      dry-run only: build and simulate, never send");
    process.exit(1);
  }

  const user = await getWalletSigner(keypairPath);

  const instruction = await getClaimWithdrawalInstructionAsync({
    user,
    program: TRUBILL_VAULT_PROGRAM_ADDRESS,
    redeemRequestId: BigInt(idStr),
  });

  const signature = await sendInstruction(instruction, user);
  console.log(`Claim-withdrawal tx: ${signature}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
