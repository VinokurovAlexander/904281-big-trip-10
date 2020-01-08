import Event from "../components/event";
import EventForm from "../components/event-form";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {isEscEvent} from "../utils/esc-key";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`
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
    if (this._mode === Mode.ADDING) {
      isEscEvent(evt, () => remove(this._pointEditComponent));
    } else {
      isEscEvent(evt, this._pointEditComponent.reset.bind(this._pointEditComponent));
      isEscEvent(evt, this._replaceEditToPoint);
    }
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._pointEditComponent.reset();
      this._replaceEditToPoint();
    } else if (this._mode === Mode.ADDING) {
      remove(this._pointEditComponent);
    }
  }

  render(point, mode) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;

    this._pointComponent = new Event(point);
    this._pointEditComponent = new EventForm(point);

    this._pointComponent.setOpenFormHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      const oldData = point;
      const newData = this._pointEditComponent.getData(evt.target);
      this._onDataChange(this, oldData, newData);

      this._replaceEditToPoint();
    });

    this._pointEditComponent.setFavoriteBtnClickHandler(() => {
      this._pointEditComponent._eventIsFavorite = !this._pointEditComponent._eventIsFavorite;
      this._pointEditComponent.rerender();
    });

    this._pointEditComponent.setDeleteBtnClickHandler(() => {
      this._onDataChange(this, point, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldPointComponent && oldPointEditComponent) {
          replace(this._pointComponent, oldPointComponent);
          replace(this._pointEditComponent, oldPointEditComponent);
        } else {
          render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        render(this._container, this._pointComponent, RenderPosition.AFTERBEGIN);
        this._replacePointToEdit();
        document.addEventListener(`keydown`, this._onEscKeyDown);
        this._mode = Mode.ADDING;
    }
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
