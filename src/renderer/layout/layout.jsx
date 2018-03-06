import React, { Component } from 'react';

import './layout.scss';

export default class Layout extends Component {

  render() {
    return (
      <div className="paw-layout">
        {this.props.children}
      </div>
    );
  }

}