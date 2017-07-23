import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';

import 'jquery-mask-plugin';

import Backbone from 'backbone';

import React from 'react';
import {render} from 'react-dom';
import JQuery from 'jquery';

import App from './component/app';
import Search from './component/search';
import Register from './component/register';

const Router = Backbone.Router.extend({
  routes: {
    '': 'search',
    'vehicle': 'register',
    'vehicle/:id': 'register',
  },

  search: () => {
    render(<Search/>, document.getElementById('container-body'));
  },

  register: (id) => {
    render(<Register id={id}/>, document.getElementById('container-body'));
  }
});

render(<App/>, document.getElementById('app-container'));

// define router as global
global.router = new Router();
global.$ = JQuery;

Backbone.history.start();
