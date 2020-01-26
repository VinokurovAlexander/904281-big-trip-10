const Escape = {
  FULL: `Escape`,
  SHORT: `Esc`
};

export const isEscEvent = (evt, action) => {
  const isEscKey = evt.key === Escape.FULL || evt.key === Escape.SHORT;

  if (isEscKey) {
    action();
    document.removeEventListener(`keydown`, isEscEvent);
  }
};
