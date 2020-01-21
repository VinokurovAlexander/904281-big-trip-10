import AbstractComponent from "./abstract-components";
import moment from "moment";

export default class TripInfo extends AbstractComponent {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return this._createTripInfoTemplate();
  }

  _getData() {
    const data = {
      title: ``,
      date: ``
    };

    this._points.forEach((point, index, array) => {
      if (array.length <= 3) {
        if (index === array.length - 1) {
          data.title += `${point.destination}`;
        } else {
          data.title += `${point.destination} - `;
        }
      } else {
        if (index === 0) {
          data.title += `${point.destination} - ... - `;
        } else if (index === array.length - 1) {
          data.title += `${point.destination}`;
        }
      }

      if (array.length === 1) {
        data.date = `${moment(point.calendar.start).format(`D MMM`)} - 
        ${moment(point.calendar.end).format(`D MMM`)}`;
      } else {
        if (index === 0) {
          data.date = `${moment(point.calendar.start).format(`D MMM`)} - `;
        } else if (index === array.length - 1) {
          data.date += `${moment(point.calendar.end).format(`D MMM`)}`;
        }
      }
    });
    return data;
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
}
