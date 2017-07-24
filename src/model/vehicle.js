import Backbone from 'backbone';
import {LocalStorage} from 'backbone.localstorage';

/**
 * @class Vehicle
 */
export default class Vehicle extends Backbone.Model {
  /**
   * @constructor
   * @param {Object} attr
   * @param {Boject} options
   */
  constructor(attr, options) {
    super(attr, options);

    this.defaults = {
      combustivel: '',
      imagem: '',
      marca: '',
      modelo: '',
      placa: '',
      valor: 0,
    };

    this.localStorage = new LocalStorage('Vehicle');
  }

  /**
   * @method url
   * @return {String}
   */
  url() {
    let {id} = this.attributes;
    let url = `/vehicle/${id}`;
    return url;
  }

  /**
   * @method setActived
   * @param {Boolean} active
   */
  setActived(active) {
    this.active = active;
  }

  /**
   * @method isActive
   * @return {Boolean}
   */
  isActive() {
    return !!this.active;
  }
}
