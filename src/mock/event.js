import {getRandomArrayItem, getRandomIntegerNumber} from '../utils/random';
import {getEventTimeAndDate} from '../utils/date';
import {getOffers} from "./offer";
import {getImage} from "./event-images";
import {getDescription} from "./event-description";
import {cities} from "./cities";
import {ucFirst} from "../utils/utils";

const event = {
  date: {
    min: new Date(`1 December 2020, 9:00`),
    max: new Date(`1 December 2020, 15:45`)
  },
  price: {
    min: 5,
    max: 500
  },
  type: [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`]
};

const getEventType = (destination) => {
  const eventName = getRandomArrayItem(event.type);

  return {
    name: eventName,
    title: `${ucFirst(eventName)} at ${destination}`
  };
};

const generateEvent = () => {
  const eventDestination = getRandomArrayItem(cities);

  return {
    destination: eventDestination,
    type: getEventType(eventDestination),
    price: getRandomIntegerNumber(event.price.min, event.price.max),
    description: getDescription(),
    images: getImage(),
    offers: getOffers(),
    calendar: getEventTimeAndDate(event.date.min, event.date.max),
    isFavorite: false,
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvents};

