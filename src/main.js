import TripInfo from "./components/trip-info";
import TripControlsTab from "./components/trip-controls";
import TripFilters from "./components/trip-filters";
import TripSort from "./components/trip-sort";
import TripList from "./components/trip-list";
import NoEvents from "./components/no-events";
import TripController from "./controllers/trip-controller";
import {generateEvents} from './mock/event';
import {controls} from "./mock/controls";
import {filters} from "./mock/filters";
import {sortItems} from "./mock/sort";
import {render, RenderPosition} from "./utils/render";

const EVENTS_COUNT = 2;
const points = generateEvents(EVENTS_COUNT);

const tripControlsBlock = document.querySelector(`.trip-controls`);
render(tripControlsBlock, new TripControlsTab(controls), RenderPosition.AFTERBEGIN);
render(tripControlsBlock, new TripFilters(filters), RenderPosition.BEFOREEND);
const tripEventsBlock = document.querySelector(`.trip-events`);

if (points.length === 0) {
  const noEventsComponent = new NoEvents();
  render(tripEventsBlock, noEventsComponent, RenderPosition.BEFOREEND);
} else {
  const tripInfoBlock = document.querySelector(`.trip-info`);
  render(tripInfoBlock, new TripInfo(), RenderPosition.AFTERBEGIN);
  render(tripEventsBlock, new TripSort(sortItems), RenderPosition.AFTERBEGIN);

  const tripList = new TripList();
  render(tripEventsBlock, tripList, RenderPosition.BEFOREEND);

  const eventList = tripList.getElement().querySelector(`.trip-events__list`);
  const tripController = new TripController(eventList, points);
  tripController.render();
}


