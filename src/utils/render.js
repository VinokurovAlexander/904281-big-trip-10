const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

/**
 * Рендер элемента
 *
 * @param {object} container - Дом узел контейнера.
 * @param {object} element - Дом узел элемента для рендера.
 * @param {string} place - Место размещения элемента: в начале потомков контейнера или в конце.
 *
 */
const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
  }

  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {RenderPosition, render};
