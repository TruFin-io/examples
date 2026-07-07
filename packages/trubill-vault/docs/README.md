# TruBILL vault integration guide

These guides explain the TruBILL vault's user flows and how to call them from anchor, native, and kit. For
install, environment, run commands, and the read-only views, see the [package README](../README.md).

The flows are [deposit](./deposit.md), [request-redeem](./request-redeem.md),
[instant-redeem](./instant-redeem.md), and [claim-withdrawal](./claim-withdrawal.md). Mainnet addresses are in
[addresses.md](./addresses.md).

## Concepts

### Whitelist gate

Every user flow reads a `user_whitelist` account owned by the Staker program and requires the caller to be
`Whitelisted`. It is a PDA derived from `["user", wallet]` under the [Staker program](./addresses.md), and it
is derived for you (`Pda.getPdaStakerUserStatusAddress(wallet)` in anchor and native, the async builder in
kit). Contact TruFin to be onboarded.

### Shares and tokens

You deposit USDC (SPL Token, 6 decimals) and receive TruBILL shares (Token-2022, 6 decimals). TruBILL
represents your share of the vault. Because the share mint is Token-2022, its associated token accounts live
under the Token-2022 program, not the classic Token program.

### Epoch and NAV pricing

The vault prices deposits and redemptions against a per-epoch NAV snapshot. Epochs come from the Delta
Manager's `AssetController`: the effective epoch advances lazily with time, and flows price against the latest
completed epoch (`effective - 1`). The anchor and kit scripts resolve this for you. The native scripts take the
epoch explicitly (find it with `native/view/latest-epoch.ts`) so the derivation stays visible.

### Redeem lifecycle

There are two ways out, both burning TruBILL shares:

- [instant-redeem](./instant-redeem.md) burns shares and pays USDC immediately from the vault reserve, minus an
  instant-redeem fee. It is bounded by available reserve.
- [request-redeem](./request-redeem.md) burns shares now and records a `redeem_request`. Once it settles, call
  [claim-withdrawal](./claim-withdrawal.md) to receive the USDC and close the request.
