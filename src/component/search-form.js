import React from 'react';

/**
 * @class SearchForm
 */
export default class SearchForm extends React.Component {
  /**
   * @method constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  /**
   * @method render
   * @return {Object}
   */
  render() {
    let {text} = this.state;

    return (
      <article>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div className="row">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-success btn-lg"
                onClick={() => this.newVehicle()}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Novo Carro
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>

            <div className="col-md-4 col-md-offset-2">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  name="text"
                  className="form-control"
                  placeholder="Ex.: Combustível e/ou Marca"
                  value={text}
                  onChange={(e) => this.onChange(e)}/>
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-search"></span>
                </span>
              </div>
            </div>
          </div>
        </form>
      </article>
    );
  }

  /**
   * @method onChange
   * @param {Object} e
   */
  onChange(e) {
    let {value} = e.target;
    this.setState({
      text: value,
    });
  }

  /**
   * @method onSubmit
   * @param {Object} e
   */
  onSubmit(e) {
    e.preventDefault();
    let {text} = this.state;

    let {onSubmit} = this.props;
    if (typeof onSubmit === 'function') {
      onSubmit(text);
    }
  }

  /**
   * @method newVehicle
   */
  newVehicle() {
    router.navigate('/vehicle', {trigger: true});
  }
}
