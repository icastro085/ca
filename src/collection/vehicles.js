import Vehicle from './../model/vehicle';
import {LocalStorage} from 'backbone.localstorage';

export default class Vehicles extends Backbone.Collection {
  constructor(attrs, options) {
    super(attrs, options);
    this.model = Vehicle;
    this.localStorage = new LocalStorage('Vehicle');
  }

  url() {
    let url = '/vehicle';
    return url;
  }
}
