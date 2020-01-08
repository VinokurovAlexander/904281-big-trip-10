import {filtersType} from "../mock/filters";
import {getPointsByFilter} from "../utils/filter";

export default class Points {
  constructor() {
    this._points = [];

    this._activeFilter = filtersType.ALL;
    this._filterChangeHandler = [];
  }

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilter);
  }

  setPoints(points) {
    this._points = Array.from(points);
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

  setFilter(filter) {
    this._activeFilter = filter;
    this._filterChangeHandler.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandler.push(handler);
  }
}