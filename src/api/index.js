import Point from "../models/point";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const SuccessStatusCodeRange = {
  MIN: 200,
  MAX: 300
};

const checkStatus = (response) => {
  if (response.status >= SuccessStatusCodeRange.MIN && response.status < SuccessStatusCodeRange.MAX) {
    return response;
  }

  return new Error(`${response.status}: ${response.statusText}`);
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  _getData(address) {
    return this._load({url: address})
      .then((response) => response.json());
  }

  getPoints() {
    return this._getData(`points`)
      .then(Point.parsePoints);
  }

  getDestinations() {
    return this._getData(`destinations`);
  }

  getOffers() {
    return this._getData(`offers`);
  }

  updatePoint(id, data) {
    return this._addData(Method.PUT, data, id);
  }

  addPoint(data) {
    return this._addData(Method.POST, data);
  }

  deletePoint(id) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE,
    });
  }

  sync(data) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  _addData(httpMethod, data, id = ``) {
    return this._load({
      url: `points/${id}`,
      method: httpMethod,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }
}
