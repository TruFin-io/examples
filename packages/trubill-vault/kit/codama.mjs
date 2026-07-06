import { readFileSync } from "node:fs";
import { rootNodeFromAnchor } from "@codama/nodes-from-anchor";
import { renderVisitor } from "@codama/renderers-js";
import { createFromRoot } from "codama";

// Only the user-flow instructions are generated; account decoders are emitted regardless and read paths
// use those. This also skips owner/operator instructions that trip codama's default-value resolver.
const KEEP_TRUBILL_INSTRUCTIONS = new Set(["deposit", "request_redeem", "instant_redeem", "claim_withdrawal"]);

// Generate @solana/kit clients from the committed IDLs (addresses are already mainnet).
// The Delta Manager IDL is already pared down to the AssetController it reads.
for (const name of ["trubill_vault", "delta_manager"]) {
  const idl = JSON.parse(readFileSync(`common/idls/${name}.json`, "utf-8"));
  idl.instructions =
    name === "trubill_vault" ? idl.instructions.filter((ix) => KEEP_TRUBILL_INSTRUCTIONS.has(ix.name)) : [];
  createFromRoot(rootNodeFromAnchor(idl)).accept(renderVisitor(`kit/generated/${name}`));
  console.log(`generated kit/generated/${name}`);
}
