const createTripSortItemTemplate = (sortItem) => (
  `<div class="trip-sort__item  trip-sort__item--${sortItem.value.toLowerCase()}">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortItem.value.toLowerCase()}" ${sortItem.isChecked}>
    <label class="trip-sort__btn" for="sort-${sortItem.value.toLowerCase()}">
      ${sortItem.value}
      <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
        <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
      </svg>
    </label>
  </div>`
);

const createTripSortListTemplate = (sortList) => {
  const tripSortItems = sortList.map((sortItem) => createTripSortItemTemplate(sortItem)).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      ${tripSortItems}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};


export {createTripSortListTemplate};