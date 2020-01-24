import {FiltersType} from "../components/filter";
import moment from "moment";

const getPointsByTime = (points, time) => {
  const currentDate = new Date();

  return points.filter((point) => {
    switch (time) {
      case `Future`:
        return moment(point.calendar.start).isAfter(moment(currentDate));
      case `Past`:
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

