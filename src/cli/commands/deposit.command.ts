import { Keypair } from "@solana/web3.js";
import * as fs from "fs";
import * as os from "os";
import type { CommandModule } from "yargs";

import { deposit } from "../../scripts/deposit";
import { parseSol } from "../../utils/format";

interface DepositArgs {
  user: string;
  amount: number;
}

export const depositCommand: CommandModule<{}, DepositArgs> = {
  command: "deposit <user> <amount>",
  describe: "Deposits SOL into the staker program",
  builder: (yargs) => {
    return yargs
      .positional("user", {
        describe: "Name of the user keypair file in ~/.config/solana/",
        type: "string",
        demandOption: true,
      })
      .positional("amount", {
        describe: "Amount of SOL to deposit",
        type: "number",
        demandOption: true,
      })
      .example("$0 deposit alice 1.5", "Deposit 1.5 SOL using the alice keypair")
      .example("$0 deposit bob   2", "Deposit 2 SOL using the bob keypair");
  },
  handler: async (argv) => {
    try {
      const { user, amount } = argv;

      if (amount <= 0) {
        console.error("Amount must be a positive number");
        process.exit(1);
      }

      // Read user keypair from the default Solana config location
      const userKeypairPath = `${os.homedir()}/.config/solana/${user}.json`;
      if (!fs.existsSync(userKeypairPath)) {
        console.error(`Keypair file not found at: ${userKeypairPath}`);
        process.exit(1);
      }

      const userKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(userKeypairPath, "utf-8"))));

      // Convert SOL amount to lamports
      const depositAmount = parseSol(amount);

      // Call the deposit function
      const txHash = await deposit(userKeypair, depositAmount);
      console.log("Deposit successful! Transaction hash:", txHash);
    } catch (error) {
      console.error("Error during deposit:", error);
      process.exit(1);
    }
  },
};
