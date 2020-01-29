import AbstractComponent from "./abstract-components";

export const FiltersType = {
  ALL: `All`,
  FUTURE: `Future`,
  PAST: `Past`
};

const createTripFilterTemplate = (filter, index, activeFilter) => (
  `<div class="trip-filters__filter">
      <input id="filter-${index}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" 
          value="${filter.toLowerCase()}" 
          ${activeFilter === filter ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${index}" data-filter="${filter}">${filter}</label>
    </div>`
);

const createTripFiltersListTemplate = (activeFilter) => {
  const filtersItems = Object.values(FiltersType).map((filter, index) => createTripFilterTemplate(filter, index, activeFilter)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterComponent extends AbstractComponent {
  constructor(activeFilter) {
    super();

    this._activeFitler = activeFilter;
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `LABEL`) {
        const filter = evt.target.dataset.filter;
        handler(filter);
      }
    });
  }

  getTemplate() {
    return createTripFiltersListTemplate(this._activeFitler);
  }
}
