import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App.jsx';

import 'reset.css';
import './assets/font.scss';

import store from './core/store.js';
import { generateID, getLibVersion } from './core/helper.js';
import fs from 'fs';
import path from 'path';

// add available libraries
if (!store.get('available_libraries') || 
    store.get('available_libraries').length < 1) {
  let current_libraries = store.get('available_libraries') || [];
  let default_libraries_path = path.resolve(
    __dirname, '..', 'static/libraries'
  );
  fs.readdir(default_libraries_path, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach(file => {
      let link = getDefaultLibLink(file); 
      current_libraries.push(
        {
          _id: generateID(20), 
          name: file, 
          version: getLibVersion(
            path.resolve(default_libraries_path, file)
          ),
          link: link
        }
      );
    });
    store.set('available_libraries', current_libraries);
  })
}

function getDefaultLibLink(file) {
  if (file === 'p5.dom.js' || file === 'p5.js' || file === 'p5.sound.js') {
    return 'https://github.com/processing/p5.js/releases/download/0.6.0/' + file;
  }
}


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