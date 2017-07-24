import React from 'react';
import ReactDom from 'react-dom';

import SweetAlert from 'react-bootstrap-sweetalert';
import Backbone from 'backbone';

export default class SearchTableLine extends React.Component {

  constructor(props) {
    super(props);
    let {vehicle} = this.props;
    this.state = {
      lineActived: vehicle.isActive(),
    };

    vehicle.on('change:status', () => {
      this.setState({lineActived: vehicle.isActive()});
    });
  }

  render () {
    let {vehicle} = this.props;
    let {lineActived} = this.state;
    let className = lineActived ? 'active' : '';
    let price = new Number(vehicle.get('valor'));
    price = price.toLocaleString('pt-Br', {minimumFractionDigits: 2});

    return (
      <tr className={className}>
        <td>
          <div className="checkbox">
            <label>
            <input type="checkbox" checked={lineActived} onClick={() => this.toggleActiveLine()}/>
            <span className="cr"><i className="cr-icon glyphicon glyphicon-ok"></i></span>
            </label>
          </div>
        </td>
        <td>
          <a href="#" onClick={(e) => this.edit(e)}>
          {vehicle.get('placa')}</a>
        </td>
        <td>{vehicle.get('modelo')}</td>
        <td>{vehicle.get('marca')}</td>
        <td className="image-hover">
          {this.getImagem(vehicle.get('imagem'))}
        </td>
        <td>{vehicle.get('combustivel')}</td>
        <td>{price}</td>
        <td>
          <a href="#" title="Remover" onClick={(e) => this.remove(e)}>
            <span className="glyphicon glyphicon-trash"></span>
          </a>
        </td>
      </tr>
    );
  }

  getImagem(image) {
    if (image) {
      return (
        <span>
          <a href="#">Imagem</a>
          <img src={image} className="thumbnail"/>
        </span>
      )
    }

    return <span>Sem Foto</span>
  }

  toggleActiveLine() {
    let {lineActived} = this.state;
    lineActived = !lineActived;
    this.setState({lineActived});

    let {vehicle} = this.props;
    vehicle.setActived(lineActived);


    Backbone.trigger('change:status-all');
  }

  edit(e) {
    e.preventDefault();
    let {vehicle} = this.props;
    router.navigate(`/vehicle/${vehicle.get('id')}`, true);
  }

  getParentComponet() {
    return this._reactInternalInstance._currentElement._owner._instance;
  }

  remove(e) {
    e.preventDefault();
    ReactDom.render(
      <SweetAlert
        type="warning"
        title="Deseja excluir este veículo?"
        showCancel
        cancelBtnBsStyle="default"
        onConfirm={() => this.onConfirm()}
        onCancel={() => this.hideAlert()}/>,
      this.getParentComponet().refs.alert
    );
  }

  onConfirm() {
    let {vehicle} = this.props;
    this.hideAlert();
    vehicle.destroy();
  }

  hideAlert() {
    ReactDom.unmountComponentAtNode(
      this.getParentComponet().refs.alert
    );
  }
}
