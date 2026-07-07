import { fileURLToPath } from "node:url";
import { usdc } from "../../common/amounts";
import {
  fetchVaultConfig,
  findVaultConfigPda,
  getInstantRedeemInstructionAsync,
  TRUBILL_VAULT_PROGRAM_ADDRESS,
} from "../generated/trubill_vault/src/generated";
import { getWalletSigner } from "../lib/env";
import { getLatestCompletedEpoch } from "../lib/epoch";
import { getRpc } from "../lib/rpc";
import { sendInstruction } from "../lib/send";

async function main() {
  const [amountStr, epochStr, keypairPath] = process.argv.slice(2);
  if (!amountStr) {
    console.error("Usage: bun run kit/instructions/instant-redeem.ts <amount> [epoch] [keypairPath]");
    console.error("  <amount>       USDC to receive, as a decimal (e.g. 10.5)");
    console.error("  [epoch]        pricing epoch; defaults to the latest completed epoch");
    console.error("  [keypairPath]  wallet keypair JSON; defaults to WALLET_KEYPAIR");
    console.error("  SIMULATE=true  dry-run only: build and simulate, never send");
    process.exit(1);
  }

  const { rpc } = getRpc();
  const payer = await getWalletSigner(keypairPath);
  const epoch = epochStr ? BigInt(epochStr) : await getLatestCompletedEpoch();

  // The fee treasury is read from the vault config.
  const [vaultConfig] = await findVaultConfigPda();
  const { treasury } = (await fetchVaultConfig(rpc, vaultConfig)).data;

  const instruction = await getInstantRedeemInstructionAsync({
    payer,
    treasury,
    program: TRUBILL_VAULT_PROGRAM_ADDRESS,
    epoch,
    redeemAmount: usdc(amountStr),
  });

  const signature = await sendInstruction(instruction, payer);
  console.log(`Instant-redeem tx: ${signature}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
