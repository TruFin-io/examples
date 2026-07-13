import { type Address, address, getAddressEncoder, getProgramDerivedAddress } from "@solana/kit";
import { ASSOCIATED_TOKEN_PROGRAM, TOKEN_PROGRAM } from "../../common/addresses";

const addressEncoder = getAddressEncoder();

/** Derive the associated token account address for (owner, mint) under a token program. */
export async function deriveAta(
  owner: Address,
  mint: Address,
  tokenProgram: Address = address(TOKEN_PROGRAM),
): Promise<Address> {
  const [ata] = await getProgramDerivedAddress({
    programAddress: address(ASSOCIATED_TOKEN_PROGRAM),
    seeds: [addressEncoder.encode(owner), addressEncoder.encode(tokenProgram), addressEncoder.encode(mint)],
  });
  return ata;
}
