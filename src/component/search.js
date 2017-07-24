import React from 'react';
import ReactDom from 'react-dom';
import Promise from 'bluebird';

import Vehicles from './../collection/vehicles';

import SearchTable from './search-table';
import SearchNav from './search-nav';
import SearchForm from './search-form';

import InitialData from './../config/initial-data.json';

let vehicles = null;

export default class Search extends React.Component {

  constructor(props) {
    super(props);

    // force reload fetch
    vehicles = new Vehicles();

    this.state = {
      vehicles: [],
      page: 0,
      totalItems: 0,
      itemsByPage: 5,
      text: '',
    };

    vehicles.fetch().then(() => this.setVehicles());
  }

  componentDidMount() {
    vehicles.on({
      destroy: () => this.setVehicles(),
    });

    if (!Cookies.get('isFirst')) {
      this.createInitialList();
    }
  }

  render () {
    let {
      vehicles,
      totalItems,
      itemsByPage,
      page,
    } = this.state;

    return (
      <section>

        <SearchForm onSubmit={(text) => this.onSubmit(text)}/>
        {
          !vehicles.length ?
          <div className="alert alert-warning no-vehicles">
            <b>Atenção!</b> Não há veículos cadastrados.
          </div> :
          <SearchTable vehicles={vehicles}/>
        }

        <SearchNav
          key={totalItems + page}
          totalItems={totalItems}
          itemsByPage={itemsByPage}
          page={page}
          onChangePage={(page) => this.onChangePage(page)}
        />
      </section>
    );
  }

  setVehicles() {
    let vehiclesResult = this.filterVehicles(vehicles);

    if (vehiclesResult.length) {
      let {page, itemsByPage} = this.state;
      let totalPage = Math.ceil(vehiclesResult.length/itemsByPage) - 1;
      if (page > totalPage){
        page = totalPage;
      }

      let begin = page * itemsByPage;
      let end = begin + itemsByPage;
      let totalItems = vehiclesResult.length;
      this.setState({
        vehicles: vehiclesResult.slice(
          begin,
          end
        ),
        totalItems,
        page: page,
      });
    } else {
      this.setState({
        vehicles: [],
        totalItems: 0,
      });
    }
  }

  onChangePage(page) {
    this.setState({page}, () => this.setVehicles());
  }

  onSubmit(text) {
    this.setState({text}, () => this.setVehicles());
  }

  stringFormatter(string) {
    return string.toUpperCase()
    .replace(/[ÀÁÂÃÄÅÃ]/g,"A")
    .replace(/[ÈÉÊËẼ]/g,"E")
    .replace(/[ÌÍÎÏĨ]/g, "I")
    .replace(/[ÒÓÔÖÕ]/g, "O")
    .replace(/[ÙÚÛÜŨ]/g, "U")
    .replace(/[Ç]/g,"C")
    .replace(/\s+/g, ' ')
    .trim();
  }

  filterVehicles(vehicles) {
    let {text} = this.state;
    if (text.length) {
      text = this.stringFormatter(text).replace(/(.)/g, ($1) => {
        if(/[^A-z0-9]/g.test($1)){
            return '\\'+$1;
        }
        return $1;
      });
      text = new RegExp(text, 'gi');
      vehicles = vehicles.filter((vehicle) => {
        let fuel = this.stringFormatter(vehicle.get('combustivel'));
        let brand = this.stringFormatter(vehicle.get('marca'));
        let isValid = (
          text.test(fuel) ||
          text.test(brand)
        );
        return isValid;
      });
    }

    return vehicles;
  }

  createInitialList() {
    Cookies.set('isFirst', true);
    let data = InitialData.map((v) => new Promise((resolve, reject) => {
        vehicles.create(v).then(resolve).catch(reject);
    }));
    Promise.all(data)
      .then(() => this.setVehicles());
  }

}
