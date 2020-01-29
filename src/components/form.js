import {createInputOfferTemplate} from "./offer-input";
import {createEventImageTemplate} from "./event-image";
import {createCityOptionTemplate} from "./cities-option";
import {makeUcFirst} from "../utils/utils";
import AbstractSmartComponent from "./abstract-smart-component";
import {flatpickrInit} from "../utils/flatpickr";
import moment from "moment";
import {debounce} from "../utils/debounce";
import {getEventType} from "../models/point";
import {Mode, POINT_TYPES} from "../const";

const defaultData = {
  deleteBtnText: `Delete`,
  submitBtnText: `Save`
};

const getDefaultData = (mode) => {
  return {
    deleteBtnText: mode === Mode.DEFAULT ? `Delete` : `Cancel`,
    submitBtnText: `Save`
  };
};

const getOffersCopy = (offers) => {
  return offers.map((offer) => Object.assign({}, offer));
};

export default class Form extends AbstractSmartComponent {
  constructor(event, destinations, allOffers, mode) {
    super();

    this._event = event;
    this._eventDestination = this._event.destination;
    this._eventDescription = this._event.description;
    this._eventType = Object.assign({}, this._event.type);
    this._eventOffers = getOffersCopy(this._event.offers);
    this._eventIsFavorite = this._event.isFavorite;
    this._eventStart = this._event.calendar.start;
    this._eventEnd = this._event.calendar.end;
    this._eventPrice = this._event.price;

    this.destinations = destinations;
    this.allOffers = allOffers;
    this._mode = mode;

    this._externalData = getDefaultData(this._mode);

    this.id = event.id;

    this._submitHandler = null;
    this._deleteBtnClickHandler = null;
    this._rollupBtnClickHanlder = null;

    this._favoriteBtnClickHandler = this._favoriteBtnClickHandler.bind(this);
    this._dateChangeHandler = this._dateChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);

    this._flatpickr = {
      start: null,
      end: null
    };

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  _createPointTypesList() {
    const createPointTypesItem = (types, group) => {
      return types
        .filter((type) =>type.group === group)
        .map((type) => {
          return (`
        <div class="event__type-item">
          <input id="event-type-${type.name}-1" 
              class="event__type-input  visually-hidden" 
              type="radio" name="event-type" 
              value=${type.name} 
              ${this._eventType.name === type.name ? `checked` : ``}>
          <label class="event__type-label  event__type-label--${type.name}" 
              for="event-type-${type.name}-1">${makeUcFirst(type.name)}
          </label>
        </div>
        `);
        })
        .join(`\n`);
    };

    return (`
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${createPointTypesItem(Object.values(POINT_TYPES), `transfer`)}
      </fieldset>

      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
         ${createPointTypesItem(Object.values(POINT_TYPES), `activity`)}
      </fieldset>
    </div>
  `);
  }

  _createEditPointFormTemplate() {
    const offersList = this._eventOffers.map((offer, index) => createInputOfferTemplate(offer, index)).join(`\n`);
    const images = this._event.images.map((image) => createEventImageTemplate(image.src)).join(`\n`);
    const citiesList = this.destinations.map((city) => createCityOptionTemplate(city)).join(`\n`);

    const deleteBtnText = this._externalData.deleteBtnText;
    const submitBtnText = this._externalData.submitBtnText;

    return (
      `<form class="event  event--edit" action="#" method="post">
      <header class="event__header">
       <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${this._eventType.name}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          ${this._createPointTypesList()}
       </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${makeUcFirst(this._eventType.title)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._eventDestination}" list="destination-list-1" required>
          <datalist id="destination-list-1">
            ${citiesList}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${moment(this._eventStart).format(`DD/MM/YY HH:mm`)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${moment(this._eventEnd).format(`DD/MM/YY HH:mm`)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._eventPrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${submitBtnText}</button>
        <button class="event__reset-btn" type="reset">${deleteBtnText}</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._eventIsFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details" ${this._eventDestination ? `` : `style="display:none"`}>

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersList}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${this._eventDescription}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${images}
            </div>
          </div>
        </section>
      </section>
    </form>`
    );
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setDeleteBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteBtnClickHandler = handler;
  }

  setRollupBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._rollupBtnClickHanlder = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`click`, this._eventTypeChangeHandler);

    element.querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);

    Array.from(element.querySelectorAll(`.event__input--time`)).map((dateElement) => {
      dateElement.addEventListener(`change`, this._dateChangeHandler);
    });

    element.querySelector(`.event__input--price`).addEventListener(`change`, (evt) => {
      this._eventPrice = evt.target.value;
    });

    element.querySelector(`.event__favorite-btn`).addEventListener(`click`, debounce(this._favoriteBtnClickHandler));

    element.addEventListener(`click`, this._offerChangeHandler);
  }

  _favoriteBtnClickHandler() {
    this._eventIsFavorite = !this._eventIsFavorite;

    this.rerender();
  }

  _offerChangeHandler(evt) {
    if (evt.target.classList.contains(`event__offer-checkbox`)) {
      const currentOffer = evt.target.dataset.title;

      this._eventOffers.forEach((pointOffer) => {
        if (pointOffer.title === currentOffer) {
          pointOffer.checked = !pointOffer.checked;
        }
      });
    }
  }

  _dateChangeHandler(evt) {
    const currentStartDate = new Date(this._flatpickr.start.input.value);
    const currentEndDate = new Date(this._flatpickr.end.input.value);
    if ((moment(currentEndDate).isBefore(moment(currentStartDate)))) {
      evt.target.nextSibling.setCustomValidity(`Дата окончания не может быть меньше даты начала события`);
    } else {
      evt.target.nextSibling.setCustomValidity(``);
      this._eventStart = currentStartDate;
      this._eventEnd = currentEndDate;
      this.rerender();
    }
  }

  _destinationChangeHandler(evt) {
    const currentCity = evt.target.value;

    this.destinations.map((city) => {
      if (currentCity === city.name) {
        this._eventDescription = city.description;
        this._eventDestination = city.name;

        evt.target.setCustomValidity(``);
        this.rerender();
      } else {
        evt.target.setCustomValidity(`Необходимо выбрать город из списка`);
      }
    });
  }

  _eventTypeChangeHandler(evt) {
    if (evt.target.tagName === `INPUT`) {
      const currentEventType = evt.target.value;
      this._eventType = getEventType(currentEventType);
      this.allOffers.forEach((offer) => {
        if (offer.type === currentEventType) {
          this._eventOffers = offer.offers;
        }
      });

      this.rerender();
    }
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteBtnClickHandler(this._deleteBtnClickHandler);
    this.setRollupBtnClickHandler(this._rollupBtnClickHanlder);
    this._subscribeOnEvents();
  }

  reset() {
    const event = this._event;

    this._eventDestination = event.destination;
    this._eventDescription = event.description;
    this._eventType = Object.assign({}, event.type);
    this._eventIsFavorite = event.isFavorite;
    this._eventStart = event.calendar.start;
    this._eventEnd = event.calendar.end;
    this._eventPrice = event.price;
    this._eventOffers = event.offers;

    this.rerender();
  }

  getData() {
    return new FormData(this.getElement());
  }

  _applyFlatpickr() {
    if (this._flatpickr.start && this._flatpickr.end) {
      for (let date of Object.keys(this._flatpickr)) {
        this._flatpickr[date].destroy();
        this._flatpickr[date] = null;
      }
    }

    const dateInputs = Array.from(this.getElement().querySelectorAll(`.event__input--time`));
    const eventStart = dateInputs[0];
    const eventEnd = dateInputs[1];

    this._flatpickr.start = flatpickrInit(eventStart, this._eventStart);
    this._flatpickr.end = flatpickrInit(eventEnd, this._eventEnd);
  }

  setData(data) {
    this._externalData = Object.assign({}, defaultData, data);
    this.rerender();
  }

  disableButtons(flag) {
    this.getElement().querySelectorAll(`button`).forEach((btn) => (btn.disabled = flag));
  }

  getTemplate() {
    return this._createEditPointFormTemplate(defaultData);
  }
}
