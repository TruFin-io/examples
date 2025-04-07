import { BN } from "@coral-xyz/anchor";
import { Buffer } from "node:buffer";

export function toU64(value: BN): Buffer {
  return value.toArrayLike(Buffer, "le", 8);
}
