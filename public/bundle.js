/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/trip-controls.js":
/*!*****************************************!*\
  !*** ./src/components/trip-controls.js ***!
  \*****************************************/
/*! exports provided: createTripControlsTabsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripControlsTabsTemplate", function() { return createTripControlsTabsTemplate; });
const createTripControlsTabsTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`
);


/***/ }),

/***/ "./src/components/trip-filters.js":
/*!****************************************!*\
  !*** ./src/components/trip-filters.js ***!
  \****************************************/
/*! exports provided: createTripFiltersTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripFiltersTemplate", function() { return createTripFiltersTemplate; });
const createTripFiltersTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);


/***/ }),

/***/ "./src/components/trip-info.js":
/*!*************************************!*\
  !*** ./src/components/trip-info.js ***!
  \*************************************/
/*! exports provided: createTripInfoTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripInfoTemplate", function() { return createTripInfoTemplate; });
const createTripInfoTemplate = () => (
  `<div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
    </div>`
);


/***/ }),

/***/ "./src/components/trip-list.js":
/*!*************************************!*\
  !*** ./src/components/trip-list.js ***!
  \*************************************/
/*! exports provided: createTripListTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripListTemplate", function() { return createTripListTemplate; });
const createTripListTemplate = () => (
  `<ul class="trip-days">
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>
  
      <ul class="trip-events__list">
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
            </div>
            <h3 class="event__title">Taxi to airport</h3>
  
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
              </p>
              <p class="event__duration">1H 30M</p>
            </div>
  
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">20</span>
            </p>
  
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              <li class="event__offer">
                <span class="event__offer-title">Order Uber</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">20</span>
               </li>
            </ul>
  
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
  
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/flight.png" alt="Event type icon">
            </div>
            <h3 class="event__title">Flight to Geneva</h3>
  
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-18T12:25">12:25</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-18T13:35">13:35</time>
              </p>
              <p class="event__duration">1H 30M</p>
            </div>
  
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">160</span>
            </p>
  
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              <li class="event__offer">
                <span class="event__offer-title">Add luggage</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">50</span>
               </li>
               <li class="event__offer">
                 <span class="event__offer-title">Switch to comfort</span>
                 &plus;
                 &euro;&nbsp;<span class="event__offer-price">80</span>
                </li>
            </ul>
  
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
  
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
            </div>
            <h3 class="event__title">Drive to Chamonix</h3>
  
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-18T14:30">14:30</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-18T16:05">16:05</time>
              </p>
              <p class="event__duration">1H 10M</p>
            </div>
  
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">160</span>
            </p>
  
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              <li class="event__offer">
                <span class="event__offer-title">Rent a car</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">200</span>
               </li>
            </ul>
  
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
  
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/check-in.png" alt="Event type icon">
            </div>
            <h3 class="event__title">Check into hotel</h3>
  
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-18T12:25">12:25</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-18T13:35">13:35</time>
              </p>
              <p class="event__duration">1H 30M</p>
            </div>
  
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">600</span>
            </p>
  
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              <li class="event__offer">
                <span class="event__offer-title">Add breakfast</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">50</span>
               </li>
            </ul>
  
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
      </ul>
    </li>
  
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">2</span>
        <time class="day__date" datetime="2019-03-19">MAR 19</time>
      </div>
  
      <ul class="trip-events__list">
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
            </div>
            <h3 class="event__title">Drive to Geneva</h3>
  
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-19T10:00">10:00</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-19T11:00">11:00</time>
              </p>
              <p class="event__duration">1H</p>
            </div>
  
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">20</span>
            </p>
  
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
  
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/sightseeing.png" alt="Event type icon">
            </div>
            <h3 class="event__title">Natural History Museum</h3>
  
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-19T11:20">11:20</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-19T13:00">13:00</time>
              </p>
              <p class="event__duration">1H 20M</p>
            </div>
  
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">50</span>
            </p>
  
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              <li class="event__offer">
                <span class="event__offer-title">Book tickets</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">40</span>
               </li>
               <li class="event__offer">
                 <span class="event__offer-title">Lunch in city</span>
                 &plus;
                 &euro;&nbsp;<span class="event__offer-price">30</span>
                </li>
            </ul>
  
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
  
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
            </div>
            <h3 class="event__title">Drive to Chamonix</h3>
  
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-19T18:00">18:00</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-19T19:00">19:00</time>
              </p>
              <p class="event__duration">1H</p>
            </div>
  
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">20</span>
            </p>
  
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
      </ul>
    </li>
  
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">3</span>
        <time class="day__date" datetime="2019-03-18">MAR 20</time>
      </div>
  
      <ul class="trip-events__list">
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
            </div>
            <h3 class="event__title">Drive to airport</h3>
  
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-20T08:25">08:25</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-20T09:25">09:25</time>
              </p>
              <p class="event__duration">1H</p>
            </div>
  
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">20</span>
            </p>
  
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
  
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/flight.png" alt="Event type icon">
            </div>
            <h3 class="event__title">Flight to Amsterdam</h3>
  
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-20T11:15">11:15</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-20T12:15">12:15</time>
              </p>
              <p class="event__duration">1H</p>
            </div>
  
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">180</span>
            </p>
  
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              <li class="event__offer">
                <span class="event__offer-title">Add luggage</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">30</span>
               </li>
               <li class="event__offer">
                 <span class="event__offer-title">Switch to comfort</span>
                 &plus;
                 &euro;&nbsp;<span class="event__offer-price">100</span>
                </li>
            </ul>
  
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
      </ul>
    </li>
  </ul>`
);


/***/ }),

/***/ "./src/components/trip-sort.js":
/*!*************************************!*\
  !*** ./src/components/trip-sort.js ***!
  \*************************************/
/*! exports provided: createTripSortTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripSortTemplate", function() { return createTripSortTemplate; });
const createTripSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">Day</span>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time">
        Time
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price">
        Price
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>

    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`
);


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_trip_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/trip-info */ "./src/components/trip-info.js");
/* harmony import */ var _components_trip_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/trip-controls */ "./src/components/trip-controls.js");
/* harmony import */ var _components_trip_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/trip-filters */ "./src/components/trip-filters.js");
/* harmony import */ var _components_trip_sort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/trip-sort */ "./src/components/trip-sort.js");
/* harmony import */ var _components_trip_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/trip-list */ "./src/components/trip-list.js");







const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripInfoBlock = document.querySelector(`.trip-info`);
render(tripInfoBlock, Object(_components_trip_info__WEBPACK_IMPORTED_MODULE_0__["createTripInfoTemplate"])(), `afterbegin`);

const tripControlsBlock = document.querySelector(`.trip-controls`);
render(tripControlsBlock, Object(_components_trip_controls__WEBPACK_IMPORTED_MODULE_1__["createTripControlsTabsTemplate"])(), `afterbegin`);
render(tripControlsBlock, Object(_components_trip_filters__WEBPACK_IMPORTED_MODULE_2__["createTripFiltersTemplate"])(), `beforeend`);

const tripEventsBlock = document.querySelector(`.trip-events`);
render(tripEventsBlock, Object(_components_trip_sort__WEBPACK_IMPORTED_MODULE_3__["createTripSortTemplate"])(), `afterbegin`);
render(tripEventsBlock, Object(_components_trip_list__WEBPACK_IMPORTED_MODULE_4__["createTripListTemplate"])(), `beforeend`);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map