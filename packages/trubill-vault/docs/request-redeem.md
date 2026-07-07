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
   - [Complete implementation](#complete-implementation)

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

Full file: [`anchor/instructions/request-redeem.ts`](../anchor/instructions/request-redeem.ts).

```typescript
return program.methods
  .requestRedeem(epoch, trubillAmount)
  .accountsStrict({
    user,
    vaultConfig: Pda.getPdaVaultConfigAddress(),
    usdcAccounting: Pda.getPdaUsdcAccountingAddress(),
    ultraAccounting: Pda.getPdaUltraAccountingAddress(),
    userWhitelist: Pda.getPdaStakerUserStatusAddress(user),
    vaultAuthority: Pda.getPdaVaultAuthorityAddress(),
    trubillMint,
    userTrubillAta: deriveATAAddress(trubillMint, user, TOKEN_2022_PROGRAM_ID),
    userRedeemState: Pda.getPdaUserRedeemStateAddress(user),
    redeemRequest: Pda.getPdaRedeemRequestAddress(user, redeemRequestId),
    epochSnapshot: Pda.getPdaEpochSnapshotAddress(epoch),
    tokenProgram2022: TOKEN_2022_PROGRAM_ID,
    systemProgram: SystemProgram.programId,
    eventAuthority: Pda.getPdaEventAuthorityAddress(),
    program: program.programId,
  })
  .instruction();
```

```sh
bun run anchor/instructions/request-redeem.ts <trubillAmount>
```

### Native

Discriminator plus little-endian `u64` args, then the ordered account metas. The full ordered list with
per-account role comments is in
[`native/instructions/request-redeem.ts`](../native/instructions/request-redeem.ts). The
[deposit guide](./deposit.md#native) shows the meta pattern in full.

```typescript
// Anchor discriminator for `request_redeem`, taken from the IDL.
const REQUEST_REDEEM_DISCRIMINATOR = Buffer.from([105, 49, 44, 38, 207, 241, 33, 173]);

function encodeRequestRedeemData(epoch: BN, trubillAmount: BN): Buffer {
  return Buffer.concat([
    REQUEST_REDEEM_DISCRIMINATOR,
    epoch.toArrayLike(Buffer, "le", 8),
    trubillAmount.toArrayLike(Buffer, "le", 8),
  ]);
}

// user_redeem_state is an 8-byte discriminator followed by a little-endian u64 next_redeem_request_id.
const stateInfo = await connection.getAccountInfo(Pda.getPdaUserRedeemStateAddress(user.publicKey));
const redeemRequestId = stateInfo ? new BN(stateInfo.data.subarray(8, 16), "le") : new BN(0);
```

```sh
# native takes the epoch explicitly
bun run native/instructions/request-redeem.ts <trubillAmount> <epoch>
```

### Kit

The async builder derives the PDAs; you pass the pre-derived `redeemRequest` from the fetched id. Full file:
[`kit/instructions/request-redeem.ts`](../kit/instructions/request-redeem.ts).

```typescript
const [userRedeemState] = await findUserRedeemStatePda({ user: user.address });
const state = await fetchMaybeUserRedeemState(rpc, userRedeemState);
const redeemRequestId = state.exists ? state.data.nextRedeemRequestId : 0n;
const [redeemRequest] = await findRedeemRequestPda({ user: user.address, redeemRequestId });

const instruction = await getRequestRedeemInstructionAsync({
  user,
  redeemRequest,
  program: TRUBILL_VAULT_PROGRAM_ADDRESS,
  epoch,
  trubillAmount: trubill(amountStr),
});
```

```sh
bun run kit/instructions/request-redeem.ts <trubillAmount>
```

### Complete implementation

- Anchor: [`anchor/instructions/request-redeem.ts`](../anchor/instructions/request-redeem.ts)
- Native: [`native/instructions/request-redeem.ts`](../native/instructions/request-redeem.ts)
- Kit: [`kit/instructions/request-redeem.ts`](../kit/instructions/request-redeem.ts)

> Every runner sends to mainnet. Prefix with `SIMULATE=1` to dry-run.
