import React, { Component } from 'react';

import './button.scss';

export default class Button extends Component {

  render() {
    return (
      <button className="z-btn" style={this.props.style}>
        {this.props.children}
      </button>
    );
  }
}