import {filtersType} from "../components/filter";
import moment from "moment";

const getPointsByTime = (points, time) => {
  const currentDate = new Date();

  return points.filter((point) => {
    switch (time) {
      case `future`:
        return moment(point.calendar.start).isAfter(moment(currentDate));
      case `past`:
        return moment(point.calendar.start).isBefore(moment(currentDate));
    }

    return points;
  });
};


export const getPointsByFilter = (points, filter) => {
  switch (filter) {
    case filtersType.FUTURE.value:
      return getPointsByTime(points, `future`);

    case filtersType.PAST.value:
      return getPointsByTime(points, `past`);
  }

  return points;
};

