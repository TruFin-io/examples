import { fileURLToPath } from "node:url";
import { BN } from "@coral-xyz/anchor";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { TRUBILL_VAULT_PROGRAM_ID, USDC_MINT } from "../../common/addresses";
import { usdc } from "../../common/amounts";
import { toBN } from "../../common/web3/bn";
import { getConnection, getWalletKeypair } from "../../common/web3/env";
import * as Pda from "../../common/web3/pda";
import { deriveATAAddress } from "../../common/web3/token";
import { buildSignAndProcessTxV0 } from "../../common/web3/tx";

// Anchor discriminator for `instant_redeem`, taken from the IDL.
const INSTANT_REDEEM_DISCRIMINATOR = Buffer.from([187, 107, 208, 125, 224, 237, 40, 93]);

/** Serialize instant-redeem args: discriminator, then epoch and redeem amount as little-endian u64s. */
function encodeInstantRedeemData(epoch: BN, redeemAmount: BN): Buffer {
  return Buffer.concat([
    INSTANT_REDEEM_DISCRIMINATOR,
    epoch.toArrayLike(Buffer, "le", 8),
    redeemAmount.toArrayLike(Buffer, "le", 8),
  ]);
}

/** Build the raw instant-redeem instruction: burn shares and pay USDC immediately from the reserve. */
export function buildInstantRedeemIx(params: {
  user: PublicKey;
  epoch: BN;
  redeemAmount: BN;
  treasury: PublicKey;
}): TransactionInstruction {
  const { user, epoch, redeemAmount, treasury } = params;
  const programId = new PublicKey(TRUBILL_VAULT_PROGRAM_ID);
  const usdcMint = new PublicKey(USDC_MINT);
  const vaultAuthority = Pda.getPdaVaultAuthorityAddress();
  const trubillMint = Pda.getPdaTrubillMintAddress();
  const userTrubillAta = deriveATAAddress(trubillMint, user, TOKEN_2022_PROGRAM_ID);
  const userUsdcAta = deriveATAAddress(usdcMint, user);
  const vaultCollateralAta = deriveATAAddress(usdcMint, vaultAuthority);
  const treasuryUsdcAta = deriveATAAddress(usdcMint, treasury);

  // Order is fixed by the program. Each row: isSigner, isWritable, and the account's role.
  const keys = [
    { pubkey: user, isSigner: true, isWritable: true }, // payer: signs, shares burned, receives USDC
    { pubkey: Pda.getPdaVaultConfigAddress(), isSigner: false, isWritable: false }, // vault_config: params and epoch state
    { pubkey: Pda.getPdaUsdcAccountingAddress(), isSigner: false, isWritable: true }, // usdc_accounting: reserve ledger
    { pubkey: Pda.getPdaUltraAccountingAddress(), isSigner: false, isWritable: true }, // ultra_accounting: reserve-replenish queue
    { pubkey: Pda.getPdaStakerUserStatusAddress(user), isSigner: false, isWritable: false }, // user_whitelist: must be Whitelisted
    { pubkey: vaultAuthority, isSigner: false, isWritable: false }, // vault_authority: burn and transfer signer PDA
    { pubkey: userTrubillAta, isSigner: false, isWritable: true }, // user_vault_token_account: user's share source
    { pubkey: userUsdcAta, isSigner: false, isWritable: true }, // user_usdc_ata: USDC paid out here
    { pubkey: vaultCollateralAta, isSigner: false, isWritable: true }, // vault_collateral_ata: vault USDC source
    { pubkey: treasuryUsdcAta, isSigner: false, isWritable: true }, // treasury_usdc_ata: instant-redeem fee sink
    { pubkey: treasury, isSigner: false, isWritable: true }, // treasury: fee owner (from the vault config)
    { pubkey: usdcMint, isSigner: false, isWritable: false }, // usdc_mint: payout asset
    { pubkey: trubillMint, isSigner: false, isWritable: true }, // trubill_mint: shares burned here
    { pubkey: Pda.getPdaEpochSnapshotAddress(epoch), isSigner: false, isWritable: false }, // epoch_snapshot: NAV for pricing
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // token_program: SPL Token, for USDC
    { pubkey: TOKEN_2022_PROGRAM_ID, isSigner: false, isWritable: false }, // token_program_2022: for the burn
    { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // associated_token_program: ATA creation
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }, // system_program
    { pubkey: Pda.getPdaEventAuthorityAddress(), isSigner: false, isWritable: false }, // event_authority: Anchor event CPI
    { pubkey: programId, isSigner: false, isWritable: false }, // program: self, for the event CPI
  ];

  return new TransactionInstruction({ programId, keys, data: encodeInstantRedeemData(epoch, redeemAmount) });
}

async function main() {
  const [amountStr, epochStr, treasuryStr, keypairPath] = process.argv.slice(2);
  if (!amountStr || !epochStr || !treasuryStr) {
    console.error("Usage: bun run native/instructions/instant-redeem.ts <amount> <epoch> <treasury> [keypairPath]");
    console.error("  find the epoch and treasury with: bun run native/view/vault.ts");
    process.exit(1);
  }

  const user = getWalletKeypair(keypairPath);
  const redeemAmount = toBN(usdc(amountStr));
  const ix = buildInstantRedeemIx({
    user: user.publicKey,
    epoch: new BN(epochStr),
    redeemAmount,
    treasury: new PublicKey(treasuryStr),
  });
  const signature = await buildSignAndProcessTxV0(getConnection(), [ix], user);
  console.log(`Instant-redeem tx: ${signature}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
