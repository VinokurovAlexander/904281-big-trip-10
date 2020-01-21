import NoEvents from "./components/no-events";
import TripController from "./controllers/trip";
import {render, RenderPosition} from "./utils/render";
import PointsModel from "./models/points";
import FilterController from "./controllers/filter";
import Stats from "./components/stats";
import Api from "./api";
import TripControlsTab from "./components/trip-controls";
import {controls} from "./components/trip-controls";

const AUTHORIZATION = `Basic sf4SoFEdfYde`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;

const api = new Api(END_POINT, AUTHORIZATION);

Promise.all([api.getPoints(), api.getDestinations(), api.getOffers()]).then((values) => {
  const [points, destinations, offers] = values;
  const tripEventsBlock = document.querySelector(`.trip-events`);

  if (points.length === 0) {
    const noEventsComponent = new NoEvents();
    render(tripEventsBlock, noEventsComponent, RenderPosition.BEFOREEND);
  } else {
    const pointsModel = new PointsModel();
    pointsModel.setDestinations(destinations);
    pointsModel.setOffers(offers);
    pointsModel.setPoints(points);

    const tripControlsBlock = document.querySelector(`.trip-controls`);
    const filterController = new FilterController(tripControlsBlock, pointsModel);
    filterController.render();

    const pageBodyContainer = document.querySelector(`.page-main .page-body__container`);
    const statsComponent = new Stats(pointsModel);
    render(pageBodyContainer, statsComponent, RenderPosition.BEFOREEND);
    statsComponent.hide();

    const tripController = new TripController(tripEventsBlock, pointsModel, api);
    tripController.render();

    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
      tripController.createPoint();
    });

    const tripControls = new TripControlsTab();
    render(tripControlsBlock, tripControls, RenderPosition.AFTERBEGIN);
    tripControls.setClickHandler((type) => {
      switch (type) {
        case controls.STATS.title:
          tripController.hide();
          statsComponent.show();
          break;
        case controls.TABLE.title:
          tripController.show();
          statsComponent.hide();
          break;
      }
    });
  }
});


