import PointController from "./point-controller";

const renderPoints = (pointsContainer, points, onDataChange) => {
  points.forEach((point) => {
    const pointController = new PointController(pointsContainer, onDataChange);
    pointController.render(point);
  });
};

export default class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }


    this._points[index] = newData;
    pointController.render(newData);
  }

  render() {
    renderPoints(this._container, this._points, this._onDataChange.bind(this));
  }
}
