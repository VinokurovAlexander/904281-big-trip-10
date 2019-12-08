/**
 * Делаю первую букву в строке заглавной.
 *
 * @param {string} str - Строка.
 * @return {string} Строка с первой заглавной буквой.
 *
 */
const ucFirst = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

/**
 * Создает dom-узел.
 *
 * @param {string} template - Разметка шаблона.
 * @return {object} Dom-узел на основе переаданноо шаблона.
 *
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {ucFirst, createElement};
