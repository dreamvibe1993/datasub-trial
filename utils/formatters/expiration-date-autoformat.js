/* eslint-disable no-useless-escape */
export function formatExpirationDate(value) {
  value = value
    .toString()
    .replace(/[^\d\/]/gi, "")
    .replace(/(?<=.+\/.+)\/+/gm, "");
  if (value.match("/")) {
    return value;
  }
  if (value.length < 8 && value.length > 1) {
    value = value.match(/.{1,2}/g).join("/");
  }
  return value;
}
