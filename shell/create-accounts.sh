#!/usr/bin/env bash

# Pre-requisites:
# - Install solana (https://release.anza.xyz/v2.0.15/install)

# Strict mode: https://gist.github.com/vncsna/64825d5609c146e80de8b1fd623011ca
set -euo pipefail

# Exit on error
set -e

# Function to create keypair
create_keypair() {
  local output_file=$1

  echo "Creating $output_file keypair..."
  solana-keygen new --no-bip39-passphrase --outfile "$output_file" --force

  if [ $? -eq 0 ]; then
    echo "Successfully created $output_file keypair"
  else
    echo "Failed to create $output_file keypair"
    exit 1
  fi
}

# Create accounts directory if it doesn't exist
ACCOUNTS_DIR="./src/accounts"
if [ ! -d "$ACCOUNTS_DIR" ]; then
  echo "Creating accounts directory..."
  mkdir -p "$ACCOUNTS_DIR"
fi

# Create each keypair
create_keypair "$ACCOUNTS_DIR/manager.json"
create_keypair "$ACCOUNTS_DIR/owner.json"
create_keypair "$ACCOUNTS_DIR/reserve-stake.json"
create_keypair "$ACCOUNTS_DIR/stake-manager.json"
create_keypair "$ACCOUNTS_DIR/stake-pool.json"
create_keypair "$ACCOUNTS_DIR/staker-program.json"
create_keypair "$ACCOUNTS_DIR/validator-list.json"

echo "All keypairs have been created successfully!"
