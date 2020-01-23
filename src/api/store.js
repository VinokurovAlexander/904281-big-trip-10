export default class Store {
  constructor(key, storage) {
    this._storeKey = key;
    this._storage = storage;
  }

  getAll() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey));
    } catch (err) {
      return {};
    }
  }

  setItem(key, value) {
    const store = this.getAll();

    this._storage.setItem(this._storeKey, JSON.stringify(Object.assign({}, store, {[key]: value})));
  }

  deletePoint(id) {
    const store = this.getAll();
    const storePoints = this.getAll().points;

    const filterPoints = storePoints.filter((point) => point.id !== id);

    this._storage.setItem(this._storeKey, JSON.stringify(Object.assign({}, store, {'points': filterPoints})));
  }
}
