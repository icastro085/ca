import React from 'react';
import ReactDom from 'react-dom';

import Vehicles from './../collection/vehicles';

import SearchTable from './search-table';
import SearchNav from './search-nav';
import SearchForm from './search-form';

let vehicles = new Vehicles();

export default class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      vehicles: [],
      page: 0,
      totalItems: 0,
      itemsByPage: 5,
      text: '',
    };

    vehicles.fetch().then(
      () => this.setVehicles()
    );
  }

  componentDidMount() {
    vehicles.on({
      destroy: () => this.setVehicles(),
    });
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
      let begin = page * itemsByPage;
      let end = begin + itemsByPage;
      let totalItems = vehiclesResult.length;
      this.setState({
        vehicles: vehiclesResult.slice(
          begin,
          end
        ),
        totalItems,
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

}
