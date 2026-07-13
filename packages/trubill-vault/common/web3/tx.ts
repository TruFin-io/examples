import {
  ComputeBudgetProgram,
  type Connection,
  type Keypair,
  type TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { isSimulate } from "./env";

/**
 * Build, sign and send a v0 transaction, prepending a compute-unit limit.
 * Set SIMULATE=true to simulate and print logs instead of sending (returns "SIMULATED").
 */
export async function buildSignAndProcessTxV0(
  connection: Connection,
  instructions: TransactionInstruction[],
  payer: Keypair,
  signers: Keypair[] = [],
  cuLimit = 1_400_000,
): Promise<string> {
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
  const message = new TransactionMessage({
    payerKey: payer.publicKey,
    recentBlockhash: blockhash,
    instructions: [ComputeBudgetProgram.setComputeUnitLimit({ units: cuLimit }), ...instructions],
  }).compileToV0Message();

  const tx = new VersionedTransaction(message);
  tx.sign([payer, ...signers]);

  if (isSimulate()) {
    const { value } = await connection.simulateTransaction(tx);
    console.log(`Simulation logs:\n${(value.logs ?? []).join("\n")}`);
    if (value.err) throw new Error(`Simulation failed: ${JSON.stringify(value.err)}`);
    return "SIMULATED";
  }

  const signature = await connection.sendTransaction(tx);
  // confirmTransaction resolves even when the tx failed on-chain; err is only null on success.
  const { value } = await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, "confirmed");
  if (value.err) throw new Error(`Transaction ${signature} failed: ${JSON.stringify(value.err)}`);
  return signature;
}
