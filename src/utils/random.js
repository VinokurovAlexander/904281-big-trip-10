/**
 * Возвращает случайное число в заданном диапазоне.
 *
 * @param {number} min - Начало диапазона чисел.
 * @param {number} max - Конец диапазона чисел.
 * @return {number} Случайное число в заданном диапазоне.
 *
 */

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

/**
 * Возвращает случайный элемент массива.
 *
 * @param {array} array - Массив, из которого нужно получить элемент.
 * @return {array[]}  Случайный элемент из массива.
 *
 */
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export {getRandomIntegerNumber, getRandomArrayItem};
