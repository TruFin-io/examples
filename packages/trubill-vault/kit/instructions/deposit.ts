import { fileURLToPath } from "node:url";
import { address } from "@solana/kit";
import { USDC_MINT } from "../../common/addresses";
import { usdc } from "../../common/amounts";
import { getDepositInstructionAsync, TRUBILL_VAULT_PROGRAM_ADDRESS } from "../generated/trubill_vault/src/generated";
import { getWalletSigner } from "../lib/env";
import { getSnapshotEpoch } from "../lib/epoch";
import { sendInstruction } from "../lib/send";
import { deriveAta } from "../lib/token";

async function main() {
  const [amountStr, epochStr, keypairPath] = process.argv.slice(2);
  if (!amountStr) {
    console.error("Usage: bun run kit/instructions/deposit.ts <amount> [epoch] [keypairPath]");
    console.error("  <amount>       USDC to deposit, as a decimal (e.g. 10.5)");
    console.error("  [epoch]        pricing epoch; defaults to the vault's last snapshot epoch");
    console.error("  [keypairPath]  wallet keypair JSON; defaults to WALLET_KEYPAIR");
    console.error("  SIMULATE=true  dry-run only: build and simulate, never send");
    process.exit(1);
  }

  const payer = await getWalletSigner(keypairPath);
  const epoch = epochStr ? BigInt(epochStr) : await getSnapshotEpoch();

  // The async builder auto-derives every PDA and ATA; only the payer's USDC source and program are passed.
  const instruction = await getDepositInstructionAsync({
    payer,
    userUsdcAta: await deriveAta(payer.address, address(USDC_MINT)),
    program: TRUBILL_VAULT_PROGRAM_ADDRESS,
    epoch,
    amount: usdc(amountStr),
  });

  const signature = await sendInstruction(instruction, payer);
  console.log(`Deposit tx: ${signature}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
