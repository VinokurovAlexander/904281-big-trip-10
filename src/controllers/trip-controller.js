import PointController from "./point-controller";

const renderPoints = (pointsContainer, points, onDataChange, onViewChange) => {
  return points.map((point) => {
    const pointController = new PointController(pointsContainer, onDataChange, onViewChange);
    pointController.render(point);
    return pointController;
  });
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._showedPointControllers = [];

    this._pointsModel = pointsModel;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _onDataChange(pointController, oldData, newData) {
    if (newData === null) {
      const isSuccess = this._pointsModel.removePoint(oldData.id);

      if (isSuccess) {
        this._removePoints();
        this.render();
      }
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData);
      }
    }
  }

  _onViewChange() {
    this._showedPointControllers.map((controller) => controller.setDefaultView());
  }

  render() {
    const points = this._pointsModel.getPoints();
    this._showedPointControllers = renderPoints(this._container, points, this._onDataChange, this._onViewChange);
  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _onFilterChange() {
    this._removePoints();
    this._showedPointControllers = renderPoints(this._container, this._pointsModel.getPoints(), this._onDataChange, this._onViewChange);
  }
}
