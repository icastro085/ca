import React from 'react';
import ReactDom from 'react-dom';

import SweetAlert from 'react-bootstrap-sweetalert';

export default class SearchTableLine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lineActived: false,
    };
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
          <input type="checkbox" onClick={() => this.toggleActiveLine()}/>
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
