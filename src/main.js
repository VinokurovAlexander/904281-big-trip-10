import {createTripInfoTemplate} from './components/trip-info';
import {createTripControlsTabsTemplate} from './components/trip-controls';
import {createTripFiltersTemplate} from './components/trip-filters';
import {createTripSortTemplate} from './components/trip-sort';
import {createTripListTemplate} from './components/trip-list';


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripInfoBlock = document.querySelector(`.trip-info`);
render(tripInfoBlock, createTripInfoTemplate(), `afterbegin`);

const tripControlsBlock = document.querySelector(`.trip-controls`);
render(tripControlsBlock, createTripControlsTabsTemplate(), `afterbegin`);
render(tripControlsBlock, createTripFiltersTemplate(), `beforeend`);

const tripEventsBlock = document.querySelector(`.trip-events`);
render(tripEventsBlock, createTripSortTemplate(), `afterbegin`);
render(tripEventsBlock, createTripListTemplate(), `beforeend`);
