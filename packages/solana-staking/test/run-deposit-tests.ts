import { BN } from "@coral-xyz/anchor";

import { deposit as anchorDeposit } from "../src/scripts/anchor/deposit";
import { deposit as nativeDeposit } from "../src/scripts/native/deposit";
import { parseSol } from "../src/utils/format";
import { log, logError } from "./helpers/logger";
import { checkTransactionStatus, loadKeypairFromFile } from "./helpers/utils";

/**
 * Runs the anchor deposit test
 */
async function runAnchorDepositTest() {
  // Load the user keypair
  const userKeypair = await loadKeypairFromFile("test/account.json");

  try {
    // Convert SOL amount to lamports
    const depositAmount = parseSol("0.1");

    // Call the anchor deposit function
    const txHash = await anchorDeposit(userKeypair, new BN(depositAmount));
    log(`Transaction hash: ${txHash}`);

    // Wait for transaction confirmation
    const status = await checkTransactionStatus(txHash);

    if (status && status === "failed") {
      logError("Transaction failed");
    }
  } catch (error) {
    logError("Error during anchor deposit:", error);

    // If the error contains a transaction signature, try to check its status
    if (error instanceof Error && error.message.includes("Transaction signature:")) {
      const txHash = error.message.split("Transaction signature:")[1].trim();
      const status = await checkTransactionStatus(txHash);
      log(`Transaction status: ${status}`);
    }
  }
}

/**
 * Runs the native deposit test
 */
async function runNativeDepositTest() {
  // Load the user keypair
  const userKeypair = await loadKeypairFromFile("test/account.json");

  try {
    // Convert SOL amount to lamports
    const depositAmount = parseSol("0.1");
    log(`Depositing ${depositAmount} lamports...`);

    // Call the native deposit function
    const txHash = await nativeDeposit(userKeypair, BigInt(depositAmount));
    log(`Transaction hash: ${txHash}`);

    // Wait for transaction confirmation
    const status = await checkTransactionStatus(txHash);
    log(`Transaction status: ${status}`);

    if (status && status === "failed") {
      logError("Transaction failed");
    }
  } catch (error) {
    logError("Error during native deposit:", error);

    // If the error contains a transaction signature, try to check its status
    if (error instanceof Error && error.message.includes("Transaction signature:")) {
      const txHash = error.message.split("Transaction signature:")[1].trim();
      const status = await checkTransactionStatus(txHash);
      log(`Transaction status: ${status}`);
    }
  }
}

/**
 * Main function to run all deposit tests
 */
async function runAllDepositTests() {
  try {
    // Run the anchor deposit test
    await runAnchorDepositTest();

    // Run the native deposit test
    await runNativeDepositTest();

    log("All deposit tests completed successfully!");
  } catch (error) {
    logError("Error running deposit tests:", error);
    process.exit(1);
  }
}

// Run the tests if this file is executed directly
if (require.main === module) {
  runAllDepositTests()
    .then(() => process.exit(0))
    .catch((error) => {
      logError("Unhandled error:", error);
      process.exit(1);
    });
}
