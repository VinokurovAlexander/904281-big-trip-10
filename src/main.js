import TripInfo from "./components/trip-info";
import TripControlsTab from "./components/trip-controls";
import TripList from "./components/trip-list";
import NoEvents from "./components/no-events";
import TripController from "./controllers/trip-controller";
import {generateEvents, EVENTS_COUNT} from './mock/event';
import {controls} from "./mock/controls";
import {render, RenderPosition} from "./utils/render";
import Points from "./models/points";
import FilterController from "./controllers/filter";
import Stats from "./components/stats";

const points = generateEvents(EVENTS_COUNT);

const pointsModel = new Points();
pointsModel.setPoints(points);

const tripControlsBlock = document.querySelector(`.trip-controls`);
render(tripControlsBlock, new TripControlsTab(controls), RenderPosition.AFTERBEGIN);
const tripEventsBlock = document.querySelector(`.trip-events`);

const filterController = new FilterController(tripControlsBlock, pointsModel);
filterController.render();

if (points.length === 0) {
  const noEventsComponent = new NoEvents();
  render(tripEventsBlock, noEventsComponent, RenderPosition.BEFOREEND);
} else {
  const tripInfoBlock = document.querySelector(`.trip-info`);
  render(tripInfoBlock, new TripInfo(), RenderPosition.AFTERBEGIN);

  const tripList = new TripList();
  render(tripEventsBlock, tripList, RenderPosition.BEFOREEND);

  const eventList = tripList.getElement().querySelector(`.trip-events__list`);
  const rootEventsElement = document.querySelector(`.trip-events`);
  const tripController = new TripController(eventList, pointsModel, rootEventsElement);
  tripController.render();
  tripController.getMaxId();

  document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
    tripController.createPoint();
  });

  const pageBodyContainer = document.querySelector(`.page-main .page-body__container`);
  render(pageBodyContainer, new Stats(), RenderPosition.BEFOREEND);
}


