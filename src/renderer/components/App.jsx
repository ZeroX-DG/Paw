import React, { Component } from 'react';
import {Router, Route, BrowserRouter} from 'react-router-dom';

import ProjectListPanel from './ProjectListPanel.jsx';
import AvailableLibrariesPanel from './AvailableLibrariesPanel.jsx';
import ProjectDetailsPanel from './ProjectDetailsPanel.jsx';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="wrapper" style={{fontFamily: 'Lato, sans-serif'}}>
          <Route path='/' component={ProjectListPanel} />
          <Route path='/' component={AvailableLibrariesPanel} />
          <Route path='/project/:id' component={ProjectDetailsPanel} />
        </div>
      </BrowserRouter>
    );
  }
}