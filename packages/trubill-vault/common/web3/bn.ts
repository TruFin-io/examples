import { BN } from "@coral-xyz/anchor";

/** Convert a bigint or number to an anchor BN. */
export const toBN = (value: bigint | number): BN => new BN(value.toString());
