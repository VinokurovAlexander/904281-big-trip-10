import AbstractComponent from "./abstract-components";

export const filtersType = {
  ALL: {
    value: `All`,
    checked: `checked`
  },
  FUTURE: {
    value: `Future`,
    checked: ``
  },
  PAST: {
    value: `Past`,
    checked: ``
  },
};

const createTripFilterTemplate = (filter, index) => (
  `<div class="trip-filters__filter">
      <input id="filter-${index}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.value.toLowerCase()}" ${filter.checked}>
      <label class="trip-filters__filter-label" for="filter-${index}" data-filter="${filter.value}">${filter.value}</label>
    </div>`
);

const createTripFiltersListTemplate = () => {
  const filtersItems = Object.values(filtersType).map((filter, index) => createTripFilterTemplate(filter, index)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterComponent extends AbstractComponent {
  getTemplate() {
    return createTripFiltersListTemplate();
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `LABEL`) {
        const filter = evt.target.dataset.filter;
        handler(filter);
      }
    });
  }
}
