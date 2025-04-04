/* eslint-disable @typescript-eslint/no-explicit-any */
const LOG = true;

export function log(message?: any, ...optionalParams: any[]) {
  if (LOG) {
    console.log(message, ...optionalParams);
  }
}

export function logError(message?: any, ...optionalParams: any[]) {
  if (LOG) {
    console.error(message, ...optionalParams);
  }
}
