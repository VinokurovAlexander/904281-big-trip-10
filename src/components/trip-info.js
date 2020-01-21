import AbstractComponent from "./abstract-components";
import moment from "moment";

export default class TripInfo extends AbstractComponent {
  constructor(model) {
    super();

    this._model = model;
  }

  getTemplate() {
    return this._createTripInfoTemplate();
  }

  _getData() {
    const points = this._model.getPoints();
    const data = {
      title: ``,
      date: ``
    };

    points.forEach((point, index, array) => {
      if (array.length <= 3) {
        if (index === array.length - 1) {
          data.title += `${point.destination}`;
        } else {
          data.title += `${point.destination} - `;
        }
      } else {
        if (index === 0) {
          data.title += `${point.destination} - ... - `;
        } else if (index === points.length - 1) {
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
