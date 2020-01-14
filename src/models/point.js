import {getEventType} from "../mock/event";
import {getDuration} from "../utils/date";

export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = getEventType(data[`destination`][`name`], data[`type`].toUpperCase());
    this.destination = data[`destination`][`name`];
    this.price = data[`base_price`];
    this.description = data[`destination`][`description`] || ``;
    this.images = data[`destination`][`pictures`] || [];
    this.offers = data[`offers`];
    this.isFavorite = data[`is_favorite`];
    this.calendar = {
      start: new Date(data[`date_from`]),
      end: new Date(data[`date_to`]),
      duration: getDuration(new Date(data[`date_from`]), new Date(data[`date_to`]))
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }
}
