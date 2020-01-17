import Event from "../components/event";
import EventForm from "../components/event-form";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {isEscEvent} from "../utils/esc-key";
import he from "he";
import Point from "../models/point";

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

  render(point, data, mode) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;

    this._pointComponent = new Event(point);
    this._pointEditComponent = new EventForm(point, data.destinations, data.offers);

    this._pointComponent.setOpenFormHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      const oldData = point;
      const formData = this._pointEditComponent.getData(evt.target);
      const id = this._pointEditComponent.id;
      const newData = this._parseFormData(formData, id);
      this._onDataChange(this, oldData, newData);

      this._replaceEditToPoint();
    });

    this._pointEditComponent.setFavoriteBtnClickHandler(() => {
      const newPoint = Point.clone(point);
      newPoint.isFavorite = !newPoint.isFavorite;

      this._onDataChange(this, point, newPoint);
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

  _parseFormData(formData, id) {
    const pointType = formData.get(`event-type`);

    let formOffers = [];
    this._pointEditComponent.allOffers.forEach((offer) => {
      if (offer.type === pointType) {
        formOffers = offer.offers;
      }
    });

    const formDestination = formData.get(`event-destination`);
    let formImages = [];
    let pointDescription = ``;
    this._pointEditComponent.destinations.forEach((destination) => {
      if (destination.name === formDestination) {
        formImages = destination.pictures;
        pointDescription = destination.description;
      }
    });

    const startDate = he.encode(formData.get(`event-start-time`));
    const endDate = he.encode(formData.get(`event-end-time`));

    return new Point({
      'id': id,
      'type': pointType,
      'destination': {
        'name': formDestination,
        'pictures': formImages,
        'description': pointDescription
      },
      'base_price': he.encode(formData.get(`event-price`)),
      'offers': formOffers,
      'is_favorite': formData.get(`event-favorite`) === `on`,
      'date_from': startDate,
      'date_to': endDate
    });
  }
}