import React from 'react';
import ReactDom from 'react-dom';

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
        <td>{vehicle.get('placa')}</td>
        <td>{vehicle.get('modelo')}</td>
        <td>{vehicle.get('marca')}</td>
        <td className="image-hover">
          {this.getImagem(vehicle.get('imagem'))}
        </td>
        <td>{vehicle.get('combustivel')}</td>
        <td>{price}</td>
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
}
