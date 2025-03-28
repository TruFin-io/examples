import { Fee, Lockup, StakePool } from "./types";

// StakePool Borsh Schema
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StakePoolSchema = new Map<Function, any>([
  [
    Fee,
    {
      kind: "struct",
      fields: [
        ["denominator", "u64"],
        ["numerator", "u64"],
      ],
    },
  ],
  [
    Lockup,
    {
      kind: "struct",
      fields: [
        ["unixTimestamp", "u64"],
        ["epoch", "u64"],
        ["custodian", [32]],
      ],
    },
  ],
  [
    StakePool,
    {
      kind: "struct",
      fields: [
        ["accountType", "u8"],
        ["manager", [32]],
        ["staker", [32]],
        ["stakeDepositAuthority", [32]],
        ["stakeWithdrawBumpSeed", "u8"],
        ["validatorList", [32]],
        ["reserveStake", [32]],
        ["poolMint", [32]],
        ["managerFeeAccount", [32]],
        ["tokenProgramId", [32]],
        ["totalLamports", "u64"],
        ["poolTokenSupply", "u64"],
        ["lastUpdateEpoch", "u64"],
        ["lockup", Lockup],
        ["epochFee", Fee],
        ["nextEpochFee", { kind: "option", type: Fee }],
        ["preferredDepositValidatorVoteAddress", { kind: "option", type: [32] }],
        ["preferredWithdrawValidatorVoteAddress", { kind: "option", type: [32] }],
        ["stakeDepositFee", Fee],
        ["stakeWithdrawalFee", Fee],
        ["nextStakeWithdrawalFee", { kind: "option", type: Fee }],
        ["stakeReferralFee", "u8"],
        ["solDepositAuthority", { kind: "option", type: [32] }],
        ["solDepositFee", Fee],
        ["solReferralFee", "u8"],
        ["solWithdrawAuthority", { kind: "option", type: [32] }],
        ["solWithdrawalFee", Fee],
        ["nextSolWithdrawalFee", { kind: "option", type: Fee }],
        ["lastEpochPoolTokenSupply", "u64"],
        ["lastEpochTotalLamports", "u64"],
      ],
    },
  ],
]);
