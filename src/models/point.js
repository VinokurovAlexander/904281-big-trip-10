import {getEventType} from "../mock/event";
import {getDuration} from "../utils/date";

export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = getEventType(data[`destination`][`name`], data[`type`]);
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

  toRAW() {
    return {
      'id': this.id,
      'base_price': this.price,
      'offers': this.offers,
      'is_favorite': this.isFavorite,
      'type': this.type.name,
      'destination': {
        'name': this.destination,
        'description': this.description,
        'pictures': this.images
      },
      'date_from': this.calendar.start.toISOString(),
      'date_to': this.calendar.end.toISOString(),
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
