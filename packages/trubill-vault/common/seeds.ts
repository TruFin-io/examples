// PDA seed strings, shared verbatim with the on-chain programs (TruBILL vault, Staker, Delta Manager)

/** TruBILL vault */
export const VAULT_CONFIG = "vault_config";
export const USDC_ACCOUNTING = "usdc_accounting";
export const ULTRA_ACCOUNTING = "ultra_accounting";
export const VAULT_ACCESS = "vault_access";
export const VAULT_AUTHORITY = "vault_authority";
export const TRUBILL_MINT = "trubill_mint";
export const SHARE_PRICE = "share_price";
export const EPOCH_SNAPSHOT = "epoch_snapshot";
export const USER_REDEEM_STATE = "user_redeem_state";
export const REDEEM_REQUEST = "redeem_request";

/** Shared "user" seed: Staker whitelist status and Delta Manager KYC user */
export const USER = "user";
/** Delta Manager per-epoch exchange rate, seeded by asset controller + epoch */
export const DM_EPOCH_RATE = "epoch_rate";

export const EVENT_AUTHORITY = "__event_authority";
