import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';

import Backbone from 'backbone';

import React from 'react';
import {render} from 'react-dom';

import App from './component/app';
import Search from './component/search';


let router = null;

const Router = Backbone.Router.extend({
  routes: {
    '': 'search',
  },

  search: () => {
    render(<Search/>, document.getElementById('container-body'));
  },
});

render(<App/>, document.getElementById('app-container'));

router = new Router();
Backbone.history.start();
