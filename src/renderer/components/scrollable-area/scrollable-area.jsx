import React, { Component } from 'react';

import './scrollable-area.scss';

export default class ScrollableArea extends Component {

  render() {
    return (
      <div className="scrollable-area">
        {this.props.children}
      </div>
    );
  }

}