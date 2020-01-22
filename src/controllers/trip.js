import PointController from "./point";
import PointsComponent from "../components/points";
import {emptyPoint} from "../mock/event";
import {hiddenClass} from "../const";
import TripInfo from "../components/trip-info";
import {render, remove, RenderPosition} from "../utils/render";
import moment from "moment";
import DayItem from "../components/day-item";
import NoPoints from "../components/no-points";
import Sort from "../components/sort";

const tripInfoBlock = document.querySelector(`.trip-info`);

export default class TripController {
  constructor(container, pointsModel, api) {
    this._container = container;
    this._showedPointControllers = [];
    this._pointsModel = pointsModel;
    this._api = api;
    this._creatingPoint = null;
    this._tripInfoComponent = null;
    this._sortComponent = null;
    this._pointsContainerComponent = new PointsComponent();
    this._isDefaultSort = true;
    this._noPointsComponent = null;

    this._data = {
      destinations: pointsModel.getDestinations(),
      offers: pointsModel.getOffers()
    };

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
    render(this._container, this._pointsContainerComponent, RenderPosition.BEFOREEND);
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

          this._updatePoints();
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
    this._sortComponent = new Sort();
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);

    if (points.length === 0) {
      this._noPointsComponent = new NoPoints();
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {
      this._tripInfoComponent = new TripInfo(points);

      render(tripInfoBlock, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
      this._showedPointControllers = this._renderPoints(this._pointsContainerComponent.getElement(), points, this._data, this._onDataChange, this._onViewChange);

      this._sortComponent.setChangeSortHandler((sortType) => {
        let sortedPoints = [];

        switch (sortType) {
          case `event`:
            sortedPoints = this._pointsModel.getPoints();
            this._isDefaultSort = true;
            break;
          case `price`:
            sortedPoints = this._pointsModel.getPoints().sort((a, b) => b.price - a.price);
            this._isDefaultSort = false;
            break;
          case `time`:
            sortedPoints = this._pointsModel.getPoints().sort((a, b) => b.calendar.end - b.calendar.start - (a.calendar.end - a.calendar.start));
            this._isDefaultSort = false;
            break;
        }
        this._removePoints();
        this._showedPointControllers = this._renderPoints(this._pointsContainerComponent.getElement(), sortedPoints, this._data, this._onDataChange, this._onViewChange);

      });

      const tripFullPriceElement = tripInfoBlock.querySelector(`.trip-info__cost-value`);
      tripFullPriceElement.textContent = this._getFullPrice(points);
    }
  }

  _removePoints() {
    this._pointsContainerComponent.getElement().innerHTML = ``;
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _onFilterChange() {
    this._removePoints();
    this._showedPointControllers = this._renderPoints(this._pointsContainerComponent.getElement(), this._pointsModel.getPoints(), this._data, this._onDataChange, this._onViewChange);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new PointController(this._container, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(emptyPoint, this._data, `adding`);
  }

  show() {
    this._container.classList.remove(hiddenClass);
  }

  hide() {
    this._container.classList.add(hiddenClass);
  }

  _updatePoints() {
    this._removePoints();

    if (this._tripInfoComponent) {
      remove(this._tripInfoComponent);
    }

    if (this._sortComponent) {
      remove(this._sortComponent);
    }

    if (this._noPointsComponent) {
      remove(this._noPointsComponent);
    }

    this.render();
  }

  _getFullPrice(points) {
    return points.reduce((price, point) => price + point.price, 0);
  }

  _renderPoints(pointsContainer, points, data, onDataChange, onViewChange) {
    let showedPointControllers = [];

    const dates = this._isDefaultSort
      ? new Set(points.map((point) => moment(point.calendar.start).format(`YYYY-MM-DD`)))
      : [``];

    Array.from(dates).forEach((date, index) => {
      const dayItem = this._isDefaultSort ? new DayItem(date, index + 1) : new DayItem(null, ``);

      points.filter((point) => {
        return this._isDefaultSort ? moment(point.calendar.start).format(`YYYY-MM-DD`) === date : point;
      })
        .forEach((filterPoint) => {
          const pointsList = dayItem.getElement().querySelector(`.trip-events__list`);
          const pointController = new PointController(pointsList, onDataChange, onViewChange);
          pointController.render(filterPoint, data, `default`);
          showedPointControllers.push(pointController);
        });

      render(pointsContainer, dayItem, RenderPosition.BEFOREEND);
    });

    return showedPointControllers;
  }
}
