import {render, RenderPosition} from "../utils/render";
import {filtersType} from "../components/filter";
import FilterComponent from "../components/filter";

export default class FilterController {
  constructor(container, pointModel) {
    this._container = container;
    this._pointModel = pointModel;

    this._filterComponent = null;
    this._activeFilter = filtersType.ALL;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    this._filterComponent = new FilterComponent();
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _onFilterChange(filter) {
    this._pointModel.setFilter(filter);
    this._activeFilter = filter;
  }
}
