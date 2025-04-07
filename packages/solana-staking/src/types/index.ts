import { BN } from "@coral-xyz/anchor";
import * as borsh from "borsh";
import { Buffer } from "node:buffer";

import * as constants from "../utils/constants";
import { getIxName } from "../utils/getIxName";
import { toU64 } from "../utils/toU64";

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

/**
 * Usage:
 * const depositToSpecificValidatorIxn = new DepositToSpecificValidatorInstruction(10n, 0, 0);
 * const depositToSpecificValidatorIxBuffer = depositToSpecificValidatorIxn.toBuffer();
 */
export class DepositToSpecificValidatorInstruction {
  constructor(private amount: bigint) {}

  toBuffer(): Buffer {
    const discriminator = getIxName("deposit_to_specific_validator");
    const data = new DepositArgs({ amount: this.amount }).toBuffer();
    return Buffer.concat([discriminator, data]);
  }
}

/// Withdraw Stake ///

export class WithdrawStakeInstruction {
  constructor(private amount: BN) {}

  toBuffer(): Buffer {
    return Buffer.concat([
      Buffer.from(Uint8Array.of(constants.WITHDRAW_STAKE_INSTRUCTION_INDEX)), // Instruction index for WithdrawStake
      toU64(this.amount), // Withdraw amount of TruSOL (u64)
    ]);
  }
}
