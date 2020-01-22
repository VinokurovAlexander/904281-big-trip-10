import AbstractComponent from "./abstract-components";

export default class PointsComponent extends AbstractComponent {
  getTemplate() {
    return (
      `<ul class="trip-days">
     </ul>`
    );
  }
}
