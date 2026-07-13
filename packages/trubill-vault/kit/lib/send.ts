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
  type TransactionWithBlockhashLifetime,
} from "@solana/kit";
import { isSimulate } from "../../common/web3/env";
import { getRpc } from "./rpc";

/** Build, sign and send a single-instruction v0 transaction. Set SIMULATE=true to dry-run (logs only). */
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

  if (isSimulate()) {
    const wireTransaction = getBase64EncodedWireTransaction(signedTransaction);
    const simulation = await rpc.simulateTransaction(wireTransaction, { encoding: "base64" }).send();
    console.log("Simulation logs:");
    for (const line of simulation.value.logs ?? []) console.log(`  ${line}`);
    return "SIMULATED";
  }

  const sendAndConfirm = sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions });

  // Signing widens the lifetime to a blockhash|nonce union; we built with a blockhash, so narrow it back.
  await sendAndConfirm(signedTransaction as typeof signedTransaction & TransactionWithBlockhashLifetime, {
    commitment: "confirmed",
  });
  return getSignatureFromTransaction(signedTransaction);
}
