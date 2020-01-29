const DEBOUNCE_INTERVAL = 500;

export const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    const parameters = args;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};
