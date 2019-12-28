import Event from "../components/event";
import EventForm from "../components/event-form";
import {render, RenderPosition, replace} from "../utils/render";
import {isEscEvent} from "../utils/esc-key";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._replaceEditToPoint = this._replaceEditToPoint.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _replacePointToEdit() {
    this._onViewChange();

    replace(this._pointEditComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._pointComponent, this._pointEditComponent);

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    isEscEvent(evt, this._replaceEditToPoint);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  render(point) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;


    this._pointComponent = new Event(point);
    this._pointEditComponent = new EventForm(point);

    this._pointComponent.setOpenFormHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._pointEditComponent.getOldData();
      this._replaceEditToPoint();
    });

    this._pointEditComponent.setFavoriteBtnClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite,
      }));
    });

    if (oldPointComponent && oldPointEditComponent) {
      replace(this._pointComponent, oldPointComponent);
      replace(this._pointEditComponent, oldPointEditComponent);
    } else {
      render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
    }
  }
}
