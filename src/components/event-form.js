import {createInputOfferTemplate} from "./offer-input";
import {createEventImageTemplate} from "./event-image";
import {createCityOptionTemplate} from "./cities-option";
import {getDescription} from "../mock/event-description";
import {cities} from "../mock/cities";
import {ucFirst} from "../utils/utils";
import AbstractSmartComponent from "./abstract-smart-component";
import {getOffers} from "../mock/offer";


// const createEditEventFormTemplate = (event) => {
//   const offers = event.offers.map((offer) => createInputOfferTemplate(offer)).join(`\n`);
//   const images = event.images.map((image) => createEventImageTemplate(image)).join(`\n`);
//   const citiesList = cities.map((city) => createCityOptionTemplate(city)).join(`\n`);
//
//   return (
//     `<form class="event  event--edit" action="#" method="post">
//       <header class="event__header">
//         <div class="event__type-wrapper">
//           <label class="event__type  event__type-btn" for="event-type-toggle-1">
//             <span class="visually-hidden">Choose event type</span>
//             <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type.name}.png" alt="Event type icon">
//           </label>
//           <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
//
//           <div class="event__type-list">
//             <fieldset class="event__type-group">
//               <legend class="visually-hidden">Transfer</legend>
//
//               <div class="event__type-item">
//                 <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
//                 <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
//               </div>
//
//               <div class="event__type-item">
//                 <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
//                 <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
//               </div>
//
//               <div class="event__type-item">
//                 <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
//                 <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
//               </div>
//
//               <div class="event__type-item">
//                 <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
//                 <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
//               </div>
//
//               <div class="event__type-item">
//                 <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
//                 <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
//               </div>
//
//               <div class="event__type-item">
//                 <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
//                 <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
//               </div>
//
//               <div class="event__type-item">
//                 <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
//                 <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
//               </div>
//             </fieldset>
//
//             <fieldset class="event__type-group">
//               <legend class="visually-hidden">Activity</legend>
//
//               <div class="event__type-item">
//                 <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
//                 <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
//               </div>
//
//               <div class="event__type-item">
//                 <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
//                 <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
//               </div>
//
//               <div class="event__type-item">
//                 <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
//                 <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
//               </div>
//             </fieldset>
//           </div>
//         </div>
//
//         <div class="event__field-group  event__field-group--destination">
//           <label class="event__label  event__type-output" for="event-destination-1">
//             ${ucFirst(event.type.name)} at
//           </label>
//           <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${event.destination} list="destination-list-1">
//           <datalist id="destination-list-1">
//             ${citiesList}
//           </datalist>
//         </div>
//
//         <div class="event__field-group  event__field-group--time">
//           <label class="visually-hidden" for="event-start-time-1">
//             From
//           </label>
//           <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${event.calendar.formDatetime.min}">
//           &mdash;
//           <label class="visually-hidden" for="event-end-time-1">
//             To
//           </label>
//           <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${event.calendar.formDatetime.max}">
//         </div>
//
//         <div class="event__field-group  event__field-group--price">
//           <label class="event__label" for="event-price-1">
//             <span class="visually-hidden">Price</span>
//             &euro;
//           </label>
//           <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.price}">
//         </div>
//
//         <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
//         <button class="event__reset-btn" type="reset">Delete</button>
//
//         <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${event.isFavorite ? `checked` : ``}>
//         <label class="event__favorite-btn" for="event-favorite-1">
//           <span class="visually-hidden">Add to favorite</span>
//           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
//             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
//           </svg>
//         </label>
//
//         <button class="event__rollup-btn" type="button">
//           <span class="visually-hidden">Open event</span>
//         </button>
//       </header>
//
//       <section class="event__details">
//
//         <section class="event__section  event__section--offers">
//           <h3 class="event__section-title  event__section-title--offers">Offers</h3>
//
//           <div class="event__available-offers">
//             ${offers}
//           </div>
//         </section>
//
//         <section class="event__section  event__section--destination">
//           <h3 class="event__section-title  event__section-title--destination">Destination</h3>
//           <p class="event__destination-description">${event.description}</p>
//
//           <div class="event__photos-container">
//             <div class="event__photos-tape">
//               ${images}
//             </div>
//           </div>
//         </section>
//       </section>
//     </form>`
//   );
// };

export default class EventForm extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;
    this._eventDestination = this._event.destination;
    this._eventDescription = this._event.description;
    this._eventTypeName = this._event.type.name;
    this._eventOffers = this._event.offers;

    this._submitHandler = null;
    this._favoriteClickHandler = null;

    this._subscribeOnEvents();
  }

  _createEditEventFormTemplate() {
    const offers = this._eventOffers.map((offer) => createInputOfferTemplate(offer)).join(`\n`);
    const images = this._event.images.map((image) => createEventImageTemplate(image)).join(`\n`);
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

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${ucFirst(this._eventTypeName)} at
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${this._eventDestination} list="destination-list-1">
          <datalist id="destination-list-1">
            ${citiesList}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${this._event.calendar.formDatetime.min}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${this._event.calendar.formDatetime.max}">
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

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._event.isFavorite ? `checked` : ``}>
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

      <section class="event__details">

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offers}
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
  };

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

  _subscribeOnEvents() {
    const element = this.getElement();

    // element.querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {
    //   if (evt.target.tagName === `INPUT`) {
    //     const eventType = evt.target.value;
    //     const destination = this.getElement().querySelector(`.event__input--destination`).value;
    //     this._event.type.name = `${eventType}`;
    //     this._event.type.title = `${ucFirst(eventType)} at ${destination}`;
    //     this._event.offers = getOffers();
    //
    //     this.rerender();
    //   }
    // });

    element.querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        const eventType = evt.target.value;
        // const destination = this.getElement().querySelector(`.event__input--destination`).value;
        this._eventTypeName = `${eventType}`;
        this._eventOffers = getOffers();

        this.rerender();
      }
    });

    // element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
    //   const currentCity = evt.target.value;
    //   if (cities.includes(currentCity)) {
    //     this._event.description = getDescription();
    //     this._event.destination = currentCity;
    //     this._event.type.title = `${ucFirst(this._event.type.name)} at ${currentCity}`;
    //     evt.target.setCustomValidity(``);
    //     this.rerender();
    //   } else {
    //     evt.target.setCustomValidity(`Необходимо выбрать город из списка`);
    //   }
    // });

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
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteBtnClickHandler(this._favoriteClickHandler);
    this._subscribeOnEvents();
  }

  reset() {
    const event = this._event;

    this._eventDestination = event.destination;
    this._eventDescription = event.description;
    this._eventTypeName = event.type.name;

    this.rerender();
  }

  getOldData() {
    const oldformElement = this.getElement();
    const oldFormData = new FormData(oldformElement);

    for (let [name, value] of oldFormData) {
      console.log(`${name} = ${value}`); // key1=value1, потом key2=value2
    }
  }
}
