import {createOfferTemplate} from "./offer";

export const createInputOfferTemplate = (offer) => {
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
