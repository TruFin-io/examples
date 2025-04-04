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
 * Restores a file from its backup
 * @param filePath Path to the file to restore
 */
async function restoreFile(filePath: string): Promise<void> {
  const backupFilePath = `${filePath}.bak`;

  try {
    // Check if backup exists
    await fs.access(backupFilePath);

    // Read the backup content
    const backupContent = await fs.readFile(backupFilePath, "utf-8");

    // Restore the original content
    await fs.writeFile(filePath, backupContent, "utf-8");

    // Delete the backup file
    await fs.unlink(backupFilePath);

    log(`Restored ${filePath} from backup and deleted backup file`);
  } catch (error) {
    logError(`Failed to restore ${filePath}: Backup file not found at ${backupFilePath}`);
    throw error;
  }
}

/**
 * Restores the constants.ts file to its original state
 */
async function restoreConstantsFile(): Promise<void> {
  const constantsFilePath = getTestFilePath("src/utils/constants.ts");
  await restoreFile(constantsFilePath);
}

/**
 * Main function to restore files
 */
async function restoreFiles(): Promise<void> {
  try {
    log("Restoring constants file...");
    await restoreConstantsFile();

    log("All files restored successfully!");
  } catch (error) {
    logError("Error restoring files:", error);
    process.exit(1);
  }
}

// Run the restoration if this file is executed directly
if (require.main === module) {
  restoreFiles()
    .then(() => process.exit(0))
    .catch((error) => {
      logError("Unhandled error:", error);
      process.exit(1);
    });
}
