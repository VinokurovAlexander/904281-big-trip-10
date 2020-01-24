import PointComponent from "../components/point";
import Form from "../components/form";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {isEscEvent} from "../utils/esc-key";
import he from "he";
import Point from "../models/point";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`
};

const SHAKE_ANIMATION_TIMEOUT = 600;

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

    this._pointEditComponent.reset();
    replace(this._pointComponent, this._pointEditComponent);

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (this._mode === Mode.ADDING) {
      isEscEvent(evt, () => remove(this._pointEditComponent));
    } else {
      isEscEvent(evt, this._replaceEditToPoint);
    }
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._replaceEditToPoint();
    } else if (this._mode === Mode.ADDING) {
      remove(this._pointEditComponent);
    }
  }

  render(point, data, mode) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;

    this._pointComponent = new PointComponent(point);
    this._pointEditComponent = new Form(point, data.destinations, data.offers);

    this._pointComponent.setOpenFormHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      this._pointEditComponent.setData({
        submitBtnText: `Saving...`
      });

      this._pointEditComponent.disableButtons(true);

      const oldData = point;
      const formData = this._pointEditComponent.getData(evt.target);
      const id = this._pointEditComponent.id;
      const newData = this._parseFormData(formData, id);
      this._onDataChange(this, oldData, newData);
    });

    this._pointEditComponent.setDeleteBtnClickHandler(() => {
      this._pointEditComponent.setData({
        deleteBtnText: `Deleting...`
      });
      this._pointEditComponent.disableButtons(true);
      this._onDataChange(this, point, null);
    });

    this._pointEditComponent.setRollupBtnClickHandler(() => {
      this._replaceEditToPoint();
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

  shake() {
    this._pointEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._pointEditComponent.getElement().style.animation = ``;
      this._pointEditComponent.disableButtons(false);

      this._pointEditComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
