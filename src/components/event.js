import {createEventOfferTemplate} from "./offer-event";
import AbstractComponent from "./abstract-components";

const createEventTemplate = (event) => {
  const offersItems = event.offers.map((offer) => createEventOfferTemplate(offer)).join(`\n`);

  return (
    `<li class="trip-events__item"><div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.name}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${event.type.title}</h3>
      
        <div class="event__schedule">
          <p class="event__time">
          <time class="event__start-time" datetime="${event.calendar.datetime.min}">${event.calendar.time.min}</time>
            &mdash;
          <time class="event__end-time" datetime="${event.calendar.datetime.max}">${event.calendar.time.max}</time>
          </p>
          <p class="event__duration">${event.calendar.duration}</p>
        </div>
        
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>
        
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersItems}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div></li>`
  );
};

export default class Event extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  setOpenFormHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
