import { PublicKey } from "@solana/web3.js";
import { ASSET_CONTROLLER } from "../../common/addresses";
import { getConnection } from "../../common/web3/env";
import { calcDMEffectiveEpoch, getClusterTime } from "../../common/web3/helpers";

// AssetController field offsets after the 8-byte discriminator, from the Delta Manager IDL.
const CURRENT_EPOCH_OFFSET = 312;
const EPOCH_DURATION_OFFSET = 320;
const EPOCH_START_OFFSET = 328;

/** Print the latest completed and current (effective) Delta Manager epochs, decoding AssetController by hand. */
async function main() {
  const connection = getConnection();
  const info = await connection.getAccountInfo(new PublicKey(ASSET_CONTROLLER));
  if (!info) throw new Error("AssetController account not found");

  const now = await getClusterTime(connection);
  const effective = calcDMEffectiveEpoch(
    info.data.readBigUInt64LE(CURRENT_EPOCH_OFFSET),
    info.data.readBigUInt64LE(EPOCH_DURATION_OFFSET),
    info.data.readBigUInt64LE(EPOCH_START_OFFSET),
    now,
  );
  const completed = effective > 0n ? effective - 1n : 0n;

  console.log("Latest completed epoch:", completed.toString());
  console.log("Effective (current) epoch:", effective.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
