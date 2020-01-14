import {createInputOfferTemplate} from "./offer-input";
import {createEventImageTemplate} from "./event-image";
import {createCityOptionTemplate} from "./cities-option";
import {getDescription} from "../mock/event-description";
import {cities} from "../mock/cities";
import {ucFirst} from "../utils/utils";
import AbstractSmartComponent from "./abstract-smart-component";
import {generateOffers} from "../mock/offer";
import {pointTypes, getEventType} from "../mock/event";
import {offers} from "../mock/offer";
import {flatpickrInit} from "../utils/flatpickr";
import moment from "moment";
import {getDuration} from "../utils/date";
import he from "he";

export default class EventForm extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;
    this._eventDestination = this._event.destination;
    this._eventDescription = this._event.description;
    this._eventTypeName = this._event.type.name;
    this._eventOffers = this._event.offers;
    this._eventIsFavorite = this._event.isFavorite;
    this._eventStart = this._event.calendar.start;
    this._eventEnd = this._event.calendar.end;

    this._submitHandler = null;
    this._favoriteClickHandler = null;
    this._deleteBtnClickHandler = null;

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
          <input id="event-type-${type.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${type.name} ${this._eventTypeName === type.name ? `checked` : ``}>
          <label class="event__type-label  event__type-label--${type.name}" for="event-type-${type.name}-1">${ucFirst(type.name)}</label>
        </div>
        `);
        })
        .join(`\n`);
    };

    return (`
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${createPointTypesItem(Object.values(pointTypes), `transfer`)}
      </fieldset>

      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
         ${createPointTypesItem(Object.values(pointTypes), `activity`)}
      </fieldset>
    </div>
  `);
  }

  _createEditEventFormTemplate() {
    const offersList = this._eventOffers.map((offer) => createInputOfferTemplate(offer)).join(`\n`);
    const images = this._event.images.map((image) => createEventImageTemplate(image.src)).join(`\n`);
    const citiesList = cities.map((city) => createCityOptionTemplate(city)).join(`\n`);

    return (
      `<form class="event  event--edit" action="#" method="post">
      <header class="event__header">
       <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${this._eventTypeName}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          ${this._createPointTypesList()}
       </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${ucFirst(this._eventTypeName)} at
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._eventDestination}" list="destination-list-1">
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
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._event.price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

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

  getTemplate() {
    return this._createEditEventFormTemplate();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoriteBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoriteClickHandler = handler;
  }

  setDeleteBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteBtnClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        const eventType = evt.target.value;
        this._eventTypeName = `${eventType}`;
        this._eventOffers = generateOffers();

        this.rerender();
      }
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      const currentCity = evt.target.value;
      if (cities.includes(currentCity)) {
        this._eventDescription = getDescription();
        this._eventDestination = currentCity;
        evt.target.setCustomValidity(``);
        this.rerender();
      } else {
        evt.target.setCustomValidity(`Необходимо выбрать город из списка`);
      }
    });

    Array.from(element.querySelectorAll(`.event__input--time`)).map((dateElement) => {
      dateElement.addEventListener(`change`, (evt) => {
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
      });
    });
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteBtnClickHandler(this._favoriteClickHandler);
    this.setDeleteBtnClickHandler(this._deleteBtnClickHandler);
    this._subscribeOnEvents();
  }

  reset() {
    const event = this._event;

    this._eventDestination = event.destination;
    this._eventDescription = event.description;
    this._eventTypeName = event.type.name;
    this._eventIsFavorite = event.isFavorite;
    this._eventStart = event.calendar.start;
    this._eventEnd = event.calendar.end;

    this.rerender();
  }

  getData() {
    const formElement = this.getElement();
    const formData = new FormData(formElement);

    const formOffers = [];
    Array.from(formElement.querySelectorAll(`.event__offer-checkbox`)).forEach((currentOffer) => {
      const currentOfferType = currentOffer.name.slice(currentOffer.name.lastIndexOf(`-`) + 1);
      formOffers.push(offers.find((offer) => offer.type === currentOfferType));
    });

    const formDestination = formData.get(`event-destination`);
    const formImages = Array.from(formElement.querySelectorAll(`.event__photo`)).map((image) => image.src);
    const startDate = new Date(he.encode(formData.get(`event-start-time`)));
    const endDate = new Date(he.encode(formData.get(`event-end-time`)));

    return {
      destination: formDestination,
      type: getEventType(formDestination, formData.get(`event-type`)),
      price: he.encode(formData.get(`event-price`)),
      offers: formOffers,
      images: formImages,
      description: formElement.querySelector(`.event__destination-description`).textContent,
      isFavorite: formElement.querySelector(`.event__favorite-checkbox`).checked,
      calendar: {
        start: startDate,
        end: endDate,
        duration: getDuration(startDate, endDate)
      }
    };
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
}
