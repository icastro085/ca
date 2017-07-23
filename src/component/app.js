import React from 'react';
import ReactDom from 'react-dom';

import Header from './header';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
    <article className="container">
      <Header/>
      <section id="container-body"></section>
    </article>
    );
  }
}
