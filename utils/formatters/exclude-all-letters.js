export const excludeAllLetters = (value) => {
  if (!value) return "";
  value = value.toString();
  const numbersRegex = /\D+/gi;
  if (value.match(numbersRegex)) return value.replace(numbersRegex, "");
  return value;
};
