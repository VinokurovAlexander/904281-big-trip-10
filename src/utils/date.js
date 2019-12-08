/**
 * Возвращает время в формате hh:mm.
 *
 * @param {object} date - Объект Date.
 * @return {string} Время в формате HH:mm.
 *
 */
const getTime = (date) => {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${hours}:${minutes}`;
};

/**
 * Возвращает дату и время.
 *
 * @param {object} date - Объект Date.
 * @param {boolean} isForm - Ключ для возвращения даты и времени в формате для отображения в форме.
 * @return {string} Дата в формате 2019-03-18T10:30, если isForm - 18/03/19 12:25.
 *
 */
const getDate = (date, isForm = false) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }
  const time = getTime(date);
  if (isForm) {
    const formYear = (year + ``).slice(2);
    return `${day}/${month}/${formYear} ${time}`;
  }
  return `${year}-${month}-${day}T${time}`;
};

/**
 * Возвращает разницу во времени между датами.
 *
 * @param {object} firstDate - Объект Date начальное время.
 * @param {object} secondDate - Объект Date конечное время.
 * @return {string} Время в формате 13H:25M.
 *
 */
const getDuration = (firstDate, secondDate) => {
  const duration = secondDate - firstDate;
  const durationHours = Math.floor(duration / 3600000);
  let durationMinutes = Math.round(((duration / 3600000) - (Math.floor(duration / 3600000))) * 60);
  return `${durationHours}H ${durationMinutes}M`;
};

const isForm = true;
const getEventTimeAndDate = (minDateAndTime, maxDateAndTime) => {
  return {
    time: {
      min: getTime(minDateAndTime),
      max: getTime(maxDateAndTime),
    },
    datetime: {
      min: getDate(minDateAndTime),
      max: getDate(maxDateAndTime)
    },
    formDatetime: {
      min: getDate(minDateAndTime, isForm),
      max: getDate(maxDateAndTime, isForm)
    },
    duration: getDuration(minDateAndTime, maxDateAndTime)
  };
};

export {getEventTimeAndDate};


