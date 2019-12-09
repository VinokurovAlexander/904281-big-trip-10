import {createElement} from "../utils/utils";

const createTripFilterTemplate = (filter) => (
  `<div class="trip-filters__filter">
      <input id="filter-${filter.value.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.value}.toLowerCase()" ${filter.checked}>
      <label class="trip-filters__filter-label" for="filter-${filter.value}">${filter.value}</label>
    </div>`
);

const createTripFiltersListTemplate = (filters) => {
  const filtersItems = filters.map((filter) => createTripFilterTemplate(filter)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class TripFilters {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createTripFiltersListTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
