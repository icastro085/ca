import {LocalStorage} from 'backbone.localstorage';

export default class Vehicle extends Backbone.Model {
  constructor(attr, options) {
    super(attr, options);

    this.defaults = {
      combustivel : '',
      imagem : '',
      marca : '',
      modelo : '',
      placa : '',
      valor : 0
    };

    this.localStorage = new LocalStorage('Vehicle');
  }

  url() {
    let {id} = this.attributes;
    let url = `/vehicle/${id}`;
    return url;
  }

  setActived(active) {
    this.active = active;
  }

  isActive() {
    return !!this.active;
  }
};
