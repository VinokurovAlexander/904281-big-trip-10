import {createEventOfferTemplate} from "./offer-event";
import AbstractComponent from "./abstract-components";
import moment from "moment";

const createPointTemplate = (point) => {
  const offersItems = point.offers.map((offer) => createEventOfferTemplate(offer)).join(`\n`);

  return (
    `<li class="trip-events__item"><div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type.name}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.type.title}</h3>

        <div class="event__schedule">
          <p class="event__time">
          <time class="event__start-time" datetime="${moment(point.calendar.start).format(`YYYY-MM-DDTHH:mm`)}">${moment(point.calendar.start).format(`HH:mm`)}</time>
            &mdash;
          <time class="event__end-time" datetime="${moment(point.calendar.end).format(`YYYY-MM-DD`)}">${moment(point.calendar.end).format(`HH:mm`)}</time>
          </p>
          <p class="event__duration">${point.calendar.duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.price}</span>
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

export default class PointComponent extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createPointTemplate(this._event);
  }

  setOpenFormHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
