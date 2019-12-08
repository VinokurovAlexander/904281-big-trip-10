/**
 * Делаю первую букву в строке заглавной.
 *
 * @param {string} str - Строка.
 * @return {string} Строка с первой заглавной буквой.
 *
 */
export const ucFirst = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};
