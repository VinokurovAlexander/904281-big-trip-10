import {getRandomIntegerNumber} from "../utils/random";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna,` +
  `non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.` +
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae,` +
  `sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed` +
  `augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

/**
 * Возвращает описание для объекта.
 *
 * @return {string} - Строка состоящая из предложений, случайным образом выбранным
 * из исходной строки.
 */
const getDescription = () => {
  const sentenceCount = getRandomIntegerNumber(1, 3);
  const arrayOfSentences = text.split(`.`);
  arrayOfSentences.pop();
  let index = [];
  let descriptionArray = [];
  while (descriptionArray.length < sentenceCount) {
    let currentIndex = getRandomIntegerNumber(0, arrayOfSentences.length);
    if (!index.includes(currentIndex)) {
      index.push(currentIndex);
      descriptionArray.push(arrayOfSentences[currentIndex]);
    }
  }
  return descriptionArray.join(`. `) + `.`;
};

export {getDescription};
