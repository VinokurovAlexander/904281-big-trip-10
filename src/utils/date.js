import moment from "moment";
/**
 * Возвращает разницу во времени между датами.
 *
 * @param {object} firstDate - Объект Date начальное время.
 * @param {object} secondDate - Объект Date конечное время.
 * @return {string} Время в формате 2D:13H:25M.
 *
 */
const getDuration = (firstDate, secondDate) => {
  let duration = ``;
  const startTime = moment(firstDate);
  const endTime = moment(secondDate);

  const durationDays = endTime.diff(startTime, `days`);
  if (durationDays) {
    duration = `${durationDays}D`;
  }

  let durationHours = endTime.diff(startTime, `hours`);
  if (durationHours >= 24) {
    durationHours = endTime.subtract(durationDays, `d`).diff(startTime, `hours`);
  }

  if ((durationDays) || (!durationDays && durationHours)) {
    duration += ` ${durationHours}H`;
  }

  let durationMinutes = endTime.diff(startTime, `minutes`);
  if (durationMinutes >= 60) {
    durationMinutes = endTime.subtract(durationHours, `h`).diff(startTime, `minutes`);
  }

  duration += ` ${durationMinutes}M`;

  return duration;
};

export {getDuration};


