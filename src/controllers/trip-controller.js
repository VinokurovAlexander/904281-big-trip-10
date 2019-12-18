import Event from "../components/event";
import EventForm from "../components/event-form";
import {render, RenderPosition, replace} from "../utils/render";
import {isEscEvent} from "../utils/esc-key";

const renderEvent = (container, event) => {
  const eventComponent = new Event(event);
  const eventForm = new EventForm(event);

  const replaceEventToForm = () => {
    replace(eventForm, eventComponent);
  };

  const replaceFormToEvent = () => {
    replace(eventComponent, eventForm);
  };

  const onEscKeyDown = (evt) => {
    isEscEvent(evt, replaceFormToEvent);
  };

  eventComponent.setOpenFormHandler(() => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  eventForm.setSubmitHandler(replaceFormToEvent);

  render(container, eventComponent, RenderPosition.BEFOREEND);
};

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(events) {
    events.forEach((event) => renderEvent(this._container, event));
  }
}
