import Event from "../components/event";
import EventForm from "../components/event-form";
import {render, RenderPosition, replace} from "../utils/render";
import {isEscEvent} from "../utils/esc-key";

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._onDataChange = onDataChange;
  }

  _replacePointToEdit() {
    replace(this._pointEditComponent, this._pointComponent);
  }

  _replaceEditToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
  }

  _onEscKeyDown(evt) {
    isEscEvent(evt, this._replaceEditToPoint.bind(this));
  }

  render(point) {
    this._pointComponent = new Event(point);
    this._pointEditComponent = new EventForm(point);

    this._pointComponent.setOpenFormHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown.bind(this));
    });

    this._pointEditComponent.setSubmitHandler(this._replaceEditToPoint.bind(this));

    this._pointEditComponent.setFavoriteBtnClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite,
      }));
    });

    render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
  }
}
