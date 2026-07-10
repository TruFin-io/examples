# TruBILL vault usage guide

This guide explains the TruBILL vault's user flows and how to call them from anchor, native, and kit. For
install, environment, run commands, and the read-only views, see the [package README](../README.md).

Each flow ships in all three variants under `anchor/`, `native/`, and `kit/`. Mainnet program and mint
addresses live in [`common/addresses.ts`](../common/addresses.ts); PDAs are derived (see `common/web3/pda.ts`
and `kit/generated/**/pdas`), never hardcoded.

> Mainnet and whitelist. These scripts target mainnet and move real funds. Every user instruction requires the
> caller to be whitelisted in the TruFin Staker program, so a wallet that is not whitelisted will fail. Set
> `SIMULATE=true` to dry-run any instruction (build and simulate, never send).

## Concepts

### Whitelist gate

Every user flow reads a `user_whitelist` account owned by the Staker program and requires the caller to be
`Whitelisted`. It is a PDA derived from `["user", wallet]` under the Staker program, and it is derived for you
(`Pda.getPdaStakerUserStatusAddress(wallet)` in anchor and native, the async builder in kit). Contact TruFin to
be onboarded.

### Shares and tokens

You deposit USDC (SPL Token, 6 decimals) and receive TruBILL shares (Token-2022, 6 decimals). TruBILL
represents your share of the vault. Because the share mint is Token-2022, its associated token accounts live
under the Token-2022 program, not the classic Token program. Both redeem flows take a TruBILL **share** amount
(not USDC): the program burns the shares and derives the USDC from the epoch's NAV. Use `view/quote.ts` to
preview how many shares a deposit mints, or how much USDC a redemption returns.

### Epoch and NAV pricing

The vault prices deposits and redemptions against a per-epoch NAV snapshot. The program requires the epoch you
pass to equal `vault_config.last_snapshot_epoch`, so every variant reads that value straight from the vault
config and uses it by default. Deposit and instant-redeem accept an optional `[epoch]` to override it.

### Redeem lifecycle

There are two independent ways out, both burning TruBILL shares. Pick one per redemption; they are separate
paths and are never combined:

- [instant redeem](#instant-redeem) burns shares and pays USDC immediately from the vault reserve, minus an
  instant-redeem fee. It is bounded by available reserve, so large redemptions may not fit.
- [request redeem](#request-redeem) burns shares now and records a `redeem_request`, with no fee. Once it
  settles, [claim withdrawal](#claim-withdrawal) pays out the USDC and closes the request.

Across every variant, anchor derives all accounts through the typed builder, native builds the raw
`TransactionInstruction` with an 8-byte discriminator and ordered, role-annotated account metas, and kit uses
the Codama async builder that auto-derives PDAs and ATAs. Prefix any runner with `SIMULATE=true` to dry-run,
and append an optional `[keypairPath]` to override `WALLET_KEYPAIR`.

## Deposit

Transfer `amount` USDC into the vault's collateral account and mint TruBILL shares back to you, priced against
the epoch's [NAV snapshot](#epoch-and-nav-pricing). The epoch is part of the instruction data. Your TruBILL ATA
is created on first deposit (under the Token-2022 program), which is why the associated-token and system
programs appear in the account list.

- anchor: `bun run anchor/instructions/deposit.ts <amount> [epoch]` ([source](../anchor/instructions/deposit.ts))
- native: `bun run native/instructions/deposit.ts <amount> [epoch]` ([source](../native/instructions/deposit.ts))
- kit: `bun run kit/instructions/deposit.ts <amount> [epoch]` ([source](../kit/instructions/deposit.ts))

## Request redeem

Burn `trubillAmount` shares now and write a `redeem_request` recording the USDC owed, priced against the
epoch's NAV snapshot. Each request takes an id from your `user_redeem_state` counter (`next_redeem_request_id`,
starting at `0`); the request PDA is derived from `["redeem_request", wallet, id]`. Keep the id, since
[claim withdrawal](#claim-withdrawal) needs it. The USDC is not paid here: it becomes payable after the vault
settles the request against the reserve.

- anchor: `bun run anchor/instructions/request-redeem.ts <trubillAmount>` ([source](../anchor/instructions/request-redeem.ts))
- native: `bun run native/instructions/request-redeem.ts <trubillAmount>` ([source](../native/instructions/request-redeem.ts))
- kit: `bun run kit/instructions/request-redeem.ts <trubillAmount>` ([source](../kit/instructions/request-redeem.ts))

The runners fetch `next_redeem_request_id` for you; if you build the instruction yourself, read it from
`user_redeem_state`.

## Instant redeem

Burn `trubillAmount` shares and receive USDC immediately from the vault's collateral reserve, priced against
the epoch's NAV snapshot, minus an instant-redeem fee paid to the vault treasury. Every variant reads the
treasury from `vault_config`, since the program requires it to match. Because it pays from the reserve, the
redeemable amount is capped by what the reserve holds (check `view/vault.ts`).

- anchor: `bun run anchor/instructions/instant-redeem.ts <trubillAmount> [epoch]` ([source](../anchor/instructions/instant-redeem.ts))
- native: `bun run native/instructions/instant-redeem.ts <trubillAmount> [epoch]` ([source](../native/instructions/instant-redeem.ts))
- kit: `bun run kit/instructions/instant-redeem.ts <trubillAmount> [epoch]` ([source](../kit/instructions/instant-redeem.ts))

## Claim withdrawal

Transfer the USDC owed by a settled `redeem_request` to your USDC ATA, then close the request and reclaim its
rent. It takes only the request `id` (the request PDA is derived from `["redeem_request", wallet, id]`); there
is no epoch argument, because the amount was fixed when the request was created. If the request has not settled
yet, the instruction fails, so check first or retry later.

- anchor: `bun run anchor/instructions/claim-withdrawal.ts <redeemRequestId>` ([source](../anchor/instructions/claim-withdrawal.ts))
- native: `bun run native/instructions/claim-withdrawal.ts <redeemRequestId>` ([source](../native/instructions/claim-withdrawal.ts))
- kit: `bun run kit/instructions/claim-withdrawal.ts <redeemRequestId>` ([source](../kit/instructions/claim-withdrawal.ts))

## Common errors

Program errors surface in the transaction logs (run with `SIMULATE=true` to see them without sending). The ones
you are most likely to hit:

| Error message                                             | Flow            | Cause                                                                                              |
| ------------------------------------------------------    | --------------- | --------------------------------------------------------------------                               |
| `user is not whitelisted`                                 | all             | Caller is not whitelisted in the Staker program. Contact TruFin.                                   |
| `contract is paused`                                      | all             | The vault is paused; try again once it resumes.                                                    |
| `the provided epoch must match the latest snapshot epoch` | deposit, redeem | You passed an `[epoch]` other than `vault_config.last_snapshot_epoch`. Omit it to use the default. |
| `nav is stale`                                            | deposit, redeem | The epoch snapshot's NAV is older than `nav_expiry_time`; wait for the operator to refresh it.     |
| `below minimum deposit`                                   | deposit         | Deposit amount is under `vault_config.min_deposit_amount`.                                         |
| `shares to mint is zero`                                  | deposit         | Deposit is too small to mint a single share at the current NAV.                                    |
| `redeem amount must be greater than zero`                 | redeem          | Redeem amount, or its resulting USDC, rounds to zero.                                              |
| `insufficient funds`                                      | instant redeem  | The USDC reserve cannot cover the redemption; use request redeem or a smaller amount.              |
| `withdrawal request not claimable`                        | claim           | The `redeem_request` has not settled yet; retry later.                                             |
