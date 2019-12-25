import PointController from "./point-controller";

const renderPoints = (pointsContainer, points, onDataChange, onViewChange) => {
  return points.map((point) => {
    const pointController = new PointController(pointsContainer, onDataChange, onViewChange);
    pointController.render(point);
    return pointController;
  });
};

export default class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._showedPointControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._points[index] = newData;
    pointController.render(newData);
  }

  _onViewChange() {
    this._showedPointControllers.map((controller) => controller.setDefaultView());
  }

  render() {
    this._showedPointControllers = renderPoints(this._container, this._points, this._onDataChange, this._onViewChange);
  }
}
