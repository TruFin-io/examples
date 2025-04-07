import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import { depositToSpecificValidator as anchorDepositToSpecificValidator } from "../src/scripts/anchor/deposit-to-specific-validator";
import { depositToSpecificValidator as nativeDepositToSpecificValidator } from "../src/scripts/native/deposit-to-specific-validator";
import { parseSol } from "../src/utils/format";
import { log, logError } from "./helpers/logger";
import { checkTransactionStatus, loadKeypairFromFile } from "./helpers/utils";

async function runAnchorDepositToSpecificValidatorTest() {
  // Load the user keypair
  const userKeypair = await loadKeypairFromFile("test/account.json");

  try {
    // Convert SOL amount to lamports
    const depositAmount = parseSol("0.01");

    const validatorVoteAccount = new PublicKey("FwR3PbjS5iyqzLiLugrBqKSa5EKZ4vK9SKs7eQXtT59f");

    // Call the anchor deposit function
    const txHash = await anchorDepositToSpecificValidator(userKeypair, validatorVoteAccount, new BN(depositAmount));
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

async function runNativeDepositToSpecificValidatorTest() {
  // Load the user keypair
  const userKeypair = await loadKeypairFromFile("test/account.json");

  try {
    // Convert SOL amount to lamports
    const depositAmount = parseSol("0.01");
    log(`Depositing ${depositAmount} lamports...`);

    const validatorVoteAccount = new PublicKey("FwR3PbjS5iyqzLiLugrBqKSa5EKZ4vK9SKs7eQXtT59f");

    // Call the native depositToSpecificValidator function
    const txHash = await nativeDepositToSpecificValidator(userKeypair, validatorVoteAccount, BigInt(depositAmount));
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

async function runAllDepositToSpecificValidatorTests() {
  try {
    await runAnchorDepositToSpecificValidatorTest();
    await runNativeDepositToSpecificValidatorTest();
    log("All deposit to specific validator tests completed successfully!");
  } catch (error) {
    logError("Error running deposit to specific validator tests:", error);
    process.exit(1);
  }
}

// Run the tests if this file is executed directly
if (require.main === module) {
  runAllDepositToSpecificValidatorTests()
    .then(() => process.exit(0))
    .catch((error) => {
      logError("Unhandled error:", error);
      process.exit(1);
    });
}
