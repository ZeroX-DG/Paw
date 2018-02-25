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
          <Route path='/' component={ProjectListPanel} />
          <Route path='/' component={AvailableLibrariesPanel} />
          <Route path='/project/:id' component={ProjectDetailsPanel} />
        </div>
      </BrowserRouter>
    );
  }
}