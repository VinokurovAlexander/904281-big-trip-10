export const isEscEvent = (evt, action) => {
  const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

  if (isEscKey) {
    action();
    document.removeEventListener(`keydown`, isEscEvent);
  }
};
