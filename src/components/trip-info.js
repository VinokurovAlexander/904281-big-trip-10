import AbstractComponent from "./abstract-components";
import moment from "moment";

const DESTINATIONS_VIEW_LIMIT = 3;

export default class TripInfo extends AbstractComponent {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return this._createTripInfoTemplate();
  }

  _createTripInfoTemplate() {
    const data = this._getData();

    return (
      `<div class="trip-info__main">
      <h1 class="trip-info__title">${data.title}</h1>
      <p class="trip-info__dates">${data.date}</p>
    </div>`
    );
  }

  _getData() {
    const data = {
      title: ``,
      date: ``
    };

    const lastIndex = this._points.length - 1;

    data.title = `${this._points[0].destination} 
    ${this._points.length > (DESTINATIONS_VIEW_LIMIT - 1) ? `&mdash; ... &mdash;` : `&mdash;`} 
    ${this._points[lastIndex].destination}`;

    data.date = `${moment(this._points[0].calendar.start).format(`D MMM`)} - 
    ${moment(this._points[lastIndex].calendar.start).format(`D MMM`)}`;

    return data;
  }
}
