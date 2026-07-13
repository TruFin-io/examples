import { fileURLToPath } from "node:url";
import { trubill } from "../../common/amounts";
import {
  fetchVaultConfig,
  findVaultConfigPda,
  getInstantRedeemInstructionAsync,
  TRUBILL_VAULT_PROGRAM_ADDRESS,
} from "../generated/trubill_vault/src/generated";
import { getWalletSigner } from "../lib/env";
import { getRpc } from "../lib/rpc";
import { sendInstruction } from "../lib/send";

async function main() {
  const [amountStr, epochStr, keypairPath] = process.argv.slice(2);
  if (!amountStr) {
    console.error("Usage: bun run kit/instructions/instant-redeem.ts <amount> [epoch] [keypairPath]");
    console.error("  <amount>       TruBILL shares to redeem, as a decimal (e.g. 5.0)");
    console.error("  [epoch]        pricing epoch; defaults to the vault's last snapshot epoch");
    console.error("  [keypairPath]  wallet keypair JSON; defaults to WALLET_KEYPAIR");
    console.error("  SIMULATE=true  dry-run only: build and simulate, never send");
    process.exit(1);
  }

  const { rpc } = getRpc();
  const payer = await getWalletSigner(keypairPath);

  // The fee treasury and pricing epoch both come from the vault config.
  const [vaultConfig] = await findVaultConfigPda();
  const { treasury, lastSnapshotEpoch } = (await fetchVaultConfig(rpc, vaultConfig)).data;
  const epoch = epochStr ? BigInt(epochStr) : lastSnapshotEpoch;

  const instruction = await getInstantRedeemInstructionAsync({
    payer,
    treasury,
    program: TRUBILL_VAULT_PROGRAM_ADDRESS,
    epoch,
    redeemAmount: trubill(amountStr),
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
