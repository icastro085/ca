import React from 'react';
import ReactDom from 'react-dom';

import SweetAlert from 'react-bootstrap-sweetalert';

import Vehicle from './../model/vehicle';

const FLEX = 'Flex';
const ALCOOL = 'Alcool';
const GASOLINA = 'Gasolina';

const FUEL = [GASOLINA, ALCOOL, FLEX];

/**
 * @class Register
 */
export default class Register extends React.Component {
  /**
   * @method constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    let {id} = this.props;
    let vehicle = new Vehicle({
      id: id || null,
      combustivel: '',
      imagem: '',
      marca: '',
      modelo: '',
      placa: '',
      valor: '',
    });

    if (id) {
      vehicle.fetch().then(() => {
        let price = parseFloat(vehicle.get('valor') || 0);
        price = price.toLocaleString('pt-Br', {minimumFractionDigits: 2});
        vehicle.set('valor', price);
        this.setState({vehicle});
      });
    }

    this.state = {
      vehicle,
      errors: {},
    };
  }

  /**
   * @method componentDidMount
   */
  componentDidMount() {
    $(this.refsValor).mask('#.##0,00', {reverse: true});
    $(this.refsPlaca).mask('AAA-9999');
  }

  /**
   * @method render
   * @return {Object}
   */
  render() {
    let {vehicle, errors} = this.state;
    let options = FUEL.map((item) => this.getOptionSelect(item));
    options.unshift(<option key="select" value="">Selecione</option>);

    return (
      <form onSubmit={(e) => this.onSubmit(e)} method="POST">
        <div className="row">
          <div className="form-group form-group-lg col-md-4">
            <label className="control-label">Combustível</label>
            <select
              name="combustivel"
              className="form-control"
              value={vehicle.get('combustivel')}
              onChange={(e) => this.onChange(e)}>
              {options}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="form-group form-group-lg col-md-12">
            <label className="control-label">Imagem</label>
            <input
              type="text"
              name="imagem"
              className="form-control"
              placeholder="Ex.: http://test.jpg"
              value={vehicle.get('imagem')}
              onChange={(e) => this.onChange(e)}/>
          </div>
        </div>

        <div className="row">
          <div className={
            `form-group
            form-group-lg
            col-md-8
            ${errors.marca ? 'has-error' : ''}`
          }>
            <label className="control-label">Marca</label>
            <input
              type="text"
              name="marca"
              className="form-control"
              placeholder="Ex.: Volkswagem"
              value={vehicle.get('marca')}
              onChange={(e) => this.onChange(e)}/>
              {
                errors.marca &&
                <span className="help-block">
                  Atenção! Informe a marca do veículo
                </span>
              }
          </div>

          <div className={
            `form-group
            form-group-lg
            col-md-4
            ${errors.modelo ? 'has-error' : ''}`
          }>
            <label className="control-label">Modelo</label>
            <input
              type="text"
              name="modelo"
              className="form-control"
              placeholder="Ex.: Gol"
              value={vehicle.get('modelo')}
              onChange={(e) => this.onChange(e)}/>
              {
                errors.modelo &&
                <span className="help-block">
                  Atenção! Informe o modelo do veículo
                </span>
              }
          </div>
        </div>

        <div className="row">
          <div className={
            `form-group
            form-group-lg
            col-md-6
            ${errors.placa ? 'has-error' : ''}`
          }>
            <label className="control-label">Placa</label>
            <input
              type="text"
              name="placa"
              ref={(ref) => this.refsPlaca = ref}
              className="form-control"
              placeholder="Ex.: FFF-5498"
              value={vehicle.get('placa')}
              onChange={(e) => this.onChange(e)}/>
              {
                errors.placa &&
                <span className="help-block">
                  Atenção! Informe a placa do veículo
                </span>
              }
          </div>

          <div className="form-group form-group-lg col-md-6">
            <label className="control-label">Valor</label>
            <input
              type="text"
              name="valor"
              ref={(ref) => this.refsValor = ref}
              className="form-control text-right"
              placeholder="Ex.: 20.000,00"
              value={vehicle.get('valor')}
              onChange={(e) => this.onChange(e)}/>
          </div>
        </div>
        <br/><br/>

        <button
          type="button"
          className="btn btn-default btn-lg"
          onClick={() => this.back()}>Voltar</button>
        &nbsp;&nbsp;
        <button
          type="button"
          className="btn btn-success btn-lg"
          onClick={() => this.save()}>Salvar</button>

        <br/><br/><br/><br/>
        <div ref={(ref) => this.refsAlert = ref}></div>
      </form>
    );
  }

  /**
   * @method onSubmit
   * @param {Object} e
   */
  onSubmit(e) {
    e.preventDefault();
  }

  /**
   * @method save
   * @param {Object} e
   */
  onChange(e) {
    let {name, value} = e.target;
    let {vehicle} = this.state;

    if (name === 'placa') {
      value = value.toUpperCase();
    }

    vehicle.set(name, value);
    this.setState({vehicle});
  }

  /**
   * @method back
   * @param {String} item
   * @return {Object}
   */
  getOptionSelect(item) {
    return <option key={item} value={item}>{item}</option>;
  }

  /**
   * @method back
   */
  back() {
    router.navigate('/', true);
  }

  /**
   * @method save
   */
  save() {
    let {vehicle} = this.state;

    if (this.validate()) {
      // parsing to db format
      vehicle.set(
        'valor',
        this.refsValor.value
          .replace(/[.]/g, '')
          .replace(/[,]/g, '.')
      );

      vehicle.save()
        .then(() => {
          // parsing to ui format
          let price = parseFloat(vehicle.get('valor'));
          price = price.toLocaleString('pt-Br', {minimumFractionDigits: 2});
          vehicle.set('valor', price);
          this.setState({
            vehicle,
            errors: {},
          });
        })
        .then(() => this.saveSuccess())
        .catch(() => this.saveFail());
    }
  }

  /**
   * @method saveSuccess
   */
  saveSuccess() {
    ReactDom.render(
      <SweetAlert
        type="success"
        title="Registro salvo com sucesso!"
        onConfirm={() => this.hideAlert()}/>,
      this.refsAlert
    );
  }

  /**
   * @method saveFail
   */
  saveFail() {
    ReactDom.render(
      <SweetAlert
        type="danger"
        title="Ops! Erro ao tentar salvar, tente novamente"
        onConfirm={() => this.hideAlert()}/>,
      this.refsAlert
    );
  }

  /**
   * @method hideAlert
   */
  hideAlert() {
    ReactDom.unmountComponentAtNode(
      this.refsAlert
    );
  }

  /**
   * @method validate
   * @return {Boolean}
   */
  validate() {
    let {vehicle, errors} = this.state;

    errors = {};

    if (!vehicle.get('marca')) {
      errors.marca = true;
    }

    if (!vehicle.get('modelo')) {
      errors.modelo = true;
    }

    if (!vehicle.get('placa')) {
      errors.placa = true;
    }

    if (!$.isEmptyObject(errors)) {
      this.setState({errors});
    }

    return $.isEmptyObject(errors);
  }
}
