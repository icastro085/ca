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
              <th>
                <div className="checkbox">
                <label>
                  <input type="checkbox"/>
                  <span className="cr"><i className="cr-icon glyphicon glyphicon-ok"></i></span>
                </label>
                </div>
              </th>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Marca</th>
              <th>Foto</th>
              <th>Combustível</th>
              <th>Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lines}
          </tbody>
        </table>
        <div ref="alert"></div>
      </article>
    );
  }
}
