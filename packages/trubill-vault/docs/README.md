# TruBILL vault integration guide

These guides show how to integrate the TruFin TruBILL Solana vault's user flows across three client paradigms.
The flows are [deposit](./deposit.md), [request-redeem](./request-redeem.md),
[instant-redeem](./instant-redeem.md), and [claim-withdrawal](./claim-withdrawal.md).

| Variant    | Stack                                             | Best for                                      |
| ---------- | ------------------------------------------------- | --------------------------------------------- |
| anchor     | `@coral-xyz/anchor` 0.32.1                         | The fastest, typed integration                |
| native     | raw `@solana/web3.js`                              | Seeing the exact instruction bytes and metas  |
| kit        | [Codama](https://github.com/codama-idl/codama)-generated client + `@solana/kit` | Modern, tree-shakable clients |

Each flow guide keeps to its flow and links back to the concepts below. The runnable source lives under
`anchor/`, `native/`, and `kit/`.

> Mainnet and whitelist. These scripts target mainnet and move real funds. Every user instruction requires the
> caller to be whitelisted in the TruFin Staker program, so a wallet that is not whitelisted will fail. Set
> `SIMULATE=1` to dry-run any instruction (build and simulate, never send).

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

## Setup

```sh
bun install          # also runs `bun run generate` (codama) via postinstall
cp .env.example .env # then fill in RPC_URL and WALLET_KEYPAIR
```

| Env var          | Description                                                      |
| ---------------- | --------------------------------------------------------------- |
| `RPC_URL`        | Mainnet RPC endpoint (use your own provider).                   |
| `WALLET_KEYPAIR` | Path to a Solana CLI keypair JSON (`~`, relative, or absolute). |
| `SIMULATE`       | Optional. Set to `1` to simulate instead of send.               |

## Addresses

Mainnet program and mint addresses are listed in [addresses.md](./addresses.md). PDAs (vault config,
accounting, epoch snapshot, redeem request, user whitelist, and so on) are derived, never hardcoded. See
`common/web3/pda.ts` for the anchor and native derivations, and `kit/generated/**/pdas` for kit.

## Read-only views

Before sending anything, inspect live state:

| Script                          | anchor | native | kit | Output                               |
| ------------------------------- | :----: | :----: | :-: | ------------------------------------ |
| `view/vault.ts`                 |   ✓    |        |     | Vault config, accounting, share price |
| `view/latest-epoch.ts`          |   ✓    |   ✓    |  ✓  | Latest completed and effective epoch |
| `view/user-balances.ts [addr]`  |   ✓    |   ✓    |  ✓  | SOL, USDC, and TruBILL balances      |
