import { readFileSync } from "node:fs";
import { rootNodeFromAnchor } from "@codama/nodes-from-anchor";
import { renderVisitor } from "@codama/renderers-js";
import { createFromRoot } from "codama";

// Only the user-flow instructions are generated; account decoders are emitted regardless and read paths
// use those. This also skips owner/operator instructions that trip codama's default-value resolver.
const KEEP_TRUBILL_INSTRUCTIONS = new Set(["deposit", "request_redeem", "instant_redeem", "claim_withdrawal"]);

// Generate the @solana/kit client from the committed IDL (addresses are already mainnet).
const idl = JSON.parse(readFileSync("common/idls/trubill_vault.json", "utf-8"));
idl.instructions = idl.instructions.filter((ix) => KEEP_TRUBILL_INSTRUCTIONS.has(ix.name));
createFromRoot(rootNodeFromAnchor(idl)).accept(renderVisitor("kit/generated/trubill_vault"));
console.log("generated kit/generated/trubill_vault");
