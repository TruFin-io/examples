import { fetchVaultConfig, findVaultConfigPda } from "../generated/trubill_vault/src/generated";
import { getRpc } from "./rpc";

/**
 * Epoch that deposit and redeem must price against: the vault's last snapshotted epoch.
 * The program enforces `epoch == vault_config.last_snapshot_epoch`, so read it straight from
 * the config. The Delta Manager epoch can run ahead of this whenever the operator's snapshot
 * lags, so deriving from cluster time would return an epoch the vault has not snapshotted yet.
 */
export async function getSnapshotEpoch(): Promise<bigint> {
  const { rpc } = getRpc();
  const [vaultConfig] = await findVaultConfigPda();
  return (await fetchVaultConfig(rpc, vaultConfig)).data.lastSnapshotEpoch;
}
