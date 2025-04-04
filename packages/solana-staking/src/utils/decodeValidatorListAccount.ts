import * as borsh from "borsh";

import * as constants from "./constants";
import { getConnection } from "./getConnection";
import {
  ValidatorList,
  ValidatorListHeader,
  ValidatorListHeaderSchema,
  ValidatorStakeInfo,
  ValidatorStakeInfoSchema,
} from "./stake-pool/types";

/**
 * Decodes the Validator List account.
 * @returns The decoded Validator List account.
 */
export async function decodeValidatorListAccount(): Promise<ValidatorList> {
  const connection = getConnection();

  // Fetch the Validator List account
  const accountInfo = await connection.getAccountInfo(constants.STAKE_POOL_VALIDATOR_LIST);
  if (!accountInfo) {
    throw new Error("Validator List account not found");
  }

  // deserialize the header
  const data = accountInfo.data;
  const header = borsh.deserialize(
    ValidatorListHeaderSchema,
    ValidatorListHeader,
    data.subarray(0, 5), // First 5 bytes for ValidatorListHeader
  );

  // fetch how many validators are in the array
  const numValidators = new DataView(data.buffer, data.byteOffset + 5, 4).getUint32(0, true);

  // deserialize the validators array
  const validators = [];
  const validatorSize = 73; // size of each ValidatorStakeInfo struct
  const validatorsData = data.subarray(5 + 4); // Skip the header (5 bytes) + vec length (4 bytes)

  for (let i = 0; i < numValidators; i++) {
    const start = i * validatorSize;
    const end = start + validatorSize;
    if (start >= validatorsData.length) break;

    const validator = borsh.deserialize(ValidatorStakeInfoSchema, ValidatorStakeInfo, validatorsData.slice(start, end));
    // if the vote account address is not the default, add it to the list
    if (validator.vote_account_address?.toBase58() !== constants.SYSTEM_PROGRAM_ID.toBase58()) {
      validators.push(validator);
    }
  }

  return new ValidatorList({ header, validators });
}
