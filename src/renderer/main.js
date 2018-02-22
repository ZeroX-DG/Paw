import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App.jsx';

import 'reset.css';
import './assets/font.scss';

import store from './core/store.js';
import { generateID } from './core/helper.js';

store.set('projects', [ 
  {_id: generateID(20), name: 'abc', path: '/zerox/sadasd'} 
]);

store.set('libraries', [ 
  {_id: generateID(20), name: 'p5.js', link: 'https://d.com', version: '10.0'},
  {_id: generateID(20), name: 'p56.js', link: 'https://d.com', version: '10.0'}
]);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  )
}

render(App);

if (module.hot) {
  module.hot.accept('./components/App.jsx', () => {
    app = require('./components/App.jsx');
    render(app)
  })
}