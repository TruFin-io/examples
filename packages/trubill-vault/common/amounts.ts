import { BN } from "@coral-xyz/anchor";

/** Token decimal places */
export namespace Decimals {
  export const SOL = 9;
  export const USDC = 6;
  export const ULTRA = 6;
  export const TRUBILL = 6;
}

/** 100% = 10,000 basis points */
export const BPS_PRECISION = 10_000n;

export const toBN = (value: string | number | bigint) => new BN(value.toString());

/** floor(a * b / d) — deposit/redeem rounding. */
export const mulDiv = (a: bigint, b: bigint, d: bigint) => (a * b) / d;

/** ceil(a * b / d) — instant-redeem fee rounding. */
export const mulDivCeil = (a: bigint, b: bigint, d: bigint) => (a * b === 0n ? 0n : (a * b + d - 1n) / d);

/**
 * Multiplies a string representation of a number by a given exponent of base 10 (10exponent).
 *
 * - Based on https://github.com/wevm/viem/blob/viem%402.54.6/src/utils/unit/parseUnits.ts
 *
 * @param value - The decimal string to parse (e.g., "1.5", "100", "0.001")
 * @param decimals - The number of decimals for the token (default: 9)
 * @returns The raw amount as bigint
 *
 * @example
 * parseUnits("420", 9) // 420000000000
 * parseUnits("1.5", 9) // 1500000000
 */
export function parseUnits(value: number | string, decimals: number = 9): bigint {
  value = value.toString();

  if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(value)) throw new Error(`Invalid decimal number: ${value}`);

  let [integer, fraction = "0"] = value.split(".");

  const negative = integer.startsWith("-");
  if (negative) integer = integer.slice(1);

  fraction = fraction.replace(/(0+)$/, ""); // trim trailing zeros

  // round off if the fraction is larger than the number of decimals
  if (decimals === 0) {
    if (Math.round(Number(`.${fraction}`)) === 1) integer = `${BigInt(integer) + 1n}`;
    fraction = "";
  } else if (fraction.length > decimals) {
    const [left, unit, right] = [
      fraction.slice(0, decimals - 1),
      fraction.slice(decimals - 1, decimals),
      fraction.slice(decimals),
    ];

    const rounded = Math.round(Number(`${unit}.${right}`));
    if (rounded > 9) fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, "0");
    else fraction = `${left}${rounded}`;

    if (fraction.length > decimals) {
      fraction = fraction.slice(1);
      integer = `${BigInt(integer) + 1n}`;
    }

    fraction = fraction.slice(0, decimals);
  } else {
    fraction = fraction.padEnd(decimals, "0");
  }

  return BigInt(`${negative ? "-" : ""}${integer}${fraction}`);
}

/**
 *  Divides a number by a given exponent of base 10 (10exponent), and formats it into a string representation of the number.
 *
 * - Based on https://github.com/wevm/viem/blob/viem%402.54.6/src/utils/unit/formatUnits.ts
 *
 * @example
 * formatUnits(new BN(420000000000), 9) // '420'
 */
export function formatUnits(value: bigint, decimals: number = 9): string {
  let display = value.toString();

  const negative = display.startsWith("-");
  if (negative) display = display.slice(1);

  display = display.padStart(decimals, "0");

  let [integer, fraction] = [display.slice(0, display.length - decimals), display.slice(display.length - decimals)];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
}

/** USDC, ULTRA and TruBILL all use 6 decimals */
export const usdc = (value: number | string): bigint => parseUnits(value, Decimals.USDC);
export const ultra = (value: number | string): bigint => parseUnits(value, Decimals.ULTRA);
export const trubill = (value: number | string): bigint => parseUnits(value, Decimals.TRUBILL);
