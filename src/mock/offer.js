import {getRandomIntegerNumber} from "../utils/random";

const MAX_OFFERS = 2;
const offers = [
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 10,
    checked: `checked`
  },
  {
    type: `class`,
    title: `Switch to comfort class`,
    price: 150,
    checked: ``
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 2,
    checked: ``
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 9,
    checked: ``
  },
];

const getOffers = () => {
  const offersCount = getRandomIntegerNumber(0, MAX_OFFERS + 1);
  const eventOffers = [];
  while (eventOffers.length < offersCount) {
    const index = getRandomIntegerNumber(0, offers.length);
    if (!eventOffers.includes(offers[index])) {
      eventOffers.push(offers[index]);
    }
  }
  return eventOffers;
};

export {getOffers};
