import { sha256 } from "@noble/hashes/sha256";

import { GLOBAL_NAMESPACE } from "./constants";

export function getIxName(ixName: string): Buffer {
  const hash = sha256(Buffer.from(`${GLOBAL_NAMESPACE}:${ixName}`));
  return Buffer.from(hash.subarray(0, 8));
}
