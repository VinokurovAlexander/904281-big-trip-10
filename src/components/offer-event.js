import {createOfferTemplate} from "./offer";

export const createEventOfferTemplate = (offer) => {
  const offerTemplate = createOfferTemplate(offer);

  return (
    `<li class="event__offer">
        ${offerTemplate}
      </li>`
  );
};


