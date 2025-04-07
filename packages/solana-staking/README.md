# TruFin Solana Staking

This repository contains example implementations and usage demonstrations for TruFin Solana Staking.

## Prerequisites

follow the instructions mentioned at [README.md](../../README.md)

## Functionality

- **Deposit SOL**: Learn how to deposit SOL into the TruStake liquid staking vault. See the
  [Deposit Documentation](./src/docs/deposit.md)

- **Deposit SOL To Specific Validator**: Learn how to deposit SOL into the TruStake liquid staking vault for a specific
  validator. See the [Deposit to Specific Validator Documentation](./src/docs/deposit-to-specific-validator.md)

## Available Scripts

The following scripts, that can be run using `bun run <script>`, are available in the `package.json`:

| Script           | Description                             |
| ---------------- | --------------------------------------- |
| `lint`           | Run both TypeScript and Prettier checks |
| `lint:ts`        | Run ESLint and TypeScript type checking |
| `prettier:check` | Check code formatting using Prettier    |
| `prettier:write` | Format code using Prettier              |
