# Mainnet addresses

All values below are the base58 string constants from [`common/addresses.ts`](../common/addresses.ts). Wrap
them per client: `new PublicKey(x)` for anchor and native, `address(x)` for kit. PDAs are not listed here; they
are derived from seeds (see `common/web3/pda.ts` and `kit/generated/**/pdas`).

## Programs

| Name                       | Address                                        |
| -------------------------- | ---------------------------------------------- |
| TruBILL vault              | `4EXXZCu2BR4RZ4RCFYUqk6s4SLVpr6umrzw8mqGMwVR4`  |
| Delta Manager              | `GtraRX3S3xsLHU6VpzGFxaqVmKjbEkFxyMmwZoKwQJrS`  |
| Delta Manager AssetController | `FQ9X5cF6oWmGcH6XAsdkPwBj2mKWRoTXU2zGS1gCgBaJ` |
| Staker (whitelist)         | `6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM`  |
| KYC                        | `41wNjvdZh1JZW68HyqdKfsxviw6kYZmfeXy1EG7Fr1qr`  |
| KYC Controller             | `GhJarZPXKgZGGHbT6S3FoacXGr9RbsPmEdKw2CJ5FJL4`  |

## Mints

| Name                     | Address                                        | Token program |
| ------------------------ | ---------------------------------------------- | ------------- |
| USDC (deposit asset)     | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`  | SPL Token     |
| ULTRA (yield asset)      | `9DRPPWYud8i6CaSsDsFESs1xyVr8dBCMtjPZji2xiZEa`  | Token-2022    |

The TruBILL share mint is a PDA (Token-2022), so it is derived rather than a fixed address.

## Token programs

| Name                      | Address                                        |
| ------------------------- | ---------------------------------------------- |
| SPL Token                 | `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`  |
| Token-2022                | `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`  |
| Associated Token Account  | `ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL`  |
