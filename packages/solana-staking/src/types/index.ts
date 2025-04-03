import * as borsh from "borsh";
import { Buffer } from "node:buffer";

import { getIxName } from "../utils/getIxName";

/// Deposit ///

export class DepositArgs {
  amount: bigint;

  constructor(fields: { amount: bigint }) {
    this.amount = fields.amount;
  }

  toBuffer() {
    return Buffer.from(borsh.serialize(DepositArgsSchema, this));
  }
}

export const DepositArgsSchema = new Map([
  [
    DepositArgs,
    {
      kind: "struct",
      fields: [["amount", "u64"]],
    },
  ],
]);

/**
 * Usage:
 * const depositIxn = new DepositInstruction(10n);
 * const depositIxBuffer = depositIxn.toBuffer();
 */
export class DepositInstruction {
  constructor(private amount: bigint) {}

  toBuffer(): Buffer {
    const discriminator = getIxName("deposit");
    const data = new DepositArgs({ amount: this.amount }).toBuffer();
    return Buffer.concat([discriminator, data]);
  }
}
