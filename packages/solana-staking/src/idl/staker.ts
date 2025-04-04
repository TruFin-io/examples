/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/staker.json`.
 */
export type Staker = {
  "address": "6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM",
  "metadata": {
    "name": "staker",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addAgent",
      "discriminator": [
        214,
        206,
        14,
        110,
        178,
        131,
        218,
        45
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "newAgentAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  103,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "agent"
              }
            ]
          }
        },
        {
          "name": "agentAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  103,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
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
          "name": "agent",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "addUserToBlacklist",
      "discriminator": [
        61,
        245,
        43,
        161,
        144,
        46,
        122,
        228
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "userWhitelistAccount",
          "writable": true,
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
                "kind": "arg",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "agentAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  103,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
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
          "name": "user",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "addUserToWhitelist",
      "discriminator": [
        244,
        177,
        124,
        12,
        22,
        50,
        139,
        152
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "userWhitelistAccount",
          "writable": true,
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
                "kind": "arg",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "agentAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  103,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
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
          "name": "user",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "addValidator",
      "discriminator": [
        250,
        113,
        53,
        54,
        141,
        117,
        215,
        185
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "access"
          ]
        },
        {
          "name": "access",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
          "name": "stakePool",
          "writable": true
        },
        {
          "name": "stakerAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "reserveStake",
          "writable": true
        },
        {
          "name": "withdrawAuthority"
        },
        {
          "name": "validatorList",
          "writable": true
        },
        {
          "name": "validatorStakeAccount",
          "writable": true
        },
        {
          "name": "validatorVoteAccount",
          "writable": true
        },
        {
          "name": "rentSysvar",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "clockSysvar",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "stakeHistorySysvar",
          "address": "SysvarStakeHistory1111111111111111111111111"
        },
        {
          "name": "stakeConfigSysvar",
          "address": "StakeConfig11111111111111111111111111111111"
        },
        {
          "name": "stakeProgram",
          "address": "Stake11111111111111111111111111111111111111"
        },
        {
          "name": "stakePoolProgram",
          "address": "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy"
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
          "name": "validatorSeed",
          "type": "u32"
        }
      ]
    },
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
          "name": "pendingOwner",
          "writable": true,
          "signer": true
        },
        {
          "name": "access",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
      "name": "clearUserStatus",
      "discriminator": [
        241,
        8,
        63,
        62,
        144,
        246,
        193,
        9
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "userWhitelistAccount",
          "writable": true,
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
                "kind": "arg",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "agentAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  103,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
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
          "name": "user",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "decreaseValidatorStake",
      "discriminator": [
        145,
        203,
        107,
        123,
        71,
        63,
        35,
        225
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "stakeManager",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "stakePool",
          "writable": true
        },
        {
          "name": "stakerAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "withdrawAuthority"
        },
        {
          "name": "validatorList",
          "writable": true
        },
        {
          "name": "reserveStake",
          "docs": [
            "CHECK :Stake pool reserve stake"
          ],
          "writable": true
        },
        {
          "name": "validatorStakeAccount",
          "writable": true
        },
        {
          "name": "ephemeralStakeAccount",
          "writable": true
        },
        {
          "name": "transientStakeAccount",
          "writable": true
        },
        {
          "name": "validatorVoteAccount",
          "writable": true
        },
        {
          "name": "clockSysvar",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "stakeHistorySysvar",
          "address": "SysvarStakeHistory1111111111111111111111111"
        },
        {
          "name": "stakeProgram",
          "address": "Stake11111111111111111111111111111111111111"
        },
        {
          "name": "stakePoolProgram",
          "address": "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy"
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
          "name": "amount",
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
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userWhitelistAccount",
          "writable": true,
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
            ]
          }
        },
        {
          "name": "access",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
          "name": "stakePool",
          "writable": true
        },
        {
          "name": "depositAuthority",
          "writable": true
        },
        {
          "name": "withdrawAuthority",
          "writable": true
        },
        {
          "name": "poolReserve",
          "writable": true
        },
        {
          "name": "userPoolTokenAccount",
          "writable": true
        },
        {
          "name": "feeTokenAccount",
          "writable": true
        },
        {
          "name": "poolMint",
          "writable": true
        },
        {
          "name": "referralFeeTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "stakePoolProgram",
          "address": "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy"
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
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositToSpecificValidator",
      "discriminator": [
        147,
        165,
        155,
        96,
        40,
        204,
        154,
        167
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userWhitelistAccount",
          "writable": true,
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
            ]
          }
        },
        {
          "name": "access",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
          "name": "stakerAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "stakePool",
          "writable": true
        },
        {
          "name": "depositAuthority",
          "writable": true
        },
        {
          "name": "withdrawAuthority",
          "writable": true
        },
        {
          "name": "poolReserve",
          "writable": true
        },
        {
          "name": "userPoolTokenAccount",
          "writable": true
        },
        {
          "name": "feeTokenAccount",
          "writable": true
        },
        {
          "name": "poolMint",
          "writable": true
        },
        {
          "name": "referralFeeTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "validatorList",
          "writable": true
        },
        {
          "name": "ephemeralStakeAccount",
          "writable": true
        },
        {
          "name": "transientStakeAccount",
          "writable": true
        },
        {
          "name": "validatorStakeAccount",
          "writable": true
        },
        {
          "name": "validatorVoteAccount",
          "writable": true
        },
        {
          "name": "clockSysvar",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "stakeHistorySysvar",
          "address": "SysvarStakeHistory1111111111111111111111111"
        },
        {
          "name": "stakeConfigSysvar",
          "address": "StakeConfig11111111111111111111111111111111"
        },
        {
          "name": "stakeProgram",
          "address": "Stake11111111111111111111111111111111111111"
        },
        {
          "name": "stakePoolProgram",
          "address": "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy"
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
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "increaseValidatorStake",
      "discriminator": [
        5,
        121,
        50,
        243,
        14,
        159,
        97,
        6
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "stakeManager",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "stakePool",
          "writable": true
        },
        {
          "name": "stakerAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "withdrawAuthority"
        },
        {
          "name": "validatorList",
          "writable": true
        },
        {
          "name": "reserveStake",
          "writable": true
        },
        {
          "name": "ephemeralStakeAccount",
          "writable": true
        },
        {
          "name": "transientStakeAccount",
          "writable": true
        },
        {
          "name": "validatorStakeAccount",
          "writable": true
        },
        {
          "name": "validatorVoteAccount",
          "writable": true
        },
        {
          "name": "clockSysvar",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "stakeHistorySysvar",
          "address": "SysvarStakeHistory1111111111111111111111111"
        },
        {
          "name": "stakeConfigSysvar",
          "address": "StakeConfig11111111111111111111111111111111"
        },
        {
          "name": "stakeProgram",
          "address": "Stake11111111111111111111111111111111111111"
        },
        {
          "name": "stakePoolProgram",
          "address": "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy"
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
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeStaker",
      "discriminator": [
        131,
        155,
        29,
        159,
        5,
        65,
        156,
        247
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "access",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
          "name": "ownerAgentAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  103,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "ownerInfo"
              }
            ]
          }
        },
        {
          "name": "ownerInfo"
        },
        {
          "name": "stakeManager",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "stakeManagerInfo"
              }
            ]
          }
        },
        {
          "name": "stakeManagerInfo"
        },
        {
          "name": "tokenProgram",
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
      "args": []
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
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "access"
          ]
        },
        {
          "name": "access",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
      "name": "removeAgent",
      "discriminator": [
        126,
        25,
        90,
        199,
        104,
        237,
        225,
        130
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "agentAccountToRemove",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  103,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "agent"
              }
            ]
          }
        },
        {
          "name": "agentAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  103,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "access",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
          "name": "agent",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "removeValidator",
      "discriminator": [
        25,
        96,
        211,
        155,
        161,
        14,
        168,
        188
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "access"
          ]
        },
        {
          "name": "access",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
          "name": "stakePool",
          "writable": true
        },
        {
          "name": "stakerAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  114
                ]
              }
            ]
          }
        },
        {
          "name": "withdrawAuthority"
        },
        {
          "name": "validatorList",
          "writable": true
        },
        {
          "name": "validatorStakeAccount",
          "writable": true
        },
        {
          "name": "transientStakeAccount",
          "writable": true
        },
        {
          "name": "clockSysvar",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "stakeProgram",
          "address": "Stake11111111111111111111111111111111111111"
        },
        {
          "name": "stakePoolProgram",
          "address": "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy"
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
      "args": []
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
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "access"
          ]
        },
        {
          "name": "access",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
          "name": "pendingOwner",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "setStakeManager",
      "discriminator": [
        10,
        78,
        131,
        82,
        137,
        114,
        239,
        201
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "access"
          ]
        },
        {
          "name": "access",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
          "name": "newStakeManagerPda",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "newStakeManager"
              }
            ]
          }
        },
        {
          "name": "newStakeManager"
        },
        {
          "name": "oldStakeManagerPda",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "oldStakeManager"
              }
            ]
          }
        },
        {
          "name": "oldStakeManager"
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
      "args": []
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
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "access"
          ]
        },
        {
          "name": "access",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
    }
  ],
  "accounts": [
    {
      "name": "access",
      "discriminator": [
        117,
        154,
        108,
        210,
        202,
        83,
        96,
        222
      ]
    },
    {
      "name": "agent",
      "discriminator": [
        47,
        166,
        112,
        147,
        155,
        197,
        86,
        7
      ]
    },
    {
      "name": "stakeManager",
      "discriminator": [
        205,
        143,
        54,
        235,
        240,
        28,
        104,
        211
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
    }
  ],
  "events": [
    {
      "name": "agentAdded",
      "discriminator": [
        6,
        81,
        249,
        137,
        200,
        47,
        78,
        79
      ]
    },
    {
      "name": "agentRemoved",
      "discriminator": [
        174,
        133,
        31,
        207,
        113,
        53,
        217,
        233
      ]
    },
    {
      "name": "claimedOwnership",
      "discriminator": [
        245,
        232,
        202,
        68,
        5,
        103,
        247,
        121
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
      "name": "depositedToSpecificValidator",
      "discriminator": [
        168,
        242,
        79,
        64,
        126,
        141,
        241,
        60
      ]
    },
    {
      "name": "setPendingOwner",
      "discriminator": [
        12,
        4,
        239,
        58,
        59,
        245,
        226,
        83
      ]
    },
    {
      "name": "stakeManagerSet",
      "discriminator": [
        185,
        181,
        38,
        75,
        80,
        229,
        255,
        225
      ]
    },
    {
      "name": "stakerInitialized",
      "discriminator": [
        68,
        182,
        206,
        69,
        123,
        190,
        76,
        198
      ]
    },
    {
      "name": "stakerPaused",
      "discriminator": [
        23,
        81,
        157,
        2,
        7,
        174,
        120,
        247
      ]
    },
    {
      "name": "stakerUnpaused",
      "discriminator": [
        37,
        64,
        167,
        198,
        75,
        112,
        94,
        34
      ]
    },
    {
      "name": "validatorAdded",
      "discriminator": [
        67,
        26,
        43,
        25,
        58,
        219,
        99,
        48
      ]
    },
    {
      "name": "validatorRemoved",
      "discriminator": [
        133,
        140,
        80,
        83,
        7,
        209,
        70,
        130
      ]
    },
    {
      "name": "validatorStakeDecreased",
      "discriminator": [
        171,
        235,
        136,
        211,
        40,
        92,
        111,
        182
      ]
    },
    {
      "name": "validatorStakeIncreased",
      "discriminator": [
        109,
        21,
        234,
        165,
        126,
        52,
        21,
        27
      ]
    },
    {
      "name": "whitelistingStatusChanged",
      "discriminator": [
        1,
        183,
        149,
        241,
        34,
        56,
        52,
        128
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "contractPaused",
      "msg": "Contract is paused"
    },
    {
      "code": 6001,
      "name": "notAuthorized",
      "msg": "Only the owner can call this method"
    },
    {
      "code": 6002,
      "name": "notPaused",
      "msg": "Contract is not paused"
    },
    {
      "code": 6003,
      "name": "pendingOwnerNotSet",
      "msg": "No pending owner set"
    },
    {
      "code": 6004,
      "name": "notPendingOwner",
      "msg": "Only the pending owner can call this method"
    },
    {
      "code": 6005,
      "name": "cannotRemoveOwner",
      "msg": "Owner cannot be removed"
    },
    {
      "code": 6006,
      "name": "alreadyWhitelisted",
      "msg": "User is already whitelisted"
    },
    {
      "code": 6007,
      "name": "alreadyBlacklisted",
      "msg": "User is already blacklisted"
    },
    {
      "code": 6008,
      "name": "alreadyCleared",
      "msg": "User status is already cleared"
    },
    {
      "code": 6009,
      "name": "userNotWhitelisted",
      "msg": "User is not whitelisted"
    }
  ],
  "types": [
    {
      "name": "access",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "stakeManager",
            "type": "pubkey"
          },
          {
            "name": "isPaused",
            "type": "bool"
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
      "name": "agent",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "agentAdded",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newAgent",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "agentRemoved",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "removedAgent",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "claimedOwnership",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oldOwner",
            "type": "pubkey"
          },
          {
            "name": "newOwner",
            "type": "pubkey"
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
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "depositedToSpecificValidator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "validator",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "setPendingOwner",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentOwner",
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
      "name": "stakeManager",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "stakeManagerSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oldStakeManager",
            "type": "pubkey"
          },
          {
            "name": "newStakeManager",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "stakerInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "stakeManager",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "stakerPaused",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "stakerUnpaused",
      "type": {
        "kind": "struct",
        "fields": []
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
      "name": "validatorAdded",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "validator",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "validatorRemoved",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeAccount",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "validatorStakeDecreased",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "validator",
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
      "name": "validatorStakeIncreased",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "validator",
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
    },
    {
      "name": "whitelistingStatusChanged",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "oldStatus",
            "type": {
              "defined": {
                "name": "whitelistUserStatus"
              }
            }
          },
          {
            "name": "newStatus",
            "type": {
              "defined": {
                "name": "whitelistUserStatus"
              }
            }
          }
        ]
      }
    }
  ]
};
