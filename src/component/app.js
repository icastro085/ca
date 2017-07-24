import React from 'react';

import Header from './header';

/**
 * @class App
 */
export default class App extends React.Component {
  /**
   * @method constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method render
   * @return {Object}
   */
  render() {
    return (
    <article className="container">
      <Header/>
      <section id="container-body"></section>
    </article>
    );
  }
}
