import TripInfo from "./components/trip-info";
import TripControlsTab from "./components/trip-controls";
import TripFilters from "./components/trip-filters";
import TripSort from "./components/trip-sort";
import Event from "./components/event";
import EventForm from "./components/event-form";
import TripList from "./components/trip-list";
import {generateEvents} from './mock/event';
import {controls} from "./mock/controls";
import {filters} from "./mock/filters";
import {sortItems} from "./mock/sort";
import {render, RenderPosition} from "./utils/render";

const EVENTS_COUNT = 3;
const events = generateEvents(EVENTS_COUNT);
const tripList = new TripList();

const tripInfoBlock = document.querySelector(`.trip-info`);
render(tripInfoBlock, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);

const tripControlsBlock = document.querySelector(`.trip-controls`);
render(tripControlsBlock, new TripControlsTab(controls).getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsBlock, new TripFilters(filters).getElement(), RenderPosition.BEFOREEND);

const tripEventsBlock = document.querySelector(`.trip-events`);
render(tripEventsBlock, new TripSort(sortItems).getElement(), RenderPosition.AFTERBEGIN);

render(tripEventsBlock, tripList.getElement(), RenderPosition.BEFOREEND);
const eventList = tripList.getElement().querySelector(`.trip-events__list`);

const renderEvent = (eventObj) => {
  const eventComponent = new Event(eventObj);
  const eventForm = new EventForm(eventObj);

  const eventItem = eventComponent.getElement();
  const event = eventItem.querySelector(`.event`);
  const openFormBtn = eventItem.querySelector(`.event__rollup-btn`);
  const form = eventForm.getElement();

  openFormBtn.addEventListener(`click`, () => {
    eventItem.replaceChild(form, event);
  });

  form.addEventListener(`submit`, () => {
    eventItem.replaceChild(event, form);
  });

  render(eventList, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

events.forEach((event) => {
  renderEvent(event);
});


