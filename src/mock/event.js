import {getRandomArrayItem, getRandomIntegerNumber} from '../utils/random';
import {getEventTimeAndDate} from '../utils/date';
import {getOffers} from "./offer";
import {getImage} from "./event-images";
import {getDescription} from "./event-description";
import {cities} from "./cities";

const event = {
  date: {
    min: new Date(`1 December 2020, 9:00`),
    max: new Date(`1 December 2020, 15:45`)
  },
  price: {
    min: 5,
    max: 500
  },
  type: [
    {
      name: `bus`,
      title: `Bus to airport`
    },
    {
      name: `check-in`,
      title: `Check into hotel`
    },
    {
      name: `drive`,
      title: `Drive to ${getRandomArrayItem(cities)}`
    },
    {
      name: `flight`,
      title: `Flight to ${getRandomArrayItem(cities)}`
    },
    {
      name: `restaurant`,
      title: `Supper at restaurant`
    },
    {
      name: `ship`,
      title: `Sail to ${getRandomArrayItem(cities)}`
    },
    {
      name: `sightseeing`,
      title: `Natural History Museum`
    },
    {
      name: `taxi`,
      title: `Drive to airport`
    },
    {
      name: `train`,
      title: `Train to ${getRandomArrayItem(cities)}`
    },
    {
      name: `transport`,
      title: `Transport to ${getRandomArrayItem(cities)}`
    },
    {
      name: `trip`,
      title: `Trip to ${getRandomArrayItem(cities)}`
    }
  ]
};

const generateEvent = () => {
  return {
    type: getRandomArrayItem(event.type),
    price: getRandomIntegerNumber(event.price.min, event.price.max),
    description: getDescription(),
    images: getImage(),
    offers: getOffers(),
    calendar: getEventTimeAndDate(event.date.min, event.date.max)
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvents};

