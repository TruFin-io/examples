import { type Program } from "@coral-xyz/anchor";
import { type TrubillVault } from "../common/idls/trubill_vault";
import * as Pda from "../common/web3/pda";

/**
 * Epoch that deposit and redeem must price against: the vault's last snapshotted epoch.
 * The program enforces `epoch == vault_config.last_snapshot_epoch`, so read it straight from
 * the config. The Delta Manager epoch can run ahead of this whenever the operator's snapshot
 * lags, so deriving from cluster time would return an epoch the vault has not snapshotted yet.
 */
export async function getSnapshotEpoch(program: Program<TrubillVault>) {
  const config = await program.account.vaultConfig.fetch(Pda.getPdaVaultConfigAddress());
  return config.lastSnapshotEpoch;
}
