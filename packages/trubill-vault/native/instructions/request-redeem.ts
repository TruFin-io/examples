import { fileURLToPath } from "node:url";
import { BN } from "@coral-xyz/anchor";
import { TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { TRUBILL_VAULT_PROGRAM_ID } from "../../common/addresses";
import { toBN, trubill } from "../../common/amounts";
import { getConnection, getWalletKeypair } from "../../common/web3/env";
import * as Pda from "../../common/web3/pda";
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
  const trubillMint = Pda.getPdaTrubillMintAddress();
  const userTrubillAta = deriveATAAddress(trubillMint, user, TOKEN_2022_PROGRAM_ID);

  // Order is fixed by the program. Each row: isSigner, isWritable, and the account's role.
  const keys = [
    { pubkey: user, isSigner: true, isWritable: true }, // user: signs, TruBILL burned from their ATA
    { pubkey: Pda.getPdaVaultConfigAddress(), isSigner: false, isWritable: true }, // vault_config: params and epoch state
    { pubkey: Pda.getPdaUsdcAccountingAddress(), isSigner: false, isWritable: true }, // usdc_accounting: records USDC owed
    { pubkey: Pda.getPdaUltraAccountingAddress(), isSigner: false, isWritable: true }, // ultra_accounting: reserves ULTRA to redeem
    { pubkey: Pda.getPdaStakerUserStatusAddress(user), isSigner: false, isWritable: false }, // user_whitelist: must be Whitelisted
    { pubkey: Pda.getPdaVaultAuthorityAddress(), isSigner: false, isWritable: false }, // vault_authority: burn signer PDA
    { pubkey: trubillMint, isSigner: false, isWritable: true }, // trubill_mint: shares burned here
    { pubkey: userTrubillAta, isSigner: false, isWritable: true }, // user_trubill_ata: user's share source
    { pubkey: Pda.getPdaUserRedeemStateAddress(user), isSigner: false, isWritable: true }, // user_redeem_state: id counter
    { pubkey: Pda.getPdaRedeemRequestAddress(user, redeemRequestId), isSigner: false, isWritable: true }, // redeem_request: claim record
    { pubkey: Pda.getPdaEpochSnapshotAddress(epoch), isSigner: false, isWritable: false }, // epoch_snapshot: NAV for pricing
    { pubkey: TOKEN_2022_PROGRAM_ID, isSigner: false, isWritable: false }, // token_program_2022: for the burn
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }, // system_program
    { pubkey: Pda.getPdaEventAuthorityAddress(), isSigner: false, isWritable: false }, // event_authority: Anchor event CPI
    { pubkey: programId, isSigner: false, isWritable: false }, // program: self, for the event CPI
  ];

  return new TransactionInstruction({ programId, keys, data: encodeRequestRedeemData(epoch, trubillAmount) });
}

async function main() {
  const [amountStr, epochStr, keypairPath] = process.argv.slice(2);
  if (!amountStr || !epochStr) {
    console.error("Usage: bun run native/instructions/request-redeem.ts <trubillAmount> <epoch> [keypairPath]");
    console.error("  <trubillAmount>  TruBILL shares to redeem, as a decimal (e.g. 5.0)");
    console.error("  <epoch>          pricing epoch (find with: bun run native/view/latest-epoch.ts)");
    console.error("  [keypairPath]    wallet keypair JSON; defaults to WALLET_KEYPAIR");
    console.error("  SIMULATE=true    dry-run only: build and simulate, never send");
    process.exit(1);
  }

  const user = getWalletKeypair(keypairPath);
  const connection = getConnection();

  // UserRedeemState is an 8-byte discriminator followed by a little-endian u64 next_redeem_request_id.
  const stateInfo = await connection.getAccountInfo(Pda.getPdaUserRedeemStateAddress(user.publicKey));
  const redeemRequestId = stateInfo ? new BN(stateInfo.data.subarray(8, 16), "le") : new BN(0);

  const trubillAmount = toBN(trubill(amountStr));
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
