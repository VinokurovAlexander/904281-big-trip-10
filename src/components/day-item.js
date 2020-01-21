import AbstractComponent from "./abstract-components";
import moment from "moment";

export const createDayItemTemplate = (date, index) => {
  return (
    `<li class="trip-days__item  day">
       <div class="day__info">
         <span class="day__counter">${index}</span>
         <time class="day__date" datetime="date">${date ? moment(date).format(`D MMM`) : ``}</time>
       </div>
       <ul class="trip-events__list">
       </ul>
     </li>`
  );
};

export default class DayItem extends AbstractComponent {
  constructor(date, index) {
    super();

    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createDayItemTemplate(this._date, this._index);
  }
}


