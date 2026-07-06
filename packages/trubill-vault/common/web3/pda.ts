import { PublicKey } from "@solana/web3.js";
import * as address from "../addresses";
import * as seed from "../seeds";

const VAULT_PROGRAM = new PublicKey(address.TRUBILL_VAULT_PROGRAM_ID);
const STAKER_PROGRAM = new PublicKey(address.STAKER);

/** Derive the first PDA for the given seeds under a program. */
function pda(seeds: Array<Buffer | Uint8Array>, programId: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(seeds, programId)[0];
}

/** Encode a u64 as an 8-byte little-endian buffer (epoch / request id seeds). */
function u64le(value: number | bigint): Buffer {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(BigInt(value));
  return buf;
}

/** Vault config: params, fees and epoch tracking. */
export const getPdaVaultConfig = (): PublicKey => pda([Buffer.from(seed.VAULT_CONFIG)], VAULT_PROGRAM);
/** USDC ledger. */
export const getPdaUsdcAccounting = (): PublicKey => pda([Buffer.from(seed.USDC_ACCOUNTING)], VAULT_PROGRAM);
/** ULTRA ledger. */
export const getPdaUltraAccounting = (): PublicKey => pda([Buffer.from(seed.ULTRA_ACCOUNTING)], VAULT_PROGRAM);
/** Owner/operator/pending-owner controls. */
export const getPdaVaultAccess = (): PublicKey => pda([Buffer.from(seed.VAULT_ACCESS)], VAULT_PROGRAM);
/** Vault signing PDA: mint/burn and CPI authority. */
export const getPdaVaultAuthority = (): PublicKey => pda([Buffer.from(seed.VAULT_AUTHORITY)], VAULT_PROGRAM);
/** TruBILL share mint. */
export const getPdaTrubillMint = (): PublicKey => pda([Buffer.from(seed.TRUBILL_MINT)], VAULT_PROGRAM);
/** Live TruBILL/USDC price. */
export const getPdaSharePrice = (): PublicKey => pda([Buffer.from(seed.SHARE_PRICE)], VAULT_PROGRAM);
/** Anchor event-CPI authority. */
export const getPdaEventAuthority = (): PublicKey => pda([Buffer.from(seed.EVENT_AUTHORITY)], VAULT_PROGRAM);

/** Immutable valuation checkpoint for an epoch. */
export const getPdaEpochSnapshot = (epoch: number | bigint): PublicKey =>
  pda([Buffer.from(seed.EPOCH_SNAPSHOT), u64le(epoch)], VAULT_PROGRAM);
/** Per-user redeem-request id counter. */
export const getPdaUserRedeemState = (user: PublicKey): PublicKey =>
  pda([Buffer.from(seed.USER_REDEEM_STATE), user.toBuffer()], VAULT_PROGRAM);
/** Per-user delayed withdrawal claim record. */
export const getPdaRedeemRequest = (user: PublicKey, redeemRequestId: number | bigint): PublicKey =>
  pda([Buffer.from(seed.REDEEM_REQUEST), user.toBuffer(), u64le(redeemRequestId)], VAULT_PROGRAM);

/** Staker whitelist status for a user (gate on all user flows). */
export const getPdaStakerUserStatus = (user: PublicKey): PublicKey =>
  pda([Buffer.from(seed.USER), user.toBuffer()], STAKER_PROGRAM);
