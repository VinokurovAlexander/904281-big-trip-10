import {getRandomArrayItem, getRandomIntegerNumber} from '../utils/random';
import {getDuration} from "../utils/date";
import {generateOffers} from "./offer";
import {getImage} from "./event-images";
import {getDescription} from "./event-description";
import {cities} from "./cities";
import {ucFirst} from "../utils/utils";

const event = {
  date: {
    min: new Date(`1 December 2020, 9:00`),
    max: new Date(`2 December 2020, 12:59`)
  },
  price: {
    min: 5,
    max: 500
  }
};

export const pointTypes = [
  {
    name: `taxi`,
    group: `transfer`,
  },
  {
    name: `bus`,
    group: `transfer`,
  },
  {
    name: `train`,
    group: `transfer`,
  },
  {
    name: `ship`,
    group: `transfer`,
  },
  {
    name: `transport`,
    group: `transfer`,
  },
  {
    name: `drive`,
    group: `transfer`,
  },
  {
    name: `flight`,
    group: `transfer`,
  },
  {
    name: `check-in`,
    group: `activity`,
  },
  {
    name: `sightseeing`,
    group: `activity`,
  },
  {
    name: `restaurant`,
    group: `activity`,
  },
];


export const getEventType = (destination, currentType = null) => {
  const type = currentType ? pointTypes.find((pointType) => pointType.name === currentType) : getRandomArrayItem(pointTypes);


  return Object.assign(type, {
    title: `${ucFirst(type.name)} ${type.group === `transfer` ? `to` : `at`} ${destination}`
  });
};

const generateEvent = () => {
  const eventDestination = getRandomArrayItem(cities);

  return {
    destination: eventDestination,
    type: getEventType(eventDestination),
    price: getRandomIntegerNumber(event.price.min, event.price.max),
    description: getDescription(),
    images: getImage(),
    offers: generateOffers(),
    calendar: {
      start: event.date.min,
      end: event.date.max,
      duration: getDuration(event.date.min, event.date.max)
    },
    isFavorite: false,
  };
};

export const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};


