import { type BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import * as Address from "../addresses";
import * as Seed from "../seeds";

/** Derive the first PDA for the given seeds under a program. */
function pda(
  seeds: Array<Buffer | Uint8Array>,
  programId: PublicKey = new PublicKey(Address.TRUBILL_VAULT_PROGRAM_ID),
): PublicKey {
  return PublicKey.findProgramAddressSync(seeds, programId)[0];
}

const u64 = (value: BN): Buffer => value.toArrayLike(Buffer, "le", 8);

export const getPdaVaultConfigAddress = (): PublicKey => pda([Buffer.from(Seed.VAULT_CONFIG)]);
export const getPdaUsdcAccountingAddress = (): PublicKey => pda([Buffer.from(Seed.USDC_ACCOUNTING)]);
export const getPdaUltraAccountingAddress = (): PublicKey => pda([Buffer.from(Seed.ULTRA_ACCOUNTING)]);
export const getPdaVaultAccessAddress = (): PublicKey => pda([Buffer.from(Seed.VAULT_ACCESS)]);
export const getPdaVaultAuthorityAddress = (): PublicKey => pda([Buffer.from(Seed.VAULT_AUTHORITY)]);
export const getPdaTrubillMintAddress = (): PublicKey => pda([Buffer.from(Seed.TRUBILL_MINT)]);
export const getPdaSharePriceAddress = (): PublicKey => pda([Buffer.from(Seed.SHARE_PRICE)]);
export const getPdaEventAuthorityAddress = (): PublicKey => pda([Buffer.from(Seed.EVENT_AUTHORITY)]);

export const getPdaEpochSnapshotAddress = (epoch: BN): PublicKey => pda([Buffer.from(Seed.EPOCH_SNAPSHOT), u64(epoch)]);
export const getPdaUserRedeemStateAddress = (user: PublicKey): PublicKey =>
  pda([Buffer.from(Seed.USER_REDEEM_STATE), user.toBuffer()]);
export const getPdaRedeemRequestAddress = (user: PublicKey, redeemRequestId: BN): PublicKey =>
  pda([Buffer.from(Seed.REDEEM_REQUEST), user.toBuffer(), u64(redeemRequestId)]);

export const getPdaStakerUserStatusAddress = (user: PublicKey): PublicKey =>
  pda([Buffer.from(Seed.USER), user.toBuffer()], new PublicKey(Address.STAKER));
