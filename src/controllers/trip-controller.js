import PointController from "./point-controller";
import {emptyPoint} from "../mock/event";
import {hiddenClass} from "../const";
import {controls} from "../mock/controls";

const renderPoints = (pointsContainer, points, onDataChange, onViewChange) => {
  return points.map((point) => {
    const pointController = new PointController(pointsContainer, onDataChange, onViewChange);
    pointController.render(point, `default`);
    return pointController;
  });
};

export default class TripController {
  constructor(container, rootElement, pointsModel, tripControls, statsComponent) {
    this._container = container;
    this._showedPointControllers = [];
    this._rootElement = rootElement;
    this._pointsModel = pointsModel;
    this._tripControls = tripControls;
    this._statsComponent = statsComponent;

    this._onControlTabsClick = this._onControlTabsClick.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _onDataChange(pointController, oldData, newData) {
    if (newData === null) {
      const isSuccess = this._pointsModel.removePoint(oldData.id);

      if (isSuccess) {
        pointController.destroy();
        this._removePoints();
        this.render();
      }
    } else if (oldData === null) {
      const newPoints = this._pointsModel.getPoints().unshift(newData);
      this._pointsModel.setPoints(newPoints);
      this._removePoints();
      this.render();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, `default`);
      }
    }
  }

  _onViewChange() {
    this._showedPointControllers.map((controller) => controller.setDefaultView());
  }

  render() {
    const points = this._pointsModel.getPoints();
    this._showedPointControllers = renderPoints(this._container, points, this._onDataChange, this._onViewChange);

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
    this._showedPointControllers = renderPoints(this._container, this._pointsModel.getPoints(), this._onDataChange, this._onViewChange);
  }

  getMaxId() {
    return Math.max(...this._pointsModel.getPoints().map((point) => point.id));
  }

  createPoint() {
    const newPointController = new PointController(this._container, this._onDataChange, this._onViewChange);
    const newPointId = this.getMaxId() + 1;
    const newPointMock = emptyPoint(newPointId);
    this._pointsModel.getPoints().push(newPointMock);
    newPointController.render(newPointMock, `adding`);
    this._showedPointControllers.push(newPointController);
  }

  _show() {
    this._rootElement.classList.remove(hiddenClass);
  }

  _hide() {
    this._rootElement.classList.add(hiddenClass);
  }
}
