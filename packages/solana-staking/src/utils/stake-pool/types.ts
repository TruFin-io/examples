import { PublicKey } from "@solana/web3.js";

export class StakePool {
  accountType: number;
  manager: PublicKey;
  staker: PublicKey;
  stakeDepositAuthority: PublicKey;
  stakeWithdrawBumpSeed: number;
  validatorList: PublicKey;
  reserveStake: PublicKey;
  poolMint: PublicKey;
  managerFeeAccount: PublicKey;
  tokenProgramId: PublicKey;
  totalLamports: bigint;
  poolTokenSupply: bigint;
  lastUpdateEpoch: bigint;
  lockup: Lockup;
  epochFee: Fee;
  nextEpochFee: Fee | null;
  preferredDepositValidatorVoteAddress: PublicKey | null;
  preferredWithdrawValidatorVoteAddress: PublicKey | null;
  stakeDepositFee: Fee;
  stakeWithdrawalFee: Fee;
  nextStakeWithdrawalFee: Fee | null;
  stakeReferralFee: number;
  solDepositAuthority: PublicKey | null;
  solDepositFee: Fee;
  solReferralFee: number;
  solWithdrawAuthority: PublicKey | null;
  solWithdrawalFee: Fee;
  nextSolWithdrawalFee: Fee | null;
  lastEpochPoolTokenSupply: bigint;
  lastEpochTotalLamports: bigint;

  constructor(properties: {
    accountType: number;
    manager: Uint8Array;
    staker: Uint8Array;
    stakeDepositAuthority: Uint8Array;
    stakeWithdrawBumpSeed: number;
    validatorList: Uint8Array;
    reserveStake: Uint8Array;
    poolMint: Uint8Array;
    managerFeeAccount: Uint8Array;
    tokenProgramId: Uint8Array;
    totalLamports: bigint;
    poolTokenSupply: bigint;
    lastUpdateEpoch: bigint;
    lockup: Lockup;
    epochFee: Fee;
    nextEpochFee: Fee | null;
    preferredDepositValidatorVoteAddress: Uint8Array | null;
    preferredWithdrawValidatorVoteAddress: Uint8Array | null;
    stakeDepositFee: Fee;
    stakeWithdrawalFee: Fee;
    nextStakeWithdrawalFee: Fee | null;
    stakeReferralFee: number;
    solDepositAuthority: Uint8Array | null;
    solDepositFee: Fee;
    solReferralFee: number;
    solWithdrawAuthority: Uint8Array | null;
    solWithdrawalFee: Fee;
    nextSolWithdrawalFee: Fee | null;
    lastEpochPoolTokenSupply: bigint;
    lastEpochTotalLamports: bigint;
  }) {
    this.accountType = properties.accountType;
    this.manager = new PublicKey(properties.manager);
    this.staker = new PublicKey(properties.staker);
    this.stakeDepositAuthority = new PublicKey(properties.stakeDepositAuthority);
    this.stakeWithdrawBumpSeed = properties.stakeWithdrawBumpSeed;
    this.validatorList = new PublicKey(properties.validatorList);
    this.reserveStake = new PublicKey(properties.reserveStake);
    this.poolMint = new PublicKey(properties.poolMint);
    this.managerFeeAccount = new PublicKey(properties.managerFeeAccount);
    this.tokenProgramId = new PublicKey(properties.tokenProgramId);
    this.totalLamports = properties.totalLamports;
    this.poolTokenSupply = properties.poolTokenSupply;
    this.lastUpdateEpoch = properties.lastUpdateEpoch;
    this.lockup = properties.lockup;
    this.epochFee = properties.epochFee;
    this.nextEpochFee = properties.nextEpochFee;
    this.preferredDepositValidatorVoteAddress = properties.preferredDepositValidatorVoteAddress
      ? new PublicKey(properties.preferredDepositValidatorVoteAddress)
      : null;
    this.preferredWithdrawValidatorVoteAddress = properties.preferredWithdrawValidatorVoteAddress
      ? new PublicKey(properties.preferredWithdrawValidatorVoteAddress)
      : null;
    this.stakeDepositFee = properties.stakeDepositFee;
    this.stakeWithdrawalFee = properties.stakeWithdrawalFee;
    this.nextStakeWithdrawalFee = properties.nextStakeWithdrawalFee;
    this.stakeReferralFee = properties.stakeReferralFee;
    this.solDepositAuthority = properties.solDepositAuthority ? new PublicKey(properties.solDepositAuthority) : null;
    this.solDepositFee = properties.solDepositFee;
    this.solReferralFee = properties.solReferralFee;
    this.solWithdrawAuthority = properties.solWithdrawAuthority ? new PublicKey(properties.solWithdrawAuthority) : null;
    this.solWithdrawalFee = properties.solWithdrawalFee;
    this.nextSolWithdrawalFee = properties.nextSolWithdrawalFee;
    this.lastEpochPoolTokenSupply = properties.lastEpochPoolTokenSupply;
    this.lastEpochTotalLamports = properties.lastEpochTotalLamports;
  }
}

