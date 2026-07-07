import { type Address, address, isSolanaError, SOLANA_ERROR__JSON_RPC__INVALID_PARAMS } from "@solana/kit";
import { TOKEN_2022_PROGRAM, USDC_MINT } from "../../common/addresses";
import { Decimals, formatUnits } from "../../common/amounts";
import { findTrubillMintPda } from "../generated/trubill_vault/src/generated";
import { getWalletSigner } from "../lib/env";
import { getRpc } from "../lib/rpc";
import { deriveAta } from "../lib/token";

/** Raw token amount in the account, or 0 when the account does not exist. */
async function getTokenBalance(rpc: ReturnType<typeof getRpc>["rpc"], ata: Address): Promise<bigint> {
  try {
    const { value } = await rpc.getTokenAccountBalance(ata).send();
    return BigInt(value.amount);
  } catch (error) {
    // A missing (or not-yet-created) ATA makes the RPC reject with invalid-params; surface everything else.
    if (isSolanaError(error, SOLANA_ERROR__JSON_RPC__INVALID_PARAMS)) return 0n;
    throw error;
  }
}

/** Print SOL, USDC and TruBILL balances for an address (defaults to the wallet). */
async function main() {
  const [addressArg] = process.argv.slice(2);
  const owner = addressArg ? address(addressArg) : (await getWalletSigner()).address;
  const { rpc } = getRpc();

  const { value: sol } = await rpc.getBalance(owner, { commitment: "confirmed" }).send();
  const usdcBalance = await getTokenBalance(rpc, await deriveAta(owner, address(USDC_MINT)));
  const [trubillMint] = await findTrubillMintPda();
  const trubillBalance = await getTokenBalance(rpc, await deriveAta(owner, trubillMint, address(TOKEN_2022_PROGRAM)));

  console.log("Owner:", owner);
  console.log("SOL:", formatUnits(sol, Decimals.SOL));
  console.log("USDC:", formatUnits(usdcBalance, Decimals.USDC));
  console.log("TruBILL:", formatUnits(trubillBalance, Decimals.TRUBILL));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
