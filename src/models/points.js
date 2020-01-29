import {FiltersType} from "../components/filter";
import {getPointsByFilter} from "../utils/filter";

export default class PointsModel {
  constructor() {
    this._points = [];
    this._destinations = [];
    this._offers = [];

    this._activeFilter = FiltersType.ALL;
    this._filterChangeHandler = [];
  }

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilter);
  }

  getDestinations() {
    return this._destinations;
  }

  getOffers() {
    return this._offers;
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  setDestinations(destinations) {
    this._destinations = Array.from(destinations);
  }

  setOffers(offers) {
    this._offers = Array.from(offers);
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._filterChangeHandler.forEach((handler) => handler());
  }

  addPoint(point) {
    this._points.unshift(point);
  }

  updatePoint(id, newPoint) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), newPoint, this._points.slice(index + 1));

    return true;
  }

  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points.splice(index, 1);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandler.push(handler);
  }
}
