import { fileURLToPath } from "node:url";
import { BN } from "@coral-xyz/anchor";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { TRUBILL_VAULT_PROGRAM_ID, USDC_MINT } from "../../common/addresses";
import { toBN, usdc } from "../../common/amounts";
import { getConnection, getWalletKeypair } from "../../common/web3/env";
import * as Pda from "../../common/web3/pda";
import { deriveATAAddress } from "../../common/web3/token";
import { buildSignAndProcessTxV0 } from "../../common/web3/tx";

// Anchor discriminator for `deposit`: sha256("global:deposit")[..8], taken from the IDL.
const DEPOSIT_DISCRIMINATOR = Buffer.from([242, 35, 198, 137, 82, 225, 242, 182]);

/** Serialize deposit args: 8-byte discriminator, then epoch and amount as little-endian u64s. */
function encodeDepositData(epoch: BN, amount: BN): Buffer {
  return Buffer.concat([
    DEPOSIT_DISCRIMINATOR,
    epoch.toArrayLike(Buffer, "le", 8),
    amount.toArrayLike(Buffer, "le", 8),
  ]);
}

/** Build the raw deposit instruction: transfer `amount` USDC and mint TruBILL priced at `epoch`. */
export function buildDepositIx(params: { user: PublicKey; epoch: BN; amount: BN }): TransactionInstruction {
  const { user, epoch, amount } = params;
  const programId = new PublicKey(TRUBILL_VAULT_PROGRAM_ID);
  const usdcMint = new PublicKey(USDC_MINT);
  const vaultAuthority = Pda.getPdaVaultAuthorityAddress();
  const trubillMint = Pda.getPdaTrubillMintAddress();
  const userTrubillAta = deriveATAAddress(trubillMint, user, TOKEN_2022_PROGRAM_ID);
  const userUsdcAta = deriveATAAddress(usdcMint, user);
  const vaultCollateralAta = deriveATAAddress(usdcMint, vaultAuthority);

  // Order is fixed by the program. Each row: isSigner, isWritable, and the account's role.
  const keys = [
    { pubkey: user, isSigner: true, isWritable: true }, // payer: signs and funds, source of the USDC
    { pubkey: Pda.getPdaVaultConfigAddress(), isSigner: false, isWritable: false }, // vault_config: params and epoch state
    { pubkey: Pda.getPdaUsdcAccountingAddress(), isSigner: false, isWritable: true }, // usdc_accounting: reserve/pending ledger
    { pubkey: Pda.getPdaStakerUserStatusAddress(user), isSigner: false, isWritable: false }, // user_whitelist: must be Whitelisted
    { pubkey: vaultAuthority, isSigner: false, isWritable: false }, // vault_authority: mint and CPI signer PDA
    { pubkey: userTrubillAta, isSigner: false, isWritable: true }, // user_vault_token_account: TruBILL shares minted here
    { pubkey: userUsdcAta, isSigner: false, isWritable: true }, // user_usdc_ata: user's USDC source
    { pubkey: vaultCollateralAta, isSigner: false, isWritable: true }, // vault_collateral_ata: vault USDC sink
    { pubkey: usdcMint, isSigner: false, isWritable: false }, // usdc_mint: the deposit asset
    { pubkey: trubillMint, isSigner: false, isWritable: true }, // trubill_mint: share mint (Token-2022)
    { pubkey: Pda.getPdaEpochSnapshotAddress(epoch), isSigner: false, isWritable: false }, // epoch_snapshot: NAV for pricing
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // token_program: SPL Token, for USDC
    { pubkey: TOKEN_2022_PROGRAM_ID, isSigner: false, isWritable: false }, // token_program_2022: for the share mint
    { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // associated_token_program: ATA creation
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }, // system_program
    { pubkey: Pda.getPdaEventAuthorityAddress(), isSigner: false, isWritable: false }, // event_authority: Anchor event CPI
    { pubkey: programId, isSigner: false, isWritable: false }, // program: self, for the event CPI
  ];

  return new TransactionInstruction({ programId, keys, data: encodeDepositData(epoch, amount) });
}

async function main() {
  const [amountStr, epochStr, keypairPath] = process.argv.slice(2);
  if (!amountStr || !epochStr) {
    console.error("Usage: bun run native/instructions/deposit.ts <amount> <epoch> [keypairPath]");
    console.error("  find the epoch with: bun run native/view/latest-epoch.ts");
    process.exit(1);
  }

  const user = getWalletKeypair(keypairPath);
  const amount = toBN(usdc(amountStr));
  const ix = buildDepositIx({ user: user.publicKey, epoch: new BN(epochStr), amount });
  const signature = await buildSignAndProcessTxV0(getConnection(), [ix], user);
  console.log(`Deposit tx: ${signature}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
