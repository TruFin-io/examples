import { TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { USDC_MINT } from "../../common/addresses";
import { Decimals, formatUnits } from "../../common/amounts";
import { getConnection, getWalletKeypair } from "../../common/web3/env";
import * as Pda from "../../common/web3/pda";
import { deriveATAAddress, getTokenBalance } from "../../common/web3/token";

/** Print SOL, USDC and TruBILL balances for an address (defaults to the wallet). */
async function main() {
  const [addressArg] = process.argv.slice(2);
  const owner = addressArg ? new PublicKey(addressArg) : getWalletKeypair().publicKey;
  const connection = getConnection();

  const sol = await connection.getBalance(owner);
  const usdcBalance = await getTokenBalance(connection, deriveATAAddress(new PublicKey(USDC_MINT), owner));
  const trubillBalance = await getTokenBalance(
    connection,
    deriveATAAddress(Pda.getPdaTrubillMintAddress(), owner, TOKEN_2022_PROGRAM_ID),
    TOKEN_2022_PROGRAM_ID,
  );

  console.log("Owner:", owner.toBase58());
  console.log("SOL:", formatUnits(BigInt(sol), Decimals.SOL));
  console.log("USDC:", formatUnits(usdcBalance, Decimals.USDC));
  console.log("TruBILL:", formatUnits(trubillBalance, Decimals.TRUBILL));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
