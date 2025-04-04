#!/usr/bin/env bash

# Strict mode: https://gist.github.com/vncsna/64825d5609c146e80de8b1fd623011ca
set -euo pipefail

echo "Starting deposit tests..."

# Step 1: Modify the constants file
echo "Modifying constants file..."
bun run test/helpers/modify.ts

# Step 2: Run the deposit tests
echo "Running deposit tests..."
bun run test/run-deposit-tests.ts

# Step 3: Restore the constants file
echo "Restoring constants file..."
bun run test/helpers/restore.ts

echo "Deposit tests completed."
