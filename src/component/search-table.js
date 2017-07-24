import React from 'react';
import ReactDom from 'react-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import Backbone from 'backbone';

import SearchTableLine from './search-table-line';

/**
 * @class SearchTable
 */
export default class SearchTable extends React.Component {
  /**
   * @method constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    Backbone.on('change:status-all', () => this.onChangeAllStatus());

    this.state = {
      activeAll: false,
    };
  }

  /**
   * @method onChangeAllStatus
   */
  onChangeAllStatus() {
    let {vehicles} = this.props;
    let vehiclesActive = vehicles.filter((vehicle) => {
      return vehicle.isActive();
    }).length;
    this.setState({activeAll: vehiclesActive === vehicles.length});
  }

  /**
   * @method render
   * @return {Object}
   */
  render() {
    let {vehicles} = this.props;
    let {activeAll}= this.state;
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
                  <input
                    ref={(ref) => this.refsCheckAll = ref}
                    checked={activeAll}
                    type="checkbox" onClick={() => this.toggleActive()}
                    />
                  <span className="cr">
                    <i className="cr-icon glyphicon glyphicon-ok"></i>
                  </span>
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

        <button
          type="button"
          className="btn btn-danger btn-lg"
          onClick={() => this.removeAll()}>
          Remover Todos os Selecionados
        </button>
        <div ref={(ref) => this.refsAlert = ref}></div>
      </article>
    );
  }

  /**
   * @method toggleActive
   */
  toggleActive() {
    let {vehicles} = this.props;
    let activeAll = this.refsCheckAll.checked;

    vehicles.map((vehicle) => {
      vehicle.setActived(activeAll);
      vehicle.trigger('change:status');
    });

    this.setState({activeAll});
  }

  /**
   * @method removeAll
   */
  removeAll() {
    ReactDom.render(
      <SweetAlert
        type="warning"
        title="Deseja excluir estes veículos?"
        showCancel
        cancelBtnBsStyle="default"
        onConfirm={() => this.onConfirmRemove()}
        onCancel={() => this.hideAlert()}/>,
      this.refsAlert
    );
  }

  /**
   * @method onConfirmRemove
   */
  onConfirmRemove() {
    this.hideAlert();
    let {vehicles} = this.props;
    vehicles.map((vehicle) => {
      if (vehicle.isActive()) {
        vehicle.destroy();
      }

      this.setState({activeAll: false});
    });
  }

  /**
   * @method hideAlert
   */
  hideAlert() {
    ReactDom.unmountComponentAtNode(
      this.refsAlert
    );
  }
}
