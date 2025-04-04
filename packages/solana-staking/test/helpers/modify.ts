import fs from "node:fs/promises";
import path from "node:path";

import { log, logError } from "./logger";

/**
 * Gets the absolute path to a file relative to the project root
 * @param relativePath Path relative to the project root
 * @returns Absolute path to the file
 */
function getTestFilePath(relativePath: string): string {
  // Get the directory of the current file (test/helpers/)
  const currentDir = __dirname;
  // Go up two levels to the project root
  const projectRoot = path.resolve(currentDir, "../..");
  // Resolve the path from the project root
  return path.resolve(projectRoot, relativePath);
}

/**
 * Modifies the constants.ts file to use test constants
 */
async function modifyConstantsFile(): Promise<void> {
  const constantsFilePath = getTestFilePath("src/utils/constants.ts");
  const testConstantsFilePath = getTestFilePath("test/helpers/constants.ts");

  // Create backup file path
  const backupFilePath = `${constantsFilePath}.bak`;

  // Check if backup already exists
  try {
    await fs.access(backupFilePath);
    log(`Backup file already exists at ${backupFilePath}`);
  } catch (error) {
    // Backup doesn't exist, create it
    log(`Creating backup at ${backupFilePath}`);
    const originalContent = await fs.readFile(constantsFilePath, "utf-8");
    await fs.writeFile(backupFilePath, originalContent, "utf-8");
  }

  // Read the test constants content
  const testConstantsContent = await fs.readFile(testConstantsFilePath, "utf-8");

  // Write the test constants content to the original file
  await fs.writeFile(constantsFilePath, testConstantsContent, "utf-8");
  log(`Replaced ${constantsFilePath} with test constants`);
}

/**
 * Main function to modify files
 */
async function modifyFiles(): Promise<void> {
  try {
    log("Modifying constants file...");
    await modifyConstantsFile();

    log("All files modified successfully!");
  } catch (error) {
    logError("Error modifying files:", error);
    process.exit(1);
  }
}

// Run the modification if this file is executed directly
if (require.main === module) {
  modifyFiles()
    .then(() => process.exit(0))
    .catch((error) => {
      logError("Unhandled error:", error);
      process.exit(1);
    });
}
