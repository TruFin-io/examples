/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/trubill_vault.json`.
 */
export type TrubillVault = {
  "address": "4EXXZCu2BR4RZ4RCFYUqk6s4SLVpr6umrzw8mqGMwVR4",
  "metadata": {
    "name": "trubillVault",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "TruBill Vault"
  },
  "instructions": [
    {
      "name": "claimOwnership",
      "discriminator": [
        236,
        166,
        239,
        222,
        14,
        45,
        143,
        254
      ],
      "accounts": [
        {
          "name": "vaultAccess",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "pendingOwner",
          "docs": [
            "The pending owner must claim ownership"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "claimWithdrawal",
      "discriminator": [
        118,
        206,
        173,
        38,
        239,
        165,
        65,
        30
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userWhitelist",
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
                "path": "user"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                77,
                195,
                89,
                88,
                21,
                163,
                149,
                81,
                76,
                118,
                191,
                83,
                176,
                247,
                207,
                110,
                197,
                117,
                22,
                145,
                189,
                134,
                201,
                104,
                44,
                90,
                192,
                35,
                109,
                187,
                105,
                186
              ]
            }
          }
        },
        {
          "name": "vaultConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "usdcMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "vaultUsdcAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "usdcMint"
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
          "name": "userUsdcAta",
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
                "path": "usdcMint"
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
          "name": "redeemRequest",
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
                  101,
                  109,
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
                "path": "user"
              },
              {
                "kind": "arg",
                "path": "redeemRequestId"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "redeemRequestId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "discriminator": [
        242,
        35,
        198,
        137,
        82,
        225,
        242,
        182
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "userWhitelist",
          "docs": [
            "The user who is depositing must also be whitelisted"
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
                "path": "payer"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                77,
                195,
                89,
                88,
                21,
                163,
                149,
                81,
                76,
                118,
                191,
                83,
                176,
                247,
                207,
                110,
                197,
                117,
                22,
                145,
                189,
                134,
                201,
                104,
                44,
                90,
                192,
                35,
                109,
                187,
                105,
                186
              ]
            }
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "userVaultTokenAccount",
          "docs": [
            "User's vault token account for receiving share tokens"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "account",
                "path": "tokenProgram2022"
              },
              {
                "kind": "account",
                "path": "trubillMint"
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
          "name": "userUsdcAta",
          "writable": true
        },
        {
          "name": "vaultCollateralAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "usdcMint"
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
          "name": "usdcMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "trubillMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  117,
                  98,
                  105,
                  108,
                  108,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "epochSnapshot",
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
                  115,
                  110,
                  97,
                  112,
                  115,
                  104,
                  111,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "epoch"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenProgram2022",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "epoch",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAccess",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "sharePrice",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  97,
                  114,
                  101,
                  95,
                  112,
                  114,
                  105,
                  99,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "treasuryInfo"
        },
        {
          "name": "vaultCollateralAta",
          "docs": [
            "Vault's collateral token account (USDC)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "usdcMint"
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
          "name": "vaultUltraAta",
          "docs": [
            "Vault's ULTRA token account"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram2022"
              },
              {
                "kind": "account",
                "path": "ultraMint"
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
          "name": "usdcMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "ultraMint",
          "address": "9DRPPWYud8i6CaSsDsFESs1xyVr8dBCMtjPZji2xiZEa"
        },
        {
          "name": "trubillMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  117,
                  98,
                  105,
                  108,
                  108,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "treasuryTrubillAta",
          "docs": [
            "Treasury's TruBILL ATA, pre-created so `update_total_assets` can mint",
            "performance-fee shares without requiring a first-time init."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "treasuryInfo"
              },
              {
                "kind": "account",
                "path": "tokenProgram2022"
              },
              {
                "kind": "account",
                "path": "trubillMint"
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
          "name": "metadataPda",
          "writable": true
        },
        {
          "name": "ownerInfo"
        },
        {
          "name": "operatorInfo"
        },
        {
          "name": "tokenProgram2022",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "metadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "sysvarInstructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "minDepositAmount",
          "type": "u64"
        },
        {
          "name": "reserveRatioBps",
          "type": "u16"
        },
        {
          "name": "navExpiryTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "instantRedeem",
      "discriminator": [
        187,
        107,
        208,
        125,
        224,
        237,
        40,
        93
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "userWhitelist",
          "docs": [
            "The user who is redeeming must also be whitelisted"
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
                "path": "payer"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                77,
                195,
                89,
                88,
                21,
                163,
                149,
                81,
                76,
                118,
                191,
                83,
                176,
                247,
                207,
                110,
                197,
                117,
                22,
                145,
                189,
                134,
                201,
                104,
                44,
                90,
                192,
                35,
                109,
                187,
                105,
                186
              ]
            }
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "userVaultTokenAccount",
          "docs": [
            "User's vault token account for burning share tokens"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "account",
                "path": "tokenProgram2022"
              },
              {
                "kind": "account",
                "path": "trubillMint"
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
          "name": "userUsdcAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "usdcMint"
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
          "name": "vaultCollateralAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "usdcMint"
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
          "name": "treasuryUsdcAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "treasury"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "usdcMint"
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
          "name": "treasury",
          "writable": true
        },
        {
          "name": "usdcMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "trubillMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  117,
                  98,
                  105,
                  108,
                  108,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "epochSnapshot",
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
                  115,
                  110,
                  97,
                  112,
                  115,
                  104,
                  111,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "epoch"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenProgram2022",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "epoch",
          "type": "u64"
        },
        {
          "name": "redeemAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "pause",
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
          "name": "vaultAccess",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "receiveDepositRefund",
      "discriminator": [
        134,
        211,
        143,
        39,
        191,
        85,
        255,
        149
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "usdcMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "vaultCollateralAta",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "usdcMint"
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
          "name": "ultraMintRequest",
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
                "kind": "arg",
                "path": "epoch"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "epoch",
          "type": "u64"
        }
      ]
    },
    {
      "name": "receiveRedeemRefund",
      "discriminator": [
        57,
        89,
        99,
        37,
        204,
        4,
        69,
        77
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraMint",
          "address": "9DRPPWYud8i6CaSsDsFESs1xyVr8dBCMtjPZji2xiZEa"
        },
        {
          "name": "vaultUltraAta",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram2022"
              },
              {
                "kind": "account",
                "path": "ultraMint"
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
          "name": "ultraRedeemRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  114,
                  101,
                  100,
                  101,
                  101,
                  109,
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
                "kind": "arg",
                "path": "epoch"
              }
            ]
          }
        },
        {
          "name": "tokenProgram2022",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "epoch",
          "type": "u64"
        }
      ]
    },
    {
      "name": "receiveUltra",
      "discriminator": [
        230,
        254,
        174,
        106,
        173,
        25,
        105,
        75
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraMint",
          "address": "9DRPPWYud8i6CaSsDsFESs1xyVr8dBCMtjPZji2xiZEa"
        },
        {
          "name": "vaultUltraAta",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram2022"
              },
              {
                "kind": "account",
                "path": "ultraMint"
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
          "name": "ultraMintRequest",
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
                "kind": "arg",
                "path": "epoch"
              }
            ]
          }
        },
        {
          "name": "tokenProgram2022",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "epoch",
          "type": "u64"
        },
        {
          "name": "ultraReceived",
          "type": "u64"
        }
      ]
    },
    {
      "name": "receiveUsdc",
      "discriminator": [
        234,
        4,
        133,
        7,
        111,
        131,
        48,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "usdcMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "vaultCollateralAta",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "usdcMint"
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
          "name": "ultraRedeemRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  114,
                  101,
                  100,
                  101,
                  101,
                  109,
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
                "kind": "arg",
                "path": "epoch"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "epoch",
          "type": "u64"
        },
        {
          "name": "usdcReceived",
          "type": "u64"
        }
      ]
    },
    {
      "name": "reconcileUltra",
      "discriminator": [
        177,
        86,
        75,
        13,
        59,
        55,
        136,
        142
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "ultraMint",
          "address": "9DRPPWYud8i6CaSsDsFESs1xyVr8dBCMtjPZji2xiZEa"
        },
        {
          "name": "vaultUltraAta",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram2022"
              },
              {
                "kind": "account",
                "path": "ultraMint"
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
          "name": "tokenProgram2022",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "reconcileUsdc",
      "discriminator": [
        177,
        49,
        151,
        5,
        170,
        8,
        10,
        204
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraAccounting",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "usdcMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "vaultUsdcAta",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "usdcMint"
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
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "pendingWithdrawalSurplus",
          "type": "u64"
        }
      ]
    },
    {
      "name": "requestRedeem",
      "discriminator": [
        105,
        49,
        44,
        38,
        207,
        241,
        33,
        173
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "userWhitelist",
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
                "path": "user"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                77,
                195,
                89,
                88,
                21,
                163,
                149,
                81,
                76,
                118,
                191,
                83,
                176,
                247,
                207,
                110,
                197,
                117,
                22,
                145,
                189,
                134,
                201,
                104,
                44,
                90,
                192,
                35,
                109,
                187,
                105,
                186
              ]
            }
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "trubillMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  117,
                  98,
                  105,
                  108,
                  108,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "userTrubillAta",
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
                "path": "trubillMint"
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
          "name": "userRedeemState",
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
                  114,
                  101,
                  100,
                  101,
                  101,
                  109,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "redeemRequest",
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
                  101,
                  109,
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
                "path": "user"
              },
              {
                "kind": "account",
                "path": "user_redeem_state.next_redeem_request_id",
                "account": "userRedeemState"
              }
            ]
          }
        },
        {
          "name": "epochSnapshot",
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
                  115,
                  110,
                  97,
                  112,
                  115,
                  104,
                  111,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "epoch"
              }
            ]
          }
        },
        {
          "name": "tokenProgram2022",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "epoch",
          "type": "u64"
        },
        {
          "name": "trubillAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "requestUltraMint",
      "discriminator": [
        71,
        229,
        21,
        128,
        114,
        158,
        116,
        244
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "usdcMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "ultraMint",
          "docs": [
            "DELTA (ULTRA) mint — DM's request_mint normalizes mint-limit accounting to DELTA units."
          ],
          "address": "9DRPPWYud8i6CaSsDsFESs1xyVr8dBCMtjPZji2xiZEa"
        },
        {
          "name": "vaultUsdcAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "usdcMint"
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
          "name": "dmAssetController",
          "docs": [
            "Delta Manager's AssetController"
          ],
          "writable": true,
          "address": "FQ9X5cF6oWmGcH6XAsdkPwBj2mKWRoTXU2zGS1gCgBaJ"
        },
        {
          "name": "dmUsdcVault",
          "docs": [
            "Delta Manager's collateral vault token account (destination for USDC)"
          ],
          "writable": true
        },
        {
          "name": "dmFeeDestination",
          "docs": [
            "DM fee destination token account"
          ],
          "writable": true
        },
        {
          "name": "dmExternalWalletAta",
          "docs": [
            "DM external wallet token account — required when AssetController has a external_wallet_ata configured."
          ],
          "writable": true,
          "optional": true
        },
        {
          "name": "dmMintRequest",
          "writable": true
        },
        {
          "name": "vaultKyc",
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
                "kind": "const",
                "value": [
                  233,
                  50,
                  107,
                  15,
                  181,
                  106,
                  154,
                  139,
                  55,
                  163,
                  57,
                  213,
                  171,
                  155,
                  73,
                  8,
                  10,
                  126,
                  74,
                  132,
                  73,
                  198,
                  130,
                  45,
                  50,
                  225,
                  23,
                  146,
                  80,
                  26,
                  199,
                  5
                ]
              },
              {
                "kind": "account",
                "path": "vaultAuthority"
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
          "name": "ultraMintRequest",
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
                "kind": "arg",
                "path": "epoch"
              }
            ]
          }
        },
        {
          "name": "deltaManagerProgram",
          "address": "GtraRX3S3xsLHU6VpzGFxaqVmKjbEkFxyMmwZoKwQJrS"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "epoch",
          "type": "u64"
        }
      ]
    },
    {
      "name": "requestUltraRedemption",
      "discriminator": [
        107,
        69,
        38,
        73,
        206,
        63,
        55,
        9
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraAccounting",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "ultraMint",
          "address": "9DRPPWYud8i6CaSsDsFESs1xyVr8dBCMtjPZji2xiZEa"
        },
        {
          "name": "vaultUltraAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram2022"
              },
              {
                "kind": "account",
                "path": "ultraMint"
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
          "name": "dmAssetController",
          "docs": [
            "Delta Manager's AssetController"
          ],
          "writable": true,
          "address": "FQ9X5cF6oWmGcH6XAsdkPwBj2mKWRoTXU2zGS1gCgBaJ"
        },
        {
          "name": "dmDeltaVault",
          "docs": [
            "Delta Manager's delta vault token account (destination for ULTRA)"
          ],
          "writable": true
        },
        {
          "name": "dmRedemptionRequest",
          "writable": true
        },
        {
          "name": "vaultKyc",
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
                "kind": "const",
                "value": [
                  233,
                  50,
                  107,
                  15,
                  181,
                  106,
                  154,
                  139,
                  55,
                  163,
                  57,
                  213,
                  171,
                  155,
                  73,
                  8,
                  10,
                  126,
                  74,
                  132,
                  73,
                  198,
                  130,
                  45,
                  50,
                  225,
                  23,
                  146,
                  80,
                  26,
                  199,
                  5
                ]
              },
              {
                "kind": "account",
                "path": "vaultAuthority"
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
          "name": "ultraRedeemRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  114,
                  101,
                  100,
                  101,
                  101,
                  109,
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
                "kind": "arg",
                "path": "epoch"
              }
            ]
          }
        },
        {
          "name": "deltaManagerProgram",
          "address": "GtraRX3S3xsLHU6VpzGFxaqVmKjbEkFxyMmwZoKwQJrS"
        },
        {
          "name": "tokenProgram2022",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "epoch",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setFee",
      "discriminator": [
        18,
        154,
        24,
        18,
        237,
        214,
        19,
        80
      ],
      "accounts": [
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "newFee",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setInstantRedeemFee",
      "discriminator": [
        226,
        246,
        113,
        129,
        92,
        140,
        149,
        159
      ],
      "accounts": [
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "newFee",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setMinDepositAmount",
      "discriminator": [
        224,
        153,
        215,
        211,
        233,
        14,
        124,
        128
      ],
      "accounts": [
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "newValue",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setNavExpiryTime",
      "discriminator": [
        7,
        92,
        60,
        108,
        217,
        44,
        43,
        79
      ],
      "accounts": [
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "newValue",
          "type": "i64"
        }
      ]
    },
    {
      "name": "setOperator",
      "discriminator": [
        238,
        153,
        101,
        169,
        243,
        131,
        36,
        1
      ],
      "accounts": [
        {
          "name": "vaultAccess",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "docs": [
            "The current owner must authorize operator changes"
          ],
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "newOperator",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "setPendingOwner",
      "discriminator": [
        201,
        176,
        183,
        135,
        43,
        117,
        9,
        42
      ],
      "accounts": [
        {
          "name": "vaultAccess",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "docs": [
            "The current owner must authorize setting a pending owner"
          ],
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "newPendingOwner",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "setReserveRatioBps",
      "discriminator": [
        139,
        175,
        177,
        47,
        70,
        251,
        124,
        247
      ],
      "accounts": [
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "newReserveRatioBps",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setTreasury",
      "discriminator": [
        57,
        97,
        196,
        95,
        195,
        206,
        106,
        136
      ],
      "accounts": [
        {
          "name": "vaultAccess",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "docs": [
            "The current owner must authorize treasury changes"
          ],
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "newTreasury",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "unpause",
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
          "name": "vaultAccess",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vaultAccess"
          ]
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "updateTotalAssets",
      "discriminator": [
        6,
        20,
        35,
        156,
        191,
        81,
        100,
        153
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "sharePrice",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  97,
                  114,
                  101,
                  95,
                  112,
                  114,
                  105,
                  99,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "usdcAccounting",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  100,
                  99,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "ultraAccounting",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  108,
                  116,
                  114,
                  97,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  105,
                  110,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "vaultUltraAta",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram2022"
              },
              {
                "kind": "account",
                "path": "ultraMint"
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
          "name": "vaultCollateralAta",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "usdcMint"
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
          "address": "FQ9X5cF6oWmGcH6XAsdkPwBj2mKWRoTXU2zGS1gCgBaJ"
        },
        {
          "name": "epochExchangeRate"
        },
        {
          "name": "epochSnapshot",
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
                  115,
                  110,
                  97,
                  112,
                  115,
                  104,
                  111,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "epoch"
              }
            ]
          }
        },
        {
          "name": "ultraMint",
          "address": "9DRPPWYud8i6CaSsDsFESs1xyVr8dBCMtjPZji2xiZEa"
        },
        {
          "name": "usdcMint",
          "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        {
          "name": "trubillMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  117,
                  98,
                  105,
                  108,
                  108,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "treasury"
        },
        {
          "name": "treasuryTrubillAta",
          "docs": [
            "Treasury's TruBILL ATA receiving performance-fee shares."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "treasury"
              },
              {
                "kind": "account",
                "path": "tokenProgram2022"
              },
              {
                "kind": "account",
                "path": "trubillMint"
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
          "name": "tokenProgram2022"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
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
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "epoch",
          "type": "u64"
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
      "name": "epochSnapshot",
      "discriminator": [
        45,
        169,
        145,
        50,
        103,
        29,
        220,
        244
      ]
    },
    {
      "name": "redeemRequest",
      "discriminator": [
        103,
        82,
        139,
        51,
        199,
        234,
        111,
        115
      ]
    },
    {
      "name": "sharePrice",
      "discriminator": [
        51,
        204,
        16,
        192,
        128,
        246,
        17,
        161
      ]
    },
    {
      "name": "ultraAccounting",
      "discriminator": [
        195,
        30,
        8,
        146,
        152,
        215,
        123,
        60
      ]
    },
    {
      "name": "ultraMintRequest",
      "discriminator": [
        136,
        159,
        94,
        64,
        185,
        143,
        27,
        11
      ]
    },
    {
      "name": "ultraRedeemRequest",
      "discriminator": [
        149,
        117,
        125,
        140,
        247,
        108,
        44,
        97
      ]
    },
    {
      "name": "usdcAccounting",
      "discriminator": [
        42,
        35,
        203,
        219,
        116,
        6,
        84,
        186
      ]
    },
    {
      "name": "userRedeemState",
      "discriminator": [
        128,
        146,
        123,
        92,
        35,
        79,
        219,
        248
      ]
    },
    {
      "name": "userStatus",
      "discriminator": [
        200,
        3,
        116,
        140,
        42,
        35,
        77,
        2
      ]
    },
    {
      "name": "vaultAccess",
      "discriminator": [
        178,
        49,
        90,
        97,
        105,
        236,
        237,
        41
      ]
    },
    {
      "name": "vaultConfig",
      "discriminator": [
        99,
        86,
        43,
        216,
        184,
        102,
        119,
        77
      ]
    }
  ],
  "events": [
    {
      "name": "depositRefundReceived",
      "discriminator": [
        203,
        150,
        11,
        84,
        92,
        154,
        153,
        125
      ]
    },
    {
      "name": "deposited",
      "discriminator": [
        111,
        141,
        26,
        45,
        161,
        35,
        100,
        57
      ]
    },
    {
      "name": "feeSet",
      "discriminator": [
        113,
        74,
        216,
        72,
        193,
        87,
        4,
        232
      ]
    },
    {
      "name": "feeSharesMinted",
      "discriminator": [
        22,
        160,
        101,
        1,
        145,
        193,
        237,
        89
      ]
    },
    {
      "name": "instantRedeemFeeSet",
      "discriminator": [
        248,
        92,
        55,
        234,
        146,
        230,
        175,
        221
      ]
    },
    {
      "name": "instantRedeemed",
      "discriminator": [
        213,
        181,
        0,
        40,
        172,
        14,
        161,
        56
      ]
    },
    {
      "name": "minDepositAmountSet",
      "discriminator": [
        143,
        114,
        126,
        18,
        32,
        207,
        22,
        19
      ]
    },
    {
      "name": "navExpiryTimeSet",
      "discriminator": [
        170,
        97,
        195,
        217,
        21,
        193,
        4,
        158
      ]
    },
    {
      "name": "operatorSet",
      "discriminator": [
        187,
        242,
        164,
        221,
        208,
        246,
        180,
        178
      ]
    },
    {
      "name": "ownershipClaimed",
      "discriminator": [
        63,
        237,
        244,
        202,
        61,
        0,
        169,
        161
      ]
    },
    {
      "name": "pendingOwnerSet",
      "discriminator": [
        247,
        54,
        201,
        184,
        127,
        24,
        217,
        111
      ]
    },
    {
      "name": "redeemClaimed",
      "discriminator": [
        231,
        232,
        232,
        163,
        197,
        45,
        47,
        145
      ]
    },
    {
      "name": "redeemRefundReceived",
      "discriminator": [
        142,
        76,
        89,
        81,
        118,
        88,
        27,
        67
      ]
    },
    {
      "name": "redeemRequested",
      "discriminator": [
        5,
        130,
        67,
        249,
        243,
        168,
        11,
        88
      ]
    },
    {
      "name": "reserveRatioBpsSet",
      "discriminator": [
        117,
        98,
        118,
        228,
        119,
        6,
        89,
        145
      ]
    },
    {
      "name": "totalAssetsUpdated",
      "discriminator": [
        169,
        15,
        230,
        1,
        184,
        166,
        197,
        188
      ]
    },
    {
      "name": "treasurySet",
      "discriminator": [
        69,
        231,
        163,
        135,
        254,
        194,
        109,
        166
      ]
    },
    {
      "name": "ultraMintRequested",
      "discriminator": [
        158,
        246,
        148,
        134,
        239,
        49,
        6,
        13
      ]
    },
    {
      "name": "ultraReceived",
      "discriminator": [
        255,
        75,
        182,
        130,
        183,
        46,
        216,
        45
      ]
    },
    {
      "name": "ultraReconciled",
      "discriminator": [
        112,
        121,
        15,
        79,
        6,
        106,
        65,
        66
      ]
    },
    {
      "name": "ultraRedeemRequested",
      "discriminator": [
        3,
        167,
        37,
        9,
        12,
        208,
        146,
        148
      ]
    },
    {
      "name": "usdcReceived",
      "discriminator": [
        249,
        45,
        81,
        220,
        190,
        43,
        121,
        119
      ]
    },
    {
      "name": "usdcReconciled",
      "discriminator": [
        79,
        9,
        66,
        28,
        131,
        121,
        6,
        34
      ]
    },
    {
      "name": "vaultInitialized",
      "discriminator": [
        180,
        43,
        207,
        2,
        18,
        71,
        3,
        75
      ]
    },
    {
      "name": "vaultPaused",
      "discriminator": [
        198,
        157,
        22,
        151,
        68,
        100,
        162,
        35
      ]
    },
    {
      "name": "vaultUnpaused",
      "discriminator": [
        116,
        95,
        48,
        104,
        229,
        9,
        64,
        84
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidVaultPda",
      "msg": "invalid vault PDA state"
    },
    {
      "code": 6001,
      "name": "unauthorized",
      "msg": "unauthorized"
    },
    {
      "code": 6002,
      "name": "noPendingOwner",
      "msg": "no pending owner set"
    },
    {
      "code": 6003,
      "name": "pendingOwnerMismatch",
      "msg": "pending owner mismatch"
    },
    {
      "code": 6004,
      "name": "contractPaused",
      "msg": "contract is paused"
    },
    {
      "code": 6005,
      "name": "notPaused",
      "msg": "contract is not paused"
    },
    {
      "code": 6006,
      "name": "invalidMint",
      "msg": "invalid mint"
    },
    {
      "code": 6007,
      "name": "notWhitelisted",
      "msg": "user is not whitelisted"
    },
    {
      "code": 6008,
      "name": "invalidAssetController",
      "msg": "invalid asset controller"
    },
    {
      "code": 6009,
      "name": "insufficientFunds",
      "msg": "insufficient funds"
    },
    {
      "code": 6010,
      "name": "insufficientRedeemableUltra",
      "msg": "insufficient redeemable ultra"
    },
    {
      "code": 6011,
      "name": "belowMinimumDeposit",
      "msg": "below minimum deposit"
    },
    {
      "code": 6012,
      "name": "mathOverflow",
      "msg": "math overflow"
    },
    {
      "code": 6013,
      "name": "invalidExternalWallet",
      "msg": "invalid external wallet"
    },
    {
      "code": 6014,
      "name": "invalidDeltaManager",
      "msg": "invalid delta manager program"
    },
    {
      "code": 6015,
      "name": "invalidEpochExchangeRate",
      "msg": "invalid epoch exchange rate account"
    },
    {
      "code": 6016,
      "name": "invalidAccountData",
      "msg": "Invalid account data"
    },
    {
      "code": 6017,
      "name": "staleNav",
      "msg": "nav is stale"
    },
    {
      "code": 6018,
      "name": "invalidAssetControllerForEpoch",
      "msg": "invalid asset controller for epoch"
    },
    {
      "code": 6019,
      "name": "epochNotCompleted",
      "msg": "no epoch has completed yet"
    },
    {
      "code": 6020,
      "name": "navNotAvailable",
      "msg": "NAV not available for the completed epoch"
    },
    {
      "code": 6021,
      "name": "totalAssetsOverflow",
      "msg": "total assets calculation overflow"
    },
    {
      "code": 6022,
      "name": "vaultInsolvent",
      "msg": "vault is insolvent: supply > 0 but total assets = 0"
    },
    {
      "code": 6023,
      "name": "invalidReserveRatioBps",
      "msg": "reserve ratio bps must be <= 10000"
    },
    {
      "code": 6024,
      "name": "zeroSharesToMint",
      "msg": "shares to mint is zero"
    },
    {
      "code": 6025,
      "name": "invalidRedeemAmount",
      "msg": "redeem amount must be greater than zero"
    },
    {
      "code": 6026,
      "name": "invalidFee",
      "msg": "fee exceeds maximum (10000 bps)"
    },
    {
      "code": 6027,
      "name": "invalidTreasuryAddress",
      "msg": "invalid treasury address"
    },
    {
      "code": 6028,
      "name": "epochOutOfOrder",
      "msg": "epoch snapshots must be created in ascending order"
    },
    {
      "code": 6029,
      "name": "invalidEpoch",
      "msg": "invalid epoch for request"
    },
    {
      "code": 6030,
      "name": "invalidUltraAmount",
      "msg": "invalid ultra amount"
    },
    {
      "code": 6031,
      "name": "snapshotEpochMismatch",
      "msg": "the provided epoch must match the latest snapshot epoch"
    },
    {
      "code": 6032,
      "name": "invalidNavExpiryTime",
      "msg": "nav expiry time must be > 0 and <= 7 days"
    },
    {
      "code": 6033,
      "name": "insufficientUsdcReceived",
      "msg": "insufficient USDC received"
    },
    {
      "code": 6034,
      "name": "insufficientUltraReceived",
      "msg": "insufficient ULTRA received"
    },
    {
      "code": 6035,
      "name": "withdrawalNotClaimable",
      "msg": "withdrawal request not claimable"
    },
    {
      "code": 6036,
      "name": "tooMuchUsdcSentToDm",
      "msg": "too much usdc currently sent to dm. Please withdraw when ultra has been received."
    },
    {
      "code": 6037,
      "name": "invalidRedeemRequest",
      "msg": "invalid redeem request account"
    },
    {
      "code": 6038,
      "name": "ultraBalanceMismatch",
      "msg": "ULTRA ATA balance is below expected bookkeeping value (possible clawback)"
    },
    {
      "code": 6039,
      "name": "noDiscrepancyDetected",
      "msg": "no discrepancy detected, nothing to reconcile"
    },
    {
      "code": 6040,
      "name": "reconcileNotAllowed",
      "msg": "reconciliation not allowed while USDC or ULTRA is sent to dm"
    },
    {
      "code": 6041,
      "name": "invalidPubkey",
      "msg": "pubkey cannot be the default (system program) address"
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
            "type": "pubkey"
          },
          {
            "name": "kycController",
            "type": "pubkey"
          },
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "deltaMint",
            "type": "pubkey"
          },
          {
            "name": "collateralVault",
            "type": "pubkey"
          },
          {
            "name": "deltaVault",
            "type": "pubkey"
          },
          {
            "name": "clawbackTokenRecipient",
            "type": "pubkey"
          },
          {
            "name": "collateralMint",
            "type": "pubkey"
          },
          {
            "name": "feeRecipient",
            "type": "pubkey"
          },
          {
            "name": "currentMintAmount",
            "type": "u64"
          },
          {
            "name": "currentEpoch",
            "type": "u64"
          },
          {
            "name": "epochDuration",
            "type": "u64"
          },
          {
            "name": "currentEpochStartTimestamp",
            "type": "u64"
          },
          {
            "name": "contractStartTimestamp",
            "type": "u64"
          },
          {
            "name": "lastSetMintExchangeRate",
            "type": "u64"
          },
          {
            "name": "currentRedeemAmount",
            "type": "u64"
          },
          {
            "name": "minimumDepositAmount",
            "type": "u64"
          },
          {
            "name": "mintFee",
            "type": "u32"
          },
          {
            "name": "exchangeRateDeltaLimit",
            "type": "u32"
          },
          {
            "name": "minimumRedeemAmount",
            "type": "u64"
          },
          {
            "name": "minimumRedeemAmountFiat",
            "type": "u64"
          },
          {
            "name": "mintLimit",
            "type": "u64"
          },
          {
            "name": "redeemLimit",
            "type": "u64"
          },
          {
            "name": "base",
            "type": "pubkey"
          },
          {
            "name": "flags",
            "type": "u8"
          },
          {
            "name": "bump",
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
      "name": "depositRefundReceived",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "usdcRefunded",
            "type": "u64"
          },
          {
            "name": "dmFeeLost",
            "type": "u64"
          },
          {
            "name": "remainingUsdcSentForMinting",
            "type": "u64"
          },
          {
            "name": "pendingDeposits",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "deposited",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "depositAmount",
            "type": "u64"
          },
          {
            "name": "amountToReserves",
            "type": "u64"
          },
          {
            "name": "amountToUltra",
            "type": "u64"
          },
          {
            "name": "trubillMinted",
            "type": "u64"
          },
          {
            "name": "pendingDeposits",
            "type": "u64"
          },
          {
            "name": "usdcReserve",
            "type": "u64"
          },
          {
            "name": "totalAssets",
            "type": "u64"
          },
          {
            "name": "totalShares",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "epochSnapshot",
      "docs": [
        "Immutable snapshot of vault total assets at a completed Delta Manager epoch.",
        "One PDA per epoch, created by `update_total_assets`, never updated."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "nav",
            "type": "u64"
          },
          {
            "name": "ultraHeld",
            "type": "u64"
          },
          {
            "name": "usdcHeld",
            "type": "u64"
          },
          {
            "name": "usdcSentForMinting",
            "type": "u64"
          },
          {
            "name": "usdcOwedToUsers",
            "type": "u64"
          },
          {
            "name": "ultraSentForReserveToUsers",
            "type": "u64"
          },
          {
            "name": "totalPendingUltraRedemptions",
            "type": "u64"
          },
          {
            "name": "totalAssets",
            "type": "u64"
          },
          {
            "name": "totalShares",
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
      "name": "feeSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oldFee",
            "type": "u16"
          },
          {
            "name": "newFee",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "feeSharesMinted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feeShares",
            "type": "u64"
          },
          {
            "name": "totalAssets",
            "type": "u64"
          },
          {
            "name": "preFeeSupply",
            "type": "u64"
          },
          {
            "name": "postFeeSupply",
            "type": "u64"
          },
          {
            "name": "nav",
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
      "name": "instantRedeemFeeSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oldFee",
            "type": "u16"
          },
          {
            "name": "newFee",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "instantRedeemed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "trubillBurned",
            "type": "u64"
          },
          {
            "name": "usdcReceived",
            "type": "u64"
          },
          {
            "name": "usdcFee",
            "type": "u64"
          },
          {
            "name": "totalAssets",
            "type": "u64"
          },
          {
            "name": "ultraAmountToRedeem",
            "type": "u64"
          },
          {
            "name": "sharePriceAtRedeem",
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
      "name": "minDepositAmountSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oldValue",
            "type": "u64"
          },
          {
            "name": "newValue",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "navExpiryTimeSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oldValue",
            "type": "i64"
          },
          {
            "name": "newValue",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "operatorSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newOperator",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "ownershipClaimed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newOwner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "pendingOwnerSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "pendingOwner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "redeemClaimed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "usdcAmount",
            "type": "u64"
          },
          {
            "name": "redeemRequestId",
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
      "name": "redeemRefundReceived",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "ultraRefunded",
            "type": "u64"
          },
          {
            "name": "remainingUltraSentForRedemption",
            "type": "u64"
          },
          {
            "name": "remainingUltraSentForReserve",
            "type": "u64"
          },
          {
            "name": "pendingRedemptions",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redeemRequest",
      "docs": [
        "One PDA per redeem request, created by `request_redeem`."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "trubillBurned",
            "type": "u64"
          },
          {
            "name": "usdcOwed",
            "type": "u64"
          },
          {
            "name": "ultraToRedeem",
            "docs": [
              "Proportional ULTRA to redeem from DM, calculated at request time."
            ],
            "type": "u64"
          },
          {
            "name": "redeemRequestId",
            "type": "u64"
          },
          {
            "name": "sharePriceAtRedeem",
            "type": "u64"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "earliestRedeemEpoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redeemRequested",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "trubillBurned",
            "type": "u64"
          },
          {
            "name": "usdcOwed",
            "type": "u64"
          },
          {
            "name": "ultraToRedeem",
            "type": "u64"
          },
          {
            "name": "redeemRequestId",
            "type": "u64"
          },
          {
            "name": "sharePriceAtRedeem",
            "type": "u64"
          },
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "earliestRedeemEpoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "reserveRatioBpsSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oldReserveRatioBps",
            "type": "u16"
          },
          {
            "name": "newReserveRatioBps",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "sharePrice",
      "docs": [
        "Live TruBILL share price exposed on a fixed-address PDA (seeds `[b\"share_price\"]`) so an external",
        "price feed (e.g. a Switchboard `AnchorFetchTask`) can read the current TruBILL/USDC price without",
        "locating the per-epoch snapshot PDA whose address rotates each epoch."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "docs": [
              "Live TruBILL share price (USDC per TruBILL, scaled by `SCALE_FACTOR`), written each",
              "`update_total_assets` as `total_assets / total_shares`. Exposed on this fixed-address",
              "account so it's readable without the rotating per-epoch snapshot PDA."
            ],
            "type": "u64"
          },
          {
            "name": "lastUpdateEpoch",
            "docs": [
              "DM epoch of the last write. `u64::MAX` until the first `update_total_assets` runs.",
              "Staleness check: a consumer compares this against the latest DM epoch."
            ],
            "type": "u64"
          },
          {
            "name": "padding",
            "docs": [
              "Reserved space for future fields."
            ],
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          }
        ]
      }
    },
    {
      "name": "totalAssetsUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "nav",
            "type": "u64"
          },
          {
            "name": "ultraHeld",
            "type": "u64"
          },
          {
            "name": "usdcHeld",
            "type": "u64"
          },
          {
            "name": "usdcSentForMinting",
            "type": "u64"
          },
          {
            "name": "usdcOwedToUsers",
            "type": "u64"
          },
          {
            "name": "totalAssets",
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "treasurySet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newTreasury",
            "type": "pubkey"
          },
          {
            "name": "oldTreasury",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "ultraAccounting",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalSettled",
            "docs": [
              "Cumulative ULTRA acknowledged by the vault.",
              "Increased by `receive_ultra` (DM minted ULTRA); decreased by `receive_usdc` (DM settled a redemption).",
              "Adjusted by `reconcile_ultra` (admin escape hatch for clawback or unsolicited transfers).",
              "Key invariant: `total_settled - sent_for_redemption` = expected vault ULTRA ATA balance."
            ],
            "type": "u64"
          },
          {
            "name": "pendingRedemptions",
            "docs": [
              "ULTRA for which TruBILL shares have been burned (via `request_redeem`) but not yet sent to DM.",
              "Queued here until the operator calls `request_ultra_redemption` which zeroes this field and moves",
              "the amount into `sent_for_redemption`. This is the **user-destined** portion of the redemption queue."
            ],
            "type": "u64"
          },
          {
            "name": "pendingRedemptionsForReserve",
            "docs": [
              "ULTRA earmarked for DM redemption to **replenish the USDC reserve**, not to pay users directly.",
              "Created by `instant_redeem` (which pays the user USDC from reserves immediately, then queues this",
              "ULTRA to get that USDC back). Drained by `request_ultra_redemption`. Can be partially reassigned to",
              "users during `request_redeem` when a slow-path redeemer claims their pro-rata share."
            ],
            "type": "u64"
          },
          {
            "name": "sentForRedemption",
            "docs": [
              "ULTRA physically sent to DM for redemption, awaiting USDC return.",
              "Incremented by `request_ultra_redemption` and decremented by `receive_usdc` (settlement) or",
              "`receive_redeem_refund` (DM rejected). This is the sum of the user and reserve destined portions.",
              "",
              "Hierarchy: sent_for_redemption ⊃ sent_for_reserve ⊃ sent_for_reserve_to_users."
            ],
            "type": "u64"
          },
          {
            "name": "sentForReserve",
            "docs": [
              "Subset of `sent_for_redemption`: the portion that was sent to DM specifically to replenish the USDC",
              "reserve (originated from the `instant_redeem` flow).",
              "",
              "When DM returns USDC via `receive_usdc`, this field tells how to split the proceeds:",
              "the fraction corresponding to `sent_for_reserve` goes back into `UsdcAccounting.reserve`,",
              "while the remainder goes to `UsdcAccounting.owed_to_users`.",
              "It can also be reduced during `request_redeem` when a slow-path redeemer claims their pro-rata share",
              "of the reserve's in-transit ULTRA — the claimed amount moves to `sent_for_reserve_to_users`."
            ],
            "type": "u64"
          },
          {
            "name": "sentForReserveToUsers",
            "docs": [
              "Subset of `sent_for_reserve`: the reserve-destined ULTRA at DM that has since been claimed by users.",
              "",
              "This happens when a user calls `request_redeem` while reserve ULTRA is already in transit to DM then",
              "the user is entitled to a pro-rata share of all vault assets, including ULTRA at DM, so a portion of",
              "`sent_for_reserve` is reassigned to the user.",
              "When `receive_usdc` settles the batch, the USDC proceeds are routed to `UsdcAccounting.owed_to_users`",
              "(for the user to claim) instead of `UsdcAccounting.reserve`."
            ],
            "type": "u64"
          },
          {
            "name": "lastRedemptionEpoch",
            "docs": [
              "DM epoch of the last `request_ultra_redemption`.",
              "Enforces one redemption per epoch and helps `request_redeem` compute `earliest_redeem_epoch` for new",
              "redemption requests — if a user's redemption requires ULTRA to be sent to DM, they must wait until",
              "at least this epoch (or the next) has been settled before they can claim their USDC."
            ],
            "type": "u64"
          },
          {
            "name": "padding",
            "docs": [
              "Reserved space for future fields."
            ],
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ultraMintRequest",
      "docs": [
        "ULTRA mint request receipt.",
        "One PDA per mint request, created by `request_ultra_mint`, updated by `receive_ultra`."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "usdcSent",
            "type": "u64"
          },
          {
            "name": "dmFee",
            "type": "u64"
          },
          {
            "name": "expectedUltra",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ultraMintRequested",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "usdcDeposited",
            "type": "u64"
          },
          {
            "name": "expectedUltraAfterFee",
            "type": "u64"
          },
          {
            "name": "expectedDmFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ultraReceived",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "ultraReceived",
            "type": "u64"
          },
          {
            "name": "remainingUsdcSentForMinting",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ultraReconciled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "expectedUltraBalance",
            "type": "u64"
          },
          {
            "name": "newTotalSettledUltra",
            "type": "u64"
          },
          {
            "name": "actualUltraBalance",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ultraRedeemRequest",
      "docs": [
        "Tracks an ULTRA→USDC redemption batch sent to Delta Manager.",
        "One PDA per `request_ultra_redemption` call, settled in order by `receive_usdc`."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "ultraAmountForUsers",
            "type": "u64"
          },
          {
            "name": "ultraAmountForReserve",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ultraRedeemRequested",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "ultraRedeemed",
            "type": "u64"
          },
          {
            "name": "fullWithdrawal",
            "type": "bool"
          },
          {
            "name": "ultraAmountForUsers",
            "type": "u64"
          },
          {
            "name": "ultraAmountForReserve",
            "type": "u64"
          },
          {
            "name": "expectedUsdc",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "usdcAccounting",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reserve",
            "docs": [
              "USDC held in the vault's ATA that is immediately available for instant redemptions.",
              "",
              "Grows when users deposit and when DM returns USDC earmarked for reserve replenishment via",
              "`receive_usdc`. Shrinks when users call `instant_redeem` (USDC is paid out immediately) or when",
              "`request_redeem` draws down a slow-path redeemer's pro-rata share of the reserve."
            ],
            "type": "u64"
          },
          {
            "name": "pendingDeposits",
            "docs": [
              "USDC deposited by users but not yet swept to DM for ULTRA conversion.",
              "",
              "Accumulated by `deposit`; zeroed by `request_ultra_mint` when the operator sends the batch to DM.",
              "Can also be drawn down by `request_redeem` to fulfil redemptions without a DM round-trip."
            ],
            "type": "u64"
          },
          {
            "name": "sentForMinting",
            "docs": [
              "USDC that has been transferred to DM via `request_ultra_mint` and is awaiting return as minted ULTRA.",
              "Counted as vault assets in `update_total_assets` because the value still belongs to the vault.",
              "Decremented by `receive_ultra` (success) or `receive_deposit_refund` (DM rejected the mint)."
            ],
            "type": "u64"
          },
          {
            "name": "owedToUsers",
            "docs": [
              "USDC committed to slow-path redeemers but not yet paid out via `claim_withdrawal`. Subtracted from",
              "`total_assets` in `update_total_assets` to keep the TruBILL share price balanced after shares",
              "are burned in `request_redeem`. Decreased when a user calls `claim_withdrawal` to collect their USDC.",
              "",
              "Sum of `unclaimed_redeems` (USDC owed to open `RedeemRequest` PDAs) plus NAV-difference surplus accrued",
              "when DM settled above the NAV credited at `request_redeem` time.",
              "The surplus is owner-sweepable via `reconcile_usdc`; `unclaimed_redeems` is the floor."
            ],
            "type": "u64"
          },
          {
            "name": "unclaimedRedeems",
            "docs": [
              "Sum of `RedeemRequest.usdc_owed` across all open redeem requests. Subset of `owed_to_users`",
              "backing real user claims; floor in `reconcile_usdc` so the owner can sweep only NAV surplus."
            ],
            "type": "u64"
          },
          {
            "name": "lastSettlementEpoch",
            "docs": [
              "Delta Manager epoch of the last settled ULTRA -> USDC redemption (set by `receive_usdc`).",
              "Used by `claim_withdrawal` to decide whether a user's redeem batch has been fulfilled: the user can",
              "claim only when `last_settlement_epoch >= earliest_redeem_epoch` on their `RedeemRequest`."
            ],
            "type": "u64"
          },
          {
            "name": "padding",
            "docs": [
              "Reserved space for future fields."
            ],
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          }
        ]
      }
    },
    {
      "name": "usdcReceived",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "epoch",
            "type": "u64"
          },
          {
            "name": "usdcReceived",
            "type": "u64"
          },
          {
            "name": "usdcForUsers",
            "type": "u64"
          },
          {
            "name": "usdcForReserve",
            "type": "u64"
          },
          {
            "name": "remainingUltraSentForRedemption",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "usdcReconciled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountedUsdc",
            "type": "u64"
          },
          {
            "name": "unaccountedUsdc",
            "type": "u64"
          },
          {
            "name": "pendingWithdrawalSurplus",
            "type": "u64"
          },
          {
            "name": "reserveIncrease",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userRedeemState",
      "docs": [
        "Per-user counter for `RedeemRequest` PDA derivation.",
        "Seeded by `[USER_REDEEM_STATE, user.key()]`, created on first `request_redeem` via `init_if_needed`.",
        "Each user's redeem requests are numbered sequentially: 0, 1, 2, …"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nextRedeemRequestId",
            "type": "u64"
          },
          {
            "name": "padding",
            "docs": [
              "Reserved space for future fields."
            ],
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userStatus",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "whitelistUserStatus"
              }
            }
          }
        ]
      }
    },
    {
      "name": "vaultAccess",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "docs": [
              "Admin with full authority over the vault"
            ],
            "type": "pubkey"
          },
          {
            "name": "operator",
            "type": "pubkey"
          },
          {
            "name": "pendingOwner",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "vaultConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vaultAuthorityBump",
            "docs": [
              "Bump seed for the vault authority PDA"
            ],
            "type": "u8"
          },
          {
            "name": "isPaused",
            "docs": [
              "When `true`, all user-facing and operator instructions reject with `ContractPaused`"
            ],
            "type": "bool"
          },
          {
            "name": "minDepositAmount",
            "docs": [
              "Minimum USDC a user must deposit in a single `deposit` call."
            ],
            "type": "u64"
          },
          {
            "name": "instantRedeemFee",
            "docs": [
              "Fee deducted from the USDC payout when a user calls `instant_redeem` (basis points, 0..=10_000).",
              "Set to 0 to disable fee collection."
            ],
            "type": "u16"
          },
          {
            "name": "treasury",
            "docs": [
              "Address that receives fee TruBILL shares and instant-redeem USDC fees."
            ],
            "type": "pubkey"
          },
          {
            "name": "lastSnapshotEpoch",
            "docs": [
              "The most recent DM epoch for which an `EpochSnapshot` has been created via `update_total_assets`.",
              "This enforces two things:",
              "- monotonic ordering: each new snapshot must be for a strictly higher epoch.",
              "- NAV freshness: `deposit`, `request_redeem`, and `instant_redeem` require the caller to reference",
              "this exact epoch preventing users from trading against a stale NAV.",
              "Initialised to `u64::MAX` as a sentinel value."
            ],
            "type": "u64"
          },
          {
            "name": "navExpiryTime",
            "docs": [
              "Maximum age (seconds) of an epoch snapshot before deposits/redeems.",
              "If the current time exceeds `snapshot.timestamp + nav_expiry_time`, the snapshot is considered stale.",
              "Configurable by the owner to accommodate non-daily NAV update schedules (e.g. 5 out of 7 days)."
            ],
            "type": "i64"
          },
          {
            "name": "feeBps",
            "docs": [
              "Fee rate applied to vault appreciation (basis points, 0..=10_000).",
              "Set to 0 to disable fee collection."
            ],
            "type": "u16"
          },
          {
            "name": "lastFeeSharePrice",
            "docs": [
              "TruBILL share price at the last fee checkpoint (scaled by `SCALE_FACTOR`). Updated each enabled",
              "epoch and used as the baseline for the next fee calculation. Only advances when the new share price",
              "exceeds the previous checkpoint. Zero means no baseline has been established yet."
            ],
            "type": "u64"
          },
          {
            "name": "reserveRatioBps",
            "docs": [
              "Percentage of each deposit kept as an instant-redeem USDC buffer (basis points, 0..=10_000)."
            ],
            "type": "u16"
          },
          {
            "name": "padding",
            "docs": [
              "Reserved space for future fields."
            ],
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          }
        ]
      }
    },
    {
      "name": "vaultInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "operator",
            "type": "pubkey"
          },
          {
            "name": "trubillMint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "vaultPaused",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "vaultUnpaused",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "whitelistUserStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "none"
          },
          {
            "name": "whitelisted"
          },
          {
            "name": "blacklisted"
          }
        ]
      }
    }
  ]
};
