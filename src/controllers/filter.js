import {render, RenderPosition, remove} from "../utils/render";
import {FiltersType} from "../components/filter";
import FilterComponent from "../components/filter";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._filterComponent = null;
    this._activeFilter = FiltersType.ALL;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    this._filterComponent = new FilterComponent(this._activeFilter);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _onFilterChange(filter) {
    this._pointsModel.setFilter(filter);
    this._activeFilter = filter;
  }

  destroy() {
    remove(this._filterComponent);
  }
}
