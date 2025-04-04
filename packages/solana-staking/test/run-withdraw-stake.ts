import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import { withdrawStake } from "../src/scripts/native/withdraw-stake";
import { parseSol } from "../src/utils/format";
import { log, logError } from "./helpers/logger";
import { checkTransactionStatus, loadKeypairFromFile } from "./helpers/utils";

async function runWithdrawStakeTest() {
  // Load the user keypair
  const userKeypair = await loadKeypairFromFile("test/account.json");

  try {
    // Convert SOL amount to lamports
    const withdrawAmount = parseSol("0.001557723");
    log(`Withdrawing ${withdrawAmount} TruSOL...`);

    // Use a validator vote account for testing
    const validatorVoteAccount = new PublicKey("FwR3PbjS5iyqzLiLugrBqKSa5EKZ4vK9SKs7eQXtT59f");

    // Call the native withdraw stake function
    const txHash = await withdrawStake(userKeypair, validatorVoteAccount, new BN(withdrawAmount));

    if (txHash) {
      log(`Transaction hash: ${txHash}`);

      // Wait for transaction confirmation
      const status = await checkTransactionStatus(txHash);
      log(`Transaction status: ${status}`);

      if (status && status === "failed") {
        logError("Transaction failed");
      }
    } else {
      logError("Withdraw stake transaction failed or returned no transaction hash");
    }
  } catch (error) {
    logError("Error during native withdraw stake:", error);

    // If the error contains a transaction signature, try to check its status
    if (error instanceof Error && error.message.includes("Transaction signature:")) {
      const txHash = error.message.split("Transaction signature:")[1].trim();
      const status = await checkTransactionStatus(txHash);
      log(`Transaction status: ${status}`);
    }
  }
}

// Run the tests if this file is executed directly
if (require.main === module) {
  runWithdrawStakeTest()
    .then(() => process.exit(0))
    .catch((error) => {
      logError("Unhandled error:", error);
      process.exit(1);
    });
}
