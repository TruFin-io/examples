import {
  appendTransactionMessageInstruction,
  createTransactionMessage,
  getBase64EncodedWireTransaction,
  getSignatureFromTransaction,
  type Instruction,
  pipe,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
  type TransactionSigner,
} from "@solana/kit";
import { getRpc } from "./rpc";

/** Build, sign and send a single-instruction v0 transaction. Set SIMULATE=1 to dry-run (logs only). */
export async function sendInstruction(instruction: Instruction, payer: TransactionSigner): Promise<string> {
  const { rpc, rpcSubscriptions } = getRpc();
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (m) => setTransactionMessageFeePayerSigner(payer, m),
    (m) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
    (m) => appendTransactionMessageInstruction(instruction, m),
  );

  const signedTransaction = await signTransactionMessageWithSigners(message);

  if (process.env.SIMULATE) {
    const wireTransaction = getBase64EncodedWireTransaction(signedTransaction);
    const simulation = await rpc.simulateTransaction(wireTransaction, { encoding: "base64" }).send();
    console.log("Simulation logs:");
    for (const line of simulation.value.logs ?? []) console.log(`  ${line}`);
    return "SIMULATED";
  }

  const sendAndConfirm = sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions });
  // ponytail: the signer widens the lifetime to a union; we built with a blockhash so this cast is sound.
  await sendAndConfirm(signedTransaction as Parameters<typeof sendAndConfirm>[0], { commitment: "confirmed" });
  return getSignatureFromTransaction(signedTransaction);
}
