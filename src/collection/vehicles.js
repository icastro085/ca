import Backbone from 'backbone';

import Vehicle from './../model/vehicle';
import {LocalStorage} from 'backbone.localstorage';

/**
 * @class Vehicles
 */
export default class Vehicles extends Backbone.Collection {
  /**
   * @method constructor
   * @param {Object} attrs
   * @param {Object} options
   */
  constructor(attrs, options) {
    super(attrs, options);
    this.model = Vehicle;
    this.localStorage = new LocalStorage('Vehicle');
  }

  /**
   * @method url
   * @return {String}
   */
  url() {
    let url = '/vehicle';
    return url;
  }
}
