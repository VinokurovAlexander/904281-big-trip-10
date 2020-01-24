import TripController from "./controllers/trip";
import {render, RenderPosition} from "./utils/render";
import PointsModel from "./models/points";
import Stats from "./components/stats";
import Api from "./api";
import TripControlsTab from "./components/trip-controls";
import Store from "./api/store";
import Provider from "./api/provider";
import {controls} from "./components/trip-controls";

const AUTHORIZATION = `Basic af4SoYEdfYde`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {})
    .catch(() => {});
});

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

Promise.all([apiWithProvider.getPoints(), apiWithProvider.getDestinations(), apiWithProvider.getOffers()])
  .then((values) => {
    const [points, destinations, offers] = values;
    const tripEventsBlock = document.querySelector(`.trip-events`);

    const pointsModel = new PointsModel();
    pointsModel.setDestinations(destinations);
    pointsModel.setOffers(offers);
    pointsModel.setPoints(points);

    const pageBodyContainer = document.querySelector(`.page-main .page-body__container`);
    const statsComponent = new Stats(pointsModel);
    render(pageBodyContainer, statsComponent, RenderPosition.BEFOREEND);
    statsComponent.hide();

    const tripController = new TripController(tripEventsBlock, pointsModel, apiWithProvider);
    tripController.render();

    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
      tripController.createPoint();
    });

    const tripControls = new TripControlsTab();
    const tripControlsBlock = document.querySelector(`.trip-controls`);
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
  });

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  if (!apiWithProvider.getSynchronize()) {
    apiWithProvider.sync()
      .catch((err) =>{
        throw new Error(err);
      });
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
