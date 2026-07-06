import { getLatestCompletedEpoch } from "../epoch";
import { getReadOnlyProvider } from "../program";

/** Print the latest completed and current (effective) Delta Manager epochs. */
async function main() {
  const completed = await getLatestCompletedEpoch(getReadOnlyProvider());
  console.log("Latest completed epoch:", completed.toString());
  console.log("Effective (current) epoch:", completed.addn(1).toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
