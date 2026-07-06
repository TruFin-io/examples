import { AnchorProvider, Program, setProvider, Wallet } from "@coral-xyz/anchor";
import { Keypair } from "@solana/web3.js";
import { type DeltaManager } from "../common/idls/delta_manager";
import dmIdl from "../common/idls/delta_manager.json";
import { type TrubillVault } from "../common/idls/trubill_vault";
import trubillIdl from "../common/idls/trubill_vault.json";
import { getConnection } from "../common/web3/env";

/** Build an Anchor provider from a wallet keypair. */
export function getProvider(wallet: Keypair): AnchorProvider {
  const provider = new AnchorProvider(getConnection(), new Wallet(wallet), { commitment: "confirmed" });
  setProvider(provider);
  return provider;
}

/** Provider with a throwaway wallet for read-only scripts (needs only RPC_URL). */
export function getReadOnlyProvider(): AnchorProvider {
  return new AnchorProvider(getConnection(), new Wallet(Keypair.generate()), { commitment: "confirmed" });
}

/** TruBILL vault program from the committed IDL (address already mainnet). */
export function getTrubillVaultProgram(provider: AnchorProvider): Program<TrubillVault> {
  return new Program(trubillIdl as TrubillVault, provider);
}

/** Delta Manager program from the committed IDL (address already mainnet). */
export function getDeltaManagerProgram(provider: AnchorProvider): Program<DeltaManager> {
  return new Program(dmIdl as DeltaManager, provider);
}
