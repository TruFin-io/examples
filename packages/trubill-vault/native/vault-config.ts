import { BN } from "@coral-xyz/anchor";
import { type Connection, PublicKey } from "@solana/web3.js";
import * as Pda from "../common/web3/pda";

// VaultConfig layout after the 8-byte Anchor discriminator:
//   vault_authority_bump u8 | is_paused bool | min_deposit_amount u64 |
//   instant_redeem_fee u16 | treasury pubkey(32) | last_snapshot_epoch u64 | ...
const TREASURY_OFFSET = 20;
const LAST_SNAPSHOT_EPOCH_OFFSET = 52;

/** Read the fields the flows need straight from the raw VaultConfig account. */
export async function getVaultConfig(connection: Connection): Promise<{ treasury: PublicKey; lastSnapshotEpoch: BN }> {
  const info = await connection.getAccountInfo(Pda.getPdaVaultConfigAddress());
  if (!info) throw new Error("VaultConfig account not found");
  return {
    treasury: new PublicKey(info.data.subarray(TREASURY_OFFSET, TREASURY_OFFSET + 32)),
    lastSnapshotEpoch: new BN(info.data.subarray(LAST_SNAPSHOT_EPOCH_OFFSET, LAST_SNAPSHOT_EPOCH_OFFSET + 8), "le"),
  };
}
