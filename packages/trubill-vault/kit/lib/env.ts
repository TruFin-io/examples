import { createKeyPairSignerFromBytes, type KeyPairSigner } from "@solana/kit";
import { readSecretKeyBytes } from "../../common/web3/env";

/** Load a signer from a JSON secret-key file (see readSecretKeyBytes for path rules). */
export async function getWalletSigner(walletPath?: string): Promise<KeyPairSigner> {
  return createKeyPairSignerFromBytes(readSecretKeyBytes(walletPath));
}
