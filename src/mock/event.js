import {getRandomArrayItem, getRandomIntegerNumber} from '../utils/random';
import {getDuration} from "../utils/date";
import {generateOffers} from "./offer";
import {getImage} from "./event-images";
import {getDescription} from "./event-description";
import {cities} from "./cities";
import {ucFirst} from "../utils/utils";

export const EVENTS_COUNT = 3;
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

export const pointTypes = {
  TAXI: {
    name: `taxi`,
    group: `transfer`,
    emoji: `0x1F695`
  },
  BUS: {
    name: `bus`,
    group: `transfer`,
    emoji: `0x1F68C`
  },
  TRAIN: {
    name: `train`,
    group: `transfer`,
    emoji: `0x1F682`
  },
  SHIP: {
    name: `ship`,
    group: `transfer`,
    emoji: `0x1F6F3`
  },
  TRANSPORT: {
    name: `transport`,
    group: `transfer`,
    emoji: `0x1F68A`
  },
  DRIVE: {
    name: `drive`,
    group: `transfer`,
    emoji: `0x1F697`
  },
  FLIGHT: {
    name: `flight`,
    group: `transfer`,
    emoji: `0x2708`
  },
  CHECKIN: {
    name: `check-in`,
    group: `activity`,
    emoji: `0x1F3E8`
  },
  SIGHTSEEING: {
    name: `sightseeing`,
    group: `activity`,
    emoji: `0x1F3DB`
  },
  RESTAURANT: {
    name: `restaurant`,
    group: `activity`,
    emoji: `0x1F374`
  }
};


export const getEventType = (destination, currentType = null) => {
  const type = currentType ? pointTypes.find((pointType) => pointType[name] === currentType) : getRandomArrayItem(Object.values(pointTypes));

  return Object.assign(type, {
    title: `${ucFirst(type.name)} ${type.group === `transfer` ? `to` : `at`} ${destination}`
  });
};

const generateEvent = (index) => {
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
    id: index
  };
};

export const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map((it, index) => generateEvent(index + 1));
};

export const emptyPoint = (index) => {
  return {
    destination: ``,
    type: getEventType(``, `flight`),
    price: ``,
    description: ``,
    images: [],
    offers: [],
    calendar: {
      start: new Date(),
      end: new Date(),
      duration: getDuration(event.date.min, event.date.max)
    },
    isFavorite: false,
    id: index
  };
};


