import TripInfo from "./components/trip-info";
import TripList from "./components/trip-list";
import NoEvents from "./components/no-events";
import TripController from "./controllers/trip-controller";
import {render, RenderPosition} from "./utils/render";
import Points from "./models/points";
import FilterController from "./controllers/filter";
import Stats from "./components/stats";
import TripControlsTab from "./components/trip-controls";
import Api from "./api";

const AUTHORIZATION = `Basic sfEfcSoFEYdexm=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;

const api = new Api(END_POINT, AUTHORIZATION);

api.getPoints()
  .then((points) => {
    const tripControlsBlock = document.querySelector(`.trip-controls`);
    const tripControls = new TripControlsTab();
    render(tripControlsBlock, tripControls, RenderPosition.AFTERBEGIN);
    const tripEventsBlock = document.querySelector(`.trip-events`);

    if (points.length === 0) {
      const noEventsComponent = new NoEvents();
      render(tripEventsBlock, noEventsComponent, RenderPosition.BEFOREEND);
    } else {
      const tripInfoBlock = document.querySelector(`.trip-info`);
      render(tripInfoBlock, new TripInfo(), RenderPosition.AFTERBEGIN);

      const tripList = new TripList();
      render(tripEventsBlock, tripList, RenderPosition.BEFOREEND);

      const pointsModel = new Points();
      pointsModel.setPoints(points);
      api.getDestinations()
        .then((destinations) => pointsModel.setDestinations(destinations))
        .then(() => {
          const filterController = new FilterController(tripControlsBlock, pointsModel);
          filterController.render();

          const pageBodyContainer = document.querySelector(`.page-main .page-body__container`);
          const statsComponent = new Stats(pointsModel);
          render(pageBodyContainer, statsComponent, RenderPosition.BEFOREEND);
          statsComponent.hide();

          const eventList = tripList.getElement().querySelector(`.trip-events__list`);
          const tripController = new TripController(eventList, tripEventsBlock, pointsModel, tripControls, statsComponent);
          tripController.render();
          tripController.getMaxId();

          document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
            tripController.createPoint();
          });
        });
    }
  });


