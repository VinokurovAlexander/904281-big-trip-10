import AbstractComponent from "./abstract-components";
import {SortTypes} from "../const";

const createTripSortItemTemplate = (sortType, activeSort, index) => (
  `<div class="trip-sort__item  trip-sort__item--${sortType.toLowerCase()}">
    <input id="sort-${index}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" 
        value="sort-${sortType.toLowerCase()}" 
        ${sortType === activeSort ? `checked` : ``}>
    <label class="trip-sort__btn" for="sort-${index}" data-sort="${sortType}">
      ${sortType}
      <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
        <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
      </svg>
    </label>
  </div>`
);

const createTripSortListTemplate = (activeSort) => {
  const tripSortItems = Object.values(SortTypes).map((sortItem, index) => createTripSortItemTemplate(sortItem, activeSort, index)).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      ${tripSortItems}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class Sort extends AbstractComponent {
  constructor(sortType) {
    super();

    this._sortType = sortType;
  }

  getTemplate() {
    return createTripSortListTemplate(this._sortType);
  }

  setChangeSortHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `LABEL`) {
        const sortType = evt.target.dataset.sort;
        if (sortType !== this._sortType) {
          this._sortType = sortType;
          handler(this._sortType);
        }
      }
    });
  }
}
