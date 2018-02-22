import React, { Component } from 'react';

import LeftPanel from './LeftPanel.jsx';
import RightPanel from './RightPanel.jsx';

export default class App extends Component {
  render() {
    return (
      <div className="wrapper" style={{fontFamily: 'Lato, sans-serif'}}>
        <LeftPanel />
        <RightPanel />
      </div>
    );
  }
}