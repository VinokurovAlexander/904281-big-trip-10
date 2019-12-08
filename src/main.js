import {createTripInfoTemplate} from './components/trip-info';
import {createTripControlsTabsTemplate} from './components/trip-controls';
import {createTripFiltersListTemplate} from './components/trip-filters';
import {createTripSortListTemplate} from './components/trip-sort';
import {createEventListTemplate} from './components/trip-list';
import {generateEvents} from './mock/event';
import {controls} from "./mock/controls";
import {filters} from "./mock/filters";
import {sortItems} from "./mock/sort";
import {render, RenderPosition} from "./utils/render";

const EVENTS_COUNT = 3;
const events = generateEvents(EVENTS_COUNT);

const tripInfoBlock = document.querySelector(`.trip-info`);
render(tripInfoBlock, createTripInfoTemplate(), `afterbegin`);

const tripControlsBlock = document.querySelector(`.trip-controls`);
render(tripControlsBlock, createTripControlsTabsTemplate(controls), `afterbegin`);
render(tripControlsBlock, createTripFiltersListTemplate(filters), `beforeend`);

const tripEventsBlock = document.querySelector(`.trip-events`);
render(tripEventsBlock, createTripSortListTemplate(sortItems), `afterbegin`);

render(tripEventsBlock, createEventListTemplate(events), `beforeend`);
