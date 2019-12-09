import AbstractComponent from "./abstract-components";

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

export default class TripControlsTab extends AbstractComponent {
  constructor(controls) {
    super();
    this.__controls = controls;
  }

  getTemplate() {
    return createTripControlsTabsTemplate(this.__controls);
  }
}


