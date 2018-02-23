import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App.jsx';

import 'reset.css';
import './assets/font.scss';

import store from './core/store.js';
import { generateID } from './core/helper.js';
import fs from 'fs';

// add available libraries
// if (!store.get('available_libraries')) {
//   fs.readdir('static/libraries/', (err, files) => {
//     files.forEach(file => {
//       store.set('available_libraries', [
//         {_id: generateID(20), name: file, version: }
//       ]);
//     });
//   })
// }


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