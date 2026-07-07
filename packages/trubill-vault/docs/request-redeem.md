# Request redeem

Burn TruBILL shares now and record a `redeem_request` that becomes claimable once it settles. This is the
queued path; for an immediate payout see [instant-redeem](./instant-redeem.md).

## TL;DR

Start a redemption: burn shares now, claim USDC later. You pass the `trubillAmount` to burn and the pricing
`epoch` (resolved for you in anchor and kit, explicit in native). The shares are burned and a `redeem_request`
PDA is created, keyed by an incrementing id. Once it settles, finish with
[claim-withdrawal](./claim-withdrawal.md). Your wallet must be whitelisted (see
[Concepts](./README.md#concepts)).

## Table of contents

1. [Understanding request redeem](#understanding-request-redeem)
2. [Integration guide](#integration-guide)
   - [Prerequisites](#prerequisites)
   - [Anchor](#anchor)
   - [Native](#native)
   - [Kit](#kit)

## Understanding request redeem

The instruction burns `trubillAmount` shares and writes a `redeem_request` account recording the USDC owed,
priced against the epoch's [NAV snapshot](./README.md#epoch-and-nav-pricing). Each request takes an id from
your `user_redeem_state` counter (`next_redeem_request_id`, starting at `0`), and the request PDA is derived
from `["redeem_request", wallet, id]`. Keep the id, since [claim-withdrawal](./claim-withdrawal.md) needs it.

The USDC is not paid here. It becomes payable after the vault settles the request against the reserve. See the
[redeem lifecycle](./README.md#redeem-lifecycle).

## Integration guide

### Prerequisites

A whitelisted wallet holding TruBILL, and `.env` configured (see [Setup](../README.md#setup)). The runners fetch
`next_redeem_request_id` for you; if you build the instruction yourself, read it from `user_redeem_state`.

### Anchor

The typed builder derives every account; you prefetch the next redeem id and pass the epoch and amount. See
[`anchor/instructions/request-redeem.ts`](../anchor/instructions/request-redeem.ts).

```sh
bun run anchor/instructions/request-redeem.ts <trubillAmount>
```

### Native

An 8-byte discriminator plus little-endian `u64` args, then the ordered account metas. The next redeem id is
read from the raw `user_redeem_state` bytes. See
[`native/instructions/request-redeem.ts`](../native/instructions/request-redeem.ts).

```sh
# native takes the epoch explicitly
bun run native/instructions/request-redeem.ts <trubillAmount> <epoch>
```

### Kit

The async builder derives the PDAs; you fetch the next redeem id from the `user_redeem_state` account and pass
the derived `redeem_request` address. See
[`kit/instructions/request-redeem.ts`](../kit/instructions/request-redeem.ts).

```sh
bun run kit/instructions/request-redeem.ts <trubillAmount>
```

> Every runner sends to mainnet. Prefix with `SIMULATE=true` to dry-run.
