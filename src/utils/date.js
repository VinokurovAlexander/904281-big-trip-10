import moment from "moment";

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


