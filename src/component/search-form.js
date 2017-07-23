import React from 'react';
import ReactDom from 'react-dom';

export default class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render () {

    let {text} = this.state;

    return (
      <article>
        <form onSubmit={(e) => this.onSubmit(e)} method="POST">
          <div className="row">
            <div className="col-md-6">
              <button
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
                  placeholder="Pesquisar"
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

  onChange(e) {
    let {value} = e.target;
    this.setState({
      text: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let {text} = this.state;

    let {onSubmit} = this.props;
    if (typeof onSubmit === 'function') {
      onSubmit(text);
    }
  }

  newVehicle() {
    router.navigate('/vehicle', {trigger: true});
  }
}
