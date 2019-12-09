import {createElement} from "../utils/utils";

const createControlsTabTemplate = (control) => (
  `<a class="trip-tabs__btn ${control.isActive}"
      href=" ${control.href} ">
      ${control.title}
  </a>`
);

const createTripControlsTabsTemplate = (controls) => {
  const controlsList = controls.map((control) => createControlsTabTemplate(control)).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${controlsList}
    </nav>`
  );
};

export default class TripControlsTab {
  constructor(controls) {
    this._element = null;
    this.__controls = controls;
  }

  getTemplate() {
    return createTripControlsTabsTemplate(this.__controls);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


