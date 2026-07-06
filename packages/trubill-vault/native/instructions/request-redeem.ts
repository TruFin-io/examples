import { fileURLToPath } from "node:url";
import { BN } from "@coral-xyz/anchor";
import { TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { TRUBILL_VAULT_PROGRAM_ID } from "../../common/addresses";
import { trubill } from "../../common/amounts";
import { getConnection, getWalletKeypair } from "../../common/web3/env";
import * as pda from "../../common/web3/pda";
import { deriveATAAddress } from "../../common/web3/token";
import { buildSignAndProcessTxV0 } from "../../common/web3/tx";

// Anchor discriminator for `request_redeem`, taken from the IDL.
const REQUEST_REDEEM_DISCRIMINATOR = Buffer.from([105, 49, 44, 38, 207, 241, 33, 173]);

/** Serialize request-redeem args: discriminator, then epoch and trubill amount as little-endian u64s. */
function encodeRequestRedeemData(epoch: BN, trubillAmount: BN): Buffer {
  return Buffer.concat([
    REQUEST_REDEEM_DISCRIMINATOR,
    epoch.toArrayLike(Buffer, "le", 8),
    trubillAmount.toArrayLike(Buffer, "le", 8),
  ]);
}

/** Build the raw request-redeem instruction: burn TruBILL now and record a claim for later. */
export function buildRequestRedeemIx(params: {
  user: PublicKey;
  epoch: BN;
  redeemRequestId: BN;
  trubillAmount: BN;
}): TransactionInstruction {
  const { user, epoch, redeemRequestId, trubillAmount } = params;
  const programId = new PublicKey(TRUBILL_VAULT_PROGRAM_ID);
  const trubillMint = pda.getPdaTrubillMintAddress();
  const userTrubillAta = deriveATAAddress(trubillMint, user, TOKEN_2022_PROGRAM_ID);

  // Order is fixed by the program. Each row: isSigner, isWritable, and the account's role.
  const keys = [
    { pubkey: user, isSigner: true, isWritable: true }, // user: signs, TruBILL burned from their ATA
    { pubkey: pda.getPdaVaultConfigAddress(), isSigner: false, isWritable: true }, // vault_config: params and epoch state
    { pubkey: pda.getPdaUsdcAccountingAddress(), isSigner: false, isWritable: true }, // usdc_accounting: records USDC owed
    { pubkey: pda.getPdaUltraAccountingAddress(), isSigner: false, isWritable: true }, // ultra_accounting: reserves ULTRA to redeem
    { pubkey: pda.getPdaStakerUserStatusAddress(user), isSigner: false, isWritable: false }, // user_whitelist: must be Whitelisted
    { pubkey: pda.getPdaVaultAuthorityAddress(), isSigner: false, isWritable: false }, // vault_authority: burn signer PDA
    { pubkey: trubillMint, isSigner: false, isWritable: true }, // trubill_mint: shares burned here
    { pubkey: userTrubillAta, isSigner: false, isWritable: true }, // user_trubill_ata: user's share source
    { pubkey: pda.getPdaUserRedeemStateAddress(user), isSigner: false, isWritable: true }, // user_redeem_state: id counter
    { pubkey: pda.getPdaRedeemRequestAddress(user, redeemRequestId), isSigner: false, isWritable: true }, // redeem_request: claim record
    { pubkey: pda.getPdaEpochSnapshotAddress(epoch), isSigner: false, isWritable: false }, // epoch_snapshot: NAV for pricing
    { pubkey: TOKEN_2022_PROGRAM_ID, isSigner: false, isWritable: false }, // token_program_2022: for the burn
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }, // system_program
    { pubkey: pda.getPdaEventAuthorityAddress(), isSigner: false, isWritable: false }, // event_authority: Anchor event CPI
    { pubkey: programId, isSigner: false, isWritable: false }, // program: self, for the event CPI
  ];

  return new TransactionInstruction({ programId, keys, data: encodeRequestRedeemData(epoch, trubillAmount) });
}

async function main() {
  const [amountStr, epochStr, keypairPath] = process.argv.slice(2);
  if (!amountStr || !epochStr) {
    console.error("Usage: bun run native/instructions/request-redeem.ts <trubillAmount> <epoch> [keypairPath]");
    console.error("  find the epoch with: bun run native/view/latest-epoch.ts");
    process.exit(1);
  }

  const user = getWalletKeypair(keypairPath);
  const connection = getConnection();

  // UserRedeemState is an 8-byte discriminator followed by a little-endian u64 next_redeem_request_id.
  const stateInfo = await connection.getAccountInfo(pda.getPdaUserRedeemStateAddress(user.publicKey));
  const redeemRequestId = stateInfo ? new BN(stateInfo.data.subarray(8, 16), "le") : new BN(0);

  const trubillAmount = new BN(trubill(amountStr).toString());
  const ix = buildRequestRedeemIx({ user: user.publicKey, epoch: new BN(epochStr), redeemRequestId, trubillAmount });
  const signature = await buildSignAndProcessTxV0(connection, [ix], user);
  console.log(`Request-redeem tx: ${signature} (redeem request id ${redeemRequestId.toString()})`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