export class Fee {
  numerator: bigint;
  denominator: bigint;

  constructor(fields: { numerator: number; denominator: number }) {
    this.numerator = BigInt(fields.numerator);
    this.denominator = BigInt(fields.denominator);
  }
}

class Lockup {
  unixTimestamp: bigint;
  epoch: bigint;
  custodian: PublicKey;

  constructor(properties: { unixTimestamp: bigint; epoch: bigint; custodian: Uint8Array }) {
    this.unixTimestamp = properties.unixTimestamp;
    this.epoch = properties.epoch;
    this.custodian = new PublicKey(properties.custodian);
  }
}

// Enum for AccountType
enum AccountType {
  Uninitialized = 0,
  StakePool = 1,
  ValidatorList = 2,
}
export class ValidatorListHeader {
  account_type: AccountType; // Enum value (u8)
  max_validators: number;

  constructor(fields: { account_type: number; max_validators: number }) {
    this.account_type = fields.account_type;
    this.max_validators = fields.max_validators;
  }
}

export class ValidatorStakeInfo {
  active_stake_lamports: bigint;
  transient_stake_lamports: bigint;
  last_update_epoch: bigint;
  transient_seed_suffix: bigint;
  unused: number;
  validator_seed_suffix: number;
  status: number;
  vote_account_address: PublicKey | null;

  constructor(fields: {
    active_stake_lamports: bigint;
    transient_stake_lamports: bigint;
    last_update_epoch: bigint;
    transient_seed_suffix: bigint;
    unused: number;
    validator_seed_suffix: number;
    status: number;
    vote_account_address: Uint8Array | null;
  }) {
    this.active_stake_lamports = fields.active_stake_lamports;
    this.transient_stake_lamports = fields.transient_stake_lamports;
    this.last_update_epoch = fields.last_update_epoch;
    this.transient_seed_suffix = fields.transient_seed_suffix;
    this.unused = fields.unused;
    this.validator_seed_suffix = fields.validator_seed_suffix;
    this.status = fields.status;
    this.vote_account_address = fields.vote_account_address ? new PublicKey(fields.vote_account_address) : null;
  }
}

export class ValidatorList {
  header: ValidatorListHeader;
  validators: ValidatorStakeInfo[];

  constructor(fields: { header: ValidatorListHeader; validators: ValidatorStakeInfo[] }) {
    this.header = fields.header;
    this.validators = fields.validators;
  }
}

///  SCHEMAS ///

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

// ValidatorListHeader Borsh Schema
export const ValidatorListHeaderSchema = new Map([
  [
    ValidatorListHeader,
    {
      kind: "struct",
      fields: [
        ["account_type", "u8"], // AccountType as u8
        ["max_validators", "u32"], // Maximum validators as u32
      ],
    },
  ],
]);

export const ValidatorStakeInfoSchema = new Map([
  [
    ValidatorStakeInfo,
    {
      kind: "struct",
      fields: [
        ["active_stake_lamports", "u64"],
        ["transient_stake_lamports", "u64"],
        ["last_update_epoch", "u64"],
        ["transient_seed_suffix", "u64"],
        ["unused", "u32"],
        ["validator_seed_suffix", "u32"],
        ["status", "u8"], // PodStakeStatus is a u8
        ["vote_account_address", [32]], // PublicKey (32 bytes)
      ],
    },
  ],
]);
