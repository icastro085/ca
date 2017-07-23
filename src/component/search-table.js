import React from 'react';
import ReactDom from 'react-dom';

import SearchTableLine from './search-table-line';

export default class SearchTable extends React.Component {
  render () {

    let {vehicles} = this.props;
    let lines = [];

    lines = (vehicles || [])
      .map(
        (vehicle) => <SearchTableLine
          key={vehicle.get('id')}
          vehicle={vehicle}/>
      );

    return (
      <article className="table-responsive">
        <table className="table search">
          <thead>
            <tr>
              <th><input type="checkbox"/></th>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Marca</th>
              <th>Foto</th>
              <th>Combustível</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {lines}
          </tbody>
        </table>
      </article>
    );
  }
}
