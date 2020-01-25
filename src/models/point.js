import {getDuration} from "../utils/date";
import {getRandomArrayItem} from "../utils/random";
import {ucFirst} from "../utils/utils";
import {pointTypes} from "../const";

export const getEventType = (destination, currentType = null) => {
  let type = {};

  if (!currentType) {
    type = getRandomArrayItem(Object.values(pointTypes));
  } else {
    Object.keys(pointTypes).map((pointType) => {
      if (pointType === currentType) {
        type = Object.assign({}, pointTypes[currentType]);
      }
    });
  }

  return Object.assign(type, {
    title: `${ucFirst(type.name)} ${type.group === `transfer` ? `to` : `at`} ${destination}`
  });
};

export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = getEventType(data[`destination`][`name`], data[`type`]);
    this.destination = data[`destination`][`name`];
    this.price = data[`base_price`];
    this.description = data[`destination`][`description`] || ``;
    this.images = data[`destination`][`pictures`] || [];
    this.offers = data[`offers`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.calendar = {
      start: new Date(data[`date_from`]),
      end: new Date(data[`date_to`]),
      duration: getDuration(new Date(data[`date_from`]), new Date(data[`date_to`]))
    };
  }

  toRAW() {
    return {
      "base_price": Number(this.price),
      "id": this.id,
      "type": this.type.name,
      "date_from": this.calendar.start.toISOString(),
      "date_to": this.calendar.end.toISOString(),
      "destination": {
        name: this.destination,
        description: this.description,
        pictures: this.images
      },
      "is_favorite": this.isFavorite,
      "offers": this.offers,
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
