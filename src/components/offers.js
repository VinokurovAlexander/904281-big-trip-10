const createOfferTemplate = (offer) => (
  `<span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>`
);

const createEventOfferTemplate = (offer) => {
  const offerTemplate = createOfferTemplate(offer);

  return (
    `<li class="event__offer">
        ${offerTemplate}
      </li>`
  );
};

const createInputOfferTemplate = (offer) => {
  const offerTemplate = createOfferTemplate(offer);

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-${offer.type}" ${offer.checked}>
      <label class="event__offer-label" for="event-offer-luggage-1">
         ${offerTemplate}
      </label>
    </div>`
  );
};

export {createEventOfferTemplate, createInputOfferTemplate};
