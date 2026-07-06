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
  "instructions": [
    {
      "name": "burnDelta",
      "discriminator": [
        28,
        253,
        68,
        61,
        157,
        103,
        92,
        222
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "deltaMint",
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "burnFromAccount",
          "writable": true
        },
        {
          "name": "deltaTokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "burnDeltaArgs"
            }
          }
        }
      ]
    },
    {
      "name": "clawbackTokens",
      "docs": [
        "Transfers Delta tokens from any given TokenAccount to a TokenAccount owned by the AssetController.",
        "This instruction was originally in the Delta token contract on EVM, but as we’re using the",
        "Permanent Delegate extension with the AssetController as the delegate we must have the",
        "entry point in the DeltaManager program."
      ],
      "discriminator": [
        195,
        100,
        150,
        217,
        181,
        196,
        109,
        153
      ],
      "accounts": [
        {
          "name": "payer",
          "docs": [
            "Ensure there’s a separate payer for better key management"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "docs": [
            "The admin of the AssetController/Validate admin is a Signer"
          ],
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController",
          "docs": [
            "Validate the admin is the admin of the asset_controller"
          ],
          "writable": true
        },
        {
          "name": "from",
          "docs": [
            "Account that is being clawed back"
          ],
          "writable": true
        },
        {
          "name": "clawbackTokenAccount",
          "docs": [
            "The clawed back account, which must be owned by the AssetController's `clawback_token_recipient`"
          ],
          "writable": true
        },
        {
          "name": "deltaMint",
          "docs": [
            "The mint of the token being clawed back"
          ],
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "userClawbackRecord",
          "docs": [
            "The user clawback record"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  99,
                  108,
                  97,
                  119,
                  98,
                  97,
                  99,
                  107,
                  95,
                  114,
                  101,
                  99,
                  111,
                  114,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "from.owner"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "The token program"
          ],
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "clawbackTokensArgs"
            }
          }
        }
      ]
    },
    {
      "name": "closePendingRequest",
      "discriminator": [
        217,
        27,
        223,
        35,
        114,
        124,
        95,
        236
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "deltaMint",
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaVault",
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "collateralMint",
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "collateralVault",
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "userDeltaDestination",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenProgram2022"
              },
              {
                "kind": "account",
                "path": "deltaMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userCollateralDestination",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "collateralMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "mintRequest",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "arg",
                "path": "args.epoch"
              }
            ]
          }
        },
        {
          "name": "redemptionRequest",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  101,
                  109,
                  112,
                  116,
                  105,
                  111,
                  110,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "arg",
                "path": "args.epoch"
              }
            ]
          }
        },
        {
          "name": "redemptionRequestFiat",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  101,
                  109,
                  112,
                  116,
                  105,
                  111,
                  110,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116,
                  95,
                  102,
                  105,
                  97,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "arg",
                "path": "args.epoch"
              }
            ]
          }
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "tokenProgram2022",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "closePendingRequestArgs"
            }
          }
        }
      ]
    },
    {
      "name": "completeRedemption",
      "docs": [
        "Processes a redemption request for a given epoch."
      ],
      "discriminator": [
        103,
        117,
        228,
        165,
        78,
        253,
        76,
        103
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "redeemer",
          "docs": [
            "User that is redeeming and should receive collateral AND rent from RedemptionRequest",
            "CHECK handled in redemption_request constraint"
          ],
          "writable": true,
          "relations": [
            "redemptionRequest"
          ]
        },
        {
          "name": "collateralDestination",
          "docs": [
            "User's Collateral account to receive tokens"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "redeemer"
              },
              {
                "kind": "account",
                "path": "collateralTokenProgram"
              },
              {
                "kind": "account",
                "path": "assetController"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "assetController",
          "writable": true,
          "relations": [
            "epochExchangeRate",
            "redemptionRequest"
          ]
        },
        {
          "name": "deltaMint",
          "docs": [
            "Mint of the AssetController, which will be burned"
          ],
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaVault",
          "docs": [
            "AssetController's Delta token account to burn tokens from"
          ],
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "collateralMint",
          "docs": [
            "Mint of Collateral user is redeeming for"
          ],
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "collateralVault",
          "docs": [
            "AssetController's Collateral token account to pay out from"
          ],
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "epochExchangeRate",
          "docs": [
            "Retrieve the NAV for the given epoch"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  112,
                  111,
                  99,
                  104,
                  95,
                  114,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "arg",
                "path": "args.epoch"
              }
            ]
          }
        },
        {
          "name": "redemptionRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  101,
                  109,
                  112,
                  116,
                  105,
                  111,
                  110,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "redeemer"
              },
              {
                "kind": "arg",
                "path": "args.epoch"
              }
            ]
          }
        },
        {
          "name": "userKyc",
          "docs": [
            "KYC User state for the \"investor\""
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "redeemer"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                44,
                208,
                138,
                231,
                115,
                207,
                141,
                40,
                51,
                17,
                199,
                227,
                172,
                80,
                127,
                46,
                16,
                107,
                86,
                145,
                149,
                77,
                198,
                214,
                124,
                158,
                241,
                248,
                79,
                126,
                155,
                153
              ]
            }
          }
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "collateralTokenProgram"
        },
        {
          "name": "deltaTokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "completeRedemptionArgs"
            }
          }
        }
      ]
    },
    {
      "name": "completeRedemptionFiat",
      "docs": [
        "Processes redemption requests for a specific epoch. This instruction handles the redemption request of",
        "a single redeemer for a given epoch. It marks the redemption in the queue as processing and emits a",
        "`RedemptionProcessing` event."
      ],
      "discriminator": [
        93,
        10,
        62,
        73,
        167,
        11,
        252,
        122
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "redeemer",
          "docs": [
            "User that is redeeming and should receive collateral AND rent from RedemptionRequestFiat",
            "CHECK handled in redemption_request_fiat constraint"
          ],
          "writable": true,
          "relations": [
            "redemptionRequestFiat"
          ]
        },
        {
          "name": "assetController",
          "writable": true,
          "relations": [
            "redemptionRequestFiat"
          ]
        },
        {
          "name": "deltaMint",
          "docs": [
            "Mint of the AssetController, which will be burned"
          ],
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaVault",
          "docs": [
            "AssetController's Delta token account to burn tokens from"
          ],
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "redemptionRequestFiat",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  101,
                  109,
                  112,
                  116,
                  105,
                  111,
                  110,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116,
                  95,
                  102,
                  105,
                  97,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "redeemer"
              },
              {
                "kind": "arg",
                "path": "args.epoch_to_process"
              }
            ]
          }
        },
        {
          "name": "userKyc",
          "docs": [
            "KYC User state for the \"investor\""
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "redeemer"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                44,
                208,
                138,
                231,
                115,
                207,
                141,
                40,
                51,
                17,
                199,
                227,
                172,
                80,
                127,
                46,
                16,
                107,
                86,
                145,
                149,
                77,
                198,
                214,
                124,
                158,
                241,
                248,
                79,
                126,
                155,
                153
              ]
            }
          }
        },
        {
          "name": "deltaTokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "completeRedemptionFiatArgs"
            }
          }
        }
      ]
    },
    {
      "name": "createTransferPromise",
      "discriminator": [
        253,
        123,
        81,
        51,
        71,
        222,
        0,
        13
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "assetController"
        },
        {
          "name": "deltaMint",
          "writable": true
        },
        {
          "name": "sourceUserAta",
          "writable": true
        },
        {
          "name": "deltaVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  108,
                  116,
                  97,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              }
            ]
          }
        },
        {
          "name": "transferPromise",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  109,
                  105,
                  115,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "deltaMint"
              },
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "arg",
                "path": "args.to"
              }
            ]
          }
        },
        {
          "name": "userTracker",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  116,
                  114,
                  97,
                  99,
                  107,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "deltaMint"
              },
              {
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "createTransferPromiseArgs"
            }
          }
        }
      ]
    },
    {
      "name": "fulfillTransferPromise",
      "discriminator": [
        109,
        124,
        198,
        222,
        41,
        15,
        226,
        30
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "deltaMint",
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaVault",
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "transferPromise",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  109,
                  105,
                  115,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "deltaMint"
              },
              {
                "kind": "arg",
                "path": "args.from"
              },
              {
                "kind": "arg",
                "path": "args.to"
              }
            ]
          }
        },
        {
          "name": "deltaDestination",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "fulfillTransferPromiseArgs"
            }
          }
        }
      ]
    },
    {
      "name": "initializeAssetController",
      "docs": [
        "Create an \"AssetController\", which maintains the state and",
        "authority over collateral and the tokenized representation of ownership.",
        "An \"AssetController\" is equivalent to a deployed \"DeltaManager\"",
        "contract on Ethereum."
      ],
      "discriminator": [
        72,
        127,
        14,
        255,
        22,
        11,
        211,
        96
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "docs": [
            "CHECK no check needed, used for input"
          ]
        },
        {
          "name": "collateralMint",
          "docs": [
            "Collateral token mint that will be deposited."
          ]
        },
        {
          "name": "assetController",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  115,
                  115,
                  101,
                  116,
                  95,
                  99,
                  111,
                  110,
                  116,
                  114,
                  111,
                  108,
                  108,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "args.unique_seed"
              }
            ]
          }
        },
        {
          "name": "deltaMint",
          "writable": true,
          "signer": true
        },
        {
          "name": "collateralVault",
          "docs": [
            "Token account to receive/send Collateral tokens"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  97,
                  116,
                  101,
                  114,
                  97,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              }
            ]
          }
        },
        {
          "name": "deltaVault",
          "docs": [
            "Token account to receive/send Delta tokens"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  108,
                  116,
                  97,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              }
            ]
          }
        },
        {
          "name": "kycController",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  107,
                  121,
                  99,
                  95,
                  99,
                  111,
                  110,
                  116,
                  114,
                  111,
                  108,
                  108,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "kyc_controller.base",
                "account": "kycController"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                44,
                208,
                138,
                231,
                115,
                207,
                141,
                40,
                51,
                17,
                199,
                227,
                172,
                80,
                127,
                46,
                16,
                107,
                86,
                145,
                149,
                77,
                198,
                214,
                124,
                158,
                241,
                248,
                79,
                126,
                155,
                153
              ]
            }
          }
        },
        {
          "name": "extraMetasAccount",
          "writable": true
        },
        {
          "name": "transferHookProgram",
          "address": "EJ7n1XaKEescrmySRPKFft52vKX5MKcDEtB12PSK1BfE"
        },
        {
          "name": "token2022Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "collateralTokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "initializeAssetControllerArgs"
            }
          }
        }
      ]
    },
    {
      "name": "initializeAssetControllerSeperately",
      "discriminator": [
        215,
        135,
        20,
        122,
        42,
        57,
        18,
        230
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "docs": [
            "CHECK no check needed, used for input"
          ]
        },
        {
          "name": "collateralMint",
          "docs": [
            "Collateral token mint that will be deposited."
          ]
        },
        {
          "name": "assetController",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  115,
                  115,
                  101,
                  116,
                  95,
                  99,
                  111,
                  110,
                  116,
                  114,
                  111,
                  108,
                  108,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "args.unique_seed"
              }
            ]
          }
        },
        {
          "name": "deltaMint",
          "writable": true
        },
        {
          "name": "collateralVault",
          "docs": [
            "Token account to receive/send Collateral tokens"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  108,
                  108,
                  97,
                  116,
                  101,
                  114,
                  97,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              }
            ]
          }
        },
        {
          "name": "deltaVault",
          "docs": [
            "Token account to receive/send Delta tokens"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  108,
                  116,
                  97,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              }
            ]
          }
        },
        {
          "name": "kycController",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  107,
                  121,
                  99,
                  95,
                  99,
                  111,
                  110,
                  116,
                  114,
                  111,
                  108,
                  108,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "kyc_controller.base",
                "account": "kycController"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                44,
                208,
                138,
                231,
                115,
                207,
                141,
                40,
                51,
                17,
                199,
                227,
                172,
                80,
                127,
                46,
                16,
                107,
                86,
                145,
                149,
                77,
                198,
                214,
                124,
                158,
                241,
                248,
                79,
                126,
                155,
                153
              ]
            }
          }
        },
        {
          "name": "extraMetasAccount",
          "writable": true
        },
        {
          "name": "transferHookProgram",
          "address": "EJ7n1XaKEescrmySRPKFft52vKX5MKcDEtB12PSK1BfE"
        },
        {
          "name": "token2022Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "collateralTokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "initializeAssetControllerSeperatelyArgs"
            }
          }
        }
      ]
    },
    {
      "name": "initializeUserTracker",
      "discriminator": [
        164,
        162,
        97,
        179,
        195,
        169,
        48,
        34
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "deltaMint"
        },
        {
          "name": "user"
        },
        {
          "name": "userTracker",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  116,
                  114,
                  97,
                  99,
                  107,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "deltaMint"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "mintToInvestor",
      "docs": [
        "Mint Delta tokens to the given token account.",
        "This instruction was originally in the Delta token contract on EVM, but",
        "as the AssetController is the mint authority we must have the entry point in the DeltaManager program."
      ],
      "discriminator": [
        110,
        163,
        156,
        87,
        197,
        254,
        3,
        8
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaMint",
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "destination",
          "writable": true
        },
        {
          "name": "tempVault",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "mintToInvestorArgs"
            }
          }
        }
      ]
    },
    {
      "name": "pause",
      "docs": [
        "Allows the AssetController admin to pause user functionality."
      ],
      "discriminator": [
        211,
        22,
        221,
        251,
        74,
        121,
        193,
        47
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  115,
                  115,
                  101,
                  116,
                  95,
                  99,
                  111,
                  110,
                  116,
                  114,
                  111,
                  108,
                  108,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "refundDeposit",
      "docs": [
        "Processes refund of a deposit for a specified refundee and epoch. This instruction calculates",
        "and transfers the refund amounts in DELTA tokens to the specified address. Processes refunds",
        "based on the mint requests of the given `epoch_to_service`. If the contract doesn't have sufficient",
        "collateral balance to fulfill a refund, the instruction will error. The instruction emits events for",
        "successful refunds or when a refund is skipped due to insufficient collateral."
      ],
      "discriminator": [
        19,
        19,
        78,
        50,
        187,
        10,
        162,
        229
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "resolver"
        },
        {
          "name": "user",
          "docs": [
            "CHECK handled in other account constraints"
          ],
          "writable": true,
          "relations": [
            "mintRequest"
          ]
        },
        {
          "name": "collateralMint",
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "collateralVault",
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "destination",
          "docs": [
            "Associated token account for the user's collateral tokens"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "collateralMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "assetController",
          "writable": true,
          "relations": [
            "mintRequest"
          ]
        },
        {
          "name": "deltaMint",
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "mintRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "mint_request.user",
                "account": "mintRequest"
              },
              {
                "kind": "arg",
                "path": "args.epoch_to_service"
              }
            ]
          }
        },
        {
          "name": "userKyc",
          "docs": [
            "KYC User state for the \"investor\""
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                44,
                208,
                138,
                231,
                115,
                207,
                141,
                40,
                51,
                17,
                199,
                227,
                172,
                80,
                127,
                46,
                16,
                107,
                86,
                145,
                149,
                77,
                198,
                214,
                124,
                158,
                241,
                248,
                79,
                126,
                155,
                153
              ]
            }
          }
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "refundDepositArgs"
            }
          }
        }
      ]
    },
    {
      "name": "refundRedemption",
      "docs": [
        "Initiates the refund process for a redemption request of a specific epoch."
      ],
      "discriminator": [
        212,
        159,
        241,
        210,
        142,
        134,
        3,
        215
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "redeemer",
          "docs": [
            "CHECK handled in redemption_request"
          ],
          "writable": true
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "deltaMint",
          "docs": [
            "Mint of Delta"
          ],
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaVault",
          "docs": [
            "AssetController's Delta token account"
          ],
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "destination",
          "docs": [
            "Associated token account the vault is refunding to"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "redeemer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "deltaMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "redemptionRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  101,
                  109,
                  112,
                  116,
                  105,
                  111,
                  110,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "redeemer"
              },
              {
                "kind": "arg",
                "path": "args.epoch"
              }
            ]
          }
        },
        {
          "name": "userKyc",
          "docs": [
            "KYC User state for the \"investor\""
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "destination.owner"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                44,
                208,
                138,
                231,
                115,
                207,
                141,
                40,
                51,
                17,
                199,
                227,
                172,
                80,
                127,
                46,
                16,
                107,
                86,
                145,
                149,
                77,
                198,
                214,
                124,
                158,
                241,
                248,
                79,
                126,
                155,
                153
              ]
            }
          }
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "refundRedemptionArgs"
            }
          }
        }
      ]
    },
    {
      "name": "refundRedemptionFiat",
      "docs": [
        "Initiates the refund process for a redemption request of a specific epoch."
      ],
      "discriminator": [
        137,
        62,
        147,
        135,
        13,
        117,
        31,
        239
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "redeemer",
          "docs": [
            "CHECK handled in redemption_request_fiat"
          ],
          "writable": true
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "deltaMint",
          "docs": [
            "Mint of Delta"
          ],
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaVault",
          "docs": [
            "AssetController's Delta token account"
          ],
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "destination",
          "docs": [
            "Associated token account the vault is refunding to"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "redeemer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "deltaMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "redemptionRequestFiat",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  101,
                  109,
                  112,
                  116,
                  105,
                  111,
                  110,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116,
                  95,
                  102,
                  105,
                  97,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "redeemer"
              },
              {
                "kind": "arg",
                "path": "args.epoch"
              }
            ]
          }
        },
        {
          "name": "userKyc",
          "docs": [
            "KYC User state for the \"investor\""
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "destination.owner"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                44,
                208,
                138,
                231,
                115,
                207,
                141,
                40,
                51,
                17,
                199,
                227,
                172,
                80,
                127,
                46,
                16,
                107,
                86,
                145,
                149,
                77,
                198,
                214,
                124,
                158,
                241,
                248,
                79,
                126,
                155,
                153
              ]
            }
          }
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "refundRedemptionFiatArgs"
            }
          }
        }
      ]
    },
    {
      "name": "refundTransferPromise",
      "discriminator": [
        89,
        34,
        125,
        159,
        181,
        75,
        180,
        171
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "deltaMint",
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaVault",
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "transferPromise",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  110,
                  115,
                  102,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  109,
                  105,
                  115,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "deltaMint"
              },
              {
                "kind": "arg",
                "path": "args.from"
              },
              {
                "kind": "arg",
                "path": "args.to"
              }
            ]
          }
        },
        {
          "name": "deltaSource",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "refundTransferPromiseArgs"
            }
          }
        }
      ]
    },
    {
      "name": "requestMint",
      "docs": [
        "Allows users to request the minting of DELTA tokens in exchange for collateral.",
        "Users send collateral to the contract, and DELTA tokens will be minted after",
        "the promise is resolved by an admin."
      ],
      "discriminator": [
        130,
        38,
        27,
        69,
        46,
        211,
        135,
        145
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "collateralMint",
          "docs": [
            "Mint of collateral"
          ]
        },
        {
          "name": "deltaMint",
          "docs": [
            "DELTA mint used to normalize mint-limit accounting to DELTA units"
          ],
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "collateralSource",
          "docs": [
            "TokenAccount the \"investor\" is sending their collateral from"
          ],
          "writable": true
        },
        {
          "name": "collateralVault",
          "docs": [
            "TokenAccount owned by the AssetController to received collateral tokens"
          ],
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "feeDestination",
          "docs": [
            "TokenAccount owned by the fee_wallet"
          ],
          "writable": true
        },
        {
          "name": "externalWalletAta",
          "docs": [
            "External wallet token account"
          ],
          "writable": true,
          "optional": true
        },
        {
          "name": "mintRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "arg",
                "path": "args.epoch"
              }
            ]
          }
        },
        {
          "name": "userKyc",
          "docs": [
            "KYC User state for the \"investor\""
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "collateral_source.owner"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                44,
                208,
                138,
                231,
                115,
                207,
                141,
                40,
                51,
                17,
                199,
                227,
                172,
                80,
                127,
                46,
                16,
                107,
                86,
                145,
                149,
                77,
                198,
                214,
                124,
                158,
                241,
                248,
                79,
                126,
                155,
                153
              ]
            }
          }
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "requestMintArgs"
            }
          }
        }
      ]
    },
    {
      "name": "requestRedemption",
      "docs": [
        "Allows a user to request redemption of tokens or edit an existing request to increase",
        "the amount of tokens for redemption. Ensures user is KYC approved and contract is not paused."
      ],
      "discriminator": [
        14,
        62,
        182,
        237,
        59,
        79,
        149,
        22
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "deltaMint",
          "docs": [
            "Mint of Delta"
          ],
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaVault",
          "docs": [
            "AssetController's Delta token account"
          ],
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaSource",
          "docs": [
            "TokenAccount the \"investor\" is sending the Delta tokens from"
          ],
          "writable": true
        },
        {
          "name": "redemptionRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  101,
                  109,
                  112,
                  116,
                  105,
                  111,
                  110,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "arg",
                "path": "args.epoch"
              }
            ]
          }
        },
        {
          "name": "userKyc",
          "docs": [
            "KYC User state for the \"investor\""
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "delta_source.owner"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                44,
                208,
                138,
                231,
                115,
                207,
                141,
                40,
                51,
                17,
                199,
                227,
                172,
                80,
                127,
                46,
                16,
                107,
                86,
                145,
                149,
                77,
                198,
                214,
                124,
                158,
                241,
                248,
                79,
                126,
                155,
                153
              ]
            }
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "requestRedemptionArgs"
            }
          }
        }
      ]
    },
    {
      "name": "requestRedemptionFiat",
      "docs": [
        "Allows a user to request redemption of tokens or edit an existing request to increase",
        "the amount of tokens for redemption. Ensures user is KYC approved and contract is not paused."
      ],
      "discriminator": [
        250,
        71,
        145,
        199,
        249,
        54,
        121,
        116
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "deltaMint",
          "docs": [
            "Mint of Delta"
          ],
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaVault",
          "docs": [
            "AssetController's Delta token account"
          ],
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaSource",
          "docs": [
            "TokenAccount the \"investor\" is sending the Delta tokens from"
          ],
          "writable": true
        },
        {
          "name": "redemptionRequestFiat",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  101,
                  109,
                  112,
                  116,
                  105,
                  111,
                  110,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116,
                  95,
                  102,
                  105,
                  97,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "arg",
                "path": "args.epoch"
              }
            ]
          }
        },
        {
          "name": "userKyc",
          "docs": [
            "KYC User state for the \"investor\""
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "delta_source.owner"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                44,
                208,
                138,
                231,
                115,
                207,
                141,
                40,
                51,
                17,
                199,
                227,
                172,
                80,
                127,
                46,
                16,
                107,
                86,
                145,
                149,
                77,
                198,
                214,
                124,
                158,
                241,
                248,
                79,
                126,
                155,
                153
              ]
            }
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "requestRedemptionFiatArgs"
            }
          }
        }
      ]
    },
    {
      "name": "resolveDeposit",
      "docs": [
        "Allows admin to resolve promise and send DELTA tokens to investors earned based",
        "on their deposited amount and the current Net Asset Value (NAV) of the fund.",
        "The number of tokens minted is determined by dividing the deposited amount by",
        "the scaled NAV of the fund for that day (scaled by a factor of 10,000 for four decimal places)."
      ],
      "discriminator": [
        236,
        3,
        27,
        191,
        219,
        8,
        84,
        170
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "resolver"
        },
        {
          "name": "user",
          "docs": [
            "CHECK handled in other account constraints"
          ],
          "writable": true,
          "relations": [
            "mintRequest"
          ]
        },
        {
          "name": "deltaMint",
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "destination",
          "docs": [
            "User Delta token account (must have ImmutableOwner; validated in `validate`)"
          ],
          "writable": true
        },
        {
          "name": "assetController",
          "writable": true,
          "relations": [
            "epochExchangeRate",
            "mintRequest"
          ]
        },
        {
          "name": "collateralMint"
        },
        {
          "name": "epochExchangeRate",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  112,
                  111,
                  99,
                  104,
                  95,
                  114,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "arg",
                "path": "args.epoch_to_claim"
              }
            ]
          }
        },
        {
          "name": "mintRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "mint_request.user",
                "account": "mintRequest"
              },
              {
                "kind": "arg",
                "path": "args.epoch_to_claim"
              }
            ]
          }
        },
        {
          "name": "userKyc",
          "docs": [
            "KYC User state for the \"investor\""
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                44,
                208,
                138,
                231,
                115,
                207,
                141,
                40,
                51,
                17,
                199,
                227,
                172,
                80,
                127,
                46,
                16,
                107,
                86,
                145,
                149,
                77,
                198,
                214,
                124,
                158,
                241,
                248,
                79,
                126,
                155,
                153
              ]
            }
          }
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "resolveDepositArgs"
            }
          }
        }
      ]
    },
    {
      "name": "setNavForEpoch",
      "docs": [
        "Sets the exchange rate for a given epoch."
      ],
      "discriminator": [
        73,
        5,
        128,
        170,
        220,
        101,
        152,
        234
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "epochExchangeRate",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  112,
                  111,
                  99,
                  104,
                  95,
                  114,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              },
              {
                "kind": "arg",
                "path": "args.epoch_to_set"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "setNavForEpochArgs"
            }
          }
        }
      ]
    },
    {
      "name": "transferCollateral",
      "docs": [
        "Allows the AssetController admin to transfer out any Collateral tokens held in the contract."
      ],
      "discriminator": [
        157,
        163,
        63,
        27,
        242,
        72,
        251,
        97
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "resolver"
        },
        {
          "name": "collateralMint",
          "docs": [
            "Mint of collateral to be transferred from AssetController"
          ],
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController"
        },
        {
          "name": "collateralVault",
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "destination",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "transferCollateralArgs"
            }
          }
        }
      ]
    },
    {
      "name": "transitionEpochExternal",
      "docs": [
        "Transition to the next epoch if the duration for the current epoch has passed."
      ],
      "discriminator": [
        13,
        108,
        236,
        220,
        50,
        184,
        45,
        181
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  115,
                  115,
                  101,
                  116,
                  95,
                  99,
                  111,
                  110,
                  116,
                  114,
                  111,
                  108,
                  108,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "assetController"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "unpause",
      "docs": [
        "Allows the AssetController admin to unpause user functionality."
      ],
      "discriminator": [
        169,
        144,
        4,
        38,
        10,
        141,
        188,
        255
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "updateAssetController",
      "docs": [
        "Allows the AssetController admin to update the AssetController."
      ],
      "discriminator": [
        211,
        240,
        160,
        39,
        109,
        192,
        111,
        119
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "updateAssetControllerArgs"
            }
          }
        }
      ]
    },
    {
      "name": "updateAuthority",
      "docs": [
        "Allows the AssetController admin to update the mint authority."
      ],
      "discriminator": [
        32,
        46,
        64,
        28,
        149,
        75,
        243,
        88
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaMint",
          "writable": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "updateMetadata",
      "discriminator": [
        170,
        182,
        43,
        239,
        97,
        78,
        225,
        186
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "deltaMint",
          "writable": true
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "updateMetadataArgs"
            }
          }
        }
      ]
    },
    {
      "name": "updateTransferHookExtraMetas",
      "docs": [
        "CPIs the transfer-hook program to refresh the extra-account-metas PDA",
        "(e.g. after a transfer-hook upgrade). `payer` funds any `realloc` on the hook PDA;",
        "`admin` must be `asset_controller.admin`."
      ],
      "discriminator": [
        246,
        33,
        45,
        186,
        254,
        69,
        112,
        38
      ],
      "accounts": [
        {
          "name": "payer",
          "docs": [
            "Keypair (or funder) that covers rent / `realloc` on the transfer-hook PDA."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "docs": [
            "`asset_controller.admin`; must sign this instruction."
          ],
          "signer": true,
          "relations": [
            "assetController"
          ]
        },
        {
          "name": "assetController",
          "writable": true
        },
        {
          "name": "deltaMint"
        },
        {
          "name": "transferHookProgram",
          "address": "EJ7n1XaKEescrmySRPKFft52vKX5MKcDEtB12PSK1BfE"
        },
        {
          "name": "extraMetasAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  120,
                  116,
                  114,
                  97,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  45,
                  109,
                  101,
                  116,
                  97,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "deltaMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "transferHookProgram"
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateUserTracker",
      "discriminator": [
        35,
        125,
        217,
        142,
        71,
        48,
        109,
        64
      ],
      "accounts": [
        {
          "name": "hookAuthority",
          "docs": [
            "PDA signer owned by the transfer hook program.",
            "Only the transfer hook can invoke_signed with this PDA,",
            "guaranteeing that no other program can call this instruction."
          ],
          "signer": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  104,
                  111,
                  111,
                  107,
                  45,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                153,
                225,
                83,
                211,
                185,
                39,
                21,
                56,
                24,
                233,
                142,
                130,
                176,
                75,
                113,
                223,
                114,
                101,
                77,
                182,
                12,
                180,
                216,
                183,
                122,
                211,
                180,
                117,
                234,
                80,
                86,
                30
              ]
            }
          }
        },
        {
          "name": "assetController"
        },
        {
          "name": "deltaMint"
        },
        {
          "name": "user"
        },
        {
          "name": "userTracker",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  116,
                  114,
                  97,
                  99,
                  107,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "deltaMint"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "updateUserTrackerArgs"
            }
          }
        }
      ]
    }
  ],
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
    },
    {
      "name": "epochExchangeRate",
      "discriminator": [
        47,
        53,
        157,
        70,
        174,
        113,
        242,
        13
      ]
    },
    {
      "name": "kycController",
      "discriminator": [
        200,
        143,
        81,
        27,
        148,
        33,
        205,
        184
      ]
    },
    {
      "name": "mintRequest",
      "discriminator": [
        60,
        88,
        16,
        213,
        180,
        138,
        14,
        225
      ]
    },
    {
      "name": "redemptionRequest",
      "discriminator": [
        117,
        157,
        214,
        214,
        64,
        160,
        31,
        58
      ]
    },
    {
      "name": "redemptionRequestFiat",
      "discriminator": [
        54,
        104,
        31,
        210,
        214,
        214,
        39,
        10
      ]
    },
    {
      "name": "transferPromise",
      "discriminator": [
        223,
        46,
        189,
        206,
        136,
        160,
        16,
        218
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    },
    {
      "name": "userClawbackRecord",
      "discriminator": [
        110,
        118,
        116,
        98,
        21,
        122,
        4,
        226
      ]
    },
    {
      "name": "userTracker",
      "discriminator": [
        141,
        242,
        54,
        157,
        209,
        97,
        210,
        244
      ]
    }
  ],
  "events": [
    {
      "name": "collateralTransfered",
      "discriminator": [
        166,
        4,
        195,
        173,
        125,
        201,
        40,
        235
      ]
    },
    {
      "name": "deltaBurned",
      "discriminator": [
        78,
        139,
        214,
        50,
        135,
        11,
        206,
        184
      ]
    },
    {
      "name": "depositRefundIssued",
      "discriminator": [
        6,
        190,
        204,
        23,
        44,
        82,
        215,
        219
      ]
    },
    {
      "name": "depositRefundWithoutCollateral",
      "discriminator": [
        129,
        41,
        225,
        213,
        67,
        94,
        57,
        151
      ]
    },
    {
      "name": "epochDurationSet",
      "discriminator": [
        121,
        86,
        54,
        153,
        81,
        206,
        79,
        40
      ]
    },
    {
      "name": "epochTransition",
      "discriminator": [
        33,
        118,
        186,
        59,
        121,
        93,
        241,
        79
      ]
    },
    {
      "name": "exchangeRateDeltaLimitSet",
      "discriminator": [
        252,
        254,
        32,
        211,
        163,
        157,
        35,
        139
      ]
    },
    {
      "name": "feeRecipientSet",
      "discriminator": [
        99,
        140,
        80,
        35,
        245,
        176,
        179,
        110
      ]
    },
    {
      "name": "minimumDepositAmountSet",
      "discriminator": [
        134,
        237,
        176,
        205,
        21,
        44,
        95,
        177
      ]
    },
    {
      "name": "minimumRedeemAmountFiatSet",
      "discriminator": [
        82,
        123,
        18,
        34,
        154,
        235,
        172,
        188
      ]
    },
    {
      "name": "minimumRedeemAmountSet",
      "discriminator": [
        190,
        245,
        17,
        140,
        214,
        151,
        25,
        98
      ]
    },
    {
      "name": "mintAuthorityUpdated",
      "discriminator": [
        251,
        56,
        50,
        229,
        68,
        227,
        225,
        225
      ]
    },
    {
      "name": "mintCompleted",
      "discriminator": [
        234,
        65,
        17,
        174,
        104,
        22,
        108,
        91
      ]
    },
    {
      "name": "mintExchangeRateSet",
      "discriminator": [
        138,
        29,
        222,
        112,
        18,
        9,
        252,
        97
      ]
    },
    {
      "name": "mintFeeSet",
      "discriminator": [
        19,
        160,
        65,
        66,
        12,
        237,
        135,
        42
      ]
    },
    {
      "name": "mintLimitSet",
      "discriminator": [
        242,
        158,
        215,
        169,
        45,
        9,
        56,
        13
      ]
    },
    {
      "name": "mintRequested",
      "discriminator": [
        35,
        69,
        51,
        130,
        53,
        43,
        189,
        196
      ]
    },
    {
      "name": "mintToInvestorCompleted",
      "discriminator": [
        99,
        170,
        3,
        42,
        104,
        211,
        93,
        23
      ]
    },
    {
      "name": "pendingRequestClosed",
      "discriminator": [
        7,
        216,
        231,
        154,
        61,
        195,
        187,
        131
      ]
    },
    {
      "name": "redeemLimitSet",
      "discriminator": [
        124,
        126,
        206,
        231,
        125,
        170,
        76,
        136
      ]
    },
    {
      "name": "redemptionCompleted",
      "discriminator": [
        46,
        189,
        147,
        218,
        232,
        71,
        143,
        119
      ]
    },
    {
      "name": "redemptionCompletedFiat",
      "discriminator": [
        43,
        135,
        24,
        121,
        145,
        235,
        132,
        146
      ]
    },
    {
      "name": "redemptionFailedDueToKyc",
      "discriminator": [
        166,
        58,
        17,
        159,
        82,
        243,
        68,
        89
      ]
    },
    {
      "name": "redemptionProcessing",
      "discriminator": [
        29,
        67,
        58,
        141,
        28,
        208,
        64,
        66
      ]
    },
    {
      "name": "redemptionRefunded",
      "discriminator": [
        24,
        81,
        24,
        203,
        110,
        100,
        206,
        104
      ]
    },
    {
      "name": "redemptionRefundedFiat",
      "discriminator": [
        194,
        208,
        89,
        239,
        48,
        177,
        193,
        176
      ]
    },
    {
      "name": "redemptionRequested",
      "discriminator": [
        245,
        155,
        98,
        131,
        210,
        25,
        137,
        146
      ]
    },
    {
      "name": "redemptionRequestedFiat",
      "discriminator": [
        150,
        173,
        183,
        228,
        54,
        116,
        180,
        113
      ]
    },
    {
      "name": "tokensClawedBack",
      "discriminator": [
        173,
        143,
        104,
        218,
        50,
        59,
        21,
        84
      ]
    },
    {
      "name": "transferPromiseCreated",
      "discriminator": [
        141,
        6,
        182,
        130,
        253,
        120,
        54,
        133
      ]
    },
    {
      "name": "transferPromiseFulfilled",
      "discriminator": [
        237,
        238,
        239,
        24,
        220,
        72,
        6,
        122
      ]
    },
    {
      "name": "transferPromiseRefunded",
      "discriminator": [
        123,
        243,
        254,
        190,
        252,
        174,
        80,
        137
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidKycProgram",
      "msg": "KYC program is invalid"
    },
    {
      "code": 6001,
      "name": "invalidEpoch",
      "msg": "Epoch is invalid"
    },
    {
      "code": 6002,
      "name": "pausedAssetController",
      "msg": "AssetController is paused"
    },
    {
      "code": 6003,
      "name": "userNoKyc",
      "msg": "User has not passed KYC"
    },
    {
      "code": 6004,
      "name": "mintRequestAmountTooSmall",
      "msg": "Does not meet minimum deposit requirement"
    },
    {
      "code": 6005,
      "name": "invalidFeeAccount",
      "msg": "Fee account is not owned by fee wallet"
    },
    {
      "code": 6006,
      "name": "mintExceedsRateLimit",
      "msg": "Amount requested exceeds AssetController rate limit"
    },
    {
      "code": 6007,
      "name": "zeroExchangeRate",
      "msg": "Exchange rate cannot be zero"
    },
    {
      "code": 6008,
      "name": "mathOverflow",
      "msg": "Math overflow"
    },
    {
      "code": 6009,
      "name": "insufficientCollateralInVault",
      "msg": "Insufficient collateral in vault"
    },
    {
      "code": 6010,
      "name": "withdrawRequestAmountTooSmall",
      "msg": "Requested withdraw amount does not meet minimums"
    },
    {
      "code": 6011,
      "name": "redeemAmountCannotBeZero",
      "msg": "Redeem amount cannot be 0"
    },
    {
      "code": 6012,
      "name": "redeemExceedsRateLimit",
      "msg": "Redemption request amount exceeds AssetController rate limit"
    },
    {
      "code": 6013,
      "name": "redemptionRequestNotProcessing",
      "msg": "RedemptionRequest must be processing"
    },
    {
      "code": 6014,
      "name": "epochMismatch",
      "msg": "Epoch mismatch"
    },
    {
      "code": 6015,
      "name": "alreadyProcessing",
      "msg": "Redemption request is already processing"
    },
    {
      "code": 6016,
      "name": "invalidRedeemer",
      "msg": "Invalid redeemer"
    },
    {
      "code": 6017,
      "name": "navNotSet",
      "msg": "Nav not set"
    },
    {
      "code": 6018,
      "name": "invalidCollateralToken",
      "msg": "Collateral token cannot be used"
    },
    {
      "code": 6019,
      "name": "fiatValueBelowMinimum",
      "msg": "Fiat value below minimum"
    },
    {
      "code": 6020,
      "name": "invalidAmount",
      "msg": "Invalid amount"
    },
    {
      "code": 6021,
      "name": "amountMismatch",
      "msg": "Amount mismatch"
    },
    {
      "code": 6022,
      "name": "invalidCollateralAmount",
      "msg": "Invalid collateral amount"
    },
    {
      "code": 6023,
      "name": "redemptionValueLessThanCollateralAfterFee",
      "msg": "Calculated redemption value is less than collateral amount after fee"
    },
    {
      "code": 6024,
      "name": "invalidPayer",
      "msg": "Payer must be the owner of the collateral source token account"
    },
    {
      "code": 6025,
      "name": "invalidRequestType",
      "msg": "Request type is invalid"
    },
    {
      "code": 6026,
      "name": "mintFeeExceedsMaximum",
      "msg": "Mint fee exceeds maximum allowed"
    },
    {
      "code": 6027,
      "name": "alreadyPaused",
      "msg": "AssetController is already paused"
    },
    {
      "code": 6028,
      "name": "alreadyUnpaused",
      "msg": "AssetController is already unpaused"
    },
    {
      "code": 6029,
      "name": "burnAmountCannotBeZero",
      "msg": "Burn amount cannot be zero"
    },
    {
      "code": 6030,
      "name": "insufficientDeltaInAccount",
      "msg": "Insufficient Delta tokens in account for burn"
    },
    {
      "code": 6031,
      "name": "externalWalletRequired",
      "msg": "External wallet token account is required"
    },
    {
      "code": 6032,
      "name": "invalidExternalWallet",
      "msg": "Invalid external wallet"
    },
    {
      "code": 6033,
      "name": "epochInTheFuture",
      "msg": "Epoch is in the future"
    },
    {
      "code": 6034,
      "name": "invalidTransferLimitPeriod",
      "msg": "Transfer limit period must be greater than zero"
    },
    {
      "code": 6035,
      "name": "transferLimitExceeded",
      "msg": "Transfer amount exceeds the allowed limit for this period"
    },
    {
      "code": 6036,
      "name": "missingImmutableOwner",
      "msg": "Destination token account must have ImmutableOwner extension"
    },
    {
      "code": 6037,
      "name": "invalidDestinationTokenAccount",
      "msg": "Invalid destination token account data"
    },
    {
      "code": 6038,
      "name": "invalidDeltaToken",
      "msg": "Delta token cannot be used"
    }
  ],
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
    },
    {
      "name": "burnDeltaArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "clawbackTokensArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "closePendingRequestArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "requestType",
            "type": "u8"
          },
          {
            "name": "epoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "collateralTransfered",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "tokenAddress",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "resolver",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "completeRedemptionArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "docs": [
              "The epoch the of the redemption request to be paid out."
            ],
            "type": "u64"
          },
          {
            "name": "collateralAmountAfterFee",
            "docs": [
              "Amount of collateral to be redeemed after fees."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "completeRedemptionFiatArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epochToProcess",
            "type": "u64"
          },
          {
            "name": "epochToClaim",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "createTransferPromiseArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "deltaBurned",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "depositRefundIssued",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "cashAmountOut",
            "type": "u64"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "resolver",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "depositRefundWithoutCollateral",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "refundee",
            "type": "pubkey"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "amountRequested",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "epochDurationSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "oldDuration",
            "type": "u64"
          },
          {
            "name": "newDuration",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "epochExchangeRate",
      "docs": [
        "Mapping used for getting the exchange rate during a given epoch"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetController",
            "docs": [
              "AssetController this exchange rate is related to"
            ],
            "type": "pubkey"
          },
          {
            "name": "epoch",
            "docs": [
              "Epoch for which the exchange rate applies"
            ],
            "type": "u64"
          },
          {
            "name": "rate",
            "docs": [
              "Exchange rate for Delta tokens"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for the PDA"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "epochTransition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "prevEpoch",
            "type": "u64"
          },
          {
            "name": "currentEpoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "exchangeRateDeltaLimitSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "oldLimit",
            "type": "u32"
          },
          {
            "name": "newLimit",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "feeRecipientSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "oldRecipient",
            "type": "pubkey"
          },
          {
            "name": "newRecipient",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "fulfillTransferPromiseArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "initializeAssetControllerArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uniqueSeed",
            "type": "u64"
          },
          {
            "name": "clawbackTokenRecipient",
            "docs": [
              "Address that receives clawed back tokens to their account"
            ],
            "type": "pubkey"
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
              "Maximum amount that can be minted during an epoch"
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
            "name": "epochDuration",
            "docs": [
              "Duration of an epoch in seconds"
            ],
            "type": "u64"
          },
          {
            "name": "feeRecipient",
            "docs": [
              "The address which owns the token account(s) where fees are sent"
            ],
            "type": "pubkey"
          },
          {
            "name": "currentEpochStartTimestamp",
            "docs": [
              "Timestamp of the start of `current_epoch`"
            ],
            "type": "u64"
          },
          {
            "name": "decimals",
            "docs": [
              "Number of decimal places for the Delta token"
            ],
            "type": "u8"
          },
          {
            "name": "tokenName",
            "type": "string"
          },
          {
            "name": "tokenSymbol",
            "type": "string"
          },
          {
            "name": "tokenUri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "initializeAssetControllerSeperatelyArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uniqueSeed",
            "type": "u64"
          },
          {
            "name": "clawbackTokenRecipient",
            "docs": [
              "Address that receives clawed back tokens to their account"
            ],
            "type": "pubkey"
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
              "Maximum amount that can be minted during an epoch"
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
            "name": "epochDuration",
            "docs": [
              "Duration of an epoch in seconds"
            ],
            "type": "u64"
          },
          {
            "name": "feeRecipient",
            "docs": [
              "The address which owns the token account(s) where fees are sent"
            ],
            "type": "pubkey"
          },
          {
            "name": "currentEpochStartTimestamp",
            "docs": [
              "Timestamp of the start of `current_epoch`"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "kycController",
      "docs": [
        "Instance of KYC controller.",
        "PDA seeds: [b\"kyc_controller\", base]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "docs": [
              "Admin address with authority over KYC operations."
            ],
            "type": "pubkey"
          },
          {
            "name": "base",
            "docs": [
              "PDA seed pubkey to add randomness to derived address."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed of PDA."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "minimumDepositAmountSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "oldMinimum",
            "type": "u64"
          },
          {
            "name": "newMinimum",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "minimumRedeemAmountFiatSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "oldMinimum",
            "type": "u64"
          },
          {
            "name": "newMinimum",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "minimumRedeemAmountSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "oldMinimum",
            "type": "u64"
          },
          {
            "name": "newMinimum",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "mintAuthorityUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "newAuthority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "mintCompleted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "cashAmountOut",
            "type": "u64"
          },
          {
            "name": "collateralAmountDeposited",
            "type": "u64"
          },
          {
            "name": "exchangeRate",
            "type": "u64"
          },
          {
            "name": "epochClaimedFrom",
            "type": "u64"
          },
          {
            "name": "resolver",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "mintExchangeRateSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "oldRate",
            "type": "u64"
          },
          {
            "name": "newRate",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "mintFeeSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "oldFee",
            "type": "u32"
          },
          {
            "name": "newFee",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "mintLimitSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "oldLimit",
            "type": "u64"
          },
          {
            "name": "newLimit",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "mintRequest",
      "docs": [
        "Tracks a user's request to mint Delta tokens."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "docs": [
              "Epoch the deposit was initiated"
            ],
            "type": "u64"
          },
          {
            "name": "user",
            "docs": [
              "Address of the user that initiated the deposit"
            ],
            "type": "pubkey"
          },
          {
            "name": "assetController",
            "docs": [
              "The AssetController this MintRequest is related to"
            ],
            "type": "pubkey"
          },
          {
            "name": "collateralAmount",
            "docs": [
              "The collateral deposited by the user.",
              "Note that this is after fees, if any, have been deducted."
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed of PDA"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "mintRequested",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "collateralAmountDeposited",
            "type": "u64"
          },
          {
            "name": "depositAmountAfterFee",
            "type": "u64"
          },
          {
            "name": "feeAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "mintToInvestorArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "promiseId",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "mintToInvestorCompleted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "mintAmount",
            "type": "u64"
          },
          {
            "name": "promiseId",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "pendingRequestClosed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "requestType",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "resolver",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "redeemLimitSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "oldLimit",
            "type": "u64"
          },
          {
            "name": "newLimit",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redemptionCompleted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "cashAmountRequested",
            "type": "u64"
          },
          {
            "name": "collateralAmountReturned",
            "type": "u64"
          },
          {
            "name": "epoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redemptionCompletedFiat",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "deltaAmount",
            "type": "u64"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "epochToClaim",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redemptionFailedDueToKyc",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "redeemer",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "amountDelta",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redemptionProcessing",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "resolver",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "redemptionRefunded",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "epoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redemptionRefundedFiat",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "epoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redemptionRequest",
      "docs": [
        "Represents a user's redemption request for a specific epoch.",
        "From the EVM related code, this could be thought of as the mappings of",
        "epoch -> address -> amount of DELTA ."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "redeemer",
            "docs": [
              "User that requested the redemption"
            ],
            "type": "pubkey"
          },
          {
            "name": "epoch",
            "docs": [
              "Epoch the request was made for"
            ],
            "type": "u64"
          },
          {
            "name": "amountDelta",
            "docs": [
              "Stores the amount of tokens to be burned for redemption"
            ],
            "type": "u64"
          },
          {
            "name": "assetController",
            "docs": [
              "The AssetController that \"owns\" this account"
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "redemptionRequestFiat",
      "docs": [
        "Represents a user's fiat redemption request for a specific epoch.",
        "Tracks the amount of Delta tokens to be burned in exchange for fiat currency,",
        "the redeemer's address, and the processing state of their redemption request."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "redeemer",
            "docs": [
              "User that requested the redemption"
            ],
            "type": "pubkey"
          },
          {
            "name": "epoch",
            "docs": [
              "Epoch the request was made for"
            ],
            "type": "u64"
          },
          {
            "name": "amountDelta",
            "docs": [
              "Stores the amount of tokens to be burned for redemption"
            ],
            "type": "u64"
          },
          {
            "name": "assetController",
            "docs": [
              "The AssetController that \"owns\" this account"
            ],
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "redemptionRequested",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "cashAmountIn",
            "type": "u64"
          },
          {
            "name": "epoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redemptionRequestedFiat",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "controller",
            "type": "pubkey"
          },
          {
            "name": "cashAmountIn",
            "type": "u64"
          },
          {
            "name": "epoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "refundDepositArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epochToService",
            "docs": [
              "The epoch for which the refund is being processed."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "refundRedemptionArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "docs": [
              "Epoch the redemption refund is for."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "refundRedemptionFiatArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "docs": [
              "Epoch the redemption refund is for."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "refundTransferPromiseArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "requestMintArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collateralAmountIn",
            "docs": [
              "Amount of collateral tokens to deposit."
            ],
            "type": "u64"
          },
          {
            "name": "epoch",
            "docs": [
              "Epoch the mint request is for."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "requestRedemptionArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountDeltaToRedeem",
            "docs": [
              "Amount of tokens to redeem."
            ],
            "type": "u64"
          },
          {
            "name": "epoch",
            "docs": [
              "Epoch the redemption request is for."
            ],
            "type": "u64"
          },
          {
            "name": "fullWithdrawal",
            "docs": [
              "Whether this is a full withdrawal request."
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "requestRedemptionFiatArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountDeltaToRedeem",
            "docs": [
              "Amount of tokens to redeem."
            ],
            "type": "u64"
          },
          {
            "name": "epoch",
            "docs": [
              "Epoch the redemption request is for."
            ],
            "type": "u64"
          },
          {
            "name": "fullWithdrawal",
            "docs": [
              "Whether this is a full withdrawal request."
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "resolveDepositArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epochToClaim",
            "docs": [
              "Epoch for which the user is claiming tokens."
            ],
            "type": "u64"
          },
          {
            "name": "afterFeeAmount",
            "docs": [
              "Amount after fee"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "setCurrentEpochArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "targetEpoch",
            "type": "u64"
          },
          {
            "name": "targetEpochStartTimestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "setNavForEpochArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epochToSet",
            "docs": [
              "The epoch for which the exchange rate is being set."
            ],
            "type": "u64"
          },
          {
            "name": "navScaled",
            "docs": [
              "The Net Asset Value (NAV) per whole DELTA token, scaled by `10^FIAT_DECIMALS`",
              "(e.g. NAV 1.0 = 1_000_000 when [`crate::constants::FIAT_DECIMALS`] is 6)."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "tokensClawedBack",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "docs": [
              "The AssetController that emitted this event"
            ],
            "type": "pubkey"
          },
          {
            "name": "from",
            "docs": [
              "Address of the user the tokens were clawed back from"
            ],
            "type": "pubkey"
          },
          {
            "name": "admin",
            "docs": [
              "Address of the admin who performed the clawback"
            ],
            "type": "pubkey"
          },
          {
            "name": "amount",
            "docs": [
              "The amount of tokens clawed back"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "transferCollateralArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "docs": [
              "Amount of Collateral to withdraw from the AssetController"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "transferPromise",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetController",
            "type": "pubkey"
          },
          {
            "name": "deltaMint",
            "type": "pubkey"
          },
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "transferPromiseCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetController",
            "type": "pubkey"
          },
          {
            "name": "deltaMint",
            "type": "pubkey"
          },
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "transferPromiseFulfilled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetController",
            "type": "pubkey"
          },
          {
            "name": "deltaMint",
            "type": "pubkey"
          },
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "transferPromiseRefunded",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetController",
            "type": "pubkey"
          },
          {
            "name": "deltaMint",
            "type": "pubkey"
          },
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateAssetControllerArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "minimumDepositAmount",
            "docs": [
              "Minimum amount that must be deposited to mint DELTA.",
              "Denoted in decimals of `collateral`"
            ],
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "mintFee",
            "docs": [
              "Minting fee specified in basis points"
            ],
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "minimumRedeemAmount",
            "docs": [
              "Limit for how far `exchangeRate` can stray from",
              "Minimum amount that must be redeemed for a withdraw request"
            ],
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "minimumRedeemAmountFiat",
            "docs": [
              "Minimum amount that must be redeemed for a withdraw request in fiat"
            ],
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "mintLimit",
            "docs": [
              "Maximum amount that can be minted during an epoch"
            ],
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "redeemLimit",
            "docs": [
              "Maximum amount that can be redeemed during an epoch"
            ],
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "epochDuration",
            "docs": [
              "Duration of an epoch in seconds"
            ],
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "feeRecipient",
            "docs": [
              "The address which owns the token account(s) where fees are sent"
            ],
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "clawbackTokenRecipient",
            "docs": [
              "The address which owns the token account(s) where clawback tokens are sent"
            ],
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "externalWalletAta",
            "docs": [
              "The external wallet address"
            ],
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "transferLimitPeriodInSeconds",
            "docs": [
              "Transfer limit period in seconds"
            ],
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "transferLimit",
            "docs": [
              "Transfer limit"
            ],
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "updateMetadataArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "symbol",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "uri",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "updateUserTrackerArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "user",
      "docs": [
        "User KYC status for a specific KycController.",
        "PDA seeds: [b\"user\", kyc_controller, address]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "kycController",
            "docs": [
              "KycController that the user belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "address",
            "docs": [
              "Address of the associated wallet."
            ],
            "type": "pubkey"
          },
          {
            "name": "isKyc",
            "docs": [
              "Has the user passed KYC."
            ],
            "type": "bool"
          },
          {
            "name": "isBanned",
            "docs": [
              "Has the user been sanctioned."
            ],
            "type": "bool"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed of PDA."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userClawbackRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalClawedBack",
            "docs": [
              "The total amount of tokens clawed back from this user"
            ],
            "type": "u64"
          },
          {
            "name": "user",
            "docs": [
              "The user's public key"
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed of PDA"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userTracker",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "deltaMint",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "periodStartTimestamp",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                15
              ]
            }
          },
          {
            "name": "padding2",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    }
  ]
};
