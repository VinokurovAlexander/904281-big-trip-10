import {sortItems} from "../mock/sort";

const sortPointsByPrice = (points) => {
  return points.sort((a, b) => b.price - a.price);
};

const sortPointsByTime = (points) => {
  return points.sort((a, b) => (b.end.diff(b.start) - a.end.diff(a.start)));
};

export const sortPoints = (points, filter) => {
  switch (filter) {
    case sortItems.PRICE:
      return sortPointsByPrice(points);

    case sortItems.TIME:
      return sortPointsByTime(points);
  }

  return points;
};
