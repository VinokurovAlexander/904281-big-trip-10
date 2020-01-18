import PointController from "./point";
import {emptyPoint} from "../mock/event";
import {hiddenClass} from "../const";
import {controls} from "../mock/controls";

const renderPoints = (pointsContainer, points, data, onDataChange, onViewChange) => {
  return points.map((point) => {
    const pointController = new PointController(pointsContainer, onDataChange, onViewChange);
    pointController.render(point, data, `default`);

    return pointController;
  });
};

export default class TripController {
  constructor(container, rootElement, pointsModel, tripControls, statsComponent, api) {
    this._container = container;
    this._showedPointControllers = [];
    this._rootElement = rootElement;
    this._pointsModel = pointsModel;
    this._tripControls = tripControls;
    this._statsComponent = statsComponent;
    this._api = api;
    this._creatingPoint = null;

    this._data = {
      destinations: pointsModel.getDestinations(),
      offers: pointsModel.getOffers()
    };

    this._onControlTabsClick = this._onControlTabsClick.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === emptyPoint) {
      const destroyedPoint = this._creatingPoint;
      this._creatingPoint = null;

      if (newData === null) {
        pointController.destroy();
      } else {
        this._api.addPoint(newData)
          .then((newPointModel) => {
            this._pointsModel.addPoint(newPointModel);
            pointController.render(newPointModel, this._data, `default`);
            destroyedPoint.destroy();
            this._updatePoints();
          })
          .catch(() => pointController.shake());
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          const isSuccess = this._pointsModel.removePoint(oldData.id);

          if (isSuccess) {
            pointController.destroy();
          }
        })
        .catch(() => pointController.shake());
    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((newPoint) => {
          const isSuccess = this._pointsModel.updatePoint(oldData.id, newPoint);
          if (isSuccess) {
            pointController.render(newPoint, this._data, `default`);
          }
          this._updatePoints();
        })
        .catch(() => pointController.shake());
    }
  }

  _onViewChange() {
    this._showedPointControllers.map((controller) => controller.setDefaultView());
  }

  render() {
    const points = this._pointsModel.getPoints();

    this._showedPointControllers = renderPoints(this._container, points, this._data, this._onDataChange, this._onViewChange);

    this._setHandlers();
  }

  _setHandlers() {
    this._tripControls.setClickHandler(this._onControlTabsClick);
  }

  _onControlTabsClick(type) {
    switch (type) {
      case controls.STATS.title:
        this._hide();
        this._statsComponent.show();
        break;
      case controls.TABLE.title:
        this._show();
        this._statsComponent.hide();
        break;
    }
  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _onFilterChange() {
    this._removePoints();
    this._showedPointControllers = renderPoints(this._container, this._pointsModel.getPoints(), this._data, this._onDataChange, this._onViewChange);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new PointController(this._container, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(emptyPoint, this._data, `adding`);
  }

  _show() {
    this._rootElement.classList.remove(hiddenClass);
  }

  _hide() {
    this._rootElement.classList.add(hiddenClass);
  }

  _updatePoints() {
    this._removePoints();
    this.render();
  }
}
