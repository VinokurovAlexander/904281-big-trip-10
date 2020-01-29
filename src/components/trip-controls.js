import AbstractComponent from "./abstract-components";

export const controls = {
  TABLE: {
    title: `Table`,
    isActive: `trip-tabs__btn--active`,
    href: `#`
  },
  STATS: {
    title: `Stats`,
    isActive: ``,
    href: `#`
  }
};

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
  constructor(props) {
    super(props);

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTripControlsTabsTemplate();
  }

  _subscribeOnEvents() {
    this.setClickHandler((evt) => {
      Array.from(this.getElement().querySelectorAll(`.trip-tabs__btn`)).forEach((btn) => {
        if (btn.classList.contains(`trip-tabs__btn--active`)) {
          btn.classList.remove(`trip-tabs__btn--active`);
        }
      });

      evt.target.classList.add(`trip-tabs__btn--active`);
    });
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        handler(evt);
      }
    });
  }
}


