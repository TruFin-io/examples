# Trufin Labs Examples

This repository contains example implementations and usage demonstrations for Trufin Labs products. These examples serve
as reference implementations to help developers integrate and work with Trufin Labs' solutions effectively.

## Prerequisites

- [Bun](https://bun.sh) - JavaScript runtime & package manager
- Node.js (if not using Bun)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/TruFin-io/examples trufin-examples
   cd trufin-examples
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Follow the specific instructions in each example's directory

## Available Scripts

The following scripts, that can be run using `bun run <script>`, are available in the `package.json`:

| Script           | Description                                 |
| ---------------- | ------------------------------------------- |
| `build`          | Build the project using TypeScript compiler |
| `clean`          | Remove the build artifacts                  |
| `lint`           | Run both TypeScript and Prettier checks     |
| `lint:ts`        | Run ESLint and TypeScript type checking     |
| `prettier:check` | Check code formatting using Prettier        |
| `prettier:write` | Format code using Prettier                  |
