/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/delta_manager.json`.
 */
export type DeltaManager = {
  "address": "GtraRX3S3xsLHU6VpzGFxaqVmKjbEkFxyMmwZoKwQJrS",
  "metadata": {
    "name": "deltaManager",
    "version": "0.0.1",
    "spec": "0.1.0"
  },
  "instructions": [],
  "accounts": [
    {
      "name": "assetController",
      "discriminator": [
        233,
        76,
        253,
        146,
        159,
        203,
        126,
        245
      ]
    }
  ],
  "events": [],
  "errors": [],
  "types": [
    {
      "name": "assetController",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uniqueSeed",
            "type": "u64"
          },
          {
            "name": "kycProgramId",
            "docs": [
              "KYC program address that owns the KycController account.",
              "We must store this in case this program were to upgrade and",
              "use a different KYC program in the future."
            ],
            "type": "pubkey"
          },
          {
            "name": "kycController",
            "type": "pubkey"
          },
          {
            "name": "admin",
            "docs": [
              "Address with full authority over DeltaManager admin instructions.",
              "In our case, this would be set to an AccessController for enforcing",
              "role based access control."
            ],
            "type": "pubkey"
          },
          {
            "name": "deltaMint",
            "type": "pubkey"
          },
          {
            "name": "collateralVault",
            "docs": [
              "Token2022 Account that holds the asset as collateral"
            ],
            "type": "pubkey"
          },
          {
            "name": "deltaVault",
            "docs": [
              "Token2022 Account that holds DELTA token"
            ],
            "type": "pubkey"
          },
          {
            "name": "clawbackTokenRecipient",
            "docs": [
              "Address that receives clawed back tokens to an owned token account"
            ],
            "type": "pubkey"
          },
          {
            "name": "collateralMint",
            "docs": [
              "The SPL Token2022 mint address that this Asset accepts as collateral"
            ],
            "type": "pubkey"
          },
          {
            "name": "feeRecipient",
            "docs": [
              "The address which owns the token account(s) where fees are sent"
            ],
            "type": "pubkey"
          },
          {
            "name": "currentMintAmount",
            "docs": [
              "DELTA amount already minted or reserved against the epoch `mint_limit`"
            ],
            "type": "u64"
          },
          {
            "name": "currentEpoch",
            "docs": [
              "Epoch that contract is currently in"
            ],
            "type": "u64"
          },
          {
            "name": "epochDuration",
            "docs": [
              "Duration of an epoch in seconds"
            ],
            "type": "u64"
          },
          {
            "name": "currentEpochStartTimestamp",
            "docs": [
              "Timestamp of the start of `current_epoch`"
            ],
            "type": "u64"
          },
          {
            "name": "contractStartTimestamp",
            "docs": [
              "Timestamp of the contract start"
            ],
            "type": "u64"
          },
          {
            "name": "lastSetMintExchangeRate",
            "docs": [
              "`exchangeRate` at start of `current_epoch`"
            ],
            "type": "u64"
          },
          {
            "name": "currentRedeemAmount",
            "docs": [
              "Amount already redeemed during the `current_epoch`"
            ],
            "type": "u64"
          },
          {
            "name": "minimumDepositAmount",
            "docs": [
              "Minimum amount that must be deposited to mint DELTA.",
              "Denoted in decimals of `collateral`"
            ],
            "type": "u64"
          },
          {
            "name": "mintFee",
            "docs": [
              "Minting fee specified in basis points"
            ],
            "type": "u32"
          },
          {
            "name": "exchangeRateDeltaLimit",
            "docs": [
              "Limit for how far `exchangeRate` can stray from",
              "`lastSetMintExchangeRate` within an epoch (in basis points)"
            ],
            "type": "u32"
          },
          {
            "name": "minimumRedeemAmount",
            "docs": [
              "Minimum amount that must be redeemed for a withdraw request"
            ],
            "type": "u64"
          },
          {
            "name": "minimumRedeemAmountFiat",
            "docs": [
              "Minimum amount that must be redeemed for a withdraw request in fiat"
            ],
            "type": "u64"
          },
          {
            "name": "mintLimit",
            "docs": [
              "Maximum DELTA amount that can be minted during an epoch"
            ],
            "type": "u64"
          },
          {
            "name": "redeemLimit",
            "docs": [
              "Maximum amount that can be redeemed during an epoch"
            ],
            "type": "u64"
          },
          {
            "name": "base",
            "docs": [
              "PDA seed pubkey to add randomness to derived address"
            ],
            "type": "pubkey"
          },
          {
            "name": "flags",
            "docs": [
              "Admin flags, which can currently be used to pause the AssetController."
            ],
            "type": "u8"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed of PDA"
            ],
            "type": "u8"
          },
          {
            "name": "externalWalletAta",
            "type": "pubkey"
          },
          {
            "name": "padding2",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "padding3",
            "type": {
              "array": [
                "u8",
                14
              ]
            }
          }
        ]
      }
    }
  ]
};
