# TruBILL Vault Examples

Example integrations for the TruFin **TruBILL** Solana vault, showing the user flows — `deposit`,
`request_redeem`, `instant_redeem`, `claim_withdrawal` — plus read-only views, across three client paradigms:

| Variant    | Stack                                             | What it teaches                                    |
| ---------- | ------------------------------------------------- | -------------------------------------------------- |
| **anchor** | `@coral-xyz/anchor` 0.32.1                         | High-level typed program client                    |
| **native** | raw `@solana/web3.js`                              | The exact instruction bytes and account metas      |
| **kit**    | [Codama](https://github.com/codama-idl/codama)-generated client + `@solana/kit` | The modern, tree-shakable client path |

`common/` holds what the variants share: the committed IDLs, addresses, seeds, amount math, and (for anchor +
native) the web3.js helpers.

## ⚠️ Mainnet and whitelist

- **These scripts target mainnet and move real funds.** There is no devnet or localnet config.
- **Every user instruction requires the caller to be whitelisted** in the TruFin Staker program. A wallet that
  is not whitelisted will fail. Contact TruFin to be onboarded.
- Set `SIMULATE=1` to dry-run any instruction (builds and simulates, logs only, never sends).

## Setup

```sh
bun install          # also runs `bun run generate` (codama) via postinstall
cp .env.example .env # then fill in RPC_URL and WALLET_KEYPAIR
```

| Env var          | Description                                                          |
| ---------------- | ------------------------------------------------------------------- |
| `RPC_URL`        | Mainnet RPC endpoint (use your own provider).                       |
| `WALLET_KEYPAIR` | Path to a Solana CLI keypair JSON (`~`, relative, or absolute).     |
| `SIMULATE`       | Optional. Set to `1` to simulate instead of send.                   |

The `kit/generated/` client is gitignored and regenerated from the committed IDL on `bun install` (or
`bun run generate`).

## Running

Scripts run directly with `bun run <path>`. Amounts are decimal token units (e.g. `10.5` USDC). The redeem
epoch defaults to the latest completed Delta Manager epoch when omitted.

### Instructions

| Flow             | anchor / kit                                              | native (explicit args)                                             |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------------ |
| deposit          | `<variant>/instructions/deposit.ts <usdc> [epoch]`        | same                                                               |
| request_redeem   | `<variant>/instructions/request-redeem.ts <trubill>`      | same                                                               |
| instant_redeem   | `<variant>/instructions/instant-redeem.ts <usdc> [epoch]` | `native/instructions/instant-redeem.ts <usdc> <epoch> <treasury>` |
| claim_withdrawal | `<variant>/instructions/claim-withdrawal.ts <requestId>`  | same                                                               |

```sh
# examples
SIMULATE=1 bun run anchor/instructions/deposit.ts 10
bun run kit/instructions/request-redeem.ts 5
bun run native/instructions/claim-withdrawal.ts 0
```

Every runner takes an optional trailing `[keypairPath]` to override `WALLET_KEYPAIR`.

### Views (read-only)

| Script                        | anchor | native | kit | Output                                        |
| ----------------------------- | :----: | :----: | :-: | --------------------------------------------- |
| `view/vault.ts`               |   ✓    |        |     | Vault config, accounting, share price         |
| `view/latest-epoch.ts`        |   ✓    |   ✓    |  ✓  | Latest completed and effective epoch          |
| `view/user-balances.ts [addr]`|   ✓    |   ✓    |  ✓  | SOL, USDC, and TruBILL balances               |

## Linting

```sh
bun run lint:check   # tsc --noEmit && biome check
bun run lint:write   # biome check --write
```
