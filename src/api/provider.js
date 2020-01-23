import Point from "../models/point";
import nanoid from "nanoid";

const getSyncedPoints = (items) => items.filter(({success}) => success).map(({payload}) => payload.point);

export default class Provider {
  constructor(api, storage) {
    this._api = api;
    this._storage = storage;
    this._isSynchronized = true;
  }

  addPoint(data) {
    if (this._isOnline()) {
      return this._api.addPoint(data)
        .then((newPoint) => {
          this._storage.setItem(`points`, [...this._storage.getAll().points, newPoint.toRAW()]);

          return newPoint;
        });
    }

    const offlineNewPointId = nanoid();
    const offlineNewPoint = Point.parsePoint(Object.assign({}, data.toRAW(), {id: offlineNewPointId}));

    this._storage.setItem(`points`, [...this._storage.getAll().points, offlineNewPoint.toRAW()]);
    this._isSynchronized = false;

    return Promise.resolve(offlineNewPoint);
  }

  getPoints() {
    if (this._isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const rawPoints = points.map((point) => point.toRAW());
          this._storage.setItem(`points`, rawPoints);

          return points;
        });
    }

    const storePoints = this._storage.getAll().points;

    this._isSynchronized = false;
    return Promise.resolve(Point.parsePoints(storePoints));
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._storage.setItem(`destinations`, destinations);

          return destinations;
        });
    }

    const storeDestination = this._storage.getAll().destinations;

    this._isSynchronized = false;

    return Promise.resolve(storeDestination);
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._storage.setItem(`offers`, offers);

          return offers;
        });
    }

    const storeOffers = this._storage.getAll().offers;

    this._isSynchronized = false;

    return Promise.resolve(storeOffers);
  }

  updatePoint(id, data) {
    if (this._isOnline()) {
      return this._api.updatePoint(id, data)
        .then((newPoint) => {
          this._storage.setItem(`points`, [...this._storage.getAll().points, newPoint.toRAW()]);

          return newPoint;
        });
    }

    const offlineUpdatePoint = Point.parsePoint(Object.assign({}, data.toRAW(), {offline: true}));
    this._storage.setItem(`points`, [...this._storage.getAll().points, offlineUpdatePoint.toRAW()]);

    this._isSynchronized = false;

    return Promise.resolve(offlineUpdatePoint);
  }

  deletePoint(id) {
    if (this._isOnline()) {
      return this._api.deletePoint(id)
        .then(() => this._storage.deletePoint(id));
    }

    this._storage.deletePoint(id);

    this._isSynchronized = false;

    return Promise.resolve();
  }

  _isOnline() {
    return window.navigator.onLine;
  }

  getSynchronize() {
    return this._isSynchronized;
  }

  sync() {
    if (this._isOnline()) {
      const storePoints = this._storage.getAll().points;

      return this._api.sync(storePoints)
        .then((response) => {
          storePoints.filter((point) => point.offline)
            .forEach((point) => this._storage.removeItem(point.id));

          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          this._storage.setItem(`points`, [...createdPoints, ...updatedPoints]);

          this._isSynchronized = true;

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
