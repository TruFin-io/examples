.PHONY: create-accounts

create-accounts:
	@echo "Creating Solana keypairs..."
	@chmod +x shell/create-accounts.sh
	@bash ./shell/create-accounts.sh
