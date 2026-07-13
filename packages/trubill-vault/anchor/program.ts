import { AnchorProvider, Program, setProvider, Wallet } from "@coral-xyz/anchor";
import { Keypair } from "@solana/web3.js";
import { type TrubillVault } from "../common/idls/trubill_vault";
import trubillIdl from "../common/idls/trubill_vault.json";
import { getConnection } from "../common/web3/env";

/** Build an Anchor provider. Pass readOnly for view scripts (throwaway wallet, needs only RPC_URL). */
export function getProvider(wallet?: Keypair, readOnly = false): AnchorProvider {
  const signer = readOnly || !wallet ? Keypair.generate() : wallet;
  const provider = new AnchorProvider(getConnection(), new Wallet(signer), { commitment: "confirmed" });
  setProvider(provider);
  return provider;
}

/** TruBILL vault program from the committed IDL (address already mainnet). */
export function getTrubillVaultProgram(provider: AnchorProvider): Program<TrubillVault> {
  return new Program(trubillIdl as TrubillVault, provider);
}
