import PointController from "./point";
import PointsComponent from "../components/points";
import {getEventType} from "../models/point";
import {HIDDEN_CLASS, SortTypes} from "../const";
import TripInfo from "../components/trip-info";
import {render, remove, RenderPosition} from "../utils/render";
import moment from "moment";
import DayItem from "../components/day-item";
import NoPoints from "../components/no-points";
import Sort from "../components/sort";
import {getDuration} from "../utils/date";

export const emptyPoint = {
  destination: ``,
  type: getEventType(`flight`),
  price: ``,
  description: ``,
  images: [],
  offers: [],
  calendar: {
    start: new Date(),
    end: new Date(),
    duration: getDuration(new Date(), new Date())
  },
  isFavorite: false,
};

export default class TripController {
  constructor(container, pointsModel, api) {
    this._container = container;
    this._showedPointControllers = [];
    this._pointsModel = pointsModel;
    this._api = api;
    this._creatingPoint = null;
    this._tripInfoComponent = null;
    this._sortComponent = null;
    this._noPointsComponent = null;
    this._filterController = null;
    this._pointsContainerComponent = new PointsComponent();

    this._isDefaultSort = true;
    this._activeSort = SortTypes.EVENT;

    this._data = {
      destinations: pointsModel.getDestinations(),
      offers: pointsModel.getOffers()
    };

    this._setDataChange = this._setDataChange.bind(this);
    this._setViewChange = this._setViewChange.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._sortChange = this._sortChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._filterChangeHandler);
    render(this._container, this._pointsContainerComponent, RenderPosition.BEFOREEND);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  render() {
    const points = this._pointsModel.getPoints();

    if (points.length === 0) {
      this._noPointsComponent = new NoPoints();
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._sortComponent = new Sort(this._activeSort);
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);

    const tripInfoBlock = document.querySelector(`.trip-info`);
    this._tripInfoComponent = new TripInfo(points);
    render(tripInfoBlock, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    this._sortComponent.setChangeSortHandler(this._sortChange);
    this._sortChange(this._activeSort);

    const tripFullPriceElement = tripInfoBlock.querySelector(`.trip-info__cost-value`);
    tripFullPriceElement.textContent = this._getFullPrice(points);
  }

  createPoint() {
    if (this._creatingPoint) {
      this._creatingPoint.destroy();
    }

    this._creatingPoint = new PointController(this._container, this._setDataChange, this._setViewChange);
    this._creatingPoint.render(emptyPoint, this._data, `adding`);
    this._showedPointControllers.push(this._creatingPoint);
  }

  _setDataChange(pointController, oldData, newData) {
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

  _setViewChange() {
    this._showedPointControllers.map((controller) => controller.setDefaultView());
  }

  _sortChange(sortType) {
    let sortedPoints = [];

    switch (sortType) {
      case SortTypes.EVENT:
        sortedPoints = this._pointsModel.getPoints().sort((a, b) => a.calendar.start - b.calendar.start);
        this._isDefaultSort = true;
        this._activeSort = SortTypes.EVENT;
        break;
      case SortTypes.PRICE:
        sortedPoints = this._pointsModel.getPoints().sort((a, b) => b.price - a.price);
        this._isDefaultSort = false;
        this._activeSort = SortTypes.PRICE;
        break;
      case SortTypes.TIME:
        sortedPoints = this._pointsModel.getPoints().sort((a, b) => b.calendar.end - b.calendar.start - (a.calendar.end - a.calendar.start));
        this._isDefaultSort = false;
        this._activeSort = SortTypes.TIME;
        break;
    }
    this._removePoints();
    this._showedPointControllers = this._renderPoints(this._pointsContainerComponent.getElement(), sortedPoints, this._data, this._setDataChange, this._setViewChange);
  }

  _removePoints() {
    this._pointsContainerComponent.getElement().innerHTML = ``;
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _renderPoints(pointsContainer, points, data, setDataChange, setViewChange) {
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
          const pointController = new PointController(pointsList, setDataChange, setViewChange);
          pointController.render(filterPoint, data, `default`);
          showedPointControllers.push(pointController);
        });

      render(pointsContainer, dayItem, RenderPosition.BEFOREEND);
    });

    return showedPointControllers;
  }

  _getPointPrice(point) {
    const offersPrice = point.offers
      .filter((offer) => offer.checked === true)
      .reduce((price, offer) => price + offer.price, 0);

    return point.price + offersPrice;
  }

  _getFullPrice(points) {
    return points.reduce((price, point) => price + this._getPointPrice(point), 0);
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

    if (this._filterController) {
      this._filterController.destroy();
    }

    this.render();
  }

  _filterChangeHandler() {
    this._updatePoints();
  }
}
