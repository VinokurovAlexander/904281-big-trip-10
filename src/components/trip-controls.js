import AbstractComponent from "./abstract-components";
import {controls} from "../mock/controls";

const createControlsTabTemplate = (control) => (
  `<a class="trip-tabs__btn ${control.isActive}" href=" ${control.href} ">${control.title}</a>`
);

const createTripControlsTabsTemplate = () => {
  const controlsList = Object.values(controls).map((control) => createControlsTabTemplate(control)).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${controlsList}
    </nav>`
  );
};

export default class TripControlsTab extends AbstractComponent {
  getTemplate() {
    return createTripControlsTabsTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        const clickedControl = evt.target.textContent;
        handler(clickedControl);
      }
    });
  }
}


