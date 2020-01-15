import {createOfferTemplate} from "./offer";

export const createInputOfferTemplate = (offer, index) => {
  const offerTemplate = createOfferTemplate(offer);

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-${offer.title}">
      <label class="event__offer-label" for="event-offer-${index}">
         ${offerTemplate}
      </label>
    </div>`
  );
};

