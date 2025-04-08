# Mainnet Addresses

This document lists the Solana addresses used in the TruFin staking system.

## Core Programs

| Program            | Address                                                                                                                 | Description                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Staker Program     | [6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM](https://solscan.io/account/6EZAJVrNQdnBJU6ULxXSDaEoK6fN7C3iXTCkZKRWDdGM) | TruFin's custom staking program                    |
| Stake Pool Program | [SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy](https://solscan.io/account/SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy)   | Solana's native stake pool program                 |
| Token Program      | [TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA](https://solscan.io/account/TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA)   | Solana's SPL Token program for token management    |
| System Program     | [11111111111111111111111111111111](https://solscan.io/account/11111111111111111111111111111111)                         | Solana's System program for creating accounts      |
| Stake Program      | [Stake11111111111111111111111111111111111111](https://solscan.io/account/Stake11111111111111111111111111111111111111)   | Solana's Stake program for managing stake accounts |

## Stake Pool Accounts

| Account                   | Address                                                                                                                 | Description                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Stake Pool                | [EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM](https://solscan.io/account/EyKyx9LKz7Qbp6PSbBRoMdt8iNYp8PvFVupQTQRMY9AM) | Main stake pool account that stores pool configuration  |
| Pool Mint                 | [6umRHtiuBd1PC6HQhfH9ioNsqY4ihZncZXNPiGu3d3rN](https://solscan.io/account/6umRHtiuBd1PC6HQhfH9ioNsqY4ihZncZXNPiGu3d3rN) | Token mint for pool tokens representing stake ownership |
| Pool Reserve              | [EDKjf7YhYZyZriHrepRZEXNjwAen9aJwqToiWWqKf9yU](https://solscan.io/account/EDKjf7YhYZyZriHrepRZEXNjwAen9aJwqToiWWqKf9yU) | Reserve account holding SOL before it's delegated       |
| Stake Pool Validator List | [8M7ZbLikHJdeU6iKzZxWJ8zHy1ozX65Zk2GBVcmFVnXe](https://solscan.io/account/8M7ZbLikHJdeU6iKzZxWJ8zHy1ozX65Zk2GBVcmFVnXe) | List of validators managed by the stake pool            |
| Ephemeral Stake Account   | [H9chZiuQ5FjhTg1hUJ2V61VQWqTG5jYHfMcCDJrfRurK](https://solscan.io/account/H9chZiuQ5FjhTg1hUJ2V61VQWqTG5jYHfMcCDJrfRurK) | PDA that holds the ephemeral stake account              |

## Authority Accounts

| Authority          | Address                                                                                                                 | Description                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Staker Authority   | [3Gu6VvL43rRGUodheyitHuYGqsT7qLkuYjwjwC9V2mTU](https://solscan.io/account/3Gu6VvL43rRGUodheyitHuYGqsT7qLkuYjwjwC9V2mTU) | PDA with authority to manage the staker program       |
| Deposit Authority  | [BLTSuAqaoaUUjLRVdanFXGBi2fef5pwhKN23kCMVgX2T](https://solscan.io/account/BLTSuAqaoaUUjLRVdanFXGBi2fef5pwhKN23kCMVgX2T) | PDA with authority to process deposit transactions    |
| Withdraw Authority | [Gq5an4FHyTght92zUF1RjNoZ8Pms7md7hRfGVHeswZku](https://solscan.io/account/Gq5an4FHyTght92zUF1RjNoZ8Pms7md7hRfGVHeswZku) | PDA with authority to process withdrawal transactions |
| Event Authority    | [7HUhwJvRThjcbBme9fhdvbqyvfZ5MhZGuxm5hEkZFLhY](https://solscan.io/account/7HUhwJvRThjcbBme9fhdvbqyvfZ5MhZGuxm5hEkZFLhY) | PDA with authority to emit protocol events            |
| Access PDA         | [EXcdEB4Sy1ikfsXDdLRK9h8ZjgT6pyhq1o98RM7eeYr](https://solscan.io/account/EXcdEB4Sy1ikfsXDdLRK9h8ZjgT6pyhq1o98RM7eeYr)   | PDA controlling access to stake pool functionality    |

## Fee Accounts

| Fee Account         | Address                                                                                                                 | Description                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Manager Fee Account | [5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod](https://solscan.io/account/5aiXfi3RnfXY3FKEQXPtLXxTC7DA3xn2NZPcQvhRPtod) | Account that receives protocol/referral fees |

## Sysvar Accounts

| Sysvar               | Address                                                                                                               | Description                                          |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Clock Sysvar         | [SysvarC1ock11111111111111111111111111111111](https://solscan.io/account/SysvarC1ock11111111111111111111111111111111) | Solana system variable providing on-chain clock data |
| Stake History Sysvar | [SysvarStakeHistory1111111111111111111111111](https://solscan.io/account/SysvarStakeHistory1111111111111111111111111) | Solana system variable providing stake history data  |
| Stake Config Sysvar  | [StakeConfig11111111111111111111111111111111](https://solscan.io/account/StakeConfig11111111111111111111111111111111) | Solana system variable providing stake configuration |
