import {FiltersType} from "../components/filter";
import moment from "moment";

const getPointsByTime = (points, time) => {
  const currentDate = new Date();

  return points.filter((point) => {
    switch (time) {
      case FiltersType.FUTURE:
        return moment(point.calendar.start).isAfter(moment(currentDate));
      case FiltersType.PAST:
        return moment(point.calendar.start).isBefore(moment(currentDate));
    }

    return points;
  });
};

export const getPointsByFilter = (points, filter) => {
  switch (filter) {
    case FiltersType.FUTURE:
      return getPointsByTime(points, FiltersType.FUTURE);

    case FiltersType.PAST:
      return getPointsByTime(points, FiltersType.PAST);
  }

  return points;
};

