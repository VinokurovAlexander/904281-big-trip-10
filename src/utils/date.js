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


