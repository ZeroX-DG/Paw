import React, { Component } from 'react';
import {Router, Route, BrowserRouter} from 'react-router-dom';

import ProjectListPanel from './ProjectListPanel.jsx';
import AvailableLibrariesPanel from './AvailableLibrariesPanel.jsx';
import ProjectDetailsPanel from './ProjectDetailsPanel.jsx';
import {ToastContainer} from 'react-toastify';
import 'animate.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="wrapper" style={{fontFamily: 'Lato, sans-serif'}}>
          <ToastContainer />
          <Route exact path='/' component={ProjectListPanel} />
          <Route exact path='/' component={AvailableLibrariesPanel} />
          <Route exact path='/project/:id' component={ProjectDetailsPanel} />
        </div>
      </BrowserRouter>
    );
  }
}