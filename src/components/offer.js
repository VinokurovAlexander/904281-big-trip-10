export const createOfferTemplate = (offer) => (
  `<span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>`
);

