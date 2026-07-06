import { getEffectiveEpoch } from "../lib/epoch";

/** Print the latest completed and current (effective) Delta Manager epochs via the generated decoder. */
async function main() {
  const effective = await getEffectiveEpoch();
  const completed = effective > 0n ? effective - 1n : 0n;

  console.log("Latest completed epoch:", completed.toString());
  console.log("Effective (current) epoch:", effective.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
